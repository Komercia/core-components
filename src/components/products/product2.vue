<template>
  <div class="product" v-if="data.detalle">
    <ko-modal v-show="modalPayment"></ko-modal>
    <div class="wrapper">
      <div class="section">
        <div class="photos">
          <div class="photos_selected">
            <image-cloudinary
              :src="setMiniPhoto(data.detalle.foto_cloudinary)"
              v-on:mouseover.native="selectedPhoto(data.detalle.foto_cloudinary)"
            />
            <image-cloudinary
              :src="setMiniPhoto(foto.foto_cloudinary)"
              v-on:mouseover.native="selectedPhoto(foto.foto_cloudinary)"
              v-for="foto in data.fotos"
            />
            <image-cloudinary
              v-if="idYoutube"
              :src="`https://img.youtube.com/vi/${idYoutube}/0.jpg`"
              v-show="idYoutube"
              v-on:mouseover="existYoutube = true"
            />
          </div>
          <div class="photo_main">
            <zoomed
              v-if="data.detalle.foto !== 'placeholder1.svg'"
              v-show="!existYoutube"
              :photo="selectPhotoUrl"
            ></zoomed>
            <img :src="selectPhotoUrl" v-else class="photo_main_placeholder">
            <iframe
              v-show="existYoutube"
              width="400"
              height="250"
              :src="`https://www.youtube.com/embed/${idYoutube}?rel=0&amp;controls=0&amp;showinfo=0`"
              frameborder="0"
              allowfullscreen
            ></iframe>
          </div>
        </div>
        <div class="photos responsive">
          <product-slide :photos="data.fotos" :photo="data.detalle.foto_cloudinary"></product-slide>
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
              <input type="text" value="1" v-model="quantityValue" :min="1" :max="maxQuantityValue">
              <div class="icons-arrows">
                <i class="el-icon-arrow-up" v-on:click="addQuantity()"></i>
                <i class="el-icon-arrow-down" v-on:click="removeQuantity()"></i>
              </div>
              <transition name="slide-fade">
                <div class="container-alert" v-show="quantityValue == maxQuantityValue">
                  <span class="alert">última Unidad!
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
              >
              <div class="icons-arrows">
                <i class="el-icon-arrow-up" v-on:click="addQuantity()"></i>
                <i class="el-icon-arrow-down" v-on:click="removeQuantity()"></i>
              </div>
              <transition name="slide-fade">
                <div class="container-alert" v-show="salesData.estado == false">
                  <span class="alert not-available">No disponible
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
            <p class="name-item">Categoria:</p>
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
          <!-- <div class="content_variant">
            <p class="name-item">Compartir:</p>
            <social-sharing :url="url" :title="data.detalle.nombre" :description="data.info.descripcion" :quote="data.info.descripcion" :hashtags="`${data.info.marca}, ${data.detalle.categoria_producto.nombre_categoria_producto}, ${data.detalle.subcategoria_producto.nombre_subcategoria}`" inline-template v-cloak>
              <div>
                <network network="facebook">
                  <i class="fa fa-fw fa-facebook"></i>
                </network>
                <network network="pinterest">
                  <i class="fa fa-fw fa-pinterest"></i>
                </network>
                <network network="twitter">
                  <i class="fa fa-fw fa-twitter"></i>
                </network>
                <network network="whatsapp">
                  <i class="fa fa-fw fa-whatsapp"></i>
                </network>
              </div>
            </social-sharing>
          </div>-->
          <div class="item-product" :class="{content_buy: true, disabled: !salesData.estado}">
            <!-- <button type="button" name="button">No esta disponible</button> -->
            <div>
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
            <p
              v-if="precio == 0 || !precio"
              class="quotation"
            >Añada al carrito para agregar a la lista y recibir tu cotización</p>
          </div>
        </div>
      </div>
      <!-- <div class="section">
        <div class="content_desc" v-if="data.info.descripcion && data.info.descripcion.length > 12">
          <h3>Descripción del producto</h3>
          <div v-html="data.info.descripcion"></div>
        </div>
        <div class="features">
          <div class="features_item">
            <img src="../../assets/cards.png" alt="">
            <div class="features_item_info">
              <h3>Pagos online</h3>
              <p>Contamos con diferentes medios de pago para que realices tus compras por internet </p>
              <button v-show="existPayments" v-on:click="togglePayment">VER MEDIOS DE PAGOS</button>
            </div>
          </div>
          <div class="features_item" v-show="envios.estado">
            <img src="../../assets/mensajero.png" alt="">
            <div class="features_item_info">
              <h3>{{ envio.titulo }}</h3>
              <p>{{ envio.desc }}</p>
            </div>
          </div>
        </div>
      </div>-->
      <ko-description :data="data" :envio="envio"></ko-description>
      <ko-related :data="data"/>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import zoomed from "../_components/zoomed.vue";
