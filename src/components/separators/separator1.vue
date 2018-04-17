<template>
  <div class="container-separator">
    <h2 class="title-separator" v-show="setting.title">{{ setting.title }}</h2>
    <p class="subtitle-separator" v-show="setting.description">{{ setting.description }}</p>
  </div>
</template>

<script>
export default {
  name: 'koSeparator1',
  props: ['setting'],
  computed: {
    info() {
      return this.$store.state.tienda;
    },
  },
}
</script>

<style scoped>
.container-separator {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 60px;
  padding: 40px 0;
}
.title-separator {
  font-weight: bold;
  font-size: 20px;
}
.subtitle-separator {
  padding-top: 8px;
  color: grey;
}
</style>
