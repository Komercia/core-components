  <template>

  <div id="app" class="container">
    <router-view />
  </div>
</template>

<script>

export default {
  name: "app",
  created() {
    this.$store.dispatch('GET_COMPONENTS')
    this.$store.commit("GET_DATA");
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700');
@import './assets/css/main.css';
@import './styles/material.css';
@import './styles/flat.css';

* {
  font-family: 'Open Sans', sans-serif;
}

:root {
  --main_color: #f200ff;
  --text_color: #292b32;
  --button_color: #f200ff;
  --button_text_color: #fff;
  --background_color: #fff;
}
#app {
  background-color: var(--background_color);
}
.el-slider__button-wrapper {
  z-index: 98 !important;
}
</style>
