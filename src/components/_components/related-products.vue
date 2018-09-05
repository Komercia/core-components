<template>
  <div class="related">
    <h3 class="title">Productos relacionados</h3>
    <div class="grid-products">
      <!-- <div is="ko-product-card2" :data="product" v-for="product in productsData.slice(0,5)" :key="product.id"></div> -->
      <carousel ref="carousel" :spacePadding="0" :autoplay="autoplay" :paginationEnabled="paginationEnabled" :scrollPerPage="scrollPerPage" :perPageCustom="custom">
        <slide @click.native="redirecToStore(product.id)" v-for="product in productsData.slice(0,10)" :key="product.id">
          <div class="card" is="ko-product-card2" :data="product">

          </div>
        </slide>
      </carousel>
      <div class="container-arrows">
        <a class="left link-arrow" @click.prevent="prevSlide" v-show="currentPage">
          <left-arrow class="icon-arrow" /> </a>
        <a class="right link-arrow" @click.prevent="nextSlide" v-show="maxPage">
          <right-arrow class="icon-arrow" /> </a>
      </div>
    </div>
  </div>
</template>

<script>
import leftArrow from '../../Icons/left-arrow'
import rightArrow from '../../Icons/right-arrow'
export default {
  components: {
    leftArrow,
    rightArrow
  },
  props: {
    data: {},
    custom: {
      type: Array,
      default: [[520, 3], [930, 4], [1200, 4]]
    }
  },
  data() {
    return {
      // URL: 'https://api.komerci.co/api/front/tienda/364',
      scrollPerPage: true,
      perPageCustom: [[520, 3], [930, 4], [1200, 4]],
      paginationEnabled: false,
      autoplay: false,
      products: [],
      currentPage: 0,
      maxPage: true,
      loading: true
    }
  },
  computed: {
    productsData() {
      return this.$store.state.productsData.filter(
        product =>
          product.categoria ==
            this.data.detalle.categoria_producto.nombre_categoria_producto &&
          product.id !== this.data.detalle.id
      )
    }
  },
  methods: {
    nextSlide() {
      this.$refs.carousel.goToPage(this.$refs.carousel.getNextPage())
      this.handleSlide()
      console.log(this.$refs.carousel)
    },
    prevSlide() {
      this.$refs.carousel.goToPage(this.$refs.carousel.getPreviousPage())
      this.handleSlide()
      console.log(this.$refs.carousel)
    },
    handleSlide() {
      this.currentPage = this.$refs.carousel.currentPage
      this.widthPage()
    },
    widthPage() {
      if (this.currentPage == this.$refs.carousel.pageCount - 1) {
        this.maxPage = false
      } else {
        this.maxPage = true
      }
    },
    redirecToStore(id) {
      this.$router.push(`/producto/${id}`)
    }
  }
}
</script>

<style scoped>
.related {
  box-sizing: border-box;
  padding: 20px;
}
.title {
  font-size: 22px;
  font-weight: 300;
  text-transform: uppercase;
  margin-bottom: 20px;
}
.grid-products {
  position: relative;
}
.card {
  height: 100%;
  max-width: 250px;
  margin-right: 5px;
  /* min-width: 200px; */
}
.container-arrows {
  opacity: 0;
  width: 100%;
  top: 30%;
  /* left: -8px; */
  display: grid;
  grid-auto-flow: column;
  position: absolute;
  pointer-events: none;
  transition: opacity 0.5s ease;
}
.left {
  justify-self: start;
}
.right {
  justify-self: end;
}
.link-arrow {
  background-color: var(--background_color);
  box-shadow: 0px 2px 6px 2px rgba(238, 238, 238, 0.692);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  box-sizing: border-box;
  transition: all 0.6s ease 0s;
}
.link-arrow:hover {
  background-color: var(--main_color);
  box-shadow: none;
}
.icon-arrow {
  fill: var(--button_color);
  transition: all 0.6s ease 0s;
}
.link-arrow:hover .icon-arrow {
  fill: var(--background_color);
}
.grid-products:hover .container-arrows {
  opacity: 1;
}
.container-arrows > a {
  pointer-events: initial;
  cursor: pointer;
}
@media (max-width: 1200px) {
  .card {
    min-width: 150px;
  }
}
@media (max-width: 600px) {
  .card {
    min-width: 130px;
  }
  .related {
    padding: 0;
  }
  .title {
    margin: 20px 0 10px;
    font-size: 20px;
  }
}
</style>
