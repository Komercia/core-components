<template>
  <div class="settingBanner">
    <el-collapse accordion>
      <el-collapse-item name="1">
        <template slot="title">
          Texto<i class="header-icon el-icon-information"></i>
        </template>
        <el-input
          placeholder="Titulo"
          v-model="settingData.title"
        >
          <template slot="prepend">
            <icon-base icon-name="text">
              <icon-text />
            </icon-base>
          </template>
        </el-input>
        <el-input
          placeholder="Descripción"
          v-model="settingData.description"
        >
          <template slot="prepend">
            <icon-base icon-name="align-justify">
              <align-justify />
            </icon-base>
          </template>
        </el-input>
      </el-collapse-item>
      <el-collapse-item
        title="Espaciados"
        name="2"
      >
        <div>Operation feedback: enable the users to clearly perceive their operations by style updates and interactive effects;</div>
        <div>Visual feedback: reflect current state by updating or rearranging elements of the page.</div>
      </el-collapse-item>
      <el-collapse-item
        title="Color"
        name="3"
      >
        <div>Simplify the process: keep operating process simple and intuitive;</div>
        <div>Definite and clear: enunciate your intentions clearly so that the users can quickly understand and make decisions;</div>
        <div>Easy to identify: the interface should be straightforward, which helps the users to identify and frees them from memorizing and recalling.</div>
      </el-collapse-item>
      <el-collapse-item
        title="Controllability"
        name="4"
      >
        <div>Decision making: giving advices about operations is acceptable, but do not make decisions for the users;</div>
        <div>Controlled consequences: users should be granted the freedom to operate, including canceling, aborting or terminating current operation.</div>
      </el-collapse-item>
    </el-collapse>

    <div class="input-area">

    </div>
    <div class="input-area">

    </div>
    <div class="input-area">
      <p class="title">Espaciado de arriba:</p>
      <el-input-number
        v-model="settingData.styleObject.top"
        :min="0"
        :max="100"
        :step="10"
      ></el-input-number>
    </div>
    <div class="input-area">
      <p class="title">Espaciado de abajo:</p>
      <el-input-number
        v-model="settingData.styleObject.bottom"
        :min="0"
        :max="100"
        :step="10"
      ></el-input-number>
    </div>
    <div class="block">
      <p class="title">Elige el color del Título:</p>
      <el-color-picker
        v-model="settingData.styleObject.titleColor"
        @active-change="handleTitleColor"
      ></el-color-picker>
    </div>
    <div class="block">
      <p class="title">Elige el color de la descripción:</p>
      <el-color-picker
        v-model="settingData.styleObject.descriptionColor"
        @active-change="handleDescriptionColor"
      ></el-color-picker>
    </div>
    <div class="settingBanner_actions">
      <!-- <el-button @click="updateBanner(banner)">Guardar</el-button> -->
    </div>
  </div>
</template>

<script>
import AngleLeft from "../../../Icons/AngleLeft.vue";
import IconText from "../../../Icons/Text.vue";
import AlignJustify from "../../../Icons/AlignJustify.vue";
import IconLinks from "../../../Icons/Links.vue";

export default {
  name: "koSeparatorSetting1_v1",
  components: { AngleLeft, IconText, AlignJustify, IconLinks },
  computed: {
    settingData() {
      return this.$store.state.settingData;
    }
  },
  methods: {
    handleTitleColor(color) {
      this.settingData.styleObject.titleColor = color;
    },
    handleDescriptionColor(color) {
      this.settingData.styleObject.descriptionColor = color;
    }
  }
};
</script>

<style scoped>
.sectionBar_header {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05),
    0 1px 3px 0 rgba(63, 63, 68, 0.15);
}
.sectionBar_header p {
}
.sectionBar_header span {
  flex: 1;
  display: flex;
  align-items: center;
}
.sectionBar_header span.angle-left {
  cursor: pointer;
}
.form_list {
  height: calc(100vh - 184px);
  box-sizing: border-box;
  padding: 10px 5px;
  overflow: auto;
}
.settingBanner {
  padding: 20px;

  box-sizing: border-box;
  background-color: #fff;
}
.input-area {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 5px 0 20px;
}
.input-area p {
  margin-bottom: 5px;
  font-size: 14px;
  color: #333;
}
.newBanner_action {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #f5f7fa;
  box-sizing: border-box;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 5px;
  color: #909399;
  margin-top: 10px;
  font-size: 14px;
}
.title {
  margin-bottom: 10px;
}
</style>
