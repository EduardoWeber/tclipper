<template>
  <div class="home">
    <div class="header">
      <Button buttonText="Colar link" :callbackFunction="pasteUrl"/>
      <Input/>
      <Button buttonText="Cancelar todos" :callbackFunction="cancelAll"/>
      <Button buttonText="Baixar todos" :callbackFunction="downloadAll"/>
    </div>
    <div class="list">
      <div v-for="clip in getClips" :key="clip.index">
        <VideoListItem
          :clipTitle="clip.title"
          :streamer="clip.broadcasterName"
          :clippedBy="clip.creatorName"
          :thumbnailUrl="clip.thumbnailUrl"
          :cancelAction="() => cancelDownload(clip)"
          :downloadAction="() => addToQueue(clip)"
          :deleteAction="() => deleteClip(clip)"
          :openAction="() => openClip(clip)"
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
import { ClipStatus } from '../models/Clip'

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
      'getClipList',
      'getQueueList',
      'getCurrentDownloading'
    ]),
    getClips: function () {
      return this.getClipList.map((clip, index) => {
        clip.index = index
        return clip
      })
    }
  },
  watch: {
    getCurrentDownloading(newValue) {
      if (newValue === null) {
        if (this.getQueueList.length) {
          this.downloadClip(this.getQueueList[0]);
          this.popClipFromQueue();
        }
      }
    }
  },
  methods: {
    ...mapActions('clips', [
      'addClip',
      'removeClipByUniqueId',
      'removeClipFromQueueByUniqueId',
      'addClipToQueue',
      'popClipFromQueue',
      'setCurrentDl',
      'updateClipField'
    ]),
    cancelDownload (clip) {
      if(clip.uniqueId === this.getCurrentDownloading) {
        this.setCurrentDl(null)
        window.api.send('download_manager', {
          type: 'cancel_download',
          clip
        })
        this.updateClipField({
          clipUniqueId: clip.uniqueId,
          field: 'status',
          value: ClipStatus.NOT_STARTED
        })
        this.updateClipField({
          clipUniqueId: clip.uniqueId,
          field: 'progress',
          value: 0
        })
      } else if(clip.status === ClipStatus.QUEUED) {
        this.removeClipFromQueueByUniqueId(clip.uniqueId)
      } else if(clip.status === ClipStatus.NOT_STARTED) {
        this.removeClipByUniqueId(clip.uniqueId)
      }
    },
    deleteClip (clip) {
      window.api.send('download_manager', {
        type: 'delete_download',
        clip
      })
      this.removeClipByUniqueId(clip.uniqueId)
    },
    openClip (clip) {
      window.api.send('download_manager', {
        type: 'open_download',
        clip
      })
    },
    downloadClip (clip) {
      this.setCurrentDl(clip.uniqueId);
      window.api.send('download_manager', {
        type: 'start_download',
        clip
      })
    },
    addToQueue (clip) {
      if (this.getCurrentDownloading === null) {
        this.downloadClip(clip)
      } else {
        this.addClipToQueue(clip)
      }
    },
    pasteUrl () {
      navigator.clipboard.readText().then((text) => {
        this.addClip(text)
      })
    },
    cancelAll () {
      for (let index = this.getClips.length - 1; index >= 0; index--) {
        const clip = this.getClips[index];
        console.log(clip)
        window.api.send('download_manager', {
          type: 'cancel_download',
          clip
        })
        this.removeClipByUniqueId(clip.uniqueId)
        // this.removeClip(index)
      }
    },
    downloadAll () {
      for (let index = 0; index < this.getClips.length; index++) {
        const clip = this.getClips[index];
        this.addToQueue(clip)
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