<template>
  <div class="flex items-center justify-between mb-5 sticky top-0">
    <div class="flex">
      <div>
        <img :src="chatUserProfile.photo" class="w-11 h-11 rounded-full mr-3">
      </div>
      <div class="text-left">
        <h3 class="text-base font-medium text-light-100">{{ chatUserProfile.name }}</h3>
        <p class="text-xs font-light text-light-100/50">{{ chatUserProfile.email }}</p>
      </div>
    </div>
    <div>
      <button class="back-btn block md:hidden" @click="hideChatArea">
        <span class="material-icons">arrow_back_ios_new</span>
      </button>
    </div>
  </div>
</template>

<script>
  import { ref, watch } from 'vue';
  import getEachUserDB from '../../composable/getEachUserDB'
  export default {
    emits: ['hideChatArea'],
    props: ['chatUser'],
      setup(props, context) {
        
      let chatUserProfile = ref({});

      let getChatUserProfile = async (selectedUser) => {
        let { userError, getUser } = getEachUserDB();
        chatUserProfile.value = await getUser(selectedUser);
        userError.value && console.log(`GetUserError : ${userError.value}`);
      }
      
      getChatUserProfile(props.chatUser);

      watch( () => props.chatUser, (selectedUser) => {
        getChatUserProfile(selectedUser);
      });

      let hideChatArea = () => {
        context.emit('hideChatArea');
      }

      return { chatUserProfile, hideChatArea }
    }
  }
</script>

<style>
</style>