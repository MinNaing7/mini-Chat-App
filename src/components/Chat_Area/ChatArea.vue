<template>
  <ChatUserNav :chatUser="chatUser" @hideChatArea="hideChatArea"></ChatUserNav>
  <MessageBox :msgSender="msgSender" :msgReceiver="msgReceiver"></MessageBox>
  <NewMessage :chatUser="chatUser" @getChatersBetween="getChatersBetween"></NewMessage>
</template>

<script>
  import ChatUserNav from './ChatUserNav.vue'
  import MessageBox from './MessageBox.vue'
  import NewMessage from './NewMessage.vue'
  import { ref } from 'vue'

  export default {
    components: { ChatUserNav, MessageBox, NewMessage },
    emits: ['hideChatArea'],
    props: ['chatUser'],
    setup(props, context) {
      let msgSender = ref('');
      let msgReceiver = ref('');
      let getChatersBetween = (sender, receiver) => {
        msgSender.value = sender;
        msgReceiver.value = receiver;
      }
      let hideChatArea = () => {
        context.emit('hideChatArea');
      }
      return { getChatersBetween, msgSender, msgReceiver, hideChatArea }
    }
  }
</script>

<style>
</style>