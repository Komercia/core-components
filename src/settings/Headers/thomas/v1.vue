<template>
  <div class="setting-header">
    <div class="block">
      <p class="title">Posición del logo:</p>
      <el-radio-group
        v-model="settingData.styleObject.order"
        size="medium"
      >
        <el-radio-button label="1">Arriba <i class="el-icon-arrow-up icon"></i></el-radio-button>
        <el-radio-button label="3">Abajo <i class="el-icon-arrow-down icon"></i></el-radio-button>
      </el-radio-group>
    </div>
    <div class="block">
      <p class="title">Tamaño:</p>
      <el-input-number
        v-model="settingData.styleObject.width"
        :min="50"
        :max="300"
        :step="10"
      ></el-input-number>
    </div>
    <div class="block">
      <p class="title">Top:</p>
      <el-input-number
        v-model="settingData.styleObject.top"
        :min="0"
        :max="60"
        :step="10"
      ></el-input-number>
    </div>
    <div class="block">
      <p class="title">Elige el color de fondo del header:</p>
      <el-color-picker
        v-model="settingData.styleObject.colorHeader"
        @active-change="handleColorHeader"
      ></el-color-picker>
    </div>
    <div class="block">
      <p class="title">Elige el color de fondo del menu:</p>
      <el-color-picker
        v-model="settingData.styleObject.colorNav"
        @active-change="handleColorNav"
      ></el-color-picker>
    </div>
    <div class="block">
      <p class="title">Elige el color del texto:</p>
      <el-color-picker
        v-model="settingData.styleObject.colorText"
        @active-change="handleColorText"
      ></el-color-picker>
    </div>
  </div>
</template>

<script>
export default {
  name: "koHeaderThomasSetting1",
  data() {
    return {};
  },
  computed: {
    settingData() {
      return (
        this.$store.state.settingData || {
          styleObject: {
            order: "3",
            width: "200",
            colorHeader: "#53a8f8",
            colorNav: "#53a8f8",
            colorText: "#6f7072",
            top: "40"
          }
        }
      );
    }
  },
  methods: {
    handleColorHeader(color) {
      this.settingData.styleObject.colorHeader = color;
    },
    handleColorNav(color) {
      this.settingData.styleObject.colorNav = color;
    },
    handleColorText(color) {
      this.settingData.styleObject.colorText = color;
    }
  }
};
</script>

<style scoped>
.setting-header {
  padding: 20px;
  box-sizing: border-box;
  background-color: #fff;
}
.title {
  margin-bottom: 10px;
}
.icon {
  font-size: 12px;
}
.block {
  margin: 5px 0 20px;
}
</style>
