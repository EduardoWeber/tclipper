<template>
  <div id="video-list-item">
    <div id="video-thumbnail">
      Video
      <div id="duration">
        3:19
      </div>
    </div>
    <div id="description">
      Title <br>
      Titulo Live <br>
      Streamer <br>
      Categoria <br>
      Clipado por <br>
    </div>
    <div id="actions">
      <div id="buttons">
        <i class="material-icons action-button">get_app</i>
        <i class="material-icons action-button">cancel</i>
      </div>
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
  min-height: 100px;
  background-color: #007EA7;
  border-radius: 3px;
  color: white;
  display: flex;
  flex-direction: row;
  padding: 3px;
  margin-bottom: 5px;
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
