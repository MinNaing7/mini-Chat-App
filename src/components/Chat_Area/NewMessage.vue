<template>
  <div class="mt-5">
    <form @submit.prevent="handleSubmit" class="flex gap-2 w-full relative">
      <textarea v-model="message" placeholder="text message" @keypress.enter="handleSubmit" class="text-bar"></textarea>
      <label for="sendImg" class="sendmsg-btn img-colors" :class="{'active-img':sendImg}">
        <span class="material-icons text-lg">crop_original</span>
      </label>
      <input type="file" id="sendImg" accept="image/*" @change="changeHandler" class="send-img-input">
      <button class="sendmsg-btn msg-colors" :disabled="!(message || sendImg)">
        <span v-if="!isLoading" class="material-icons text-lg">send</span>
        <span v-else class="send-loading"></span>
      </button>
    </form>
  </div>
</template>

<script>
  import { ref, watch } from 'vue'
  import getCurrentUser from '../../composable/getCurrentUser'
  import getEachUserDB from '../../composable/getEachUserDB'
  import uploadMessageInfo from '../../composable/uploadMessageInfo'
  import useImgStorage from '../../composable/useImgStorage'

  export default {
    props: ['chatUser'],
    emits: ['getChatersBetween'],
    setup(props, context) {

      let message = ref('');
      let msgSender = ref('');
      let msgReceiver = ref('');

      let chaterName = ref('');
      let chaterPhoto = ref('');
      let sendImg = ref('');
      let sendImgURL = ref('');

      let isLoading = ref(false);

      let collectInformation = async (selectedUser) => {
        // For msgSender
        let { currentUser } = getCurrentUser();
        msgSender.value = currentUser.value.email;
        chaterName.value = currentUser.value.displayName;
        chaterPhoto.value = currentUser.value.photoURL;

        // For msgReceiver 
        let { userError, getUser } = getEachUserDB();
        let userToChat = await getUser(selectedUser);
        userError.value && console.log(`GetUserError : ${userError.value}`);
        msgReceiver.value = await userToChat.email;
        
        // Emit the Chaters-Between to Parent Component!
        context.emit('getChatersBetween', msgSender.value, msgReceiver.value);
      }

      // Get Sender & Receiver by selecting ChatUser
      collectInformation(props.chatUser);
      watch(() => props.chatUser, (selectedUser, previousUser) => {
        collectInformation(selectedUser);
      })

      // Get File From Input-File-Type
      let changeHandler = (event) => {
        sendImg.value = event.target.files[0];
        console.log(sendImg.value);
      }
      
      // Upload Message-Info when User Submit
      let handleSubmit = async () => {
        isLoading.value = true; // start loading...
        if (sendImg.value) {
          // Send-Image is contained,
          // Upload User-Image to Firebase-Storage & Get Photo-Link
          let { storageError, uploadUserImg } = useImgStorage();
          sendImgURL.value = await uploadUserImg('Sent-Images', sendImg.value);
          storageError.value && console.log(`StorageError : ${storageError.value}`);
        }
        let { msgError, uploadMsg } = uploadMessageInfo();
        await uploadMsg(
          message.value,
          msgSender.value, msgReceiver.value,
          chaterName.value, chaterPhoto.value,
          sendImgURL.value
        );
        msgError.value && console.log(`messageError : ${msgError.value}`);
        message.value = ''; // clean the message
        sendImg.value = ""; // clean the image-file
        sendImgURL.value = ""; // clean the image-URL
        isLoading.value = false; // stop loading...
      }

      return { message, handleSubmit, changeHandler, sendImg, isLoading }
    }
  }
</script>

<style>
</style>