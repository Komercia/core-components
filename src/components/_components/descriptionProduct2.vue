<template>
  <div class="description">
    <div class="left">
      <h3 class="title-description">Descripción</h3>
      <div v-html="data.info.descripcion"></div>
    </div>
    <div class="right">
      <div class="payments section">
        <div class="content">
          <ko-pay class="icon"></ko-pay>
          <h3 class="title-section">Opciones de pago</h3>
        </div>
        <p>Puedes elegir cualquiera de estos medios. Es rápido, seguro y no tiene costo adicional.</p>
        <ul>
          <li v-if="mediospago.payco == 1">
            <h4>• Pasarela de pagos epayco</h4>
            <p>Paga con tu tarjeta hasta 24 cuotas o en efectivo en mas de 14.000 puntos en todo el país</p>
            <img src="http://0523aae09f0cadbd79f4-60bf0867add971908d4f26a64519c2aa.r62.cf5.rackcdn.com/btns/epayco/epayco_pago_seguro.png" alt="">
          </li>
          <li v-if="mediospago.contraentrega == 1">
            <h4>• Pago contra entrega</h4>
            <p>Pagas en el momento de recibir tu compra</p>
          </li>
          <li v-if="mediospago.convenir == 1">
            <h4>• Pago a convenir</h4>
            <p>Nos pondremos en contacto para organizar la forma de pago</p>
          </li>
          <li v-if="mediospago.consignacion == 1">
            <h4>• Consignación Bancaria</h4>
            <p>Transferencia o conginacón a nuestra cuenta</p>
          </li>
          <li v-if="mediospago.efecty == 1">
            <h4>• Consignación Efecty</h4>
            <p>Compra más seguro, fácil y rápido tus productos con efecty</p>
          </li>
        </ul>
      </div>
      <div class="line"></div>
      <div class="deliverys section">
        <div class="content">
          <ko-delivery class="icon"></ko-delivery>
          <h3 class="title-section">Opciones de Envio</h3>
        </div>
        <h4>• {{envio.titulo}}</h4>
        <p>{{envio.desc}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import koPay from '../../Icons/pay'
import koDelivery from '../../Icons/Delivery'
export default {
  components: { koPay, koDelivery },
  props: {
    data: {},
    envio: {}
  },
  computed: {
    mediospago() {
      return this.$store.state.mediospago
    }
  }
}
</script>

<style scoped>
.description {
  display: flex;
  width: 100%;
  /* margin-top: 60px; */
  border-top: 1px solid #eee;
}
.description div {
  color: #555;
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
  color: #333;
  font-size: 18px;
}
.title-section {
  color: #333;
  font-size: 16px;
  text-transform: uppercase;
  align-self: flex-start;
}
.right img {
  width: 100%;
  margin-top: 15px;
}
.section {
  box-sizing: border-box;
  padding: 20px;
}
h4 {
  margin-top: 15px;
  font-weight: 300;
  color: #333;
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
</style>
