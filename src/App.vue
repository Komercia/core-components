  <template>
  <div id="app" class="container">
    <div :class="{container_settings: true, hidden: showSettingsButton}">
      <div class="title">
        <h1>Settings</h1>
      </div>

      <div class="component_setting">
        <div :is="selectComponent + 'Settings' " />
      </div>

      <div class="container_responsive_icons ">
        <img src="./assets/compu.png" width="50px ">
        <img src="./assets/tablet.png" width="50px ">
        <img src="./assets/phone.png" width="50px ">
      </div>
    </div>

    <div class="container_components ">
      <div class="title " style="margin-bottom: 10px ">
        <a v-on:click="hiddenSettings" class="hidden_settings_button">
          <el-button type="primary" icon="el-icon-menu" circle></el-button>
          Mostrar Settings
        </a>
        <h1>Componente Principal
          <el-select v-model="selectComponent" placeholder="Select Component " style="margin-left:10px ">
            <el-option v-for="item in components " :key="item " :label="item " :value="item "></el-option>
          </el-select>
        </h1>

        <h1>Arriba
          <i class="el-icon-upload2" />
          <el-select v-model="selectComponentAbove " placeholder="Select Component " style="margin-left:10px ">
            <el-option v-for="item2 in components " :key="item2 " :label="item2 " :value="item2 "></el-option>
          </el-select>
        </h1>

        <h1>Abajo
          <i class="el-icon-download" />
          <el-select v-model="selectComponentDown " placeholder="Select Component " style="margin-left:10px ">
            <el-option v-for="item in components " :key="item " :label="item " :value="item "></el-option>
          </el-select>
        </h1>
      </div>

      <div class="component_principal">
        <div :is="selectComponentAbove" />
        <div :is="selectComponent" />
        <div :is="selectComponentDown" />
      </div>

    </div>

  </div>
</template>

<script>

export default {
  name: "app",
  created() {
    this.$store.dispatch('GET_COMPONENTS')
    this.$store.commit("GET_DATA");
  },
  data() {
    return {
      selectComponent: "koSlider2",
      showSettingsButton: true,
      selectComponentAbove: "",
      selectComponentDown: "",
      options3: [
        {
          label: "Popular cities",
          options: [
            {
              value: "Shanghai",
              label: "Shanghai"
            },
            {
              value: "Beijing",
              label: "Beijing"
            }
          ]
        },
        {
          label: "City name",
          options: [
            {
              value: "Chengdu",
              label: "Chengdu"
            },
            {
              value: "Shenzhen",
              label: "Shenzhen"
            },
            {
              value: "Guangzhou",
              label: "Guangzhou"
            },
            {
              value: "Dalian",
              label: "Dalian"
            }
          ]
        }
      ]
    };
  },
  computed: {
    components () {
      return this.$store.state.components
    }
  },
  methods: {
    hiddenSettings() {
      this.showSettingsButton == true
        ? (this.showSettingsButton = false)
        : (this.showSettingsButton = true);
    }
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
  padding: 0 20px;
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
</style>
