<template>
  <div class="settings">
    <div class="header">
      <CustomInput placeholder="Token"/>
      <CustomInput placeholder="Pasta destino"/>
      <div class="buttons-container">
        <button>Cancelar</button>
        <button>Salvar</button>
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
  justify-content: space-between;
  display: flex;
  flex-direction: column;
}

.buttons-container {
  flex-direction: row;
}
</style>