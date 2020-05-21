<template>
  <div class="settings">
    <div class="header">
      <div class="inputs">
        <CustomInput placeholder="Token"/>
        <CustomInput placeholder="Pasta destino"/>
      </div>
      <div class="buttons-container">
        <button v-on:click="goToHome" class="button cancel">Cancelar</button>
        <button class="button save">Salvar</button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CustomInput from '@/components/CustomInput.vue'
import VideoListItem from '@/components/VideoListItem.vue'
import VideoListItemLoading from '@/components/VideoListItemLoading.vue'
import Button from '@/components/Button.vue'

export default {
  name: 'Settings',
  components: {
    CustomInput,
    VideoListItem,
    VideoListItemLoading,
    Button
  },
  methods: {
    goToHome: function () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

.settings {
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
  display: flex;
  flex: 1;
  justify-content: space-between;
  flex-direction: column;
}

.buttons-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 5px
}

.cancel:hover {
  transition: background 0.3s;
  background-color: rgba(240, 52, 52, 1);
  border-color: transparent;
  border-radius: 3px;
  color: white;
}

.cancel:active {
  outline: none;
  background-color: #2c3e50;
}

.cancel:focus {
  outline: none;
}

.save:hover {
  transition: background 0.3s;
  background-color: green;
  border-color: transparent;
  border-radius: 3px;
  color: white;
}

.save:active {
  outline: none;
  background-color: #2c3e50;
}

.save:focus {
  outline: none;
}


.button {
  flex: 0.4;
  height: 35px;
  font-size: 18px;
}
</style>