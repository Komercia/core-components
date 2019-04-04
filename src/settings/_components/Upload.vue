<template>
  <div class>
    <div class="banner_photo" v-if="src">
      <image-cloudinary :src="src" :alt="item.titulo"/>
      <div class="upload_hover"></div>
      <div class="upload_area_wrapper">
        <input type="file" @change="change">
        <button class="upload_button">
          <i class="el-icon-picture-outline"></i>Subir foto
        </button>
      </div>
    </div>

    <div class="upload_area" v-else>
      <div class="upload_area_wrapper">
        <button class="upload_button">
          <i class="el-icon-picture-outline"></i>Subir foto
        </button>
        <input type="file" v-on:change="change">
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
  height: 113px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 1px 1px 1px 0 rgba(0, 0, 0, 0.05);
}
.banner_photo .upload_area_wrapper {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -2px;
  transform: scale(0.75);
  transition: all 0.2s;
}
.banner_photo:hover .upload_area_wrapper {
  margin-top: -37px;
  transform: scale(1);
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
.banner_photo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 2px;
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
  background-color: rgba(0, 0, 0, 0.1);
  color: #fff;
}
.banner_photo .upload_hover svg {
  margin-bottom: 5px;
}
.banner_photo:hover .upload_hover {
  display: grid;
}
.upload_area {
  width: 100%;
  height: 120px;
  display: grid;
  justify-content: center;
  align-content: center;
  grid-row-gap: 10px;
  border: 1px dashed #c4cdd5;
  background-color: #fff;
}
.upload_area_wrapper {
  position: relative;
  overflow: hidden;
}
.upload_area_wrapper input[type="file"] {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
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
</style>
