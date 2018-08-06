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
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Open+Sans");
@import "./assets/css/main.css";
@import "./styles/material.css";
@import "./styles/flat.css";

* {
  font-family: "Open Sans", sans-serif;
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
.container {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
  background-color: #e8ecef;
}
.container_settings {
  display: grid;
  width: 450px;
  height: 100%;
  padding-right: 20px;
  background-color: #e8ecef;
}
.component_setting {
  margin-top: 10px;
  width: 100%;
  overflow: auto;
}
.container_responsive_icons {
  display: flex;
  width: 100%;
  height: 70px;
  margin-top: 20px;
  margin-bottom: 10px;
  background: #fff;
  border-radius: 2px;
  justify-content: space-around;
  align-items: center;
  align-self: flex-end;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
.container_responsive_icons img {
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.container_responsive_icons img:hover {
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22);
  transform: scale(1.1);
}
.hidden_settings_button {
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;
}
.container_components {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #e8ecef;
}
.component_principal {
  overflow: auto;
  height: 100%;
  width: 100%;
}
.title {
  display: flex;
  width: 100%;
  height: 60px;
  margin-top: 0px;
  align-items: center;
  justify-content: space-around;
  background-color: white;
}
.title h1 {
  font-size: 15px;
  font-weight: 800;
  color: #4c4c4c;
}
.hidden {
  display: none;
}
@media (max-width: 700px) {
  .hidden_menu_components {
    display: none;
  }
}
</style>
