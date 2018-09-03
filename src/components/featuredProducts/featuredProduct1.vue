<template>
  <div class="featured">
    <div class="section left">
      imagen
      <img src="" alt="">
      <div class="content-thumbs"></div>
    </div>
    <div class="section right">
      <h2 class="title-product">title product</h2>
      <p class="price">price $12.234</p>
      <div class="tabs">
        <nav>
          <ul>
            <li>Description</li>
            <li>Details</li>
          </ul>
        </nav>
        <div class="content-desccription">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, dolore?</div>
        <div class="content-datails">Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, dolores?</div>
      </div>
      <div class="share-product"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {}
    }
  },
  computed: {
    productsData() {
      return this.$store.state.productsData
    }
  },
  methods: {
    searchIdForSlug() {
      const product = this.productsData.filter(
        product => product.slug === this.$route.params.slug
      )
      if (product.length) {
        return product[0].id
      }
      return this.productsData[0].id
    },
    getDataProduct() {
      const idOfSlug = this.searchIdForSlug()
      if (idOfSlug) {
        axios
          .get(`https://templates.komercia.co/api/producto/${idOfSlug}`)
          .then(response => {
            this.selectedPhoto(response.data.detalle.foto_cloudinary)
            this.videoYoutube(response.data.info.video)
            this.data = response.data
            this.salesData = {
              precio: this.data.detalle.precio,
              unidades: this.data.info.inventario,
              sku: this.data.info.sku,
              estado: true
            }
            this.maxQuantityValue = this.data.info.inventario
            for (const [
              index,
              productCart
            ] of this.$store.state.productsCart.entries()) {
              if (this.data.detalle.id == productCart.id) {
                this.productIndexCart = index
                this.productCart = productCart
                this.maxQuantityValue =
                  this.data.info.inventario - productCart.cantidad
              }
            }
            if (this.salesData.unidades == 0 || this.maxQuantityValue <= 0) {
              this.spent = true
            }
          })
      } else {
        this.selectedPhoto(this.productsData[0].foto_cloudinary)
        // this.videoYoutube(this.productsData[0].foto);
        this.data.detalle = {
          foto_cloudinary: this.productsData[0].foto_cloudinary,
          nombre: this.productsData[0].nombre,
          precio: this.productsData[0].precio
        }
        this.data.info = {
          marca: '',
          descripcion: ''
        }
        this.maxQuantityValue = 0
        this.salesData = {
          precio: 29998,
          unidades: 0,
          sku: '4a00'
        }
        this.spent = true
      }
    }
  }
}
</script>

<style scoped>
.featured {
  max-width: 800px;
  width: 100%;
  background-color: royalblue;
  margin: 0 auto;
  display: flex;
}
.section {
  flex: 1;
}
</style>
