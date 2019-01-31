<template>
  <div class="form_list">
    <el-tabs
      type="border-card"
      :stretch="true"
      @tab-click="handleClick"
    >
      <el-tab-pane label="Banners">
        <div
          class="btn-newbanner"
          v-if="settingData.data.banners.length < 3"
          @click="uploadBanner2"
        >Nuevo Banner
        </div>
        <section
          class="settingBanner"
          v-for="(banner, index) in settingData.data.banners"
          :key="index"
        >
          <div class="row">
            <i
              class="el-icon-close"
              @click="deleteBanner(banner, index)"
            ></i>
            <!-- <el-button-group>
              <el-button
                icon="el-icon-delete"
                @click="deleteBanner(banner, index)"
              ></el-button>
            </el-button-group> -->
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
            <input
              type="file"
              :id="`banner${index}`"
              @change="uploadBanner($event, banner)"
            >
          </div>
          <RedirectTo v-model="banner.redirect_to" />
        </section>
        <div class="settingBanner">
          <p class="title">Elige el color del botón:</p>
          <el-color-picker
            size="small"
            v-model="settingData.styleObject.btnColor"
            @active-change="handleColorHover"
          ></el-color-picker>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Banners para moviles">
        <div
          class="btn-newbanner"
          v-if="settingData.data.bannersResponsive.length < 3"
          @click="uploadBanner2Responsive"
        >Nuevo Banner
        </div>
        <section
          class="settingBanner"
          v-for="(banner, index) in settingData.data.bannersResponsive"
          :key="index"
        >
          <div class="row">
            <i
              class="el-icon-close"
              @click="deleteBannerResponsive(banner, index)"
            ></i>
            <div class="banner_photo_responsive">
              <img :src="banner.photo">
              <label
                :for="`banner_responsive${index}`"
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
            <input
              type="file"
              :id="`banner_responsive${index}`"
              @change="uploadBannerResponsive($event, banner)"
            >
          </div>
          <RedirectTo v-model="banner.redirect_to" />
        </section>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import RedirectTo from "../../_components/RedirectTo";
import IconLinks from "../../../Icons/Links";
import CloudUp from "../../../Icons/CloudUp.vue";
import Upload from "../../_components/Upload.vue";
import axios from "axios";
export default {
  name: "koSliderSetting4",
  components: { IconLinks, CloudUp, RedirectTo, Upload },
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
          ratio: 16 / 5,
          file: event.target.files[0],
          desc: "Peso maximo del banner 20M y tamaño de 1080px X 720px"
        })
        .then(response => {
          this.updateBannerPhoto(response, banner);
        });
    },
    uploadBannerResponsive(event, banner) {
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
    uploadBanner2() {
      const banner = {
        photo: "",
        redirect_to: {
          value: "",
          type: 4
        },
        id_cloudinary: "",
        signature: ""
      };
      this.$store.state.settingData.data.banners.push(banner);
    },
    uploadBanner2Responsive() {
      const banner = {
        photo: "",
        redirect_to: {
          value: "",
          type: 4
        },
        id_cloudinary: "",
        signature: ""
      };
      this.$store.state.settingData.data.bannersResponsive.push(banner);
    },
    updateBannerPhoto(blob, banner) {
      // this.deleteBannerPhoto(banner)
      let params = new FormData();
      params.append("file", blob);
      params.append("upload_preset", "shngmeqw");
      // params.append("upload_preset", "qciyydun");

      let config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };
      axios
        .post(
          "https://api.cloudinary.com/v1_1/komercia/image/upload",
          params,
          config
        )
        .then(response => {
          banner.photo = response.data.secure_url;
          banner.id_cloudinary = response.data.public_id;
          banner.signature = response.data.signature;
          this.$cropper.complete();
        })
        .catch(() => {});
    },
    deleteBannerPhoto(banner) {
      const public_id = banner.id_cloudinary || "";
      const signature = banner.signature || "";
      if (public_id != "" && signature != "") {
        let params = {
          public_id,
          signature,
          upload_preset: "shngmeqw",
          api_key: 722777295248551,
          timestamp: new Date().getTime()
        };
        axios
          .post(
            "https://api.cloudinary.com/v1_1/komercia-store/image/destroy",
            params
          )
          .then(response => {});
      }
    },
    deleteBanner(banner, index) {
      // this.deleteBannerPhoto(banner);
      this.$store.state.settingData.data.banners.splice(index, 1);
    },
    deleteBannerResponsive(banner, index) {
      // this.deleteBannerPhoto(banner);
      this.$store.state.settingData.data.bannersResponsive.splice(index, 1);
    },
    handleColorHover(color) {
      this.settingData.styleObject.btnColor = color;
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
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: #fff;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 0 8px 4px rgba(144, 147, 153, 0.103);
}
.banner_photo {
  width: 100%;
  height: 85px;
  position: relative;
  margin: 5px 0;
}
.banner_photo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.banner_photo_responsive {
  width: 100%;
  height: 160px;
  position: relative;
  margin: 5px 0;
}
.banner_photo_responsive img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.row {
  display: flex;
  flex-direction: column;
}
.row > i {
  cursor: pointer;
  font-size: 22px;
  color: #909399;
  align-self: flex-end;
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
.upload_hover {
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
.upload_hover svg {
  margin-bottom: 5px;
}
.banner_photo:hover .upload_hover {
  display: grid;
}
.banner_photo_responsive:hover .upload_hover {
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
  /* margin-top: 10px; */
}
.btn-newbanner {
  margin: 20px auto;
  background-color: rgb(36, 148, 114);
  padding: 10px 15px;
  width: 120px;
  cursor: pointer;
  color: #fff;
  font-weight: 600;
  border-radius: 5px;
  text-align: center;
}
.btn-newbanner:hover {
  background-color: rgb(58, 194, 153);
}
.title {
  color: #333;
  font-size: 14px;
  margin-bottom: 10px;
}
.block {
  background-color: #fff;
  box-sizing: border-box;
  padding: 10px;
}
</style>
