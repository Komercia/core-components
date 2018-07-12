<template>
  <div class="product_list">
    <div class="filter_column">
      <koSearcher @searcher="Searchproduct"/>
      <div class="lateral">
        <koCategories
          @selectionSubcategory="selectedSubCategory"
          @selectionCategory="selectedCategory"/>
      </div>
      <div class="price_range" v-if="range.max">
        <h4>Filtro por precio</h4>
        <p>Elija un rango de precios para buscar</p>
        <el-slider
          v-model="price"
          range
          :step="50"
          :max="range.max">
        </el-slider>
        <div class="price_range_label">
          <button class="btn-filter" @click="filterRange">Filtrar</button>
          <p>Precio: <strong>{{ price[0] | currency }}</strong> - <strong>{{ price[1] | currency }}</strong></p>
        </div>
      </div>
    </div>
    <div class="products">
      <div class="product_list_wrapper" v-if="products.length">
          <div class="products_list">
            <ko-product-card v-for="product in filterProduct" :key="product.id" :data="product" />
          </div>
          <div class="product_pagination">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="products.length"
              :current-page.sync="currentPage">
            </el-pagination>
         </div>
      </div>
    </div>
  </div>
</template>

<script>
import KoProductCard from '../_productCard/product-card'
import koCategories from '../_categories/categories_1'
import koSearcher from '../_components/searcher'
export default {
  name: 'koProductList2',
  components: { KoProductCard, koCategories, koSearcher },
  created() {
    this.products = this.$store.state.productsData
  },
  data() {
    return {
      paginate: ['products'],
      products: [],
      active: false,
      price: [0, 1000000],
      range: {
        max: 0,
      },
      currentPage: 1,
      options: {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: ['nombre']
      }
    }
  },
  watch: {
    '$store.state.productsData': function(value) {
      this.products = value
      value.forEach((product) => {
        if (this.range.max < product.precio) {
          this.price[1] = product.precio
          this.range.max = product.precio
        }
        this.range.max = product.precio
      })
    },
    currentPage() {
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 250)
    }
  },
  computed: {
    Fullproducts() {
      return this.$store.state.productsData
    },
    sizePagination() {
      return Math.ceil(this.products.length / 12)
    },
    filterProduct() {
      const initial = this.currentPage * 12 - 12
      const final = initial + 12
      return this.products.slice(initial, final)
    }
  },
  methods: {
    Activeselect() {
      this.active = !this.active
    },
    Allcategories() {
      this.products = this.$store.state.productsData
      this.active = !this.active
      this.currentPage = 1
    },
    Searchproduct(search) {
      if (search != '') {
        this.$search(search, this.Fullproducts, this.options).then(results => {
          this.products = results
          this.active = !this.active
        })
      } else {
        this.products = this.$store.state.productsData
      }
      this.currentPage = 1
    },
    selectedCategory (value) {
      this.products = this.Fullproducts.filter(
        product => product.categoria === value
      )
      this.active = !this.active
      this.currentPage = 1
    },
    selectedSubCategory(value) {
      this.products = this.Fullproducts.filter(
        product => product.subcategoria === value
      )
      this.active = !this.active
      this.currentPage = 1
    },
    filterRange (value) {
      this.products = this.Fullproducts.filter(producto => {
        if (
          producto.precio >= this.price[0] &&
          producto.precio <= this.price[1]
        ) {
          return producto
        }
      })
    },
  },
  filters: {
    currency(value) {
      if (value) {
        return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
      }
      return '$0';
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
.filter_column{
  background-color: #f9f9f9;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 4px;
  position: sticky;
  top: 20px;
}
.filter_column .lateral {
  display: grid;
}
.price_range {
  padding: 10px 20px 5px 20px;
  border-top: 1px solid rgba(0,0,0,0.1);
  display: grid;
}
.price_range h4{
  font-size: 14px;
  margin-bottom: 5px;
}
.price_range p{
  font-size: 12px;
  color: #7e7e7e;
}
.price_range_label{
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
  align-items: center;
}
.btn-filter{
  outline: none;
  border-style: none;
  background-color: var(--button_color);
  color: var(--button_text_color);
  padding: 5px 15px;
  cursor: pointer;
}
.products .products_list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 10px;
}
.product_pagination{
  display: grid;
  justify-content: center;
}
@media screen and (max-width: 840px) {
  .product_list{
    grid-template-columns: 1fr;
    grid-gap: 10px;
  }
  .filter_column{
    position: static;
  }
}
@media screen and (max-width: 525px) {
  .product_list{
    grid-template-columns: 1fr;
    padding: 0px;
  }
  .products .products_list {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    grid-gap: 5px;
  }
}
@media screen and (max-width: 375px) {
  .product_list{
    padding: 0;
  }
  .products .products_list {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    grid-gap: 5px;
  }
}
</style>
