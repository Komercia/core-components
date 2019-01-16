<template lang="html">
 <div class="container">
    <div class="normal">
      <ul class="categories_list">
        <li
          class="categories_item g-item"
          v-for="category in categories">
          <p @click="sendCategory(category.nombre_categoria_producto)">{{category.nombre_categoria_producto}}</p>
          <ul class="content">
            <li class="subcategories_item"
              v-for="subcategory in subcategories"
              v-if="category.id===subcategory.categoria"
              @click="Sendsubcategory(subcategory.id)">
              <span>{{subcategory.nombre_subcategoria}}</span>
            </li>
          </ul>
        </li>
        <li
          class="categories_item g-item">
          <p @click="clear">Todos los productos</p>
        </li>
      </ul>
    </div>
    <div class="responsive">
      <el-select v-model="value" clearable placeholder="Seleccione una categoria" >
          <el-option
          v-for="category in categories"
          :label="category.nombre_categoria_producto"
          :value="category.id">
          </el-option>
      </el-select>
      <el-select v-model="valuesub"  clearable placeholder="Seleccione una subcategoria" v-if="value !== ''">
          <el-option
          v-for="subcategory in subcategories"
          v-if="value === subcategory.categoria"
          :label="subcategory.nombre_subcategoria"
          :value="subcategory.id">
          </el-option>
      </el-select>
    </div>
 </div>

  </div>

</template>
<script>
export default {
  name: "koCategories",
  data() {
    return {
      selectSubcategory: "",
      value: "",
      valuesub: ""
    };
  },
  watch: {
    value(value) {
      this.sendCategory(value);
    },
    valuesub(value) {
      this.Sendsubcategory(value);
    }
  },
  methods: {
    Sendsubcategory(value) {
      this.selectSubcategory = value;
      this.$store.dispatch("products/FILTER_BY", {
        type: "subcategory",
        data: value
      });
    },
    sendCategory(value) {
      this.$store.dispatch("products/FILTER_BY", {
        type: "category",
        data: value
      });
    },
    clear() {
      this.$store.dispatch("products/FILTER_BY", { type: "all", data: "" });
      this.$emit("clear");
    }
  },
  computed: {
    categories() {
      return this.$store.state.categorias;
    },
    subcategories() {
      return this.$store.state.subcategorias;
    }
  }
};
</script>

<style scoped>
.container {
  width: 100%;
}
.normal {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0;
}
.responsive {
  display: none;
}
.categories_item {
  width: 100%;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
}
.categories_item ~ .categories_item {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
.categories_item > p {
  width: 100%;
  box-sizing: border-box;
  padding: 15px;
  color: #555555;
  font-size: 15px;
  text-align: start;
}
.normal .subcategories_item {
  border-radius: 5px;
  z-index: 9999999999;
}
.normal .content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 5px;
  top: 0;
  z-index: 99999999999;
}
.categories_item:hover {
  background-color: #d0d0d0;
}
.content li {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  height: 25px;
}
.content li:hover {
  background-color: #d0d0d0;
}
.categories_item:hover .content {
  display: block;
  cursor: pointer;
  transform: translate(230px);
}
@media screen and (max-width: 840px) {
  .normal {
    display: none;
  }
  .responsive {
    display: flex;
    flex-direction: column;
    margin: 5px;
  }
}
</style>
