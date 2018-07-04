<template>
	<transition name="fade">
	  <div class="order" @click="closeOrder" v-show="openOrder">
	    <div class="order_content">
	      <div class="order_header">
					<h3>Tu Orden</h3>
					<button @click="closeOrder" class="order_header_close">Cerrar</button>
				</div>
				<div  class="order_products">
					<ul class="order_products_list">
						<li class="order_products_list_item" v-for="(product, index) in productsCart">
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
							<i class="material-icons delete" v-on:click="deleteItemCart(index)">clear</i>
						</li>
					</ul>
				</div>
				<div class="order_total">
					<span class="order_total_domicile">
						<p>Costo domicilio</p>
						<p>{{ shipping | currency }}</p></span>
					<span class="order_total_net"><p>Total a pagar</p><p>{{ (totalCart + shipping) | currency }}</p></span>
				</div>
				<button class="p_button" @click="GoPayments">Finalizar compra</button>
				<br>
				<button class="continue_shopping" @click="closeOrder">Seguir comprando</button>
	    </div>
	  </div>
	</transition>
</template>

<script>
export default {
	name: 'koOrder1',
	computed: {
		openOrder() {
			return this.$store.state.openOrder;
		},
		totalCart(){
			return this.$store.state.totalCart;
		},
		productsCart(){
			return this.$store.state.productsCart;
		},
		shipping() {
      let shipping = this.$store.state.envios.valores;
      switch (shipping.envio_metodo) {
        case 'gratis':
          return 0
        break;
        case 'tarifa_plana':
          return shipping.valor
        break;
        case 'precio':
          let result = shipping.rangos.filter(rango => {
            if(this.totalCart >= rango.inicial && this.totalCart <= rango.final) {
              return rango;
            }
          })[0]
          return result.precio;
        break;
        default:

      }
    }
	},
	methods: {
		deleteItemCart(i){
      this.$store.state.productsCart.splice(i, 1);
      this.$store.commit('UPDATE_CONTENTCART');
    },
		closeOrder(event) {
			const element = event.target.className
			if (element === 'order' || element === 'order_header_close' || element === 'continue_shopping') {
				this.$store.state.openOrder = false;
			}
		},
		GoPayments () {
			let json = {
				products: this.$store.state.productsCart,
				tienda: {
					id: this.$store.state.tienda.id_tienda,
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
    capitalize(value){
      if(value){
        value = value.toLowerCase();
        return value.replace(/^\w|\s\w/g, l => l.toUpperCase())
      }
    },
  }
}
</script>

<style scoped>
  .order{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: flex-end;
    background-color: rgba(0,0,0,0.5);
    z-index: 2;
  }
  .order_content{
		position: absolute;
		right: 0px;
		max-width: 400px;
		width: 100%;
		height: 100vh;
		background-color: #FFF;
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: none;
		overflow: auto;
		box-sizing: border-box;
		padding-bottom: 10px;
		animation: dispatch .2s linear 1;
  }
	@keyframes dispatch {
		0% { right: -400px; }
		100% { right: 0px; }
	}
	.order_content > div{
		width: 100%;
		box-sizing: border-box;
	}
	.order_header{
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #e5edef;
		padding: 10px 10%;
		flex: none;
	}
	.order_header_close{
		padding: 5px 12px;
		border-radius: 3px;
		border: 1px solid #333;
		cursor: pointer;
		outline: none;
		flex: none;
	}
	.order_products_list{
		height: 380px;
		overflow-y: auto;
		list-style: none;
	}
	.order_products_list::-webkit-scrollbar-track{
		background-color: transparent;
	}

	.order_products_list::-webkit-scrollbar{
		width: 4px;
	}

	.order_products_list::-webkit-scrollbar-thumb{
		border-radius: 10px;
		background-color: #e5edef;
	}
	.order_products_list_item{
		display: flex;
		align-items: center;
		justify-content: space-around;
		border-bottom: 1px solid #e5edef;
		padding: 10px;
	}
	.order_products_list_item .photo{
		width: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.order_products_list_item .photo img{
		max-width: 50px;
		max-height: 50px;
	}
	.order_products_list_item .name{
		max-width: 180px;
		width: 100%;
	}
	.order_products_list_item .name p{
		font-size: 14px;
	}
	.order_products_list_item .material-icons.delete{
		cursor: pointer;
		color: #d7d7d7;
		transition: .3s;
	}
	.order_products_list_item:hover .material-icons.delete{
		color: initial;
	}
	.order_beforefreeshipping{
		text-align: center;
		background-color: #ffd558;
		padding: 5px 0;
	}
	.order_freeshipping{
		text-align: center;
		background-color: #45d482;
		padding: 5px 0;
	}
	.order_beforefreeshipping p, .order_beforefreeshipping p strong,
	.order_freeshipping p, .order_freeshipping p strong{
		color: #FFF;
	}
	.order_total{
		border-top: 1px solid #e5edef;
		padding: 0 10%;
		margin-bottom: 10px;
	}
	.order_total_domicile, .order_total_net{
		display: flex;
		justify-content: space-between;
		margin: 5px 0;
	}
	.order_total_domicile p{
		font-weight: lighter;
	}
	.order_total_net p{
		font-weight: bold;
	}
	.p_button{
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
		transition: .3s;
	}
	.continue_shopping{
		width: 80%;
		height: 30px;
		border-style: none;
		background-color: transparent;
		-webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    padding: 0 20px;
		border: 1px solid black;
		font-size: 12px;
    letter-spacing: 1px;
    cursor: pointer;
		outline: none;
		flex: none;
		transition: .3s;
	}
	.p_button:hover, .continue_shopping:hover{
		transform: scale(.95);
	}
	.fade-enter-active, .fade-leave-active {
		transition: opacity .3s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		opacity: 0;
	}
</style>
