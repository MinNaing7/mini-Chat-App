<template>
  <div class="user-profile" v-if="currentUser">
    <div class="profile-nav">
      <h2>Profile</h2>
      <button @click="hideHandler">
        <span class="material-icons">close</span>
      </button>
    </div>
    <div class="flex justify-center">
      <img class="w-20 h-20 rounded-full" :src="currentUser.photoURL">
    </div>
    <div class="my-3">
      <p class="text-lg mb-px">{{ currentUser.displayName }}</p>
      <p class="text-sm text-light-100/50">{{ currentUser.email }}</p>
    </div>
    <button @click="logoutHandler" class="logout-btn">Log out</button>
  </div>
</template>

<script>
  import { watch } from 'vue';
  import { useRouter } from 'vue-router'
  import getCurrentUser from '../composable/getCurrentUser'
  import useAuthSignOut from '../composable/useAuthSignOut'
  export default {
    emits: ['hideProfile'],
    setup(props, context) {
      let router = useRouter();
      let { currentUser } = getCurrentUser();
      
      // For Loggin Out
      let logoutHandler = async() => {
        let { signOutError, signOutAccout } = useAuthSignOut();
        await signOutAccout();
        signOutError.value && console.log(`LogoutError : ${signOutError.value}`)
      }

      // For Hidding Profile 
      let hideHandler = () => {
        context.emit('hideProfile');
      }

      watch(currentUser, () => {
        if(!currentUser.value) {
          router.push({name:'Welcome'});
        }
      })
      return { logoutHandler, currentUser, hideHandler }
    }
  }
</script>

<style>
</style>