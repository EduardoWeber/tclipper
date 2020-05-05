<template>
  <div class="home">
    <div class="header">
      <Button buttonText="Colar link"/>
      <Input/>
      <Button buttonText="Cancelar todos"/>
      <Button buttonText="Baixar todos"/>
    </div>
    <div class="list">
      <VideoListItem/>
      <VideoListItemLoading/>
      <VideoListItem/>
      <VideoListItem/>
      <VideoListItem/>
      <VideoListItem/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Input from '@/components/Input.vue'
import VideoListItem from '@/components/VideoListItem.vue'
import VideoListItemLoading from '@/components/VideoListItemLoading.vue'
import Button from '@/components/Button.vue'

export default {
  name: 'Home',
  components: {
    Input,
    VideoListItem,
    VideoListItemLoading,
    Button
  }
}
</script>

<style scoped>

.home {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.list {
  flex: 1;
  overflow-y: auto;
}

.header {
  justify-content: space-between;
  display: flex;
}
</style>