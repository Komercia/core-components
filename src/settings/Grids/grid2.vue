<template>
  <div class="grid-categories">
    <div style="margin-top: 20px">
      <h3 class="title-categorie">Categorias</h3>
      <p class="description">Elige 4 categorias de tu preferencia para visusalizarlas en el componente</p>
      <el-checkbox-group v-model="settingData.data" :min="1" :max="4" size="medium" class="grid">
        <el-checkbox v-for="categoria in categorias" :key="categoria.id" :label="categoria.nombre_categoria_producto" border></el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'koGridSetting2',
  computed: {
    categorias() {
      return this.$store.state.categorias
    },
    settingData() {
      return this.$store.state.settingData
    }
  },
  watch: {
    categorias(value) {
      this.settingData.data = value
        .slice(0, 4)
        .map(category => category.nombre_categoria_producto)
    }
  },
  mounted() {
    if (this.$store.state.categorias.length) {
      this.settingData.data = this.categorias
        .slice(0, 4)
        .map(category => category.nombre_categoria_producto)
    }
  }
}
</script>

<style scoped>
.grid {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 20px;
  box-sizing: border-box;
}
.grid > label {
  margin-top: 10px;
  margin-left: 0 !important;
  background-color: #fff;
}
.title-categorie {
  text-align: center;
  font-size: 30px;
  font-weight: 300;
  background-color: transparent;
  margin-bottom: 20px;
}
.description {
  box-sizing: border-box;
  padding: 0 20px;
  line-height: 1.5;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.568);
  text-align: center;
}
</style>
