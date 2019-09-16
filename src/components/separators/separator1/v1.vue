<template>
  <div
    class="container-separator"
    :style="`padding-top:${setting.styleObject.top}px; padding-bottom:${setting.styleObject.bottom}px`"
  >
    <h2
      class="title-separator"
      :style="`color:${setting.styleObject.titleColor}`"
      v-if="setting.title"
    >{{ setting.title }}</h2>
    <p
      class="subtitle-separator"
      :style="`color:${setting.styleObject.descriptionColor}`"
      v-if="setting.description"
    >{{ setting.description }}</p>
  </div>
</template>

<script>
export default {
  name: "koSeparator1V1",
  props: {
    setting: {
      type: Object,
      default: function() {
        return {
          title: "Titulo",
          description: "Descripción del separador",
          styleObject: {
            bottom: "10",
            top: "10",
            descriptionColor: "#000000",
            titleColor: "#000000"
          }
        };
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
    padding: 0 0 40px 0;
  }
}
</style>
