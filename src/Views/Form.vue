<template>
  <div class="form">
    <div class="box">
      <h2 class="title">Nuevo Componente</h2>
      <br>
      <el-row :gutter="18">
        <el-col
          :span="10"
          :offset="2"
        >
          <p class="subtitle bold">Tipo de componente</p>
          <el-select
            v-model="value"
            placeholder="Select"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col
          :span="10"
          :offset="0"
        >
          <p class="subtitle bold">Cargar Thumb del componente</p>
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button
              size="small"
              type="primary"
            >Clic para subir imagen</el-button>
            <div
              slot="tip"
              class="el-upload__tip"
            >Solo archivos jpg/png con un tamaño menor de 500kb</div>
          </el-upload>
        </el-col>
      </el-row>
      <br>
      <el-row :gutter="18">
        <el-col
          :span="20"
          :offset="2"
        >
          <p class="subtitle bold">Opciones de componente</p>
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >Marcar todos</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group
            v-model="checkedCities"
            @change="handleCheckedCitiesChange"
          >
            <el-checkbox
              v-for="city in cities"
              :label="city"
              :key="city"
            >{{city}}</el-checkbox>
          </el-checkbox-group>
        </el-col>
      </el-row>
      <br>
      <br>
      <el-row>
        <el-col
          :span="2"
          :offset="20"
        >
          <el-button type="primary">Crear</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
const cityOptions = ["Imagen", "Orden", "Boton", "Titulo"];
export default {
  data() {
    return {
      options: [
        {
          value: "Option1",
          label: "Header"
        },
        {
          value: "Option2",
          label: "Banner"
        },
        {
          value: "Option3",
          label: "Footer"
        },
        {
          value: "Option4",
          label: "Separator"
        },
        {
          value: "Option5",
          label: "Content"
        }
      ],
      value: "",
      fileList: [],
      checkAll: false,
      checkedCities: ["Imagen", "Orden"],
      cities: cityOptions,
      isIndeterminate: true
    };
  },
  methods: {
    handleExceed(files, fileList) {
      this.$message.warning(
        `El límite es 3, haz seleccionado ${
          files.length
        } archivos esta vez, añade hasta ${files.length + fileList.length}`
      );
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    }
  }
};
</script>

<style scoped>
.form {
  background-color: rgba(243, 243, 243, 0.705);
  max-width: 100%;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box {
  max-width: 900px;
  width: 100%;
  min-height: 400px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 5px 36px 12px rgba(180, 180, 180, 0.13);
  overflow-x: hidden;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 25px 15px;
}
.title {
  text-align: center;
  font-weight: 400;
  font-size: 22px;
  margin: 15px 0;
  color: #2c3c5a;
}
.bold {
  font-weight: 600;
}
.subtitle {
  line-height: 1;
  margin-bottom: 7px;
}
.el-select {
  width: 100%;
}
</style>
