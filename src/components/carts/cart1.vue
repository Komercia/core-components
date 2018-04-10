<template>
  <div class="cart">
    <div class="cart_products">
      <ul class="products_list">
        <li v-for="(product, index) in products" class="products_item">
          <img
            :src="setFoto(product.foto)"
            class="products_item_photo"
            :alt="product.nombre">
          <div class="products_item_info">
            <h3 class="item_info_name">{{ product.nombre }}</h3>
            <p>{{ product.precio | currency }}</p>
            <span class="item_info_quantity">
              <p>Cantidad:</p>
              <input type="number" v-model="product.cantidad">
            </span>
            <span>
              <p class="item_info_">Variante:</p>
              <ul v-for="item in product.combinacion">
                <p>{{ item }}</p>
              </ul>
            </span>
          </div>
          <div class="products_item_right">
            <a v-on:click="deleteItemCart(index)" class="delete">Eliminar</a>
            <p>{{ product.precio * product.cantidad | currency }}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="cart_summary">
      <header>
        <h2>RESUMEN</h2>
      </header>
      <div class="cart_summary_body">
        <span>
          <p>Subtotal:</p>
          <p>$200.000</p>
        </span>
        <span>
          <p>Envio:</p>
          <p>$5.200</p>
        </span>
        <hr>
        <span>
          <p>Total:</p>
          <p>{{ totalCart | currency }}</p>
        </span>
        <button
          class="cart-action"
          @click="next">
          CONTINUAR AL PAGO
        </button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'koCart1',
  mounted(){
    this.products = this.$store.state.productsCart;
  },
  data(){
    return {
      products: [],
    }
  },
  computed: {
    totalCart(){
      return this.$store.state.totalCart;
    },
    orderComponent(){
      return this.$store.state.orderComponent;
    }
  },
  methods: {
    addQuantity(product, index){
      if(product.limitQuantity > product.cantidad){
        product.cantidad += 1;
        this.products.splice(index, 1, product)
        this.$store.commit('UPDATE_CONTENTCART');
      }
    },
    removeQuantity(product, index){
      if(this.products[index].cantidad >= 2){
        product.cantidad -= 1;
        this.products.splice(index, 1, product)
        this.$store.commit('UPDATE_CONTENTCART');
      }
    },
    setFoto(f) {
      return `${this.$urlHttp}/mini/${f}`;
    },
    deleteItemCart(i){
      this.$store.state.productsCart.splice(i, 1);
      this.$store.commit('UPDATE_CONTENTCART');
      // this.$store.commit('removeProductsPurchased');
    },
    backPage(e) {
      if(e.target.id == 'order' || e.target.id == 'closeOrder'){
        this.$store.state.orderComponent = false;
      }
    },
    next(){
      let json = {
        products: this.$store.state.productsCart,
        tienda: {
          id: this.$store.state.id,
          nombre: this.$store.state.tienda.nombre,
          logo: this.$store.state.tienda.logo,
          location: this.$store.state.tienda.dominio || `http://${this.$store.state.tienda.subdominio}.komercia.co/`
        },
        tipo: 0,
        total: this.$store.state.totalCart,
        estado: 0,
        direccion_entrega: 1
      }
      json = JSON.stringify(json)
      if(this.$store.state.productsCart.length != 0){
        location.href = `https://checkout.komercia.co/?params=${json}`;
      }
    }
  },
  filters: {
    currency(value) {
      if(value){
        return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
      }
    },
  }
}
</script>

<style scoped>
  .cart{
    position: relative;
    width: 100%;
    display: grid;
    grid-auto-flow: row;
    grid-template-columns: auto auto;
    justify-content: center;
    align-items: start;
    padding: 100px 0;
  }
  .cart_summary{
    position: sticky;
    top: 100px;
    background-color: #FFF;
    margin-left: 15px;
  }
  .cart_products{
    /*height: 300px;
    overflow: auto;*/
  }
  .cart_products::-webkit-scrollbar-track{
  	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  	border-radius: 10px;
  	background-color: #F5F5F5;
  }
  .cart_products::-webkit-scrollbar{
  	width: 0px;
  	background-color: #F5F5F5;
  }
  .cart_products::-webkit-scrollbar-thumb{
  	border-radius: 10px;
  	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  	background-color: #555;
  }
  .products_list{
    display: grid;
    grid-row-gap: 15px;
  }
  .products_item{
    width: 400px;
    display: flex;
    padding: 15px;
    background-color: #FFF;
    border: 1px solid rgba(0,0,0,.0975);
  }
  .products_item_photo{
    max-width: 100px;
    max-height: 100px;
    object-fit: contain;
    margin-right: 10px;
  }
  .products_item_info{
    flex: 1;
    display: grid;
    grid-row-gap: 5px;
  }
  .products_item_info span{
    display: flex;
  }
  .item_info_name{
    font-weight: 600;
  }
  .item_info_quantity{
    display: flex;
    align-items: center;
  }
  .item_info_quantity input{
    width: 40px;
    margin-left: 10px;
    text-align: center;
  }
  .item_info_quantity input[type='number'] {
    -moz-appearance:textfield;
  }

  .item_info_quantity input::-webkit-outer-spin-button,
  .item_info_quantity input::-webkit-inner-spin-button {
      -webkit-appearance: none;
  }
  .products_item_right{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .products_item_right .delete{
    text-decoration: underline;
    font-size: 13px;
    text-align: right;
    font-weight: 600;
    cursor: pointer;
  }
  .cart_summary{
    border: 1px solid rgba(0,0,0,.0975);
  }
  .cart_summary header{
    display: flex;
    justify-content: center;
    background-color: #fafafa;
    border-bottom: 1px solid rgba(0,0,0,.0975);;
    padding: 10px;
  }
  .cart_summary header h2{
    font-weight: 600;
  }
  .cart_summary_body{
    display: grid;
    justify-content: center;
    padding: 10px 40px;
  }
  .cart_summary_body hr{
    width: 100%;
  }
  .cart_summary_body > span{
    width: 200px;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    margin: 8px 0;
  }
  .cart_summary_body > span p:nth-child(2){
    font-weight: 600;
  }
  .cart-action{
    margin: 15px 0;
    border-style: none;
    padding: 10px 0;
    background-color: var(--button_color);
    color: var(--button_text_color);
    cursor: pointer;
  }
</style>
