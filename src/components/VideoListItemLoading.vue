<template>
  <div id="video-list-item">
    <div id="loading">
      <div id="text">
        Loading{{ loadingDots }}
      </div>
      <div id="url">
        StrangeSparklyCrabsFeelsBadMan
      </div>
    </div>
    <div id="actions">
      <div id="buttons">
        <i class="material-icons action-button hidden">cancel</i>
        <i class="material-icons action-button">cancel</i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoListItemLoading',
  mounted () {
    this.interval = setInterval(() => {
      if (this.loadingDots.length ===  3) {
        this.loadingDots = ''
      } else if (this.loadingDots.length ===  2) {
        this.loadingDots = '...'
      } else if (this.loadingDots.length === 1) {
        this.loadingDots = '..'
      } else {
        this.loadingDots = '.'
      } 
    }, 1000)
  },
  beforeDestroy () {
    if (this.interval) {
      clearInterval(this.interval)
    }
  },
  data () {
    return {
      loadingDots: '',
      interval: null
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
  flex-direction: row;
  padding: 3px;
  margin-bottom: 5px;
}

#loading {
  flex: 1;
  align-self: center;
  align-content: center;
  display: flex;
  flex-direction: column;
}

#loading #text {
  align-self: center;
  width: 75px;
  text-align: left;
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

.hidden {
  visibility: hidden;
}
</style>
