<template>
  <div class="sticky top-0 bg-dark-200">
    <!-- Logo Section -->
    <div class="flex justify-between items-center p-6">
      <img src="../../assets/images/miniChat-logo.svg" class="w-auto h-9">
      <button class="menu-btn" @click="showHandler">
        <span class="material-icons">menu</span>
      </button>
    </div>
    <!-- Search-User Section -->
    <div class="search-box px-3 pb-4 relative">
      <span class="material-icons absolute ml-5 text-lg">search</span>
      <input type="text" placeholder="Search to Chat ..." v-model="searchUser" @keyup="keyUpHandler" class="search-bar">
    </div>
  </div>
  <!-- Chat-Users-List Section -->
  <div class="mb-4" v-if="users">
    <div v-for="user in filteredUsers" :key="user.id">
      <UserChat :user="user" :messages="messages"
        @selectUserToConnect="selectUserToConnect" 
        :selectedUser="userToConnect">
      </UserChat>
    </div>
  </div>
</template>

<script>
  import { ref, watch } from 'vue'
  import getAllUsersDB from '../../composable/getAllUsersDB'
  import getCurrentUser from '../../composable/getCurrentUser'
  import getMessagesDB from '../../composable/getMessagesDB'
  import UserChat from './UserChat.vue'
  
  export default {
    components: { UserChat },
    emits: ['changeUserToConnect', 'showProfile', 'showChatArea'],
    setup(props, context) {

      // Get all others users
      let { currentUser } = getCurrentUser();
      let { usersError, getUsers } = getAllUsersDB();
      let users = getUsers(currentUser.value);
      usersError.value && console.log(`Get-users-Error : ${usersError.value}`);
      
      // Get select user-ID to connect
      let userToConnect = ref('AllUsersGroupChatID');
      let selectUserToConnect = (userID) => {
        userToConnect.value = userID;
        context.emit('showChatArea')
      }

      // Watch selected User & emit it to ChatRoom
      watch(userToConnect, () => {
        context.emit('changeUserToConnect', userToConnect.value);
      })

      // For Searching User
      let searchUser = ref('');
      let filteredUsers = ref([]);
      let keyUpHandler = () => {
        if (searchUser.value) {
          filteredUsers.value = users.value.filter( user => {
            return user.name.toLowerCase().includes(searchUser.value.toLowerCase());
          });
        } else {
          filteredUsers.value = users.value;
        }
      }
      
      watch(users, () => {
        filteredUsers.value = users.value;
      });

      // Get All Messaages to filter the latest message
      let { messagesError, getMessages } = getMessagesDB();
      messagesError.value && console.log(`Get-Messages-Error : ${messagesError.value}`);
      let messages = getMessages(); // For all messages

      // To Show Profile Component
      let showHandler = () => {
        context.emit('showProfile');
      }

      return { users, selectUserToConnect, userToConnect,
        searchUser, filteredUsers, keyUpHandler, messages, showHandler }
    }
  }
</script>

<style>
</style>