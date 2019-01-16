<template>
  <div
    class="product"
    v-if="data.detalle"
  >
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
            <img
              v-if="idYoutube"
              :src="`https://img.youtube.com/vi/${idYoutube}/0.jpg`"
              v-show="idYoutube"
              v-on:mouseover="existYoutube = true"
            >
          </div>
          <div class="photo_main">
            <zoomed
              v-if="data.detalle.foto !== 'placeholder1.svg'"
              v-show="!existYoutube"
              :photo="selectPhotoUrl"
            >
            </zoomed>
            <img
              :src="selectPhotoUrl"
              v-else
              class="photo_main_placeholder"
            >
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
          <product-slide
            :photos="data.fotos"
            :photo="data.detalle.foto_cloudinary"
          ></product-slide>
        </div>
        <div class="content">
          <h2 class="content_name">{{data.detalle.nombre}}</h2>
          <div class="content_buy_price">
            <h3
              class="colorTexto"
              v-show="salesData.precio"
            >${{ salesData.precio | currency }}</h3>
            <p
              class="colorTexto"
              v-show="salesData.precio"
            >COP</p>
          </div>
          <p>
            <strong>{{ data.info.marca }}</strong>
          </p>
          <!-- <p>{{beforeCombination}}</p> -->
          <div class="content_variant">
            <div
              class="content_variant_item"
              v-for="(variant, index) in data.variantes"
            >
              <label>{{ variant.nombre }}:</label>
              <ko-radio-group
                :options="variant.valores"
                :index="index"
              ></ko-radio-group>
            </div>
          </div>
          <div :class="{content_buy: true, disabled: !salesData.estado}">
            <button
              type="button"
              name="button"
            >No esta disponible</button>
            <div>
              <div
                class="quantity"
                v-show="!spent"
              >
                <em>Cantidad:</em>
                <button
                  class="quantity_remove"
                  v-on:click="removeQuantity()"
                >
                  <i class="material-icons">remove</i>
                </button>
                <p class="quantity_value"> {{ quantityValue }}</p>
                <button
                  class="quantity_add"
                  v-on:click="addQuantity()"
                >
                  <i class="material-icons">add</i>
                </button>
                <!-- <p class="quantity_available" v-if="evalStock(maxQuantityValue, quantityValue)">{{ maxQuantityValue - quantityValue }} disponibles</p> -->
              </div>
              <div class="content_buy_action">
                <button
                  v-if="spent"
                  class="spent"
                >Producto agotado
                  <i class="material-icons">add_shopping_cart</i>
                </button>
                <button
                  v-else
                  v-on:click="addShoppingCart"
                >Agregar
                  <i class="material-icons">add_shopping_cart</i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section">
        <div
          class="content_desc"
          v-if="data.info.descripcion && data.info.descripcion.length > 12"
        >
          <h3>Descripción del producto</h3>
          <div v-html="data.info.descripcion"></div>
        </div>
        <div class="features">
          <div class="features_item">
            <img
              src="http://res.cloudinary.com/komercia-store/image/upload/v1536696054/komercia/cards.png"
              alt=""
            >
            <div class="features_item_info">
              <h3>Pagos online</h3>
              <p>Contamos con diferentes medios de pago para que realices tus compras por internet </p>
              <button
                v-show="existPayments"
                v-on:click="togglePayment"
              >VER MEDIOS DE PAGOS</button>
            </div>
          </div>
          <div
            class="features_item"
            v-show="envios.estado"
          >
            <img
              src="http://res.cloudinary.com/komercia-store/image/upload/v1536696043/komercia/mensajero.png"
              alt=""
            >
            <div class="features_item_info">
              <h3>{{ envio.titulo }}</h3>
              <p>{{ envio.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import zoomed from "../_components/zoomed.vue";
import productSlide from "../_components/productSlide.vue";
import koModal from "../_components/modal.vue";
import koRadioGroup from "../_components/radioGroup";
export default {
  name: "koProduct1",
  components: { zoomed, productSlide, koModal, koRadioGroup },
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
      switch (this.envios.valores.envio_metodo) {
        case "gratis":
          this.envio = {
            titulo: "Envío gratis",
            desc: "Disfruta de este obsequio por parte de la tienda."
          };
          break;
        case "tarifa_plana":
          this.envio = {
            titulo: "Tarifa plana",
            desc: `Compra todo lo que quieras en nuestra tienda, el valor del envio siempre sera el mismo: Valor envio $${
              this.envios.valores.valor
            }`
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
    }
  }
};
</script>

<style scoped>
.wrapper {
  max-width: 1100px;
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
}
.photos {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.photos.responsive {
  display: none;
}
.photos_selected {
  width: 80px;
  display: flex;
  flex: none;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
}
.photos_selected img {
  width: 100%;
  box-shadow: 0 0px 5px 0px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  cursor: pointer;
  margin: 5px;
}
.quantity_available {
  font-size: 14px;
  color: #494949;
}
.photo_main {
  max-width: 450px;
  max-height: 400px;
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
}
.photo_main_placeholder {
  width: 450px;
}
.content {
  width: 350px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 15px;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
}
i.close {
  color: black;
  align-self: flex-end;
  cursor: pointer;
}
.content_name {
  font-weight: normal;
  color: var(--text_color);
  margin: 7px 0;
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
  align-items: center;
  margin: 7px 0;
}
.content_buy.disabled > button {
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
.content_buy.disabled > div {
  pointer-events: none;
  filter: blur(5px);
  opacity: 0.2;
}
.content_buy_price {
  display: flex;
  align-items: flex-end;
  margin: 10px 0;
}
.content_buy_price h3 {
  font-weight: normal;
  font-size: 40px;
  color: var(--text_color);
}
.content_buy_price p {
  margin-bottom: 8px;
  color: var(--text_color);
}
.content_buy_action {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 5px 0;
}
.content_buy_action button {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 5px 20px;
  align-items: center;
  color: #fff;
  border-style: none;
  background-color: var(--main_color);
  font-size: 13px;
  cursor: pointer;
  outline: none;
  transition: 0.3s;
}
.content_buy_action button.spent {
  background-color: #b0b0b0;
  pointer-events: none;
}
.content_buy_action button:hover {
  transform: scale(0.9);
}
.content_buy_action button i {
  font-size: 19px;
  margin-left: 10px;
  padding: 4px 0px;
  padding-left: 10px;
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
  margin: 5px 0;
}
.content_variant_item {
  display: flex;
  align-items: center;
}
.content_variant_item label {
  margin-right: 10px;
  color: #333;
}
.quantity {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  /*justify-content: center;*/
  align-items: center;
  margin: 5px;
}
.quantity em {
  text-align: center;
  margin-right: 10px;
  font-size: 13px;
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
  background-color: rgba(255, 255, 255, 0.2);
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
