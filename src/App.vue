<template>
  <div id="app">
    <div id="nav">
      <div id="app-name">
        TClipper
      </div>
      <div id="app-actions">
        <div id="button" class="hover-default">
          <i class="material-icons">minimize</i>
        </div>
        <div id="button" class="hover-default" @click="toggleMaximize">
          <i class="material-icons">crop_3_2</i>
        </div>
        <div id="button" class="hover-red" @click="closeApp">
          <i class="material-icons">close</i>
        </div>
      </div>
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  methods: {
    closeApp () {
      window.Bridge.closeApp()
    },
    toggleMaximize () {
      window.Bridge.toggleMaximize()
    }
  }
}
</script>

<style>
@import "../bower_components/material-design-icons-iconfont/dist/material-design-icons.css";

body {
  margin: 0;
  padding: 0;
  background-color: #00171F;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  display: flex;
  justify-content: space-between;
  -webkit-app-region: drag;
}

#nav #app-name {
  color: #00A8E8;
  font-family: 'Roboto';
  padding: 5px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#app-actions {
  display: flex;
  -webkit-app-region: no-drag;
}

#app-actions #button {
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: default;
  color: white;
  padding: 3px;
}

.hover-red:hover {
  background-color: red;
}

.hover-default:hover {
  background-color: rgb(13, 58, 73);
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
