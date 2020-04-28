<template>
  <div class="input">
    <input type="text" class="input-field" placeholder="Twitch Clip URL">
  </div>
</template>

<script>
export default {
  name: 'Input'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.input {
  display: flex;
  padding-bottom: 5px;
}
.input-field {
  flex: 1;
  -webkit-appearance: none;
  border-width: 0;
  border-radius: 3px;
  height: 30px;
  background-color: #00A8E8;
  color: white;
}

.input-field::placeholder {
  text-align: center;
  font-family: 'Roboto';
  color: white;
}

.input-field:focus {
  outline-width: 1;
  border: 0;
  outline-color: violet;
  outline-style:auto;
}
</style>