import productSlide from "../_components/productSlide.vue";
import koModal from "../_components/modal.vue";
import koRadioGroup from "../_components/radioGroup2";
import koDescription from "../_components/descriptionProduct2";
import koRelated from "../_components/related-products";

export default {
  name: "koProduct2",
  components: {
    zoomed,
    productSlide,
    koModal,
    koRadioGroup,
    koDescription,
    koRelated
  },
  created() {
    this.$store.state.beforeCombination = [];
    if (this.$store.state.productsData.length) {
      this.getDataProduct();
    }
  },
  mounted() {
    if (Object.keys(this.$store.state.envios).length) {
      this.setOptionEnvio();
    }
  },
  data() {
    return {
      data: {},
      num1: 1,
      selectPhotoUrl: "",
      idYoutube: "",
      existYoutube: false,
      maxQuantityValue: 1,
      quantityValue: 1,
      productIndexCart: null,
      warranty: "",
      productCart: {},
      salesData: null,
      spent: false,
      envio: {
        titulo: "",
        desc: ""
      }
    };
  },
  watch: {
    productsData(value) {
      this.getDataProduct();
    },
    envios(value) {
      this.setOptionEnvio();
    },
    quantityValue(value) {
      if (value > this.maxQuantityValue) {
        this.quantityValue = this.maxQuantityValue;
      }
    },
    beforeCombination(value) {
      const combinationSelected = JSON.stringify(value);
      const combinaciones = JSON.parse(this.data.combinaciones.combinaciones);
      const result = combinaciones.filter(
        (combinacion, index) =>
          JSON.stringify(combinacion.combinacion) == combinationSelected
      )[0];
      this.productCart = [];
      this.productIndexCart = null;
      for (const [
        index,
        productCart
      ] of this.$store.state.productsCart.entries()) {
        if (
          this.data.detalle.id == productCart.id &&
          JSON.stringify(productCart.combinacion) ==
            JSON.stringify(result.combinacion)
        ) {
          this.productIndexCart = index;
          this.productCart = productCart;
        }
      }
      if (result) {
        this.spent = false;
        this.maxQuantityValue = result.unidades;
        if (result.unidades == 0) {
          this.spent = true;
        }
        if (this.productCart.cantidad) {
          this.maxQuantityValue =
            parseInt(result.unidades) - this.productCart.cantidad;
          if (this.maxQuantityValue <= 0) {
            this.spent = true;
          }
        }
        this.salesData = result;
        this.quantityValue = 1;
      }
    }
  },
  computed: {
    url() {
      return window.location.href;
    },
    productsData() {
      return this.$store.state.productsData;
    },
    existPayments() {
      const mediospago = this.$store.state.mediospago;
      if (
        mediospago.consignacion ||
        mediospago.convenir ||
        mediospago.payco ||
        mediospago.tienda ||
        mediospago.efecty
      ) {
        return true;
      }
      return false;
    },
    modalPayment() {
      return this.$store.state.togglePayment;
    },
    beforeCombination() {
      return this.$store.state.beforeCombination;
    },
    envios() {
      return this.$store.state.envios;
    },
    precio() {
      if (this.data.detalle.precio) {
        return `$${this.data.detalle.precio
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
      }
    },
    priceShipping() {
      let value = 0;
      if (this.envios.valores.envio_metodo != null) {
        if (this.envios.valores.envio_metodo == "precio") {
          let rangos = this.envios.valores.rangos.filter(
            r =>
              r.inicial <= this.salesData.precio &&
              r.final >= this.salesData.precio
          );
          // si no exiten rangos
          if (rangos.length == 0) {
            value = 0;
            // Existen rangos
          } else {
            value = rangos[0].precio;
          }
        }
      }
      return value;
    }
  },
  methods: {
    searchIdForSlug() {
      const product = this.productsData.filter(
        product => product.slug === this.$route.params.slug
      );
      if (product.length) {
        return product[0].id;
      }
      return this.productsData[0].id;
    },
    getDataProduct() {
      const idOfSlug = this.searchIdForSlug();
      if (idOfSlug) {
        axios
          .get(`https://templates.komercia.co/api/producto/${idOfSlug}`)
          .then(response => {
            this.selectedPhoto(response.data.detalle.foto_cloudinary);
            this.videoYoutube(response.data.info.video);
            this.data = response.data;
            this.setOptionEnvio();
            this.salesData = {
              precio: this.data.detalle.precio,
              unidades: this.data.info.inventario,
              sku: this.data.info.sku,
              estado: true
            };
            this.maxQuantityValue = this.data.info.inventario;
            for (const [
              index,
              productCart
            ] of this.$store.state.productsCart.entries()) {
              if (this.data.detalle.id == productCart.id) {
                this.productIndexCart = index;
                this.productCart = productCart;
                this.maxQuantityValue =
                  this.data.info.inventario - productCart.cantidad;
              }
            }
            if (this.salesData.unidades == 0 || this.maxQuantityValue <= 0) {
              this.spent = true;
            }
          });
      } else {
        this.selectedPhoto(this.productsData[0].foto_cloudinary);
        // this.videoYoutube(this.productsData[0].foto);
        this.data.detalle = {
          foto_cloudinary: this.productsData[0].foto_cloudinary,
          nombre: this.productsData[0].nombre,
          precio: this.productsData[0].precio
        };
        this.data.info = {
          marca: "",
          descripcion: ""
        };
        this.maxQuantityValue = 0;
        this.salesData = {
          precio: 29998,
          unidades: 0,
          sku: "4a00"
        };
        this.spent = true;
      }
    },
    togglePayment() {
      this.$store.state.togglePayment = !this.$store.state.togglePayment;
    },
    setOptionEnvio() {
      if (this.data.detalle.envio_gratis) {
        this.envio = {
          titulo: "Envío gratis",
          desc: "Disfruta de este obsequio por parte de la tienda."
        };
      } else {
        switch (this.envios.valores.envio_metodo) {
          case "tarifa_plana":
            this.envio = {
              titulo: "Tarifa plana",
              desc: "Este costo de envio no varia"
            };
            break;
          case "precio":
            this.envio = {
              titulo: "Tarifa por precio",
              desc:
                "Segun la suma del costo de tus productos te cobraran el envio"
            };
            break;
          case "peso":
            this.envio = {
              titulo: "Tarifa por peso",
              desc: ""
            };
            break;
          default:
        }
      }
    },
    quantity(productCart) {
      this.quantityValue = productCart.cantidad;
    },
    addQuantity() {
      if (this.maxQuantityValue > this.quantityValue) {
        this.quantityValue++;
        this.data.cantidad = this.quantityValue;
      } else {
        // Alerta de limite de sku
      }
    },
    removeQuantity() {
      if (this.data.cantidad >= 2) {
        this.quantityValue--;
        this.data.cantidad = this.quantityValue;
      }
    },
    setMiniPhoto(photo) {
      if (photo === "placeholder1.svg") {
        return require(`../../assets/${photo}`);
      }
      return photo;
    },
    selectedPhoto(photo) {
      if (photo === "placeholder1.svg") {
        this.selectPhotoUrl = require(`../../assets/${photo}`);
      } else {
        this.selectPhotoUrl = photo;
      }
      this.existYoutube = false;
    },
    videoYoutube(video) {
      if (video) {
        const index = video.indexOf("?v=") + 3;
        this.idYoutube = video.substring(index);
      }
    },
    addShoppingCart() {
      if (!this.data.cantidad) {
        this.data.cantidad = this.quantityValue;
      }
      const product = {
        id: this.data.detalle.id,
        precio: this.salesData.precio,
        cantidad: this.data.cantidad,
        foto_cloudinary: this.data.detalle.foto_cloudinary,
        nombre: this.data.detalle.nombre,
        combinacion: this.salesData.combinacion
      };
      if (this.salesData) {
        product.limitQuantity = this.salesData.unidades;
      } else {
        product.limitQuantity = this.data.info.inventario;
      }
      if (typeof this.productIndexCart === "number") {
        const mutableProduct = this.$store.state.productsCart[
          this.productIndexCart
        ];
        mutableProduct.cantidad += this.data.cantidad;
        this.$store.state.productsCart.splice(
          this.productIndexCart,
          1,
          mutableProduct
        );
      } else {
        this.$store.state.productsCart.push(product);
      }
      this.$store.commit("UPDATE_CONTENTCART");
      this.$router.push("/productos");
      this.$store.state.openOrder = true;
      this.$store.state.orderComponent = true;
    },
    evalStock(mq, qv) {
      return !(mq - qv < 0);
    }
  },
  filters: {
    currency(value) {
      if (value) {
        return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
      }
      return 0;
    },
    toLowerCase(value) {
      if (value) {
        return value.toLowerCase();
      }
      return "";
    }
  }
};
</script>
<style scoped>
/*@import 'https://unpkg.com/komercia-fuentes@1.0.2/styles.css';*/
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
  /* align-items: center; */
}
.photos.responsive {
  display: none;
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
  /* border-radius: 4px; */
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
  /* margin-right: 10px; */
  /* border: 1px solid #eee; */
}
.photo_main_placeholder {
  width: 100%;
  height: 100px;
  object-fit: contain;
}
.content {
  max-width: 550px;
  width: 100%;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0 15px 15px 30px;
  text-transform: uppercase;
  color: #333;
  font-size: 14px;
  flex: 0.6;
  /* box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05); */
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
.content_buy > div {
  width: 100%;
  flex: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin: 7px 0;
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
/* .content_buy.disabled > div {
  pointer-events: none;
  filter: blur(5px);
  opacity: 0.2;
} */
.content_buy_price {
  display: grid;
  align-items: flex-end;
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
  /* box-shadow: 3px 4px 10px -2px rgba(0, 0, 0, 0.288); */
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
  /* padding: 4px 0px; */
  /* padding-left: 10px; */
  vertical-align: middle;
}
.content_desc {
  display: flex;
  flex-direction: column;
  color: black;
  padding: 30px 0;
  margin-right: 20px;
  font-size: 14px;
  line-height: 1.5;
  overflow-y: auto;
  text-align: justify;
  word-break: break-word;
}
.content_desc * {
  color: #333;
}
.content_variant {
  display: flex;
  flex-direction: column;
  /* margin: 5px 0; */
}
.content_variant_item {
  display: flex;
  align-items: center;
}
.content_variant_item label {
  /* margin-right: 10px; */
  color: #333;
  width: 150px;
}
.quantity {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  /*justify-content: center;*/
  align-items: center;
  /* margin: 5px; */
}
.quantity p {
  /* text-align: center; */
  /* margin-right: 10px; */
  /* font-size: 13px; */
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
  color: var(--text_color);
  opacity: 0.5;
}
.icons-arrows i:hover {
  color: var(--text_color);
  opacity: 1;
}
.item-product {
  margin-bottom: 30px;
  display: flex;
}
.item-product span {
  font-size: 14px;
  text-transform: capitalize !important;
  color: #999;
}
.name-item {
  width: 150px;
  display: inline-block;
}
.container-alert {
  position: absolute;
  top: -60px;
  right: 0;
  width: 80px;
  background-color: var(--background_color);
  border: 1px solid #eee;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
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
input[type="text"]:disabled {
  background: #eee;
}
.not-available {
  color: #ffafaf !important;
}
.quotation {
  font-size: 12px;
  text-transform: initial !important;
  color: #999;
  text-align: left;
  align-self: flex-start;
}
.price {
  font-size: 14px;
}
.shipping p {
  font-size: 12px;
  color: #999;
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
  }
}
@media (max-width: 710px) {
  .product {
    position: relative;
    width: 100%;
    min-height: 97vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  i.close {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .wrapper {
    padding: 5px;
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
