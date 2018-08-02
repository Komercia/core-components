<template>
  <section class="sectionBar">
    <header class="sectionBar_header">
      <span class="angle-left" @click="closeSetting">
        <icon-base icon-name="angle-left"><angle-left /></icon-base>
      </span>
      <p v-if="setting">{{ setting.label }}</p>
      <span></span>
    </header>
    <div class="setting_list">
      <div class="item_setting" v-for="n in 2">
      <div  class="upload-area">
        <div class="upload_hover">
          <icon-base icon-name="cloud-up" icon-color="#FFF"><cloud-up /></icon-base>
          <p>Subir banner</p>
        </div>
        <label v-if="setting.data[n - 1].photo" :for="`uploadBanner${n}`" class="upload_photo"><img :src="setting.data[n - 1].photo"></label>
        <label v-else :for="`uploadBanner${n}`" class="upload">
          <icon-base icon-name="cloud-up" icon-color="#FFF"><cloud-up /></icon-base>
          Subir imagenes
        </label>
        <input type="file" :id="`uploadBanner${n}`" class="uploadBanner" @change="uploadPhoto($event, n - 1)" >
      </div>
      <div class="input-area">
        <el-input placeholder="Titulo" v-model="setting.data[n - 1].title">
          <template slot="prepend">
            <icon-base icon-name="text"><icon-text /></icon-base>
          </template>
        </el-input>
      </div>
      <div class="input-area">
        <el-input placeholder="Descripcion" v-model="setting.data[n - 1].description">
          <template slot="prepend">
            <icon-base icon-name="align-justify"><align-justify /></icon-base>
          </template>
        </el-input>
      </div>
      <div class="input-area">
        <el-input placeholder="Url de redirección" v-model="setting.data[n - 1].redirect_url">
          <template slot="prepend">
            <icon-base icon-name="links"><icon-links /></icon-base>
          </template>
        </el-input>
      </div>
      <div class="input-area">
        <el-input placeholder="Texto del boton" v-model="setting.data[n - 1].button_text">
          <template slot="prepend">
            <icon-base icon-name="text"><icon-text /></icon-base>
          </template>
        </el-input>
      </div>
    </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import AngleLeft from '../../Icons/AngleLeft.vue'
import IconText from '../../Icons/Text.vue'
import AlignJustify from '../../Icons/AlignJustify.vue'
import IconLinks from '../../Icons/Links.vue'
import CloudUp from '../../Icons/CloudUp.vue'

export default {
  name: 'koContentSetting1',
  components: { AngleLeft, IconText, AlignJustify, IconLinks, CloudUp },
  data () {
   return {
    dialogImageUrl: '',
    dialogVisible: false
    }
  },
  computed: {
    setting() {
      return this.$store.state.settingData
    }
  },
  methods: {
    uploadPhoto(event, position){
      let params = new FormData();
      params.append('file', event.target.files[0]);
      params.append('upload_preset','qciyydun');

      let config = {
        headers:
          {
            'content-type': 'multipart/form-data'
          }
      }
      axios.post('https://api.cloudinary.com/v1_1/komercia-store/image/upload', params, config)
      .then( (response) => {
        this.setting.data[position].photo = response.data.secure_url;
      })
      .catch(function (error) {});
    },
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
  display: grid;
  align-content: start;
  align-items: start;
  background-color: #e9ecef;
  z-index: 3;
  overflow: hidden;
}
.sectionBar_header{
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #FFF;
  box-sizing: border-box;
  box-shadow: 0 0 0 1px rgba(63,63,68,0.05), 0 1px 3px 0 rgba(63,63,68,0.15);
}
.sectionBar_header p{
  /*color: #FFF;*/
}
.sectionBar_header span{
  flex: 1;
  display: flex;
  align-items: center;
}
.sectionBar_header span.angle-left{
  cursor: pointer;
}
.setting_list{
  height: calc(100% - 50px - 108px - 20px);
  overflow: auto;
}
.item_setting{
  display: grid;
  align-content: start;
  grid-row-gap: 5px;
  padding: 5px;
}
.input-area{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.settingBanner{
  padding: 20px 0;
  border-bottom: 1px solid;
}
.upload-area{
  position: relative;
  width: 100%;
  background-color:#f4f6f8;
  display: grid;
  justify-items: center;
  align-content: center;
  overflow: hidden;
  cursor: pointer;
}
.upload-area .upload_hover{
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: none;
  justify-content: center;
  justify-items: center;
  align-content: center;
  background-color: rgba(0,0,0,0.5);
  color: #FFF;
  pointer-events: none;
}
.upload-area .upload_hover svg{
  margin-bottom: 5px;
}
.upload-area:hover .upload_hover{
  display: grid;
}
.upload{
  background-color: #0F9380;
  cursor: pointer;
  padding: 10px;
  color: white;
  text-align: center;
  display: flex;
}
.upload svg{
  margin-right: 5px;
}
.upload_photo{
  width: 100%;
  height: 200px;
  cursor: pointer;
}
.upload_photo img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.uploadBanner{
  display: none;
}
</style>
