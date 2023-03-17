<template>
  <div class="message-box" ref="messageBox">
    <div v-for="message in formatMessages" :key="message.id">
      <MessageChat :message="message"></MessageChat>
    </div>
  </div>
</template>

<script>
  import { ref, watch, computed, onUpdated } from 'vue'
  import { format } from 'date-fns'
  import getMessagesDB from '../../composable/getMessagesDB'
  import MessageChat from './MessageChat.vue'

  export default {
    props: ['msgSender', 'msgReceiver'],
    components: { MessageChat },
    setup(props) {

      // Auto Scroll to latest Message
      let messageBox = ref(null);
      onUpdated(() => {
        messageBox.value.scrollTop = messageBox.value.scrollHeight;
      })
      
      // Get All Messages from Fire-Store
      let { messagesError, getMessages } = getMessagesDB();
      messagesError.value && console.log(`Get-Messages-Error : ${messagesError.value}`);
      let messages = getMessages(); // For all messages
      let filteredMessages = ref([]); // for filtered messages
      
      // Message Filtering Function
      let messagesFiltering = (sender, receiver) => {
        filteredMessages.value = messages.value.filter((message) => {
          if (receiver == 'allusers@gmail.com') {
            return (message.to == receiver);
          } else {
            let condition1 = message.chat_between.includes(sender);
            let condition2 = message.chat_between.includes(receiver);
            return (condition1 && condition2);
          }
        });
      }

      // Filter the messages in Initial-State
      watch(messages, () => {
        messagesFiltering(props.msgSender, props.msgReceiver);
      })

      // Filter the messages in Receiver-Changing-State
      watch(() => props.msgReceiver, () => {
        messagesFiltering(props.msgSender, props.msgReceiver);
      })

      // Formatting The Messages
      let formatMessages = computed(() => {
        return filteredMessages.value.map((message) => {
          let formatTime = "";
          if (message.created_at) {
            formatTime = format(message.created_at.toDate(), 'h:mmaaa - MMM d');
          }
          return { ...message, created_at: formatTime }
        })
      });

      return { formatMessages, messageBox }
    }
  }
</script>

<style>
</style>