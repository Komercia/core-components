<template>
  <section class="sectionBar">
    <header class="sectionBar_header">
      <span class="angle-left" @click="closeSetting">
        <icon-base icon-name="angle-left" iconColor="#FFF"><angle-left /></icon-base>
      </span>
      <p v-if="settingData">{{ settingData.label }}</p>
      <span></span>
    </header>
    <div class="form_list">
      <section class="settingBanner" v-for="(banner, index) in bannersData">
        <label for="uploadBanner" class="upload">
            <div class="hover">
              <i class="ti-cloud-up"></i>
            </div>
            <img
              :src="getBanner(banner.ruta_banner)"
              :alt="banner.titulo">
        </label>
        <input type="file" id="uploadBanner" v-on:change="uploadBanner">
        <div class="input-area">
          <el-input placeholder="Titulo" v-model="banner.titulo">
            <template slot="prepend">
              <icon-base icon-name="text"><icon-text /></icon-base>
            </template>
          </el-input>
        </div>
        <div class="input-area">
          <el-input placeholder="Descripción" v-model="banner.descripcion">
            <template slot="prepend"><icon-base icon-name="align-justify"><align-justify /></icon-base></template>
          </el-input>
        </div>
        <div class="input-area">
          <el-input placeholder="Url de redirección" v-model="banner.redireccion">
            <template slot="prepend">
              <icon-base icon-name="links"><icon-links /></icon-base>
            </template>
          </el-input>
        </div>
        <div class="input-area">
          <el-select placeholder="Posición del contenido" v-model="banner.position">
            <el-option
              v-for="position in positions"
              :label="position.label"
              :value="position.value"
              :key="position.value">
            </el-option>
          </el-select>
        </div>
        <div class="settingBanner_actions">
          <el-button @click="updateBanner(banner)">Guardar</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="deleteBanner(banner, index)">Eliminar</el-button>
        </div>
      </section>
      <section class="settingBanner" v-if="bannersData.length < 3">
        <label for="uploadBanner" class="upload">
            <div class="hover">
              <i class="ti-cloud-up"></i>
            </div>
            <div class="">
              <i class="ti-cloud-up"></i>
            </div>
        </label>
        <input type="file" id="uploadBanner" v-on:change="uploadBanner">
        <div class="input-area">
          <el-input placeholder="Titulo" v-model="titulo">
            <template slot="prepend">
              <icon-base icon-name="text"><icon-text /></icon-base>
            </template>
          </el-input>
        </div>
        <div class="input-area">
          <el-input placeholder="Descripción" v-model="descripcion">
            <template slot="prepend">
              <icon-base icon-name="align-justify"><align-justify /></icon-base>
            </template>
          </el-input>
        </div>
        <div class="input-area">
          <el-input placeholder="Url de redirección" v-model="redireccion">
            <template slot="prepend">
              <icon-base icon-name="links"><icon-links /></icon-base>
            </template>
          </el-input>
        </div>
        <div class="settingBanner_actions">
          <el-button>Guardar</el-button>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import AngleLeft from '../../Icons/AngleLeft.vue'
import IconText from '../../Icons/Text.vue'
import AlignJustify from '../../Icons/AlignJustify.vue'
import IconLinks from '../../Icons/Links.vue'

export default {
  name: 'koSliderSetting1',
  components: { AngleLeft, IconText, AlignJustify, IconLinks },
  created() {
  },
  data() {
    return {
      titulo: '',
      descripcion: '',
      redireccion: '',
      newBanner: false,
      positions: [
        {
          label: 'Izquierda',
          value: 'left'
        },
        {
          label: 'Centrado',
          value: 'center'
        },
        {
          label: 'Derecha',
          value: 'right'
        }
      ]
    }
  },
  computed: {
    settingData () {
      return this.$store.state.settingData
    },
    bannersData() {
      return this.$store.state.banners;
    }
  },
  methods: {
    uploadBanner(event) {
      this.$cropper({
        ratio: 12/4,
        file: event.target.files[0],
      }).then((response) => {
        this.createBanner(response);
      })
    },
    createBanner(blob) {
      let config = {
        headers:
          {
            'content-type': 'multipart/form-data',
            'Authorization': `Bearer ${this.$configKomercia.accessToken}`,
            'Access-Control-Allow-Origin': '*'
          }
      }
      let params = new FormData()
      params.append('banner', blob)
      params.append('order', this.bannersData.length + 1)
      axios.post(`${this.$configKomercia.url}/api/admin/tienda/banners/cargar`, params, config).then((response) => {
        this.$store.state.banners.push(response.data.data)
        this.$store.state.cropperState = false
      }).catch((error) => {
        if (error) {
          this.$store.state.showCropperBanner = false
          this.loading = false
        }
      })
    },
    deleteBanner(banner, index) {
      let config = {
        headers:
          {
            'content-type': 'application/json',
            'Authorization': `Bearer ${this.$configKomercia.accessToken}`,
            'Access-Control-Allow-Origin': '*'
          }
      }
      let params = {
        id: banner.id
      }
      axios.post(`${this.$configKomercia.url}/api/admin/tienda/banners/eliminar`, params, config).then((response) => {
        this.bannersData.splice(index, 1)
      })
    },
    updateBanner (banner) {
      let config = {
        headers:
          {
            'content-type': 'application/json',
            'Authorization': `Bearer ${this.$configKomercia.accessToken}`,
            'Access-Control-Allow-Origin': '*'
          }
      }
      let params = {
        titulo: banner.titulo,
        descripcion: banner.descripcion,
        redireccion: banner.redireccion
      }
      axios.put(`${this.$configKomercia.url}/api/admin/tienda/banners/${banner.id}`, params, config).then((response) => {
      })
    },
    closeSetting() {
      this.$store.state.settingData = null;
    },
    getBanner(banner) {
      return `https://api.komercia.co/banners/${banner}`
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
