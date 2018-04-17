<template>
  <section class="sectionBar">
    <header class="sectionBar_header">
      <span class="angle-left" @click="closeSetting">
        <icon-base icon-name="angle-left" iconColor="#FFF"><angle-left /></icon-base>
      </span>
      <p v-if="settingData">{{ settingData.label }}</p>
      <span></span>
    </header>
    <section class="settingBanner">
      <div class="input-area">
        <el-input placeholder="Titulo" v-model="settingData.title">
          <template slot="prepend">
            <icon-base icon-name="text"><icon-text /></icon-base>
          </template>
        </el-input>
      </div>
      <div class="input-area">
        <el-input placeholder="Descripción" v-model="settingData.description">
          <template slot="prepend"><icon-base icon-name="align-justify"><align-justify /></icon-base></template>
        </el-input>
      </div>
      <div class="settingBanner_actions">
        <el-button @click="updateBanner(banner)">Guardar</el-button>
      </div>
    </section>
  </section>
</template>

<script>
import axios from 'axios';
import AngleLeft from '../../Icons/AngleLeft.vue'
import IconText from '../../Icons/Text.vue'
import AlignJustify from '../../Icons/AlignJustify.vue'
import IconLinks from '../../Icons/Links.vue'

export default {
  name: 'koSeparatorSetting1',
  components: { AngleLeft, IconText, AlignJustify, IconLinks },
  computed: {
    settingData () {
      return this.$store.state.settingData
    },
  },
  methods: {
    closeSetting() {
      this.$store.state.settingData = null;
    }
  }
}
</script>

<style scoped>
  .sectionBar{
    position: absolute;
    top: 0;
    width: 100%;
    background-color: #373d43;
    z-index: 3;
  }
  .sectionBar_header{
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    background-color: #2c3136;
    box-sizing: border-box;
    box-shadow: 0 0 0 1px rgba(63,63,68,0.05), 0 1px 3px 0 rgba(63,63,68,0.15);
  }
  .sectionBar_header p{
    color: #FFF;
  }
  .sectionBar_header span{
    flex: 1;
    display: flex;
    align-items: center;
  }
  .sectionBar_header span.angle-left{
    cursor: pointer;
  }
  .form_list{
    height: calc(100vh - 184px);
    box-sizing: border-box;
    padding: 10px 5px;
    overflow: auto;
  }
  .settingBanner{
    padding: 20px 0;
    border-bottom: 1px solid rgba(0,0,0,0.1);
  }
  .input-area{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 5px 0;
  }
  .input-area p{
    margin-bottom: 5px;
    font-size: 14px;
    color: #333;
  }
  .upload{
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 2px;
    box-shadow: 1px 1px 4px 0 rgba(0,0,0,0.3);
    overflow: hidden;
  }
  .upload .hover{
    position: absolute;
    opacity: 0;
    border-color: #818592;
    background-color: rgba(255,255,255,0.5);
    transition: .3s;
  }
  .upload .hover i{
    color: #818592;
  }
  .upload .hover:hover{
    opacity: 1;
  }
  .upload img{
    max-width: 100%;
    max-height: 100%;
  }
  .upload div{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px dashed #d8dce5;
    padding: 10px 0;
  }
  .upload div i{
    font-size: 35px;
    color: #b1b5bc;
  }
  #uploadBanner{
    visibility: hidden;
    opacity: 0;
    width: 0;
    height: 0;
    display: none;
  }
  .newBanner_action{
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
</style>
