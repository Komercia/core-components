<template>
  <transition name="fade">
    <div
      class="order"
      @click="closeOrder"
      v-show="openOrder"
    >
      <div class="order_content">
        <div class="order_header">
          <h3>Tu Orden</h3>
          <button
            @click="closeOrder"
            class="order_header_close"
          >Cerrar</button>
        </div>
        <transition name="slide">
          <template v-if="layoutLogin">
            <div class="order--wrapper">
              <div class="order_products">
                <ul class="order_products_list">
                  <li
                    class="order_products_list_item"
                    v-for="(product, index) in productsCart"
                  >
                    <div class="photo">
                      <img :src="product.foto_cloudinary">
                    </div>
                    <div class="name">
                      <p>{{ product.nombre | capitalize }}</p>
                      <p class="item_info_price">{{ product.precio | currency }}</p>
                      <p>{{ product.cantidad }} und</p>
                    </div>
                    <div>
                      <p>{{ (product.precio * product.cantidad) | currency }}</p>
                    </div>
                    <i
                      class="material-icons delete"
                      v-on:click="deleteItemCart(index)"
                    >clear</i>
                  </li>
                </ul>
              </div>
              <template v-if="productsCart.length">
                <div class="order_total">
                  <span class="order_total_domicile">
                    <p>Costo domicilio</p>
                    <p v-if="shipping">{{ shipping | currency }}</p>
                    <p class="without_shipping_cost" v-else>No tiene costo de envió</p>
                  </span>
                  <span class="order_total_net">
                    <p>Total a pagar</p>
                    <p>{{ (totalCart + shipping) | currency }}</p>
                  </span>
                </div>
                <button
                  class="p_button"
                  @click="createQuotation"
                  v-if="userData.id && isQuotation()"
                >Cotizar</button>
                <button
                  class="p_button"
                  @click="toggleLayout"
                  v-else-if="isQuotation()"
                >Iniciar sesión</button>
                <button
                  class="p_button"
                  @click="GoPayments"
                  v-else
                >Finalizar compra</button>
              </template>
              <br>
              <button
                class="continue_shopping"
                @click="closeOrder"
              >Seguir comprando</button>
            </div>
          </template>
          <template v-else>
            <div class="order__login">
              <button
                @click="toggleLayout"
                class
              >
                <i class="material-icons">arrow_back</i>
                <p>Ver Resumen de la orden</p>
              </button>
              <login
                style="position: absolute; top: 51px;"
                @authenticated="toggleLayout"
              />
            </div>
          </template>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from "axios";
import login from "../_components/login.vue";

export default {
  name: "koOrder1",
  components: { login },
  data() {
    return {
      layoutLogin: true
    };
  },
  computed: {
    configHttp() {
      return this.$store.state.configHttp;
    },
    userData() {
      return this.$store.state.userData;
    },
    openOrder() {
      return this.$store.state.openOrder;
    },
    totalCart() {
      return this.$store.state.totalCart;
    },
    productsCart() {
      return this.$store.state.productsCart;
    },
    shipping() {
      if (this.$store.state.envios.estado) {
        let shipping = this.$store.state.envios.valores;
        switch (shipping.envio_metodo) {
          case "gratis":
            return 0;
            break;
          case "tarifa_plana":
            return shipping.valor;
            break;
          case "precio":
            let result = shipping.rangos.find(rango => {
              if (
                this.totalCart >= rango.inicial &&
                this.totalCart <= rango.final
              ) {
                return rango;
              }
            });
            if (result) {
              return result.precio;
            } else {
              return 0;
            }
            break;
          default:
        }
      } else {
        return 0;
      }
    }
  },
  methods: {
    isQuotation() {
      let result = false;
      this.productsCart.forEach(product => {
        if (product.precio === 0) result = true;
      });
      return result;
    },
    deleteItemCart(i) {
      this.$store.state.productsCart.splice(i, 1);
      this.$store.commit("UPDATE_CONTENTCART");
    },
    closeOrder(event) {
      const element = event.target.className;
      if (
        element === "order" ||
        element === "order_header_close" ||
        element === "continue_shopping"
      ) {
        this.$store.state.openOrder = false;
      }
    },
    GoPayments() {
      let json = {
        products: this.$store.state.productsCart,
        tienda: {
          id: this.$store.state.tienda.id_tienda,
          nombre: this.$store.state.tienda.nombre,
          logo: this.$store.state.tienda.logo,
          location: window.location.href
        },
        tipo: 0,
        total: this.$store.state.totalCart,
        estado: 0,
        direccion_entrega: 1
      };
      json = JSON.stringify(json);
      if (this.$store.state.productsCart.length != 0) {
        location.href = `https://checkout.komercia.co/?params=${json}`;
      }
    },
    async createQuotation() {
      let quotation = {
        productos: this.$store.state.productsCart,
        tienda: this.$store.state.tienda.id_tienda,
        tipo: 1,
        total: this.$store.state.totalCart,
        estado: 0,
        direccion_entrega: 1,
        metodo_pago: "7",
        costo_envio: this.shipping,
        usuario: this.userData.id
      };
      const response = await axios.post(
        `https://api2.komercia.co/api/usuario/orden`,
        quotation,
        this.configHttp
      );
      this.$store.state.openOrder = false;
      this.$store.state.productsCart = [];
      this.$store.commit("UPDATE_CONTENTCART");
      this.$notify.success({
        title: "Cotización enviada!",
        message: "Pronto te enviaremos un correo con los precios."
      });
    },
    toggleLayout() {
      this.layoutLogin = !this.layoutLogin;
    }
  },
  filters: {
    currency(value) {
      if (value) {
        return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
      }
    },
    capitalize(value) {
      if (value) {
        value = value.toLowerCase();
        return value.replace(/^\w|\s\w/g, l => l.toUpperCase());
      }
    }
  }
};
</script>

