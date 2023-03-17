<template>
  <div class="p-3 user-chat" @click="clickHandler" :class="{'active':user.id==selectedUser}">
    <div>
      <img :src="user.photo" class="w-11 h-11 rounded-full mr-3">
    </div>
    <div class="text-left">
      <h3 class="text-base font-medium text-light-100">{{ user.name }}</h3>
      <p class="text-xs font-light text-light-200">{{ latestMsgText }}</p>
    </div>
  </div>
</template>

<script>
  import { onMounted, ref, watch } from 'vue';
  import getCurrentUser from '../../composable/getCurrentUser'
  import { db } from '../../firebase/config'
  import { updateDoc, doc, serverTimestamp } from 'firebase/firestore'

  export default {
    props: ['user','selectedUser','messages'],
    emits: ['selectUserToConnect'],
    setup(props, context) {

      // Selecting Chat-User
      let clickHandler = () => {
        context.emit('selectUserToConnect', props.user.id);
      }

      // Message Filtering Function
      let getLatestMessage = (sender, receiver) => {
        let filteredMessages = props.messages.filter((message) => {
          if (receiver == 'allusers@gmail.com') {
            return (message.to == receiver);
          } else {
            let condition1 = message.chat_between.includes(sender);
            let condition2 = message.chat_between.includes(receiver);
            return (condition1 && condition2);
          }
        });
        let [ latestMessage ] = filteredMessages.slice(-1);
        return latestMessage
      }

      // <<== Getting Latest-Message & Displaying It  ==>>

      let { currentUser } = getCurrentUser(); // Get Current User
      let latestMsgText = ref(''); // To Get Latest Message

      // For Limiting the Text-Display
      let limitingText = (msgText) => {
        if (msgText.length > 30) {
          return msgText.substring(0,30) + '...';
        } else {
          return msgText;
        }
      }

      // Wait Until Getting the Messages or Any Changes
      watch(() => props.messages, () => {
        let latestMessage = getLatestMessage(currentUser.value.email, props.user.email);
        if (latestMessage) {
          latestMsgText.value = limitingText(latestMessage.message);
          let updateUser = {
            ...props.user,
            last_active: latestMessage.created_at
          }
          let docRef = doc(db, 'users', props.user.id);
          updateDoc(docRef, updateUser);
        } else {
          latestMsgText.value = limitingText('Joined To miniChat!');
        }
      });

      // on mounted Condition
      onMounted(() => {
        let latestMessage = getLatestMessage(currentUser.value.email, props.user.email);
        if (latestMessage) {
          latestMsgText.value = limitingText(latestMessage.message);
        } else {
          latestMsgText.value = limitingText('Joined To miniChat!');
        }
      })

      return { clickHandler, latestMsgText }
    }
  }
</script>

<style>
</style>