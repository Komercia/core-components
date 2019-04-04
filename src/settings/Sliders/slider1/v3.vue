<template>
  <div class="form_list">
    <section class="settingBanner" v-for="(banner, index) in settingData.data">
      <Upload :item="banner" :src="banner.foto_cloudinary" @change="uploadBanner2($event, banner)"/>
      <div class="input-area">
        <el-input placeholder="Titulo" v-model="banner.titulo">
          <template slot="prepend">
            <icon-base icon-name="text">
              <icon-text/>
            </icon-base>
          </template>
        </el-input>
        <el-input-number v-model="banner.titulosize" :min="3" :max="25"></el-input-number>
      </div>
      <div class="input-area">
        <el-input placeholder="Descripción" v-model="banner.descripcion">
          <template slot="prepend">
            <icon-base icon-name="align-justify">
              <align-justify/>
            </icon-base>
          </template>
        </el-input>
        <el-input-number v-model="banner.descripcionsize" :min="10" :max="35"></el-input-number>
      </div>
      <RedirectTo v-model="banner.redirect_to"/>
      <div class="input-area">
        <el-select placeholder="Posición del contenido" v-model="banner.posicion">
          <el-option
            v-for="position in positions"
            :label="position.label"
            :value="position.value"
            :key="position.value"
          ></el-option>
        </el-select>
        <el-input-number v-model="banner.spaces" :min="0" :max="75"></el-input-number>
      </div>
      <div class="settingBanner_actions">
        <el-button @click="updateBanner(banner)">Guardar</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="deleteBanner(index, banner)">Eliminar</el-button>
      </div>
    </section>
    <section class="settingBanner" v-if="settingData.data.length < 3">
      <Upload @change="uploadBanner"/>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import Upload from "../../_components/Upload.vue";
import RedirectTo from "../../_components/RedirectTo.vue";
import AngleLeft from "../../../Icons/AngleLeft.vue";
import IconText from "../../../Icons/Text.vue";
import AlignJustify from "../../../Icons/AlignJustify.vue";
import IconLinks from "../../../Icons/Links.vue";
import CloudUp from "../../../Icons/CloudUp.vue";

export default {
  name: "koSliderSetting1_v3",
  components: {
    AngleLeft,
    IconText,
    AlignJustify,
    IconLinks,
    CloudUp,
    RedirectTo,
    Upload
  },
  data() {
    return {
      value: null,
      titulo: "",
      descripcion: "",
      redireccion: "",
      newBanner: false,
      positions: [
        {
          label: "Izquierda",
          value: "left"
        },
        {
          label: "Centrado",
          value: "center"
        },
        {
          label: "Derecha",
          value: "right"
        }
      ]
    };
  },
  computed: {
    ...mapState(["currentPage", "currentComponent", "settingData"]),
    cloudinary_config() {
      if (
        location.hostname === "localhost" ||
        location.hostname === "127.0.0.1"
      ) {
        return {
          upload_preset: "shngmeqw",
          cloud_name: "komercia"
        };
      } else {
        return {
          upload_preset: "qciyydun",
          cloud_name: "komercia-store"
        };
      }
    }
  },
  methods: {
    openUnplash() {
      this.$store.state.unplash.status = true;
    },
    uploadBanner(event) {
      this.$cropper
        .upload({
          type: "Banner",
          ratio: 12 / 4,
          file: event.target.files[0],
          desc: "Peso maximo del banner 20M y tamaño de 1200px X 400px"
        })
        .then(response => {
          this.createBanner(response);
        });
    },
    uploadBanner2(event, banner) {
      this.$cropper
        .upload({
          type: "Banner",
          ratio: 12 / 4,
          file: event.target.files[0],
          desc: "Peso maximo del banner 20M y tamaño de 1200px X 400px"
        })
        .then(response => {
          this.updateBannerPhoto(response, banner);
        });
    },
    createBanner(blob) {
      if (this.$store.state.settingData.data[0]) {
        if (
          this.$store.state.settingData.data[0].id_cloudinary === "placeholder"
        ) {
          this.deleteBanner(0);
        }
      }
      let params = new FormData();
      params.append("file", blob);
      params.append("upload_preset", this.cloudinary_config.upload_preset);

      let config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };
      axios
        .post(
          `https://api.cloudinary.com/v1_1/${
            this.cloudinary_config.cloud_name
          }/image/upload`,
          params,
          config
        )
        .then(response => {
          const newBanner = {
            descripcion: "",
            foto_cloudinary: response.data.secure_url,
            id_cloudinary: response.data.public_id,
            signature: response.data.signature,
            order: 0,
            posicion: "",
            redireccion: "",
            tienda: this.$store.state.configKomercia.tienda.id,
            titulo: "",
            titulosize: "5",
            descripcionsize: "20",
            spaces: "3"
          };
          this.$store.state.settingData.data.push(newBanner);
          this.$cropper.complete();
        })
        .catch(() => {
          this.$cropper.complete();
        });
    },
    deleteBanner(index, banner) {
      // this.deleteBannerPhoto(banner)
      this.$store.state.settingData.data.splice(index, 1);
    },
    updateBanner(banner) {
      this.$store.commit("SAVE_STORELAYOUT");
    },
    updateBannerPhoto(blob, banner) {
      // this.deleteBannerPhoto(banner)
      let params = new FormData();
      params.append("file", blob);
      params.append("upload_preset", this.cloudinary_config.upload_preset);

      let config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };
      axios
        .post(
          `https://api.cloudinary.com/v1_1/${
            this.cloudinary_config.cloud_name
          }/image/upload`,
          params,
          config
        )
        .then(response => {
          banner.foto_cloudinary = response.data.secure_url;
          banner.id_cloudinary = response.data.public_id;
          banner.signature = response.data.signature;
          this.$cropper.complete();
        })
        .catch(() => {
          this.$cropper.complete();
        });
    },
    deleteBannerPhoto(banner) {
      const public_id = banner.id_cloudinary || "";
      const signature = banner.signature || "";
      if (public_id != "" && signature != "") {
        let params = {
          public_id,
          signature,
          upload_preset: this.cloudinary_config.upload_preset,
          api_key: 596228273228369,
          timestamp: new Date().getTime()
        };
        axios
          .post(
            `https://api.cloudinary.com/v1_1/${
              this.cloudinary_config.cloud_name
            }/image/destroy`,
            params
          )
          .then(response => {});
      }
    },
    closeSetting() {
      this.$store.state.settingData = null;
    },
    getBanner(banner) {
      return `https://api2.komercia.co/banners/${banner}`;
    }
  }
};
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
.input-area {
  display: grid;
  grid-auto-flow: column;
  grid-gap: 5px;
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
.input-area .el-input-number {
  width: 125px;
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
