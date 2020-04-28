<template>
  <div id="app">
    <div id="nav" class="noselect">
      <div id="app-name">
        TClipper
      </div>
      <div id="app-actions">
        <div class="button hover-default" @click="minimize">
          <i class="material-icons">minimize</i>
        </div>
        <div class="button hover-default" @click="toggleMaximize">
          <i class="material-icons">crop_3_2</i>
        </div>
        <div class="button hover-red" @click="closeApp">
          <i class="material-icons">close</i>
        </div>
      </div>
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    </div>
    <div id="app-body">
      <router-view/>
    </div>
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
    },
    minimize () {
      window.Bridge.minimize()
    }
  }
}
</script>

<style>
@import "../bower_components/material-design-icons-iconfont/dist/material-design-icons.css";

html,body {
  font-family: 'Roboto';
  margin: 0;
  padding: 0;
  background-color: #00171F;
  max-height: 100%;
  height: 100%;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  height: 100%;
}

#app-body {
  flex: 1;
  background-color: #003459;
  margin: 0px 10px 10px 10px;
  padding: 5px;
  border-radius: 5px;
}

#nav {
  display: flex;
  justify-content: space-between;
  -webkit-app-region: drag;
}

#nav #app-name {
  color: #00A8E8;
  padding: 5px;
}

#nav #app-actions {
  display: flex;
  -webkit-app-region: no-drag;
}

#app-actions .button {
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

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Opera and Firefox */
}
</style>
