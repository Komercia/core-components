<template>
  <div class="description">
    <div
      class="left"
      v-if="!activeClass"
    >
      <h3>Descripción</h3>
      <div v-html="data.info.descripcion"></div>
      <!-- <ko-related :data="data" :custom="custom" /> -->
    </div>
    <div
      class="right"
      :class="{'stage': activeClass }"
    >
      <div class="payments section">
        <div class="content">
          <!-- <ko-pay class="icon"></ko-pay> -->
          <h3 class="title-section">Opciones de pago</h3>
        </div>
        <p>Puedes elegir cualquiera de estos medios. Es rápido, seguro y no tiene costo adicional.</p>
        <ul>
          <li v-if="mediospago.payco == 1">
            <h4>Pasarela de pagos epayco</h4>
            <p>Paga con tu tarjeta hasta 24 cuotas o en efectivo en mas de 14.000 puntos en todo el país</p>
            <img
              src="../../assets/logospasarela.png"
              alt
            >
          </li>
          <li v-if="mediospago.payu == 1">
            <h4>Pasarela de pagos payu</h4>
            <p>Miles de comercios alrededor del mundo confían en nosotros para recibir pagos online</p>
            <a
              href="https://www.payulatam.com/co/"
              target="_blank"
            ><img
                src="https://ecommerce.payulatam.com/logos/PayU_CO.png"
                alt="PayU"
                border="0"
              /></a>
          </li>
          <li v-if="mediospago.mercado_pago == 1">
            <h4>Pasarela de pagos mercadopago</h4>
            <p>Difiere tu compra hasta 36 cuotas con tarjeta de crédito, más de 90 millones de personas en Latinoamérica lo están usando.</p>
            <img
              class="logo-pasarela"
              src="../../assets/mercadopago.png"
              alt="logo mercado pago"
            >
          </li>
          <li v-if="mediospago.contraentrega == 1">
            <h4>Pago contra entrega</h4>
            <p>Pagas en el momento de recibir tu compra</p>
          </li>
          <li v-if="mediospago.convenir == 1">
            <h4>Pago a convenir</h4>
            <p>Nos pondremos en contacto para organizar la forma de pago</p>
          </li>
          <li v-if="mediospago.consignacion == 1">
            <h4>Consignación Bancaria</h4>
            <p>Transferencia o conginacón a nuestra cuenta</p>
          </li>
          <li v-if="mediospago.efecty == 1">
            <h4>Consignación Efecty</h4>
            <p>Compra más seguro, fácil y rápido tus productos con efecty</p>
          </li>
        </ul>
      </div>
      <div
        class="line"
        v-if="!activeClass"
      ></div>
      <div class="deliverys section">
        <div class="content">
          <!-- <ko-delivery class="icon"></ko-delivery> -->
          <h3 class="title-section">Opciones de Envio</h3>
        </div>
        <div
          v-if="envios.valores.envio_metodo === 'precio_ciudad'"
          class="wrapper-method"
        >
          <h4 class="capitalize">• {{envios.valores.envio_metodo.replace('_', ' por ')}}</h4>
          <p class="description-method">El valor del envío se calcula al momento de hacer la compra de acuerdo a la ciudad de entrega</p>
        </div>
        <div
          v-if="envios.valores.envio_metodo === 'tarifa_plana'"
          class="wrapper-method"
        >
          <h4 class="capitalize">{{envios.valores.envio_metodo.replace('_', ' ')}}</h4>
          <p class="description-method">El costo del envío es el mismo sin importar el lugar de entrega</p>
          <p class="price">Precio: {{envios.valores.valor | currency}} COP</p>
        </div>
        <div
          v-if="envios.valores.envio_metodo === 'precio'"
          class="wrapper-method"
        >
          <h4>Precio por Total de Compra</h4>
          <p class="description-method">El valor del envío se calcula de acuerdo al total de compra</p>
        </div>
        <div
          v-if="envios.valores.envio_metodo === 'gratis'"
          class="wrapper-method"
        >
          <h4>Gratis</h4>
          <p class="description-method">El valor del envío no tiene costo</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import koPay from "../../Icons/pay";
import koDelivery from "../../Icons/Delivery";
import koRelated from "../_components/related-products";
export default {
  components: { koPay, koDelivery, koRelated },
  props: {
    data: {},
    envio: {}
  },
  data() {
    return {
      // custom: [[710, 3], [1200, 4]]
    };
  },
  computed: {
    mediospago() {
      return this.$store.state.mediospago;
    },
    activeClass() {
      if (this.data.info.descripcion == "") {
        return true;
      } else {
        return false;
      }
    },
    envios() {
      return this.$store.state.envios;
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
.description {
  display: flex;
  width: 100%;
  /* margin-top: 60px; */
  border-top: 1px solid #eee;
}
.description div {
  color: var(--text_color);
  line-height: 1.5;
}
.left {
  flex: 1.4;
  box-sizing: border-box;
  padding: 20px;
}
.right {
  flex: 0.6;
  border-left: 1px solid #eee;
}
.title-description {
  text-transform: uppercase;
  /* font-weight: 400; */
  margin-bottom: 20px;
  color: var(--text_color);
  font-size: 18px;
}
.title-section {
  color: var(--text_color);
  font-size: 16px;
  text-transform: uppercase;
  align-self: flex-start;
}
.right img {
  max-width: 320px;
  width: 100%;
  margin-top: 15px;
}
.section {
  box-sizing: border-box;
  padding: 20px;
}
h4 {
  margin-top: 15px;
  font-weight: 600;
  color: var(--text_color);
  margin-bottom: 5px;
}
li p {
  line-height: 1.4;
  font-size: 14px;
}
.icon {
  width: 50px;
  vertical-align: middle;
  margin-bottom: 10px;
  align-self: flex-start;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.payments {
  margin-bottom: 20px;
}
.line {
  border-top: 1px solid #eee;
  width: 100%;
}
.deliverys {
  padding-top: 20px;
}
.stage {
  display: flex;
  border-left: 0;
  flex: 1;
}
.logo-pasarela {
  width: 160px !important;
}
.capitalize {
  text-transform: capitalize;
  font-weight: 600 !important;
}
.description-method {
  line-height: 1.4;
  font-size: 14px;
}
.price {
  margin-top: 10px;
  font-size: 14px;
}
@media (max-width: 800px) {
  .description {
    display: grid;
  }
  .right {
    border-left: 0;
  }
  .left {
    padding: 0;
  }
  .left > h3 {
    margin-top: 15px;
    text-transform: uppercase;
  }
  .left > div > p {
    line-height: 1.4;
  }
  .content {
    padding: 0;
  }
  .section {
    padding: 0;
    margin-top: 20px;
  }
  .deliverys {
    padding: 0;
  }
}
@media (max-width: 600px) {
  .stage {
    flex-wrap: wrap;
  }
}
</style>
