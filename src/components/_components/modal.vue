<template>
  <div class="modal">
    <div class="modal_content">
      <div class="modal_content_header">
        <h2>Medios de pago</h2>
        <i
          id="closeModal"
          v-on:click="togglePayment"
          class="material-icons close"
        >close</i>
      </div>
      <div class="modal_content_list">
        <div
          class="modal_content_item"
          v-if="mediospago.payco"
        >
          <h3>Pasarela de pagos epayco</h3>
          <p>Esta tienda ofrece múltiples medios y formas de pago. Tu podrás comprar más seguro, fácil y rápido tus productos.</p>
          <img src="https://369969691f476073508a-60bf0867add971908d4f26a64519c2aa.ssl.cf5.rackcdn.com/btns/epayco/epayco_pago_seguro_black.png">
        </div>
        <div
          class="modal_content_item"
          v-if="mediospago.convenir"
        >
          <h3>Pago a convenir</h3>
          <p>Elija esta opción en caso que desee arreglar la logística del pago de sus productos directamente con la tienda.</p>
          <img src="../../assets/conversation.png">
        </div>
        <div
          class="modal_content_item"
          v-if="mediospago.tienda"
        >
          <h3>Pago en tienda</h3>
          <p>Esta opción permite la compra presencial en la tienda física. En este caso podras generar reservas que posteriormente puedas recoger y pagar en el local propio de esta tienda.</p>
          <img src="../../assets/pagos_store.png">
        </div>
        <div
          class="modal_content_item"
          v-if="mediospago.consignacion"
        >
          <h3>Consignación Bancaria</h3>
          <p>Elige esta opción en caso de que desees procesar el pago mediante consignación bancaria. En este caso, debe ser confirmado el pago y te haran envió del producto o entrega del servicio según el caso.</p>
          <img src="../../assets/receipt.png">
        </div>
        <div
          class="modal_content_item"
          v-if="mediospago.efecty"
        >
          <h3>Consignación Efecty</h3>
          <p>Elija esta opción en caso que desee hacer un giro por efecty como un medio de pago de la tienda.</p>
          <img src="../../assets/efecty.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.commit("GET_PAYMENTS");
  },
  computed: {
    mediospago() {
      return this.$store.state.mediospago;
    },
    banksData() {
      return this.$store.state.banksData;
    }
  },
  methods: {
    togglePayment() {
      this.$store.state.togglePayment = !this.$store.state.togglePayment;
    }
    // handleBankLogo () {
    //   let bank = this.banksData.filter(bank => bank.id === this.bankDeposit.bank)[0]
    //   this.bankLogo = `${this.$configKomercia.url}/bancos/${bank.imagen}`
    // }
  }
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
}
.modal * {
  color: #333;
}
.modal_content {
  max-width: 800px;
  width: 100%;
  height: 500px;
  border-radius: 10px;
  background-color: #fff;
}
.modal_content_header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 15px 50px;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
}
#closeModal {
  cursor: pointer;
}
.modal_content_list {
  height: calc(100% - 65px);
  overflow: auto;
  padding: 0 50px;
}
.modal_content_item {
  margin-bottom: 30px;
}
.modal_content_item:first-child {
  margin-top: 10px;
}
.modal_content_item h3 {
  font-weight: normal;
}
.modal_content_item p {
  margin: 5px 0 10px 0;
  font-size: 15px;
  text-align: justify;
  font-weight: lighter;
}
.modal_content_item img {
  max-width: 150px;
  max-height: 115px;
}
</style>
