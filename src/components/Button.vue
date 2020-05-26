<template>
  <div id="button" v-on=" typeof callbackFunction === 'function' ? { click: callbackFunction} : {}">
    <div id="button-text">
      {{buttonText}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Button',
  props: {
    buttonText: String,
    callbackFunction: Function
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#button {
  cursor: pointer;
  display: flex;
  border-width: 0;
  border-radius: 3px;
  height: 30px;
  background-color: #00A8E8;
  align-content: center;
  justify-content: center;
  display: flex;
  padding: 5px 10px;
  margin: 5px;
}

#button-text {
  color: white;
  align-self: center;
}
</style>
