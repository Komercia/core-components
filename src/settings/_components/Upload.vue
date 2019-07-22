<template>
  <div class="box">
    <div
      class="banner_photo"
      v-if="src"
    >
      <img
        src="https://res.cloudinary.com/komercia/image/upload/w_600,q_auto:best,f_auto/v1548777225/ikkxahfa6ogcwrlbd487.png"
        alt=""
      >
      <!-- <image-cloudinary
        :src="src"
        :alt="item.titulo"
      /> -->
      <div class="upload_hover"></div>
      <div class="upload_area_wrapper">
        <input
          type="file"
          @change="change"
        >
        <img
          class="icon-change"
          src="../../assets/exchange.png"
          alt="change"
        >
        <p class="text-change">Clic para cambiar imagen</p>
        <!-- <button class="upload_button">
          Subir foto
        </button> -->
      </div>
    </div>

    <div
      class="upload_area"
      v-else
    >
      <div class="upload_area_wrapper">
        <img
          class="icon-cloud"
          src="../../assets/cloud.png"
          alt="cloud"
        >
        <p class="text_upload">Suelta tu archivo aquí<br><span>o</span></p>
        <button class="upload_button">Subir foto</button>
        <input
          type="file"
          v-on:change="change"
        >
      </div>
    </div>
  </div>
</template>

<script>
import CloudUp from "../../Icons/CloudUp.vue";

export default {
  components: { CloudUp },
  props: ["item", "src"],
  methods: {
    change(event) {
      this.$emit("change", event);
    }
  }
};
</script>

<style scoped>
.banner_photo {
  height: calc(100% - 4px);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
  /* box-shadow: 1px 1px 1px 0 rgba(0, 0, 0, 0.05); */
}
.banner_photo .upload_area_wrapper {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -2px;
  transform: scale(0.75);
  transition: all 0.2s;
  width: 100%;
  height: 100%;
}
.banner_photo:hover .upload_area_wrapper {
  /* margin-top: -37px; */
  /* transform: scale(1); */
}
.banner_photo button {
  color: #fff;
  background-color: #4a59f5;
  border-radius: 4px;
  padding: 10px 12px;
  border-style: none;
  cursor: pointer;
  outline: none;
  display: flex;
  align-items: center;
}
.banner_photo > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 7px;
  box-sizing: border-box;
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
  background-color: rgba(8, 33, 92, 0.5);
  color: #fff;
  border-radius: 7px;
}
.banner_photo .upload_hover svg {
  margin-bottom: 5px;
}
.banner_photo:hover .upload_hover {
  display: grid;
}
.upload_area {
  height: calc(100% - 4px);
  display: grid;
  justify-content: center;
  align-content: center;
  grid-row-gap: 10px;
  border: 2px dashed #c4cdd53d;
  border-image: url("../../assets/line.png") 2 round;
  background-color: #fff;
}
.upload_area_wrapper {
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.upload_area_wrapper input[type="file"] {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
  width: 100%;
  height: 100%;
}
.upload_button {
  color: #fff;
  background-color: #4a59f5;
  border-radius: 4px;
  padding: 10px 12px;
  border-style: none;
  cursor: pointer;
  outline: none;
  display: flex;
  align-items: center;
  font-weight: 600;
  width: 100px;
  justify-content: center;
}
.upload_area_wrapper:hover > .upload_button {
  background-color: #2f3cbc;
}
.upload_button i {
  margin-right: 7px;
  font-size: 20px;
}
.upload img {
  width: 100%;
}
.upload svg {
  fill: #fff;
}
.box {
  background-color: #fff;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 7px;
  height: 200px;
}
.icon-cloud {
  width: 50px;
}
.text_upload {
  text-align: center;
  color: #303141;
  font-weight: 600;
  letter-spacing: -0.5px;
  margin: 7px 0;
}
.text_upload > span {
  font-weight: 300;
}
.icon-change {
  width: 80px;
  display: none;
}
.text-change {
  color: #fff;
  font-weight: 600;
  text-align: center;
  font-size: 20px;
  margin-top: 10px;
  letter-spacing: -0.5px;
  display: none;
  border-bottom: 2px solid transparent;
}
.banner_photo:hover .icon-change {
  display: initial;
}
.banner_photo:hover .text-change {
  display: initial;
}
/* .banner_photo:hover .upload_area_wrapper:hover .text-change {
  border-bottom: 2px solid rgba(255, 255, 255, 0.804);
  color: rgba(255, 255, 255, 0.804);
}
.banner_photo:hover .upload_area_wrapper:hover .icon-change {
  opacity: 0.9;
} */
</style>
