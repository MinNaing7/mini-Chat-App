<template>
  <div class="message-chat mb-4" :class="{'current-user':isCurrentUser}">
    <div class="mc-user-photo hidden lg:block">
      <img :src="message.chater_photo" class="w-9 h-9 rounded-full">
    </div>
    <div class="mc-user-message">
      <div class="mc-sentImg mb-2" v-if="message.image">
        <img :src="message.image">
      </div>
      <div class="mc-sentMsg"  v-if="message.message">
        <h5 class="text-xs mb-0.5">{{ message.chater_name }}</h5>
        <p class="text-sm font-light">{{ message.message }}</p>
      </div>
      <div class="mc-sentTime">
        <p>{{ message.created_at }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { ref } from 'vue';
  import getCurrentUser from '../../composable/getCurrentUser'

  export default {
    props: ['message'],
    setup(props) {
      let { currentUser } = getCurrentUser();
      let isCurrentUser = ref(currentUser.value.email == props.message.from); 
      return { isCurrentUser }
    }
  }
</script>

<style>  
</style>