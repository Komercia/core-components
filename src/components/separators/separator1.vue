<template>
  <div class="container-separator">
    <h2 class="title-separator">{{separator.title}}</h2>
    <p class="subtitle-separator">{{separator.subtitle}}</p>
  </div>
</template>

<script>
export default {
  name: 'koSeparator1',
  data() {
    return {
      separator: {
        title: 'Nuevos Productos',
        subtitle: 'Fill your wardrobe with cutting edge finds',
      },
    }
  },
  computed: {
    info() {
      return this.$store.state.tienda;
    },
  },
}
</script>

<style>

</style>
