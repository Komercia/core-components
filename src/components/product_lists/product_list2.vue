<template>
  <div class="product_list">
    <div class="filter_column g-card">
      <koSearcher @searcher="Searchproduct" />
      <div class="lateral">
        <koCategories @selectionSubcategory="selectedSubCategory" @selectionCategory="selectedCategory" @clear="Allcategories" />
      </div>
      <div class="price_range" v-if="range.max">
        <h4>Filtro por precio</h4>
        <p>Elija un rango de precios para buscar</p>
        <el-slider v-model="price" range :step="50" :max="range.max">
        </el-slider>
        <div class="price_range_label">
          <p>Precio:
            <strong>{{ price[0] | currency }}</strong> -
            <strong>{{ price[1] | currency }}</strong>
          </p>
        </div>
      </div>
      <el-select v-model="HigherOrLower">
        <el-option label="Mayor precio" value="higher">
        </el-option>
        <el-option label="Menor precio" value="lower">
        </el-option>
      </el-select>
    </div>
    <div class="products">
      <div class="product_list_wrapper" v-if="products.length">
        <div class="products_list">
          <div :is="selectedCard" v-for="product in filterProduct" :key="product.id" :data="product"></div>
        </div>
        <div class="product_pagination" v-if="products.length > 12">
          <el-pagination background layout="prev, pager, next" :page-size="12" :total="products.length" :current-page.sync="currentPage">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import koCategories from '../_categories/categories_1'
import koSearcher from '../_components/searcher'
export default {
  name: 'koProductList2',
  components: { koCategories, koSearcher },
  created () {
    this.$store.dispatch('products/SET_FILTER', this.$route.query)
  },
  mounted () {
    if (this.$store.getters['products/filterProducts']) {
      this.products = this.$store.getters['products/filterProducts']
      let maxTMP = 0
      this.products.forEach(product => {
        if (maxTMP <= product.precio) {
          this.price[1] = product.precio
          this.range.max = parseInt(product.precio)
          maxTMP = product.precio
        }
      })
    }
  },
  data() {
    return {
      products: [],
      price: [0, 1000000],
      range: {
        max: 0
      },
      currentPage: 1,
      HigherOrLower: ''
    }
  },
  watch: {
    Fullproducts(value) {
      this.products = value
      let maxTMP = 0
      value.forEach(product => {
        if (maxTMP <= product.precio) {
          this.price[1] = product.precio
          this.range.max = parseInt(product.precio)
          maxTMP = product.precio
        }
      })
    },
    currentPage() {
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 250)
    },
    HigherOrLower(value) {
      if (value === 'higher') {
        this.products = this.Fullproducts.sort((a, b) => b.precio - a.precio)
      } else {
        this.products = this.Fullproducts.sort((a, b) => a.precio - b.precio)
      }
    },
    price() {
      this.filterRange()
    }
  },
  computed: {
    selectedCard () {
      return this.$store.state.selectedCard
    },
    Fullproducts() {
      return this.$store.getters['products/filterProducts']
    },
    filterProduct() {
      const initial = this.currentPage * 12 - 12
      const final = initial + 12
      return this.products.slice(initial, final)
    }
  },
  methods: {
    Allcategories() {
      this.currentPage = 1
    },
    Searchproduct(search) {
      this.currentPage = 1
    },
    selectedCategory (value) {
      this.currentPage = 1
    },
    selectedSubCategory(value) {
      this.currentPage = 1
    },
    filterRange() {
      this.products = this.Fullproducts.filter(producto => {
        if (
          producto.precio >= this.price[0] &&
          producto.precio <= this.price[1]
        ) {
          return producto
        }
      })
    }
  },
  filters: {
    currency(value) {
      if (value) {
        return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
      }
      return '$0'
    }
  }
}
</script>
<style scoped>
.product_list {
  padding: 10px;
  margin: 0 auto;
  max-width: 1366px;
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-column-gap: 20px;
  align-items: start;
}
.buttonclose {
  z-index: 0;
}
.responsive {
  display: none;
}
.filter_column {
  background-color: #f9f9f9;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  position: sticky;
  top: 120px;
}
.filter_column .el-select {
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
}
.filter_column .lateral {
  display: grid;
}
.price_range {
  padding: 10px 20px 5px 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  display: grid;
}
.price_range h4 {
  font-size: 14px;
  margin-bottom: 5px;
}
.price_range p {
  font-size: 12px;
  color: #7e7e7e;
}
.price_range_label {
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
  align-items: center;
}
.products .products_list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 10px;
}
.product_pagination {
  display: grid;
  justify-content: center;
  margin: 30px 0;
}
@media screen and (max-width: 840px) {
  .product_list {
    grid-template-columns: 1fr;
    grid-gap: 10px;
  }
  .filter_column {
    position: static;
  }
}
@media screen and (max-width: 525px) {
  .product_list {
    grid-template-columns: 1fr;
    padding: 0px;
  }
  .products .products_list {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    grid-gap: 5px;
  }
}
@media screen and (max-width: 375px) {
  .product_list {
    padding: 0;
  }
  .products .products_list {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    grid-gap: 5px;
  }
}
</style>
