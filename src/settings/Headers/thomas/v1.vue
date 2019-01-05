<template>
  <div class="setting-header">
    <p class="title">Posición del logo:</p>
    <el-radio-group
      v-model="settingData.styleObject.order"
      size="medium"
    >
      <el-radio-button label="1">Arriba <i class="el-icon-arrow-up icon"></i></el-radio-button>
      <el-radio-button label="3">Abajo <i class="el-icon-arrow-down icon"></i></el-radio-button>
    </el-radio-group>

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
            order: "3"
          }
        }
      );
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
  margin-bottom: 20px;
}
.icon {
  font-size: 12px;
}
</style>
