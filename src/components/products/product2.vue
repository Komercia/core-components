<template>
  <div class="product" v-show="data.detalle">
    <!-- <ko-modal v-show="modalPayment"></ko-modal> -->
    <div class="wrapper">
      <div class="section">
        <div class="photos">
          <div class="photos_selected">
            <image-cloudinary
              :src="setMiniPhoto(data.detalle.foto_cloudinary)"
              v-on:mouseover.native="selectedPhoto(data.detalle.foto_cloudinary)"
              :width="300"
            />
            <image-cloudinary
              v-for="(foto, index) in data.fotos"
              :key="index"
              :src="setMiniPhoto(foto.foto_cloudinary)"
              v-on:mouseover.native="selectedPhoto(foto.foto_cloudinary)"
              :width="300"
            />
          </div>
          <div class="photo_main">
            <zoomed
              v-if="data.detalle.foto !== 'placeholder1.svg'"
              v-show="!existYoutube"
              :photo="selectPhotoUrl"
            ></zoomed>
            <img :src="selectPhotoUrl" v-else class="photo_main_placeholder" />
            <iframe
              v-if="existYoutube"
              width="400"
              height="250"
              :src="`https://www.youtube.com/embed/${idYoutube}?rel=0&amp;controls=0&amp;showinfo=0`"
              frameborder="0"
              allowfullscreen
            ></iframe>
          </div>
        </div>
        <div class="photos responsive">
          <product-slide
            :photos="data.fotos"
            :photo="data.detalle.foto_cloudinary"
            :idYoutube="idYoutube"
          ></product-slide>
          <span @click="share()" class="sharing-phone"><i class="material-icons">share</i></span>
        </div>
        <div class="content">
          <h2 class="content_name">{{data.detalle.nombre}}</h2>
          <div class="content_buy_price">
            <h3 class="colorTexto price" v-show="salesData.precio">
              ${{ salesData.precio | currency }}
              <span>COP</span>
            </h3>
            <div class="shipping" v-if="envio.titulo == 'Envío gratis'">
              <i class="icon-023-free-delivery"></i>
              <p>{{envio.titulo}}</p>
            </div>
            <div class="shipping" v-if="envio.titulo == 'Tarifa por precio'">
              <i class="icon-019-fast-delivery"></i>
              <p v-if="priceShipping != 0">Envío: ${{priceShipping | currency}} COP</p>
              <p v-else>Envío Gratis</p>
            </div>
            <div class="shipping" v-if="envio.titulo == 'Tarifa plana'">
              <i class="icon-019-fast-delivery"></i>
              <p>Envío: ${{envios.valores.valor | currency}} COP</p>
            </div>
          </div>
          <div class="line"></div>

          <div class="quantity item-product">
            <p class="name-item">Cantidad:</p>
            <div class="ko-input" v-if="spent">
              <input type="text" value="1" v-model="quantityValue" :min="1" :max="maxQuantityValue" />
              <div class="icons-arrows">
                <i class="el-icon-arrow-up" v-on:click="addQuantity()"></i>
                <i class="el-icon-arrow-down" v-on:click="removeQuantity()"></i>
              </div>
              <transition name="slide-fade">
                <div class="container-alert" v-show="quantityValue == maxQuantityValue">
                  <span class="alert">
                    última Unidad!
                    <div class="arrow"></div>
                  </span>
                </div>
              </transition>
            </div>

            <div class="ko-input" v-else>
              <input
                type="text"
                value="1"
                v-model="quantityValue"
                :min="1"
                :max="maxQuantityValue"
                disabled
              />
              <div class="icons-arrows">
                <i class="el-icon-arrow-up" v-on:click="addQuantity()"></i>
                <i class="el-icon-arrow-down" v-on:click="removeQuantity()"></i>
              </div>
              <transition name="slide-fade">
                <div class="container-alert" v-show="salesData.estado == false">
                  <span class="alert not-available">
                    No disponible
                    <div class="arrow"></div>
                  </span>
                </div>
              </transition>
            </div>
          </div>
          <div class="marca item-product" v-show="data.info.marca">
            <p class="name-item">Marca:</p>
            <span>{{ data.info.marca | toLowerCase }}</span>
          </div>
          <div
            class="marca item-product"
            v-show="data.detalle.categoria_producto.nombre_categoria_producto"
          >
            <p class="name-item">Categoría:</p>
            <span>{{ data.detalle.categoria_producto.nombre_categoria_producto | toLowerCase }}</span>
          </div>
          <div class="content_variant">
            <div
              class="content_variant_item item-product"
              v-for="(variant, index) in data.variantes"
              :key="index"
            >
              <label>{{ variant.nombre }}:</label>
              <ko-radio-group :options="variant.valores" :index="index"></ko-radio-group>
            </div>
          </div>
          <div class="item-product sharing-desktop">
            <p class="name-item">Compartir:</p>
            <div class="wrapper-social-network">
              <a :href="`https://www.facebook.com/sharer.php?u=${this.currentUrl}`" target="_blank" @click="open('facebook')"><i class="fa fa-fw fa-facebook"></i></a>
              <a :href="`https://twitter.com/share?url=${this.currentUrl}&text=${this.data.detalle.nombre}&via=${this.currentUrl}`" target="_blank" @click="open('twitter')"><i class="fa fa-fw fa-twitter"></i></a>
              <a :href="`https://wa.me/?text=${this.data.detalle.nombre} ${this.currentUrl}`" target="_blank"><i class="fa fa-fw fa-whatsapp"></i></a>
            </div>
          </div>
          <div v-show="data.info.garantia" class="warranty item-product">
            <p class="name-item">Garantía:</p>
            <span>{{ data.info.garantia | toLowerCase }}</span>
          </div>
          <div class="item-product" :class="{content_buy: true, disabled: !salesData.estado}">
            <div class="wrapper-buttons">
              <div class="content_buy_action">
                <button v-if="spent" class="spent">
                  <i class="icon-shopping-basket"></i>
                  Producto agotado
                </button>
                <button v-else v-on:click="addShoppingCart">
                  <i class="icon-shopping-basket"></i>
                  Añadir al carrito
                </button>
              </div>
              <!-- <ko-whatsapp v-show="whatsapp" class="whatsapp" @click.native="redirectWhatsapp()" /> -->
            </div>
            <p
              v-show="precio == 0 || !precio"
              class="quotation"
            >Añada al carrito para agregar a la lista y recibir tu cotización</p>
          </div>
        </div>
      </div>
      <ko-description :data="data" :envio="envio"></ko-description>
    </div>
    <div class="purchase">
      <div class="ko-input">
        <input type="text" value="1" v-model="quantityValue" :min="1" :max="maxQuantityValue" />
        <div class="icons-arrows">
          <i class="el-icon-arrow-up" v-on:click="addQuantity()"></i>
          <i class="el-icon-arrow-down" v-on:click="removeQuantity()"></i>
        </div>
        <transition name="slide-fade">
          <div class="container-alert" v-show="quantityValue == maxQuantityValue">
            <span class="alert">
              última Unidad!
              <div class="arrow"></div>
            </span>
          </div>
        </transition>
      </div>
      <div class="content_buy_action">
        <button v-if="spent" class="spent">
          <i class="icon-shopping-basket"></i>
          Producto agotado
        </button>
        <button v-else v-on:click="addShoppingCart">
          <i class="icon-shopping-basket"></i>
          Añadir al carrito
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import zoomed from '../_components/zoomed'
import productSlide from '../_components/productSlide.vue'
// import koModal from "../_components/modal.vue";
import koRadioGroup from '../_components/radioGroup2'
import koDescription from '../_components/descriptionProduct2'
import koWhatsapp from '../../Icons/whatsapp'

