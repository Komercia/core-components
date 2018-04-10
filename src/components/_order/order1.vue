<template>
	<transition name="fade">
	  <div class="order" v-show="openOrder">
	    <div class="order_content">
	      <div class="order_header">
					<h3>Tu Orden</h3>
					<button @click="closeOrder" class="order_header_close">Cerrar</button>
				</div>
				<div  class="order_products">
					<ul class="order_products_list">
						<li class="order_products_list_item" v-for="(product, index) in productsCart">
							<div class="photo">
								<img :src="product.foto">
							</div>
							<div class="name">
								<p>{{ product.nombre | capitalize }}</p>
								<p>{{ product.unidades }} und</p>
							</div>
							<div>
								<p>{{ (product.precio * product.unidades) | currency }}</p>
							</div>
							<i class="material-icons delete" v-on:click="deleteProduct(product.id, index)">clear</i>
						</li>
					</ul>
				</div>
				<div class="order_total">
					<span class="order_total_domicile">
						<p>Costo domicilio</p>
						<p>{{ totalCart <= 50000 ? '$10.000' : '$0'}}</p></span>
					<span class="order_total_net"><p>Total a pagar</p><p>{{ totalCart | currency }}</p></span>
				</div>
				<button class="p_button">Finalizar compra</button>
	    </div>
	  </div>
	</transition>
</template>

<script>
export default {
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
	},
	methods: {
		closeOrder() {
			this.$store.state.openOrder = false;
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
		width: 400px;
		height: 100vh;
		background-color: #FFF;
		display: flex;
		flex-direction: column;
		align-items: center;
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
		border-bottom: 1px solid #e5edef;
		padding: 10px 10%;
	}
	.order_header_close{
		padding: 5px 12px;
		border-radius: 3px;
		border: 1px solid #333;
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
		background: #FF7175;
    display: inline-block;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    padding: 0 20px;
    color: #fff;
    font-size: 12px;
    letter-spacing: 1px;
    cursor: pointer;
	}
	.fade-enter-active, .fade-leave-active {
		transition: opacity .3s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		opacity: 0;
	}
</style>
