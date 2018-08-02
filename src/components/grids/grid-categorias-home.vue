<template>
  <div class="grid-categories">
    <nav>
      <ul class="list-categories">
        <li class="tab" v-for="(item, index) in categorias.slice(0, 4)" :key="index" @click="selected(item.nombre_categoria_producto)" :class="{tab: true, selected: select == item.nombre_categoria_producto}">
          {{ item.nombre_categoria_producto }}
        </li>
      </ul>
    </nav>
    <div class="grid-products">
      <div class="card" v-for="(product, index) in productsData.slice(0,5)" :key="index">
        <div class="img-product">
          <img :src="`https://api.komercia.co/tumb/${product.foto}`" :alt="product.name">
        </div>
        <div class="description-product">
          <p class="name-product">{{product.nombre.slice(0,25)}}</p>
          <p class="price">{{product.precio | currency}}
            <s>{{ product.precio * 1.2 | currency }}</s>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'gridCategorias',
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
      return this.$store.state.productsData.filter(
        product => product.categoria == this.select
      )
    }
  },
  watch: {
    categorias(value) {
      this.select = value[0].nombre_categoria_producto
    }
  },
  methods: {
    selected(name) {
      this.select = name
    }
  },
  filters: {
    currency(value) {
      if (value) {
        return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
      }
    }
  }
}
</script>

<style scoped>
.grid-categories {
  width: 100%;
  height: auto;
  margin-top: 100px;
}
nav {
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
}
.list-categories {
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.grid-products {
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(5, minmax(250px, 1fr));
  /* grid-template-rows: 20vw; */
  grid-gap: 20px;
  grid-auto-flow: column;
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
.card:hover {
  /* box-shadow: 0px 0px 6px 6px rgba(238, 238, 238, 0.658); */
}
.tab {
  background-color: #fff;
  border: 1px solid #fff;
  padding: 12px 20px;
  text-transform: uppercase;
  letter-spacing: 1.5;
  font-size: 16px;
  outline: none;
  cursor: pointer;
  color: #333;
  margin: 0 auto;
}
.selected {
  border: 1px solid #333;
}
.description-product {
  background-color: #333;
  /* flex: 1; */
  /* height: 20%; */
}
.img-product {
  /* flex: 1; */
  width: 100%;
  height: 80%;
  cursor: pointer;
  border: 1px solid transparent;
  box-sizing: border-box;
  /* background-color: #333; */
}
.img-product > img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.name-product {
  margin: 20px 0 10px 20px;
  text-align: left;
  text-transform: capitalize;
  font-weight: 400;
  font-size: 15px;
  letter-spacing: 1.5;
  display: inline-block;
  color: #fff;
}
.name-product:hover {
  color: #f49a86;
  cursor: pointer;
}
.price {
  margin-left: 20px;
  margin-bottom: 10px;
  font-weight: 400;
  font-size: 13px;
  letter-spacing: 1.5;
  color: rgb(228, 228, 228);
  padding-bottom: 10px;
}
s {
  color: rgb(116, 116, 116);
  padding-left: 20px;
}
@media (max-width: 1660px) {
  .grid-products .card:nth-child(5) {
    display: none;
  }
  .grid-products {
    grid-template-columns: repeat(4, minmax(300px, 300px));
    justify-content: center;
  }
}
@media (max-width: 1310px) {
  .grid-products .card:nth-child(4) {
    display: none;
  }
  .grid-products {
    grid-template-columns: repeat(3, minmax(250px, 300px));
  }
}
@media (max-width: 810px) {
  .grid-products .card:nth-child(3) {
    display: none;
  }
  .grid-products {
    grid-template-columns: repeat(2, minmax(145px, 300px));
  }
}
@media (max-width: 620px) {
  .tab {
    font-size: 14px;
  }
  nav {
    max-width: 550px;
  }
  .name-product {
    font-size: 13px;
    margin-top: 10px;
  }
  .price {
    font-size: 11px;
    margin-bottom: 0;
  }
  .grid-products {
    grid-gap: 10px;
    padding: 0 10px;
  }
}
@media (max-width: 450px) {
  .tab {
    font-size: 12px;
  }
  .name-product {
    font-size: 11px;
    /* margin-top: 10px; */
  }
  .price {
    font-size: 9px;
    /* margin-bottom: 0; */
  }
}
@media (max-width: 350px) {
  s {
    padding-left: 10px;
  }
}
</style>
