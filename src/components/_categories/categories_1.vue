<template lang="html">
 <div class="container">
    <div class="normal">
      <ul  class="Cate" v-for="category in categories" >
        <span>{{category.nombre_categoria_producto}}</span>
        <div class="content">
        <li class="SubCate"
          v-for="subcategory in subcategories"
          v-if="category.id===subcategory.categoria"
          @click="Sendsubcategory(subcategory.id)">
        <span>{{subcategory.nombre_subcategoria}}</span>
        </li>
        </div>
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
  name: 'koCategories',
  data() {
    return {
      selectSubcategory:'',
        value: '',
        valuesub: ''
    }
  },
  watch:{
    valuesub:function (value) {
      this.Sendsubcategory(value)
    }
  },
  methods: {
        handleOpen(key, keyPath) {},
        handleClose(key, keyPath) {},
        Sendsubcategory(value){
          this.selectSubcategory=value
          this.$emit("SelectionSubcategory",this.selectSubcategory)
        }
      },
  computed:{
      categories(){
        return this.$store.state.categorias;
      },
      subcategories(){
        return this.$store.state.subcategorias;
      }
  }

}
</script>

<style scoped>
.container{

}
.normal{
  display: flex;
  flex-direction: column;
  margin:0;
}
.responsive{
  display: none;
}
.normal .Cate{
  width: 165px;
  padding: 15px;
  background-color: #f9f9f9;
  margin: 5px;
  border:solid 1px #b2b4b7;
  border-radius: 5px;
  position: relative;
  margin-right: 0;
}
.normal .SubCate{
  border-radius: 5px;
}
.normal .content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    border-radius: 5px;
    top: 0;


}
.Cate:hover{
  background-color: #d0d0d0;
}
.content li {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    height: 25px;

}
.content li:hover{
  background-color: #d0d0d0;
}
.Cate:hover .content {
    display: block;
    cursor: pointer;
    transform: translate(180px);
}
@media screen and (max-width:800px) {
  .normal{
    display: none;
  }
  .responsive{
    display: flex;
    flex-direction: column;
    margin:5px;
  }

  }

</style>
