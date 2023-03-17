<template>
  <form @submit.prevent="submitHandler" class="w-full">
    <img src="../assets/images/miniChat-logo.svg" class="h-8 mx-auto my-8">
    <h2 class="form-head">Login Account</h2>
    <input type="email" placeholder="&#xe0e6; email" v-model="email" required class="input-bar mb-2">
    <input type="password" placeholder="&#xe897; password" v-model="password" required class="input-bar mb-6">
    <button class="form-submit">Login</button>
  </form>
</template>

<script>
  import { ref } from 'vue'
  import useAuthSignIn from '../composable/useAuthSignIn'

  export default {
    emits: ['goChatRoom'],
    setup(props, context) {

      let email = ref('');
      let password = ref('');

      let submitHandler = async () => {
        // Sign In User Account
        let { signInError, signInAccount } = useAuthSignIn();
        let user = await signInAccount(email.value, password.value);
        if (signInError.value) {
          alert(`LoginError : ${signInError.value}`);
          return;
        }
        user && context.emit('goChatRoom');
      }
      return { email, password, submitHandler }
    }
  }
</script>

<style>
</style>