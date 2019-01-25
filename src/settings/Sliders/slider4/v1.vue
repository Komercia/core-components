<template>
  <div class="form_list">
    <section
      class="settingBanner"
      v-for="(banner, index) in settingData.data.banners"
      :key="index"
    >
      <div class="row">
        <el-button-group>
          <el-button icon="el-icon-delete"></el-button>
          <el-button icon="el-icon-rank"></el-button>
        </el-button-group>
        <div class="banner_photo">
          <img :src="banner.photo">
          <label
            :for="`banner${index}`"
            class="upload_hover"
          >
            <icon-base
              icon-name="cloud-up"
              width="30px"
              heigth="30px"
              icon-color="#FFF"
            >
              <cloud-up />
            </icon-base>
            <p>Subir banner</p>
          </label>
        </div>
      </div>
      <RedirectTo v-model="banner.redirect_to" />
      <!-- <div class="input-area">
        <el-input
          placeholder="Url de redirección"
          v-model="banner.redirect_to"
        >
          <template slot="prepend">
            <icon-base icon-name="links">
              <icon-links />
            </icon-base>
          </template>
        </el-input>
      </div>
      <input
        type="file"
        :id="`banner${index}`"
        @change="uploadBanner($event, banner)"
        v-if="index == 0"
      >
      <input
        type="file"
        :id="`banner${index}`"
        @change="uploadBanner2($event, banner)"
        v-else
      >
      <div class="settingBanner_actions">
        <el-button @click="updateBanner(banner)">Guardar</el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          @click="deleteBanner(banner, index)"
        >Eliminar</el-button>
      </div> -->
    </section>
  </div>
</template>

<script>
import RedirectTo from "../../_components/RedirectTo";
import IconLinks from "../../../Icons/Links";
import CloudUp from "../../../Icons/CloudUp.vue";
import axios from "axios";
export default {
  name: "koSliderSetting4",
  components: { IconLinks, CloudUp, RedirectTo },
  data() {
    return {
      redireccion: "",
      newBanner: false
    };
  },
  computed: {
    settingData: {
      get() {
        return this.$store.state.settingData;
      },
      set(newValue) {
        this.$store.state.settingData = newValue;
      }
    }
  },
  methods: {
    uploadBanner(event, banner) {
      this.$cropper
        .upload({
          type: "Banner",
          ratio: 3 / 2,
          file: event.target.files[0],
          desc: "Peso maximo del banner 20M y tamaño de 1080px X 720px"
        })
        .then(response => {
          this.updateBannerPhoto(response, banner);
        });
    },
    uploadBanner2(event, banner) {
      this.$cropper
        .upload({
          type: "Banner",
          ratio: 358 / 173,
          file: event.target.files[0],
          desc: "Peso maximo del banner 20M y tamaño de 716px X 346px"
        })
        .then(response => {
          this.updateBannerPhoto(response, banner);
        });
    },
    updateBannerPhoto(blob, banner) {
      // this.deleteBannerPhoto(banner)
      let params = new FormData();
      params.append("file", blob);
      params.append("upload_preset", "qciyydun");

      let config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };
      axios
        .post(
          "https://api.cloudinary.com/v1_1/komercia-store/image/upload",
          params,
          config
        )
        .then(response => {
          banner.photo = response.data.secure_url;
          banner.id_cloudinary = response.data.public_id;
          banner.signature = response.data.signature;
          this.$cropper.complete();
        })
        .catch(() => {
          this.$cropper.complete();
        });
    },
    deleteBanner(index, banner) {
      // this.deleteBannerPhoto(banner)
      this.$store.state.settingData.data.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.form_list {
  box-sizing: border-box;
  padding: 10px 5px;
  overflow: auto;
}
.settingBanner {
  margin: 0 0 20px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background-color: #fff;
  box-sizing: border-box;
  padding: 10px;
}
.banner_photo {
  width: 100%;
  height: auto;
  position: relative;
  margin: 5px 0;
}
.banner_photo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.row {
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
.settingBanner input[type="file"] {
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
.el-button-group {
  display: flex;
  justify-content: flex-end;
}
</style>
