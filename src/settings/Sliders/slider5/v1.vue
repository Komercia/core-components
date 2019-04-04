<template>
  <div class="slider_setting">
    <el-card class="box-card">
      <p class="label">Enlace de la pagina o elemento</p>
      <el-input v-model="settingData.url_iframe" placeholder="Escribir url del iframe">
        <template slot="prepend">
          <i class="el-icon-edit"></i>
        </template>
      </el-input>
    </el-card>
    <el-card class="box-card">
      <p class="label">Tamaño del baner</p>
      <el-input-number v-model="settingData.size_iframe" :min="40" :max="70"></el-input-number>
    </el-card>
    <div class="reference">
      <a href="https://guia360.com.co/es/publish" target="_blank" class="reference__logo">
        <img src="https://guia360.com.co/img/logo_40x55.png" alt="guia360">
      </a>
      <a href="https://guia360.com.co/es/publish" target="_blank">
        <h3>Guia360</h3>
      </a>
      <p>Este componente se integra de manera correcta con un recorrido 360</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "koSliderSetting5",
  data() {
    return {};
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
  }
};
</script>

<style scoped>
.slider_setting {
  display: grid;
  align-content: start;
  align-items: start;
  grid-gap: 10px;
  padding: 5px;
}
.slider_setting * {
  color: #272b31;
}
.label {
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: 600;
}
.reference {
  display: grid;
  grid-auto-flow: column;
  grid-template: auto auto / auto auto;
  grid-column-gap: 10px;
  font-size: 14px;
  align-items: center;
}
.reference__logo {
  width: 50px;
  grid-row: 1 / span 2;
}
</style>
