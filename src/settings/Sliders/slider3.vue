<template>
  <div class="form_list">
    <section class="settingBanner" v-for="(banner, index) in settingData.data">
      <div class="banner_photo">
        <img :src="banner.photo">
        <label :for="`banner${index}`" class="upload_hover">
          <icon-base icon-name="cloud-up" icon-color="#FFF">
            <cloud-up />
          </icon-base>
          <p>Subir banner</p>
        </label>
      </div>
      <div class="settingBanner_actions">
        <el-button @click="updateBanner(banner)">Guardar</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="deleteBanner(banner, index)">Eliminar</el-button>
      </div>
      <div class="input-area">
        <el-input placeholder="Url de redirección" v-model="banner.redireccion">
          <template slot="prepend">
            <icon-base icon-name="links">
              <icon-links /></icon-base>
          </template>
        </el-input>
      </div>
    </section>
    <section class="settingBanner" v-if="settingData.data.length < 3">
      <div class="upload-area">
        <label for="uploadBanner" class="upload">
          <icon-base icon-name="cloud-up" icon-color="#FFF">
            <cloud-up />
          </icon-base>Subir imagen
        </label>
        <input type="file" id="uploadBanner" v-on:change="uploadBanner">
      </div>
      <div class="input-area">
        <el-input placeholder="Url de redirección" v-model="redireccion">
          <template slot="prepend">
            <icon-base icon-name="links">
              <icon-links /></icon-base>
          </template>
        </el-input>
      </div>
      <div class="settingBanner_actions">
        <el-button>Guardar</el-button>
      </div>
    </section>
  </div>
</template>

<script>
import IconLinks from '../../Icons/Links.vue'
import CloudUp from '../../Icons/CloudUp.vue'
export default {
  name: 'koSliderSetting3',
  components: { IconLinks, CloudUp },
  data() {
    return {
      redireccion: '',
      newBanner: false
    }
  },
  computed: {
    settingData() {
      return this.$store.state.settingData
    }
  },
  methods: {
    uploadBanner(event) {
      this.$cropper
        .upload({
          type: 'Banner',
          ratio: 12 / 4,
          file: event.target.files[0],
          desc: 'Peso maximo del banner 20M y tamaño de 1200px X 400px'
        })
        .then(response => {
          this.createBanner(response)
        })
    },
    getBanner(banner) {
      return banner
    }
  },
  deleteBanner(banner, index) {
    let config = {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${this.$configKomercia.accessToken}`,
        'Access-Control-Allow-Origin': '*'
      }
    }
    let params = {
      id: banner.id
    }
    axios
      .post(
        `${this.$configKomercia.url}/api/admin/tienda/banners/eliminar`,
        params,
        config
      )
      .then(response => {
        this.bannersData.splice(index, 1)
      })
  },
  updateBanner(banner) {
    let config = {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${this.$configKomercia.accessToken}`,
        'Access-Control-Allow-Origin': '*'
      }
    }
    let params = {
      redireccion: banner.redireccion
    }
    axios
      .put(
        `${this.$configKomercia.url}/api/admin/tienda/banners/${banner.id}`,
        params,
        config
      )
      .then(response => {})
  }
}
</script>

<style scoped>
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
  width: 100%;
  height: 200px;
  position: relative;
  border: 1px solid #c4cdd5;
}
.banner_photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
.settingBanner input[type='file'] {
  display: none;
}
.input-area .el-select {
  width: 100%;
}
#uploadBanner {
  visibility: hidden;
  opacity: 0;
  width: 0;
  height: 0;
  display: none;
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
