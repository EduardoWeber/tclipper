<template>
  <div class="home">
    <Input/>
    <VideoListItem/>
  </div>
</template>

<script>
// @ is an alias to /src
import Input from '@/components/Input.vue'
import VideoListItem from '@/components/VideoListItem.vue'

export default {
  name: 'Home',
  components: {
    Input,
    VideoListItem
  }
}
</script>

<style scoped>

.home {
  flex: 1;
  display: flex;
  height: 100%;
  flex-direction: column;
}
</style>