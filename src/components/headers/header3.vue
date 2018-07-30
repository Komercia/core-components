<template>
  <header class="header_main">
    <router-link to="/" class="header_brand">
        <figure class="header__logo">
          <img v-if="info.logo" :src="`${$urlHttp}/logos/${info.logo}`" alt="">
        </figure>
        <h1 class="header__title">{{ info.nombre }}</h1>
    </router-link>
    <nav class="header_navigation">
      <ul class="header_navigation_list">
        <li class="header_navigation__item"><router-link to="/">Inicio</router-link></li>
        <li class="header_navigation__item"><router-link to="/productos">Productos</router-link></li>
        <li class="header_navigation__item"><router-link to="/contacto">Contacto</router-link></li>
        <li v-if="!userData.id" class="header_navigation__item"><a @click="login">Iniciar Sesión</a></li>
        <div @click="openOrder" class="header__cart">
          <i class="material-icons">shopping_cart</i>
          <p>{{ productsCart }}</p>
        </div>
        <template v-if="userData.id">
          <el-popover
            ref="popover3"
            placement="bottom"
            trigger="click">
            <ul class="user_options_list">
              <li class="user_options_item">
                <i class="material-icons">account_circle</i>
                <div class="">
                  <strong>Hola {{ userData.nombre }}</strong><p>{{ userData.email }}</p>
                </div>
              </li>
              <li class="user_options_item"><i class="material-icons">assignment</i><a href="https://perfil.komercia.co/compras">Mis Compras</a></li>
              <li class="user_options_item" @click="logout"><i class="material-icons">exit_to_app</i>Cerrar session</li>
            </ul>
          </el-popover>
          <figure class="user_photo" v-popover:popover3>
            <img :src="`https://api.komercia.co/users/${userData.foto}`" :alt="userData.nombre">
          </figure>
        </template>
      </ul>
    </nav>
    <i class="material-icons icon_menu" v-on:click="openMenuComponent">menu</i>
    <Sidebar/>
    <koOrder1 />
  </header>
</template>

<script>
  import Sidebar from '../sidebars/sidebar1.vue';
  import koOrder1 from '../_order/order1.vue'

	export default {
    name: 'koHeader3',
    components: { Sidebar, koOrder1 },
		data(){
			return {
			}
		},
		computed: {
      userData() {
        return this.$store.state.userData
      },
      productsCart(){
        return	this.$store.state.productsCart.length;
      },
			info() {
				return this.$store.state.tienda;
			},
      storeData() {
        return this.$store.state.tienda;
      }
		},
    methods: {
      openMenuComponent(){
        this.$store.state.menuComponent = true;
      },
      openOrder(){
          this.$store.state.openOrder = true;
      },
      login() {
        window.location.href = `http://login.komercia.co/auth?from=${this.storeData.subdominio}&path=${this.$route.path}`
      },
      logout() {
        this.$store.commit('LOGOUT');
      }
    }
	}
</script>

<style scoped>
  .header_main{
    position: sticky;
    top: 0;
    width: 100%;
    height: 90px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: auto;
    box-sizing: border-box;
    padding: 0 10px;
    background-color: var(--main_color);
  }
  .header_brand{
    display: flex;
    align-items: center;
  }
  .header__logo{
    max-width: 70px;
    width: 70px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px 10px 0 0;
    border-radius: 50%;
    overflow: hidden;
    background-color: #FFF;
    box-shadow: 0px 0px 0px 4px rgba(255,255,255, 0.5);
  }
  .header__logo img{
    width: 100%;
    height: auto;
  }
  .header__title{
    font-size: 1.25em;
    color: #FFF;
  }
  .icon_menu{
    display: none;
  }
  .header_navigation{
    height: 100%;
  }
  .header_navigation_list{
    height: 100%;
    list-style: none;
    display: flex;
    align-items: center;
  }
  .header_navigation__item{
    height: 100%;
    display: flex;
  }
  .header_navigation__item a{
    height: 100%;
    margin: 0 10px;
    display: flex;
    align-items: center;
    color: #FFF;
  }
  .user_photo{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid #FFF;
    margin-left: 10px;
    overflow: hidden;
    box-shadow: 0 0 20px 0 rgba(0,0,0,0.3);
    cursor: pointer;
  }
  .user_photo img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .user_options_item{
    display: flex;
    padding: 10px 0;
    cursor: pointer;
    border-bottom: 1px solid #DBDBDB;
  }
  .user_options_item:hover{
    background-color: #EEE;
  }
  .user_options_item *{
    color: #39393b !important;
  }
  .user_options_item:first-child{
    /*flex-direction: column;*/
    /*justify-content: center;*/
    align-items: center;
    text-align: left;
    cursor: initial;
  }
  .user_options_item:first-child:hover{
    background-color: #FFF;
  }
  .user_options_item:last-child{
    border-bottom: 0px;
  }
  .user_options_item i{
    margin-right: 5px;
    font-size: 20px;
  }
  .header__cart{
		display: flex;
		align-items: center;
		border-radius: 8px;
		overflow: hidden;
		cursor: pointer;
		flex: none;
		background-color: rgba(0,0,0,0.25);
    color: #FFF;
	}
	.header__cart i{
		padding-left: 10px;
		font-size: 1.2em;
	}
	.header__cart p{
		height: 40px;
		display: flex;
		align-items: center;
		padding: 0 10px;
		margin-left: 10px;
		font-size: 1em;
	}
  @media(max-width:700px){
    .header__logo{
      max-width: 55px;
      width: 100%;
      height: 55px;
    }
    .header__title{
      font-size: 1em;
      color: #FFF;
    }
    .icon_menu{
      display: flex;
      color: #FFF;
    }
    .header_navigation{
      display: none;
    }
  }
</style>
