<template>
  <div class="grid-categories">
    <div style="margin-top: 20px">
      <el-checkbox-group v-model="checkboxGroup6" size="mini" disabled>
        <el-checkbox label="Opción1" border></el-checkbox>
        <el-checkbox label="Opción2" border></el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'koGridSetting2',
  data() {
    return {
      checkboxGroup6: []
    }
  },
  computed: {
    categorias() {
      return this.$store.state.categorias
    }
  }
}
</script>

<style scoped>
</style>
