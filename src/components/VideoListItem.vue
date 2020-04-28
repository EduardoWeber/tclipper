<template>
  <div id="video-list-item">
    <div id="video-thumbnail">
      Video
    </div>
    <div id="description">
      Title <br>
      Titulo Live <br>
      Streamer <br>
      Duration
    </div>
    <div id="actions">
      Actions
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoListItem'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#video-list-item {
  min-height: 30vh;
  background-color: #007EA7;
  border-radius: 3px;
  color: white;
  display: flex;
  flex-direction: row;
}

#video-thumbnail {
  flex: 1;
  background-color: black;
  margin: 3px;
  border-radius: 3px;
}

#description {
  flex: 2
}

#actions {
}
</style>
