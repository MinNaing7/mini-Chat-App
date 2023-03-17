<template>
  <div class="flex-center w-100 h-screen">
    <div class="max-w-xs w-full blur-bg form-typo">
      <div v-if="showLoginForm">
        <LogIn @goChatRoom="goChatRoom"></LogIn>  
        <p class="switch">
          No account yet? <span @click="toggleForm" class="switch-link">Create</span> instead!
        </p>
      </div>
      <div v-else>
        <SignUp @goChatRoom="goChatRoom" @hideTextBelow="hideTextBelow"></SignUp>
        <p class="switch" v-if="!hideText">
          Already created? <span @click="toggleForm" class="switch-link">Login</span> instead!
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import LogIn from '../components/LogIn.vue'
  import SignUp from '../components/SignUp.vue'
  import { useRouter } from 'vue-router'
  import { ref } from 'vue'

  export default {
    components: { LogIn, SignUp },
    setup() {
      let router = useRouter();
      let showLoginForm = ref(true);
      let hideText = ref(false);

      let toggleForm = () => {
        showLoginForm.value = !showLoginForm.value;
      }
      let goChatRoom = () => {
        router.push({name:'ChatRoom'});
      }
      let hideTextBelow = (isLoading) => {
        hideText.value = isLoading;
      }
      return { goChatRoom, showLoginForm, toggleForm, hideText, hideTextBelow }
    }
  }
</script>

<style>
  /* Styling For Auto-Complete */
  input:-webkit-autofill,
  input:-webkit-autofill:focus {
      transition: background-color 600000s 0s, color 600000s 0s;
  }
  input[data-autocompleted] {
      background-color: transparent !important;
  }
  /* Styling For Icons in Placeholder */
  .input-bar {
    font-family: sans-serif, 'Material Icons';
  }
</style>