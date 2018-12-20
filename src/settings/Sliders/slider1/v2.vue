<template>
  <div class="form_list">
    <section class="settingBanner" v-for="(banner, index) in settingData.data">
      <div class="banner_photo">
        <img
        :src="banner.foto_cloudinary"
        :alt="banner.titulo">
        <label :for="`banner${index}`" class="upload_hover">
          <icon-base icon-name="cloud-up" icon-color="#FFF"><cloud-up /></icon-base>
          <p>Subir banner</p>
        </label>
      </div>
      <input type="file" :id="`banner${index}`" @change="uploadBanner2($event, banner)">
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
        <el-select placeholder="Posición del contenido" v-model="banner.posicion">
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
        <el-button type="danger" icon="el-icon-delete" @click="deleteBanner(index, banner)">Eliminar</el-button>
      </div>
    </section>
    <section class="settingBanner" v-if="settingData.data.length < 3">
      <div class="upload-area">
        <label for="uploadBanner" class="upload">
          <icon-base icon-name="cloud-up" icon-color="#FFF"><cloud-up /></icon-base>Subir imagen
        </label>
        <!-- <button class="banner_unplash" @click="openUnplash">
          Explora imágenes gratis
        </button> -->
        <input type="file" id="uploadBanner" v-on:change="uploadBanner">
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios';
import AngleLeft from '../../Icons/AngleLeft.vue'
import IconText from '../../Icons/Text.vue'
import AlignJustify from '../../Icons/AlignJustify.vue'
import IconLinks from '../../Icons/Links.vue'
import CloudUp from '../../Icons/CloudUp.vue'

export default {
  name: 'koSliderSetting1-1',
  components: { AngleLeft, IconText, AlignJustify, IconLinks, CloudUp },
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
    ...mapState(['currentPage', 'currentComponent', 'settingData'])
  },
  methods: {
    openUnplash() {
      this.$store.state.unplash.status = true;
    },
    uploadBanner(event) {
      this.$cropper.upload({
        type: 'Banner',
        ratio: 12/4,
        file: event.target.files[0],
        desc: 'Peso maximo del banner 20M y tamaño de 1200px X 400px'
      }).then((response) => {
        this.createBanner(response)
      })
    },
    uploadBanner2(event, banner) {
      this.$cropper.upload({
        type: 'Banner',
        ratio: 12/4,
        file: event.target.files[0],
        desc: 'Peso maximo del banner 20M y tamaño de 1200px X 400px'
      }).then((response) => {
        this.updateBannerPhoto(response, banner)
      })
    },
    createBanner(blob) {
      if (this.$store.state.settingData.data[0]) {
        if (this.$store.state.settingData.data[0].id_cloudinary === 'placeholder') {
          this.deleteBanner(0)
        }
      }
      let params = new FormData()
      params.append('file', blob)
      params.append('upload_preset', 'qciyydun')

      let config = {
        headers:
          {
            'content-type': 'multipart/form-data'
          }
      }
      axios.post('https://api.cloudinary.com/v1_1/komercia-store/image/upload', params, config).then((response) => {
        const newBanner = {
          descripcion: '',
          foto_cloudinary: response.data.secure_url,
          id_cloudinary: response.data.public_id,
          signature: response.data.signature,
          order: 0,
          posicion: '',
          redireccion: '',
          tienda: this.$store.state.configKomercia.tienda.id,
          titulo: ''
        }
        this.$store.state.settingData.data.push(newBanner)
        this.$cropper.complete()
      }).catch(() => {
        this.$cropper.complete()
      })
    },
    deleteBanner(index, banner) {
      // this.deleteBannerPhoto(banner)
      this.$store.state.settingData.data.splice(index, 1)
    },
    updateBanner (banner) {
      this.$store.commit('SAVE_STORELAYOUT')
    },
    updateBannerPhoto (blob, banner) {
      // this.deleteBannerPhoto(banner)
      let params = new FormData()
      params.append('file', blob)
      params.append('upload_preset', 'qciyydun')

      let config = {
        headers:
          {
            'content-type': 'multipart/form-data'
          }
      }
      axios.post('https://api.cloudinary.com/v1_1/komercia-store/image/upload', params, config).then((response) => {
        banner.foto_cloudinary = response.data.secure_url
        banner.id_cloudinary = response.data.public_id
        banner.signature = response.data.signature
        this.$cropper.complete()
      }).catch(() => {
        this.$cropper.complete()
      })
    },
    deleteBannerPhoto (banner) {
      const public_id = banner.id_cloudinary || ''
      const signature = banner.signature || ''
      if (public_id != '' && signature != '') {
        let params = {
          public_id,
          signature,
          upload_preset: 'qciyydun',
          api_key: 596228273228369,
          timestamp: new Date().getTime()
        }
        axios.post('https://api.cloudinary.com/v1_1/komercia-store/image/destroy', params).then((response) => {

        })
      }
    },
    closeSetting() {
      this.$store.state.settingData = null;
    },
    getBanner(banner) {
      return `https://api2.komercia.co/banners/${banner}`
    }
  }
}
</script>

<style scoped>
.sectionBar {
  position: absolute;
  top: 0;
  width: 100%;
  background-color: #e9ecef;
  z-index: 3;
}
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
  /*color: #FFF;*/
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
  box-sizing: border-box;
  padding: 10px 5px;
  overflow: auto;
}
.settingBanner {
  padding: 20px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.banner_photo {
  height: 113px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}
.banner_photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 1px solid #c4cdd5;
}
.banner_photo .upload_hover {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: none;
  justify-content: center;
  justify-items: center;
  align-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  cursor: pointer;
}
.banner_photo .upload_hover svg {
  margin-bottom: 5px;
}
.banner_photo:hover .upload_hover {
  display: grid;
}
.settingBanner input[type="file"] {
  display: none;
}
.input-area {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 5px 0;
}
.input-area p {
  margin-bottom: 5px;
  font-size: 14px;
  color: #333;
}
.input-area .el-select {
  width: 100%;
}
.upload-area {
  width: 100%;
  height: 120px;
  display: grid;
  justify-content: center;
  align-content: center;
  grid-row-gap: 10px;
  border: 1px solid #c4cdd5;
  background-color: #f4f6f8;
}

#uploadBanner {
  visibility: hidden;
  opacity: 0;
  width: 0;
  height: 0;
  display: none;
}
.upload {
  background-color: #0f9380;
  color: #fff;
  padding: 10px;
  cursor: pointer;
}
.upload img {
  width: 100%;
}
.upload svg {
  fill: #fff;
}
.banner_unplash {
  border-style: none;
  background-color: transparent;
  text-decoration: underline;
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
</style>
