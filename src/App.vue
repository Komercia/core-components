<template>
  <div
    id="app"
    :class="`container ${selectStyle}`"
  >
    <!-- <button @click="handle_style('defaultstyle')">Default</button>
    <button @click="handle_style('materialstyle')">Material Design</button>
    <button @click="handle_style('borderstyle')">Borderless</button>-->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  created() {
    this.$store.dispatch("GET_COMPONENTS");
    this.$store.dispatch("GET_SECTIONS");
    this.$store.commit("GET_DATA");
  },
  data() {
    return {
      selectStyle: ""
    };
  },
  methods: {
    handle_style(style) {
      this.selectStyle = style;
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,600,700");
@import "./assets/css/main.css";
@import "./styles/material.css";
@import "./styles/default.css";
@import "./styles/borderless.css";
* {
  font-family: "Open Sans", sans-serif;
}
:root {
  --main_color: rgb(51, 51, 51);
  --text_color: rgb(0, 0, 0);
  --button_color: #333333;
  --button_text_color: rgb(255, 255, 255);
  --background_color: rgb(255, 255, 255);
  --opacity: #33333320;
}
#app {
  background-color: var(--background_color);
}
.el-slider__button-wrapper {
  z-index: 98 !important;
}
.jsoneditor {
  height: 300px !important;
}
/* estilos de imagen en descripcion del producto en descriptionProduct2 */
.description .left > div p {
  width: 100%;
}
.description .left > div img {
  width: calc(100%);
}
</style>
