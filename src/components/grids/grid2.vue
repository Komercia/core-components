<template>
  <div class="grid-categories">
    <nav>
      <ul class="list-categories">
        <li class="tab" v-for="(item, index) in setting.data" :key="index" @click="selected(item)" :class="{tab: true, selected: select == item}">
          {{ item }}
        </li>
      </ul>
    </nav>
    <div class="grid-products">
      <ko-card2 :product="product" class="card" v-for="(product, index) in productsData.slice(0,5)" :key="index">
      </ko-card2>
    </div>
  </div>
</template>

<script>
import koCard2 from '../_productCard/product-card2'
export default {
  name: 'koGrid2',
  components: { koCard2 },
  props: {
    setting: {
      type: Object,
      default: function() {
        return {
          data: []
        }
      }
    }
  },
  created() {
    if (this.$store.state.categorias.length) {
      if (!this.setting.data.length) {
        this.setting.data = this.$store.state.categorias
          .slice(0, 4)
          .map(category => category.nombre_categoria_producto)
      }
    }
  },
  data() {
    return {
      select: ''
    }
  },
  computed: {
    productsData() {
      return this.$store.state.productsData.filter(
        product => product.categoria == this.select
      )
    },
    categories() {
      return this.$store.state.categorias
    }
  },
  watch: {
    'setting.data': function(value) {
      this.select = value[0]
    },
    categories(value) {
      if (!this.setting.data.length) {
        this.setting.data = value
          .slice(0, 4)
          .map(category => category.nombre_categoria_producto)
      }
    }
  },
  methods: {
    selected(name) {
      this.select = name
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
  max-width: 700px;
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
  margin: 30px auto;
  display: grid;
  grid-template-columns: repeat(5, minmax(250px, 1fr));
  /* grid-template-rows: 20vw; */
  grid-gap: 20px;
  grid-auto-flow: column;
  padding: 0 20px;
  box-sizing: border-box;
  justify-content: center;
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
  .grid-products {
    grid-gap: 10px;
    padding: 0 10px;
  }
}
@media (max-width: 450px) {
  .tab {
    font-size: 12px;
  }
}
</style>
