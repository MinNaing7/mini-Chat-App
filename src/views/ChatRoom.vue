<template>
  <div class="flex-center w-100 h-screen">
    <div class="chat-room-wh blur-bg grid grid-cols-3 overflow-hidden">
      <div class="col-span-3 md:col-span-1 chat-list-box md:block">
        <ChatList v-if="!displayProfile" @changeUserToConnect="changeUserToChat" @showProfile="showProfile" @showChatArea="showChatArea"></ChatList>
        <Profile v-else @hideProfile="hideProfile"></Profile>
      </div>
      <div class="col-span-3 md:col-span-2 chat-area-box md:block" :class="{hidden:hideChatting}">
        <ChatArea :chatUser="userToChat" @hideChatArea="hideChatArea"></ChatArea>
      </div>
    </div>
  </div>
</template>

<script>
  import Profile from '../components/Profile.vue'
  import ChatList from '../components/Chat_List/ChatList.vue'
  import ChatArea from '../components/Chat_Area/ChatArea.vue'
  import { ref } from 'vue'

  export default {
    components: { Profile, ChatList, ChatArea },
    setup() {
      let hideChatting = ref(true);
      let displayProfile = ref(false);
      let userToChat = ref('AllUsersGroupChatID');
      let changeUserToChat = (userToConnect) => {
        userToChat.value = userToConnect;
      }
      let hideProfile = () => {
        displayProfile.value = false;
      }
      let showProfile = () => {
        displayProfile.value = true;
      }
      let showChatArea = () => {
        hideChatting.value = false;
      }
      let hideChatArea = () => {
        hideChatting.value = true;
      }
      return { userToChat, displayProfile, showProfile, changeUserToChat, hideProfile, hideChatting, showChatArea, hideChatArea }
    }
  }
</script>

<style>
  /* width */
  ::-webkit-scrollbar {
    width: 5px;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    background: #2A2A2A;
    border-radius: 100%;
  }
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #252525;
    border-radius: 5px;
    transition: all 0.5s;
  }
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    border-radius: 5px;
    background: #303030;
  }
  /* Making Transparent For Chat Area Scroll Bar */
  .message-box::-webkit-scrollbar,
  .message-box::-webkit-scrollbar-track,
  .message-box::-webkit-scrollbar-thumb {
    background: transparent;
  }
</style>