export default {
  name: 'koProduct2',
  components: {
    zoomed,
    productSlide,
    // koModal,
    koRadioGroup,
    koDescription,
    koWhatsapp
  },
  created() {
    this.$store.commit('SET_BEFORECOMBINATION')
    if (this.$store.state.productsData.length) {
      this.getDataProduct()
    }
    if (Object.keys(this.$store.state.envios).length) {
      this.setOptionEnvio()
    }
  },
  mounted() {
    this.currentUrl = window.location
  },
  data() {
    return {
      swiperOption: {
        direction: 'vertical',
        pagination: '.swiper-pagination',
        setWrapperSize: true,
        slidesPerView: 4,
        freeMode: true,
        paginationClickable: true,
        grabCursor: true
      },
      data: {
        combinaciones: {
          combinaciones: '[{}]'
        },
        detalle: {
          id: 0,
          envio_gratis: 0,
          precio: 0,
          categoria_producto: {
            nombre_categoria_producto: ''
          }
        },
        info: {
          marca: ''
        },
        cantidad: 0
      },
      num1: 1,
      selectPhotoUrl: '',
      idYoutube: '',
      existYoutube: false,
      maxQuantityValue: 1,
      quantityValue: 1,
      productIndexCart: null,
      warranty: '',
      productCart: {},
      salesData: {
        precio: 0
      },
      spent: false,
      envio: {
        titulo: '',
        desc: ''
      },
      currentUrl:''
    }
  },
  watch: {
    productsData(value) {
      this.getDataProduct()
    },
    envios(value) {
      this.setOptionEnvio()
    },
    quantityValue(value) {
      if (value > this.maxQuantityValue) {
        this.quantityValue = this.maxQuantityValue
      }
    },
    beforeCombination(value) {
      const combinationSelected = JSON.stringify(value)

      const combinaciones = JSON.parse(this.data.combinaciones.combinaciones)

      const result = combinaciones.filter(
        (combinacion, index) =>
          JSON.stringify(combinacion.combinacion) == combinationSelected
      )[0]
      this.productCart = []
      this.productIndexCart = null
      for (const [
        index,
        productCart
      ] of this.$store.state.productsCart.entries()) {
        if (
          this.data.detalle.id == productCart.id &&
          JSON.stringify(productCart.combinacion) ==
            JSON.stringify(result.combinacion)
        ) {
          this.productIndexCart = index
          this.productCart = productCart
        }
      }
      if (result) {
        this.spent = false
        this.maxQuantityValue = result.unidades
        if (result.unidades == 0) {
          this.spent = true
        }
        if (this.productCart.cantidad) {
          this.maxQuantityValue =
            parseInt(result.unidades) - this.productCart.cantidad
          if (this.maxQuantityValue <= 0) {
            this.spent = true
          }
        }
        this.salesData = result
        this.quantityValue = 1
      }
    }
  },
  computed: {
    // url() {
    //   return window.location.href
    // },
    // currentUrl() {
    //   return window.location
    // },
    productsData() {
      return this.$store.state.productsData
    },
    existPayments() {
      const mediospago = this.$store.state.mediospago
      if (
        mediospago.consignacion ||
        mediospago.convenir ||
        mediospago.payco ||
        mediospago.tienda ||
        mediospago.efecty
      ) {
        return true
      }
      return false
    },
    modalPayment() {
      return this.$store.state.togglePayment
    },
    beforeCombination() {
      return this.$store.state.beforeCombination
    },
    envios() {
      return this.$store.state.envios
    },
    precio() {
      if (this.data.detalle.precio) {
        return `$${this.data.detalle.precio
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
      }
    },
    priceShipping() {
      let value = 0
      if (this.envios.valores.envio_metodo != null) {
        if (this.envios.valores.envio_metodo == 'precio') {
          let rangos = this.envios.valores.rangos.filter(
            r =>
              r.inicial <= this.salesData.precio &&
              r.final >= this.salesData.precio
          )
          if (rangos.length == 0) {
            value = 0
          } else {
            value = rangos[0].precio
          }
        }
      }
      return value
    },
    whatsapp() {
      return this.$store.state.whatsapp
    },
    category() {
      return this.productsData.filter(
        product =>
          product.categoria ==
            this.data.detalle.categoria_producto.nombre_categoria_producto &&
          product.id !== this.data.detalle.id
      )
    }
  },
  methods: {
    share() {
      navigator.share({
        title: this.data.detalle.nombre,
        url: `${this.currentUrl}/`
      })
    },
    open(networt) {
      switch (networt) {
        case 'facebook':
          this.PopupCenter(`https://www.facebook.com/sharer.php?u=${this.currentUrl}`, this.data.detalle.nombre, 600, 500)
          break;
        case 'whatsapp':
          this.PopupCenter(`https://wa.me/?text=${this.data.detalle.nombre} ${this.currentUrl}`)       
          break;
        case 'twitter':
          this.PopupCenter(`https://twitter.com/share?url=${this.currentUrl}&text=${this.data.detalle.nombre}`, this.data.detalle.nombre, 600, 500)     
          break;
      
        default:
          break;
      }
    },
    PopupCenter(url, title, w, h) {
    // Fixes dual-screen position                         Most browsers      Firefox
    let dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : window.screenX;
    let dualScreenTop = window.screenTop != undefined ? window.screenTop : window.screenY;

    let width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    let height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    let systemZoom = width / window.screen.availWidth;
    let left = (width - w) / 2 / systemZoom + dualScreenLeft
    let top = (height - h) / 2 / systemZoom + dualScreenTop
    let newWindow = window.open(url, title, 'scrollbars=yes, width=' + w / systemZoom + ', height=' + h / systemZoom + ', top=' + top + ', left=' + left);

    // Puts focus on the newWindow
    if (window.focus) newWindow.focus();
},
    searchIdForSlug() {
      const product = this.productsData.filter(
        product => product.slug === this.$route.params.slug
      )
      if (product.length) {
        return product[0].id
      }
      return this.productsData[0].id
    },
    mobileCheck() {
      window.mobilecheck = function() {
        var check = false
        ;(function(a) {
          if (
            /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
              a
            ) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
              a.substr(0, 4)
            )
          )
            check = true
        })(navigator.userAgent || navigator.vendor || window.opera)
        return check
      }
      return window.mobilecheck()
    },
    redirectWhatsapp() {
      if (this.mobileCheck()) {
        window.open(
          `https://wa.me/57${
            this.whatsapp
          }/?text=Hola%20vengo%20de%20tu%20tienda%20online%20y%20me%20gustaría%20recibir%20mas%20información`,
          '_blank'
        )
      } else {
        window.open(
          `https://web.whatsapp.com/send?phone=57${
            this.whatsapp
          }&text=Hola%20vengo%20de%20tu%20tienda%20online%20y%20me%20gustaría%20recibir%20mas%20información%20de%20este%20producto%20${
            window.location
          }`,
          '_blank'
        )
      }
    },
    getDataProduct() {
      const idOfSlug = this.searchIdForSlug()
      if (idOfSlug) {
        axios
          .get(`https://templates.komercia.co/api/producto/${idOfSlug}`)
          .then(response => {
            this.$store.commit('SET_DETALLEPRODUCTO', response.data.detalle)
            this.selectedPhoto(response.data.detalle.foto_cloudinary)
            this.videoYoutube(response.data.info.video)
            this.data = response.data
            this.setOptionEnvio()
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
    },
    togglePayment() {
      this.$store.state.togglePayment = !this.$store.state.togglePayment
    },
    setOptionEnvio() {
      if (this.data.detalle.envio_gratis) {
        this.envio = {
          titulo: 'Envío gratis',
          desc: 'Disfruta de este obsequio por parte de la tienda.'
        }
      } else {
        switch (this.envios.valores.envio_metodo) {
          case 'tarifa_plana':
            this.envio = {
              titulo: 'Tarifa plana',
              desc: `Compra todo lo que quieras en nuestra tienda, el valor del envio siempre sera el mismo: Valor envio $${
                this.envios.valores.valor
              }`
            }
            break
          case 'precio':
            this.envio = {
              titulo: 'Tarifa por precio',
              desc:
                'Segun la suma del costo de tus productos te cobraran el envio'
            }
            break
          case 'peso':
            this.envio = {
              titulo: 'Tarifa por peso',
              desc: ''
            }
            break
          default:
        }
      }
    },
    quantity(productCart) {
      this.quantityValue = productCart.cantidad
    },
    addQuantity() {
      if (this.maxQuantityValue > this.quantityValue) {
        this.quantityValue++
        this.data.cantidad = this.quantityValue
      } else {
        // Alerta de limite de sku
      }
    },
    removeQuantity() {
      if (this.data.cantidad >= 2) {
        this.quantityValue--
        this.data.cantidad = this.quantityValue
      }
    },
    setMiniPhoto(photo) {
      if (photo === 'placeholder1.svg') {
        return require(`../../assets/${photo}`)
      }
      return photo
    },
    selectedPhoto(photo) {
      if (photo === 'placeholder1.svg') {
        this.selectPhotoUrl = require(`../../assets/${photo}`)
      } else {
        this.selectPhotoUrl = photo
      }
      this.existYoutube = false
    },
    videoYoutube(url) {
      let myregexp = /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&]{10,12})/
      let id = ''
      if (url && url !== '' && url !== 'null') {
        this.validVideo = true
        let id = url.match(myregexp)
        if (id) {
          this.idYoutube = id[1]
        }
      }
    },
    addShoppingCart() {
      if (!this.data.cantidad) {
        this.data.cantidad = this.quantityValue
      }
      const product = {
        id: this.data.detalle.id,
        precio: this.salesData.precio,
        cantidad: this.data.cantidad,
        foto_cloudinary: this.data.detalle.foto_cloudinary,
        nombre: this.data.detalle.nombre,
        combinacion: this.salesData.combinacion
      }
      if (this.salesData) {
        product.limitQuantity = this.salesData.unidades
      } else {
        product.limitQuantity = this.data.info.inventario
      }
      if (typeof this.productIndexCart === 'number') {
        const mutableProduct = this.$store.state.productsCart[
          this.productIndexCart
        ]
        mutableProduct.cantidad += this.data.cantidad
        this.$store.state.productsCart.splice(
          this.productIndexCart,
          1,
          mutableProduct
        )
      } else {
        this.$store.state.productsCart.push(product)
      }
      this.$store.commit('UPDATE_CONTENTCART')
      this.$router.push('/productos')
      this.$store.state.openOrder = true
      this.$store.state.orderComponent = true
    },
    evalStock(mq, qv) {
      return !(mq - qv < 0)
    }
  },
  filters: {
    currency(value) {
      if (value) {
        return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
      }
      return 0
    },
    toLowerCase(value) {
      if (value) {
        return value.toLowerCase()
      }
      return ''
    }
  }
}
</script>
<style scoped>
.wrapper {
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 30px;
}
.section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
}
.photos {
  max-width: 650px;
  flex: 1.4;
  display: flex;
  justify-content: flex-start;
}
.photos.responsive {
  display: none;
  position: relative;
}
.photos_selected {
  width: 90px;
  display: flex;
  flex: none;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
}
.photos_selected img {
  width: 100%;
  box-shadow: 0 0px 5px 0px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  margin-bottom: 5px;
}
.quantity_available {
  font-size: 14px;
  color: #494949;
}
.photo_main {
  max-width: 100%;
  max-height: 640px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.photo_main_placeholder {
  width: 100%;
  height: 100px;
  object-fit: contain;
}
.content {
  max-width: 550px;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0 15px 15px 30px;
  text-transform: uppercase;
  color: var(--text_color);
  font-size: 14px;
  flex: 0.6;
}
i.close {
  color: black;
  align-self: flex-end;
  cursor: pointer;
}
.content_name {
  font-weight: 600;
  font-size: 20px;
  color: var(--text_color);
  text-transform: uppercase;
  line-height: 1;
}
.content_buy {
  flex: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 7px 0;
}
.content_buy > button {
  display: none;
}
.wrapper-buttons {
  width: 100%;
  flex: none;
  display: flex;
  align-items: center;
  margin: 7px 0;
}
.whatsapp {
  fill: #27d367;
  width: 40px;
  cursor: pointer;
  margin-left: 20px;
}
.content_buy.disabled > button {
  width: 200px;
  position: absolute;
  display: flex;
  background-color: #fff;
  padding: 13px 40px;
  border-style: none;
  border-radius: 2px;
  outline: none;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1), 0 3px 10px rgba(0, 0, 0, 0.07);
  z-index: 2;
}
.content_buy_price {
  display: grid;
  align-items: flex-end;
  position: relative;
}
.content_buy_price h3 {
  font-weight: 300;
  font-size: 18px;
  color: var(--text_color);
}
.content_buy_price p {
  margin-bottom: 8px;
  color: var(--text_color);
}
.content_buy_action {
  display: flex;
  justify-content: center;
  margin: 5px 0;
  align-items: center;
}
.content_buy_action button {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px 20px;
  align-items: center;
  color: #fff;
  border-style: none;
  background-color: var(--main_color);
  font-size: 13px;
  cursor: pointer;
  text-transform: uppercase;
  outline: none;
  transition: 0.3s;
  transition: all 0.2s ease;
}
.content_buy_action button:hover {
  transform: scale(1.02);
}
.content_buy_action button.spent {
  background-color: #eee;
  pointer-events: none;
  color: #333;
}
.content_buy_action button i {
  font-size: 19px;
  margin-right: 10px;
  vertical-align: middle;
}
.content_desc {
  display: flex;
  flex-direction: column;
  padding: 30px 0;
  margin-right: 20px;
  font-size: 14px;
  line-height: 1.5;
  overflow-y: auto;
  text-align: justify;
  word-break: break-word;
}
.content_desc * {
  color: var(--text_color);
}
.content_variant {
  display: flex;
  flex-direction: column;
}
.content_variant_item {
  display: flex;
  align-items: center;
}
.content_variant_item label {
  color: var(--text_color);
  width: 150px;
}
.quantity {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.quantity p {
  font-style: normal;
}
.quantity_remove,
.quantity_add {
  border-style: none;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.1);
  padding: 5px 10px;
  display: flex;
  align-items: center;
  outline: none;
  cursor: pointer;
  transition: 0.3s;
}
.quantity_value {
  margin: 0 10px;
  font-weight: normal;
  color: #333;
}
.quantity_remove:hover,
.quantity_add:hover,
#actionAddCart:hover {
  transform: scale(1.1);
}
.quantity_remove i,
.quantity_add i {
  color: #333;
  font-size: 14px;
  font-weight: bold;
  pointer-events: none;
}
.features {
  max-width: 500px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  padding: 30px 0px;
}
.features_item {
  width: 500px;
  min-height: 155px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f1f1f1;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
  margin: 10px 0;
  padding: 0 25px;
}
.features_item:nth-child(2) img {
  align-self: flex-end;
}
.features_item_info {
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.features_item_info h3 {
  font-size: 16px;
  color: var(--text_color);
}
.features_item_info p {
  font-size: 14px;
  margin: 8px 0;
  color: var(--text_color);
}
.features_item_info button {
  border-style: none;
  background-color: transparent;
  font-size: 12px;
  font-weight: bold;
  color: var(--main_color);
  cursor: pointer;
  outline: none;
}
.features_item .epayco {
  width: 85%;
  margin: 8px 0;
}
.features_item .efecty {
  max-width: 200px;
  max-height: 200px;
}
.features_item .convenir {
  max-width: 100px;
  max-height: 100px;
}
.features_item .tienda {
  max-width: 100px;
  max-height: 100px;
}
.zoom {
  margin: 0 !important;
  border: 1px solid #eee !important;
}
.line {
  width: 100%;
  border-top: 1px solid #eee;
  margin: 0 0 20px 0;
}
.ko-input {
  position: relative;
  width: 100px;
}
.ko-input input {
  padding: 12px 0 12px 12px;
  border-radius: 4px;
  border: 1px solid #eee;
  width: 100%;
  box-sizing: border-box;
}
.ko-input input:focus {
  outline: none;
}
.icons-arrows {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: 0;
  border-left: 1px solid #eee;
  height: 100%;
  width: 30px;
  justify-content: space-around;
  align-items: center;
}
.icons-arrows i {
  padding: 2px 6px;
  cursor: pointer;
  font-size: 12px;
  color: #333;
  opacity: 0.5;
}
.icons-arrows i:hover {
  color: #333;
  opacity: 1;
}
.item-product {
  margin-bottom: 30px;
  display: flex;
}
.item-product span {
  font-size: 14px;
  text-transform: capitalize !important;
  color: var(--text_color);
}
.name-item {
  width: 150px;
  display: inline-block;
  display: flex;
  align-items: center;
}
.container-alert {
  position: absolute;
  top: -60px;
  right: 0;
  width: 80px;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #333;
}
.alert {
  text-align: center;
  padding: 5px 5px;
  text-transform: capitalize;
}
.arrow {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 10px solid rgb(231, 231, 231);
  position: absolute;
  bottom: -10px;
}
input[type='text']:disabled {
  background: #eee;
}
.not-available {
  color: #ffafaf !important;
}
.quotation {
  font-size: 12px;
  text-transform: initial !important;
  color: var(--text_color);
  text-align: left;
  align-self: flex-start;
}
.price {
  font-size: 14px;
}
.shipping p {
  font-size: 12px;
  color: var(--text_color);
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 5px;
}
.shipping i {
  font-size: 20px;
  vertical-align: middle;
  color: rgb(0, 162, 255);
  padding-right: 5px;
}
.purchase {
  display: none;
}
.swiper-container {
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
}
.swiper-wrapper {
  height: 100%;
}
.swiper-slide:nth-child(1) {
  padding-top: 0;
}
.swiper-slide {
  box-sizing: border-box;
  padding: 4px 0;
}
.swiper-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.icons-share {
  cursor: pointer !important;
}
.wrapper-social-network {
  width: 100px;
  display: flex;
  justify-content: space-between;
}
.wrapper-social-network a{
  text-decoration: none;
  padding: 2px 3px;
  transition: all ease .3s;
}
.wrapper-social-network a:nth-child(1){
  background-color: transparent;
  border: 1px solid #3b5998;
  color: #3b5998;
}
.wrapper-social-network a:nth-child(1):hover{
  background-color: #3b5998;
  border: 1px solid #3b5998;
  color: #fff;
}
.wrapper-social-network a:nth-child(2){
  background-color: transparent;
  border: 1px solid #1da1f2;
  color: #1da1f2;
}
.wrapper-social-network a:nth-child(2):hover{
  background-color: #1da1f2;
  border: 1px solid #1da1f2;
  color: #fff;
}
.wrapper-social-network a:nth-child(3){
  background-color: transparent;
  border: 1px solid #08c65b;
  font-size: 18px;
  padding: 0 1px;
  color: #08c65b;
}
.wrapper-social-network a:nth-child(3):hover{
  background-color: #08c65b;
  border: 1px solid #08c65b;
  color: #fff;
}
.sharing-phone {
  display: none;
}
@media (max-width: 1150px) {
  .section:nth-child(2) {
    flex-direction: column;
  }
  .features {
    max-width: 100%;
  }
  .features_item {
    max-width: 500px;
    width: 100%;
  }
}
@media (max-width: 1000px) {
  .section:nth-child(1) {
    flex-direction: column;
  }
  .content {
    width: 100%;
    height: initial;
    padding-top: 20px;
    padding-left: 0;
  }
}
@media (max-width: 710px) {
  .sharing-desktop {
    display: none;
  }
  .sharing-phone {
    position: absolute;
    font-size: 12px;
    right: 5px;
    top: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: transparent;
    padding: 6px;
    background: rgba(238, 238, 238, 0.441);
    cursor: pointer;
    z-index: 9;
    border: 1px solid #444;
    display: flex;
    justify-content: center;
    align-items: center;
}
.sharing-phone i {
  font-size: 16px;
  z-index: 9;
  color: #444;
  display: flex;
  justify-content: center;
  align-items: center;
}
  .product {
    position: relative;
    width: 100%;
    min-height: 97vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 70px;
  }
  i.close {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .wrapper {
    padding: 15px;
  }
  .quantity {
    display: none;
  }
  .purchase {
    display: flex;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    right: 0;
    width: 100%;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 8px 16px;
    align-items: center;
    box-shadow: 0 0 36px 8px rgba(96, 125, 139, 0.169);
    z-index: 99999999;
  }
  .content_buy {
    margin: 0;
  }
  .wrapper-buttons {
    margin: 0;
    /* justify-content: flex-end; */
  }
  .wrapper-buttons button {
    display: none;
  }
  .content_buy .quotation {
    display: none;
  }
  .section {
    margin: 0;
  }
}
@media (max-width: 600px) {
  .photos {
    max-width: 100%;
    width: 100%;
    display: none;
  }
  .photos.responsive {
    display: flex;
  }
  .content_name {
    font-size: 16px;
  }
}
@media (max-width: 510px) {
  .content {
    padding: 20px 0;
  }
  .swiper-container {
    height: initial !important;
  }
}
@media (max-width: 320px) {
  .features_item {
    flex-direction: column;
  }
  .features_item_info {
    text-align: center;
    margin: 10px 0;
  }
}
</style>
