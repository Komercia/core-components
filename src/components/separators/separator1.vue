<template>
  <div class="container-separator">
    <h2
      class="title-separator"
      v-if="setting.title"
    >{{ setting.title }}</h2>
    <p
      class="subtitle-separator"
      v-if="setting.description"
    >{{ setting.description }}</p>
  </div>
</template>

<script>
export default {
  name: "koSeparator1",
  props: {
    setting: {
      type: Object,
      default: function() {
        return { title: "Titulo", description: "Descripción del separador" };
      }
    }
  }
};
</script>

<style scoped>
.container-separator {
  max-width: 1366px;
  width: 96%;
  /* min-height: 60px; */
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  text-align: center;
  margin: 0 auto;
  padding: 40px 0;
}
.title-separator {
  font-weight: bold;
  font-size: 20px;
  color: var(--text_color);
}
.subtitle-separator {
  padding-top: 8px;
  color: grey;
}
@media (max-width: 700px) {
  .container-separator {
    padding: 0;
  }
}
</style>
