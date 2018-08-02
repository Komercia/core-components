  <template>
<<<<<<< HEAD
  <div id="app">
    <koChat />
    <!-- <cart1 /> -->
    <!-- <koContact1 /> -->
    <!-- <koFooter1 />
    <koFooter2 /> -->
    <!-- <koGrid1 /> -->
    <koHeader4 />
    <!-- <koHeader2 /> -->
    <!-- <koHeader3 /> -->

    <koSlider3 />
    <ko-grid-categorias />
    <!-- <koSlider1 /> -->
    <!-- <koSlider2/> -->
    <!-- <Slider11 /> -->
    <koNewsletter1 />
    <!-- <ProductList1 /> -->

    <!-- <koChat /> -->
    <!-- <cart1 /> -->
    <!-- <koContact1 /> -->
    <!-- <koFooter1 /> -->
    <!-- <koFooter2 /> -->
    <!-- <koGrid1 /> -->
    <!-- <koHeader1 /> -->
    <!-- <koHeader2 /> -->
    <!-- <koHeader3 /> -->
    <!-- <koNewsletter1 /> -->
    <!-- <ProductList1 /> -->
    <ProductList2/>
    <!-- <koProduct1 /> -->
    <!-- <koSeparator1 /> -->

    <!-- <koContent2/> -->
=======
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
        <div :is=selectComponentAbove />
        <div :is=selectComponent />
        <div :is=selectComponentDown />
      </div>

    </div>

>>>>>>> 71048005b796623f742ad1821bb14fdea5716666
  </div>
</template>

<script>
<<<<<<< HEAD
import koContent2 from './components/contents/content1'
import koChat from './components/chat/chat'
import koOrder1 from './components/_order/order1'

import cart1 from './components/carts/cart1.vue'

import koContact1 from './components/contacts/contact1'

import koFooter1 from './components/footers/footer1'
import koFooter2 from './components/footers/footer2'

import koGrid1 from './components/grids/grid1'
import koGridCategorias from './components/grids/grid-categorias-home'

import koHeader1 from './components/headers/header1'
import koHeader2 from './components/headers/header2'
import koHeader3 from './components/headers/header3'
import koHeader4 from './components/headers/header4'

import koNewsletter1 from './components/newsletters/newsletter1'

import ProductList1 from './components/product_lists/product_list1'
import ProductList2 from './components/product_lists/product_list2'

import koProduct1 from './components/products/product1'

import koSeparator1 from './components/separators/separator1'

import koSlider1 from './components/sliders/slider1'
import koSlider3 from './components/sliders/slider3'
import Slider11 from './components/sliders/slider1-1'
import koSlider2 from './components/sliders/slider2'
=======
import koContent1 from "./components/contents/content1";
import koChat from "./components/chat/chat";
import koOrder1 from "./components/_order/order1";

import cart1 from "./components/carts/cart1.vue";

import koContact1 from "./components/contacts/contact1";

import koFooter1 from "./components/footers/footer1";
import koFooter2 from "./components/footers/footer2";

import koGrid1 from "./components/grids/grid1";

import koHeader1 from "./components/headers/header1";
import koHeader2 from "./components/headers/header2";
import koHeader3 from "./components/headers/header3";

import koNewsletter1 from "./components/newsletters/newsletter1";

import ProductList1 from "./components/product_lists/product_list1";
import ProductList2 from "./components/product_lists/product_list2";

import koProduct1 from "./components/products/product1";

import koSeparator1 from "./components/separators/separator1";

import koSlider1 from "./components/sliders/slider1";
import Slider11 from "./components/sliders/slider1-1";
import koSlider2 from "./components/sliders/slider2";

// Settings components /////

import koSlider2Settings from "./settings/slider2";
>>>>>>> 71048005b796623f742ad1821bb14fdea5716666

export default {
  name: "app",
  components: {
    koChat,
    koOrder1,
    cart1,
    koContact1,
    koFooter1,
    koFooter2,
    koGrid1,
    koHeader1,
    koHeader2,
    koHeader3,
    koHeader4,
    koNewsletter1,
    ProductList1,
    ProductList2,
    koProduct1,
    koSeparator1,
    koSlider1,
    koSlider3,
    Slider11,
    koSlider2,
<<<<<<< HEAD
    koContent2,
    koGridCategorias
=======
    koContent1,
    //Settings////////////
    koSlider2Settings
>>>>>>> 71048005b796623f742ad1821bb14fdea5716666
  },
  created() {
    this.$store.commit("GET_DATA");
  },
  data() {
    return {
<<<<<<< HEAD
      settingBanner: {
        banners: [
          {
            position: 'center'
          },
          {
            position: 'center'
          }
        ]
      }
=======
      selectComponent: "koSlider2",
      showSettingsButton: true,
      selectComponentAbove: "",
      selectComponentDown: "",
      components: [
        "koChat",
        "koOrder1",
        "cart1",
        "koContact1",
        "koFooter1",
        "koFooter2",
        "koGrid1",
        "koHeader1",
        "koHeader2",
        "koHeader3",
        "koNewsletter1",
        "ProductList1",
        "ProductList2",
        "koProduct1",
        "koSeparator1",
        "koSlider1",
        "Slider11",
        "koSlider2",
        "koContent1"
      ],
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
  methods: {
    hiddenSettings() {
      this.showSettingsButton == true
        ? (this.showSettingsButton = false)
        : (this.showSettingsButton = true);
>>>>>>> 71048005b796623f742ad1821bb14fdea5716666
    }
  }
}
</script>

<style>
<<<<<<< HEAD
/* @import url('https://fonts.googleapis.com/css?family=Open+Sans'); */
@import url('../static/animate.css');
@import './assets/css/main.css';

* {
  font-family: 'Poppins', sans-serif;
=======
@import url("https://fonts.googleapis.com/css?family=Open+Sans");
@import "./assets/css/main.css";
@import "./styles/material.css";
@import "./styles/flat.css";

* {
  font-family: "Open Sans", sans-serif;
>>>>>>> 71048005b796623f742ad1821bb14fdea5716666
}

:root {
  --main_color: #f200ff;
  --text_color: #292b32;
  --button_color: #f200ff;
  --button_text_color: #fff;
  --background_color: #fff;
}
<<<<<<< HEAD
#app {
  background-color: var(--background_color);
}
.main-header .el-input__inner {
  border-radius: 0;
  height: 35px;
}
.main-header .el-input__icon {
  line-height: 0;
}
.el-popover {
  border-radius: 0 !important;
}
.popper__arrow {
  display: none !important;
=======

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
>>>>>>> 71048005b796623f742ad1821bb14fdea5716666
}
</style>
