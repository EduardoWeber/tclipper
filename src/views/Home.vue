<template>
  <div class="home">
    <div class="header">
      <Button buttonText="Colar link" :callbackFunction="pasteUrl"/>
      <Input/>
      <Button buttonText="Cancelar todos" :callbackFunction="cancelAll"/>
      <Button buttonText="Baixar todos"/>
    </div>
    <div class="list">
      <div v-for="clip in getClips" :key="clip.index">
        <VideoListItem
          :clipTitle="clip.title"
          :streamer="clip.broadcasterName"
          :clippedBy="clip.creatorName"
          :thumbnailUrl="clip.thumbnailUrl"
          :cancelAction="() => cancelDownload(clip)"
          :downloadAction="() => downloadClip(clip)"
          :downloadProgress="clip.progress"
          :status="clip.status"
        />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Input from '@/components/Input.vue'
import VideoListItem from '@/components/VideoListItem.vue'
import VideoListItemLoading from '@/components/VideoListItemLoading.vue'
import Button from '@/components/Button.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    Input,
    VideoListItem,
    VideoListItemLoading,
    Button
  },
  computed: {
    ...mapGetters('clips', [
      'getClipList'
    ]),
    getClips: function () {
      return this.getClipList.map((clip, index) => {
        clip.index = index
        return clip
      })
    }
  },
  methods: {
    ...mapActions('clips', [
      'addClip',
      'removeClipByUniqueId'
    ]),
    cancelDownload (clip) {
      window.api.send('download_manager', {
        type: 'cancel_download',
        clip
      })
      this.removeClipByUniqueId(clip.uniqueId)
    },
    downloadClip (clip) {
      window.api.send('download_manager', {
        type: 'start_download',
        clip
      })
    },
    pasteUrl () {
      navigator.clipboard.readText().then((text) => {
        this.addClip(text)
      })
    },
    cancelAll () {
      for (let index = this.getClipList.length; index >= 0; index--) {
        this.removeClip(index)
      }
    }
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