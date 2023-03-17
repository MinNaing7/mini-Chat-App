<template>
  <form @submit.prevent="submitHandler" v-if="!isLoading" class="w-full">
    <h2 class="form-head">Create Account</h2>
    <input type="text" placeholder="&#xe7fd; name" v-model="displayName" required class="input-bar mb-2">
    <input type="email" placeholder="&#xe0e6; email" v-model="email" required class="input-bar mb-2">
    <input type="password" placeholder="&#xe897; password" v-model="password" required class="input-bar mb-2">
    <div class="relative mb-6">
      <label v-if="!profileImg" for="file" class="input-img input-img-normal absolute">Upload Photo</label>
      <label v-else for="file" class="input-img input-img-active absolute">Uploaded</label>
      <input type="file" accept="image/*" @change="changeHandler" required id="file" class="invisible mb-3 w-40">
    </div>
    <button class="form-submit" @click="checkHandler">Create</button>
  </form>
  <div v-else>
    <Preloader></Preloader>
  </div>
</template>

<script>
  import { ref } from 'vue'
  import Preloader from '../components/Preloader.vue'
  import useAuthSignUp from '../composable/useAuthSignUp'
  import useImgStorage from '../composable/useImgStorage'
  import useProfileInfoDB from '@/composable/useProfileInfoDB'
  import { updateProfile } from 'firebase/auth'
  
  export default {
    emits: ['goChatRoom', 'hideTextBelow'],
    components: { Preloader },
    setup(props, context) {

      let isLoading = ref(false);

      let displayName = ref('');
      let email = ref('');
      let password = ref('');
      let profileImg = ref('');

      // Get File From Input-File-Type
      let changeHandler = (event) => {
        profileImg.value = event.target.files[0];
      }

      // Check Photo invalid or not!
      let checkHandler = () => {
        if (!profileImg.value) {
          alert(`Error: Incomplete-Information! Enter name, email, password and photo.
          Don't forget to upload your photo to create Account!`);
        }
      }

      let submitHandler = async () => {
        // Create User-Account with Email & Password
        let { authError, createAccount }= useAuthSignUp();
        let user = await createAccount(email.value, password.value);
        if (authError.value) {
          alert(`AuthError : ${authError.value}`);
          return; // stop the submiting Function
        } else {
          isLoading.value = true;
          context.emit('hideTextBelow', isLoading.value);
        }

        // Upload User-Photo to Firebase-Storage & Get Photo-Link
        let { storageError, uploadUserImg } = useImgStorage();
        let profileImgURL = await uploadUserImg('Profile-Images', profileImg.value);
        storageError.value && console.log(`StorageError : ${storageError.value}`);

        // Update User-Accout with Name & Photo
        await updateProfile( user, {
          displayName: displayName.value,
          photoURL: profileImgURL
        });

        // Upload User-Accout to FireStore Database
        let { dbError, uploadUserProfile } = useProfileInfoDB();
        await uploadUserProfile(user.displayName, user.email, user.photoURL, user.uid);
        dbError.value && console.log(`DatabaseError : ${dbError.value}`);

        if (user) {
          isLoading.value = false;
          context.emit('goChatRoom');
        }

      }

      return { displayName, email, password, profileImg, 
        changeHandler, submitHandler, isLoading, checkHandler }
    }
  }
</script>

<style>
</style>