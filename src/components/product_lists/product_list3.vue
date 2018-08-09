<template>
  <div class="product-list">
    <div class="header">
      {{select.nombre_categoria_producto}}
    </div>
    <div class="container-grid">
      <div class="products">
        <div class="left">
          <div class="categories">
            <h3 class="title-categories">Categorias</h3>
            <ul class="list-categories">
              <li class="item-categorie" @click="selected(categoria)" v-for="(categoria, index) in categorias" :key="index">{{categoria.nombre_categoria_producto}}</li>
            </ul>
          </div>

        </div>
        <div class="right products">
          <div class="grid-products">
            <ko-card2 :product="product" class="card" v-for="(product, index) in productsData.slice(0,20)" :key="index">
            </ko-card2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import koCard2 from '../_productCard/product-card2'
export default {
  name: 'koProductList3',
  components: { koCard2 },
  data() {
    return {
      select: ''
    }
  },
  computed: {
    categorias() {
      return this.$store.state.categorias
    },
    productsData() {
      return this.$store.state.productsData
    }
  },
  methods: {
    selected(name) {
      this.select = name
    }
  }
  // getProductsCategorie() {

  // }
}
</script>

<style scoped>
.header {
  background-color: #000;
  color: #fff;
  width: 100%;
  height: 160px;
  font-size: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
}
.container-grid {
  margin-top: 150px;
}
.left {
  /* background-color: aqua; */
  flex: 0.16;
  padding: 0 20px;
  box-sizing: border-box;
}
.right {
  flex: 1;
}
.products {
  display: flex;
  max-width: 1600px;
  margin: 0 auto;
  align-items: flex-start;
}
.title-categories {
  font-size: 19px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(218, 218, 218, 0.644);
}
.list-categories {
  margin-top: 20px;
}
.item-categorie {
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 10px 0;
  font-size: 14px;
  line-height: 1.5;
  color: #555;
  font-weight: 400;
  cursor: pointer;
}
.item-categorie:hover {
  color: #000;
}
.grid-products {
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, minmax(250px, 1fr));
  grid-gap: 20px;
  padding: 0 20px;
  box-sizing: border-box;
}
.card {
  background-color: #fff;
  box-sizing: border-box;
  border: 1px solid #333;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
