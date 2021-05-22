<template>
  <div id="video-list-item">
    <div class="content">
      <div id="video-thumbnail">
        <img :src="thumbnailUrl" style="width: 100%; height: 100%" />
        <div id="duration">
          3:19
        </div>
      </div>
      <div id="description">
        <div> {{ clipTitle }} </div>
        <div> Streamer: {{ streamer }} </div>
        <div> Clipado por {{ clippedBy }} </div>
      </div>
      <div id="actions">
        <div id="buttons">
          <div v-if="!isClipStatus('FINISHED')">
            <i v-show="isClipStatus('NOT_STARTED')" class="material-icons action-button"  v-on=" typeof downloadAction === 'function' ? { click: downloadAction} : {}">
              get_app
            </i>
            <i class="material-icons action-button" v-on=" typeof cancelAction === 'function' ? { click: cancelAction} : {}">
              cancel
            </i>
          </div>
          <div v-else>
            <i class="material-icons action-button"  v-on=" typeof openAction === 'function' ? { click: openAction} : {}">
              folder
            </i>
            <i class="material-icons action-button" v-on=" typeof deleteAction === 'function' ? { click: deleteAction} : {}">
              delete
            </i>
          </div>
        </div>
      </div>
    </div>
    <div class="download-progress" :style="'right:' + ((1-downloadProgress) * 100) + '%;'"></div>
  </div>
</template>

<script>
import { ClipStatus } from '../models/Clip'

export default {
  name: 'VideoListItem',
  props: {
    clipTitle: String,
    streamer: String,
    clippedBy: String,
    thumbnailUrl: String,
    downloadProgress: Number,
    status: Number,
    cancelAction: Function,
    downloadAction: Function,
    openAction: Function,
    deleteAction: Function
  },
  methods: {
    isClipStatus(clipStatus) {
      switch (clipStatus) {
        case 'NOT_STARTED':
          return ClipStatus.NOT_STARTED === this.status
        case 'QUEUED':
          return ClipStatus.QUEUED === this.status
        case 'FINISHED':
          return ClipStatus.FINISHED === this.status
        default:
          return false
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#video-list-item {
  min-height: 100px;
  background-color: #007EA7;
  border-radius: 3px;
  color: white;
  display: flex;
  padding: 3px;
  margin-bottom: 5px;
  position: relative;
}

.download-progress {
  position: absolute;
  background-color: red;
  bottom: 0;
  top: 0;
  left: 0;
  right: 100%;
  border-radius: 3px;
  z-index: 1;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: row;
  z-index: 2;
}

#video-thumbnail {
  width: 175px;
  background-color: rgb(75, 75, 75);
  border-radius: 3px;
  position: relative;
}

#duration {
  position: absolute;
  bottom: 0;
  right: 0;
  margin-right: 2px;
  margin-bottom: 2px;
  background-color: black;
  padding: 2px;
}

#description {
  flex: 1;
  margin-left: 10px;
  text-align: left;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

#actions {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#buttons {
  display: flex;
  justify-content: space-evenly;
  min-width: 100px;
}

.action-button {
  font-size: 28pt;
  cursor:pointer;
}
</style>