<style scoped>
.order {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 3;
}
.order_content {
  position: absolute;
  right: 0px;
  max-width: 400px;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: none;
  overflow: auto;
  box-sizing: border-box;
  padding-bottom: 10px;
  animation: dispatch 0.2s linear 1;
  overflow: hidden;
}
@keyframes dispatch {
  0% {
    right: -400px;
  }
  100% {
    right: 0px;
  }
}
.order_content > div {
  width: 100%;
  box-sizing: border-box;
}
.order_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5edef;
  padding: 10px 10%;
  flex: none;
}
.order_header_close {
  padding: 5px 12px;
  border: 1px solid #333;
  background-color: #333;
  cursor: pointer;
  outline: none;
  flex: none;
  color: #fff;
  transition: all ease 0.3s;
}
.order_header_close:hover {
  background-color: #000;
}
.order--wrapper {
  display: grid;
}
.order_products_list {
  height: 380px;
  overflow-y: auto;
  list-style: none;
}
.order_products_list::-webkit-scrollbar-track {
  background-color: transparent;
}

.order_products_list::-webkit-scrollbar {
  width: 4px;
}

.order_products_list::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #e5edef;
}
.order_products_list_item {
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid #e5edef;
  padding: 10px;
}
.order_products_list_item .photo {
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.order_products_list_item .photo img {
  max-width: 50px;
  max-height: 50px;
}
.order_products_list_item .name {
  max-width: 180px;
  width: 100%;
}
.order_products_list_item .name p {
  font-size: 14px;
}
.order_products_list_item .material-icons.delete {
  cursor: pointer;
  color: #d7d7d7;
  transition: 0.3s;
}
.order_products_list_item:hover .material-icons.delete {
  color: initial;
}
.order_beforefreeshipping {
  text-align: center;
  background-color: #ffd558;
  padding: 5px 0;
}
.order_freeshipping {
  text-align: center;
  background-color: #45d482;
  padding: 5px 0;
}
.order_beforefreeshipping p,
.order_beforefreeshipping p strong,
.order_freeshipping p,
.order_freeshipping p strong {
  color: #fff;
}
.order_total {
  border-top: 1px solid #e5edef;
  padding: 0 10%;
  margin-bottom: 10px;
}
.order_total_domicile,
.order_total_net {
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
}
.order_total_domicile p {
  font-weight: lighter;
}
.without_shipping_cost {
  color: var(--main_color);
  font-size: 13px;
}
.order_total_net p {
  font-weight: bold;
}
.p_button {
  justify-self: center;
  width: 80%;
  height: 40px;
  border-style: none;
  background: var(--button_color);
  display: inline-block;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  padding: 0 20px;
  color: var(--button_text_color);
  font-size: 12px;
  letter-spacing: 1px;
  cursor: pointer;
  outline: none;
  flex: none;
  transition: 0.3s;
}
.continue_shopping {
  justify-self: center;
  width: 80%;
  height: 36px;
  border-style: none;
  background-color: transparent;
  padding: 0 20px;
  border: 1px solid var(--button_color);
  font-size: 14px;
  letter-spacing: 1px;
  cursor: pointer;
  outline: none;
  flex: none;
  transition: all ease 0.3s;
}
.order__login > button {
  display: flex;
  align-items: center;
  position: absolute;
  margin: 10px 0 0 40px;
  border-style: none;
  background-color: transparent;
  font-weight: 600;
  font-size: 13px;
  padding: 0;
  z-index: 2;
  color: var(--button_color);
  cursor: pointer;
  outline: none;
}
.order__login > button:hover {
  color: #000;
}
.order__login > button i {
  font-size: 16px;
}
.continue_shopping:hover {
  background-color: var(--button_color);
  color: var(--button_text_color);
}
.p_button:hover {
  opacity: 0.9;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.slide-enter-active {
  transition: all 0.3s ease;
}
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter, .slide-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  /* transform: translateX(200px); */
  margin-left: 150px;
  opacity: 0;
}
</style>
