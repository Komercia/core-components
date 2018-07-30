<template>
  <header class="main-header">
    <div class="top-menu">
      <div class="icons-left">
        <i class="icon-user-circle"></i>
        <i class="icon-shopping-basket">
          <p class="num-products">10</p>
        </i>
      </div>
      <div class="icons-right">
        <i @click="getShowIcon" v-if="!showIcon" class="icon-close"></i>
        <i @click="getShowIcon" v-if="showIcon" class="icon-search"></i>
        <transition name="custom-classes-transition" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
          <el-input v-if="!showIcon" class="search-top" placeholder="Buscar" suffix-icon="el-icon-search" v-model="input2">
          </el-input>
        </transition>
      </div>
    </div>
    <div class="line"></div>
    <div class="container">
      <router-link to="/" class="container-logo">
        <img :src="`${$urlHttp}/logos/${info.logo}`" alt="logo">
      </router-link>
      <nav class="header-navigation">
        <ul class="navigation-list">
          <li v-for='(item, index) in routes' :key='index' class="navigation-item">
            <router-link :to="item.route" class="navigation-link">{{item.name}}</router-link>
          </li>
        </ul>
      </nav>
      <div class="icons">
        <i @click="getShowIcon" v-if="!showIcon" class="icon-close"></i>
        <i @click="getShowIcon" v-if="showIcon" class="icon-search"></i>
        <i class="icon-user-circle"></i>
        <i class="icon-shopping-basket">
          <p class="num-products">10</p>
        </i>
        <transition name="custom-classes-transition" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
          <el-input v-if="!showIcon" class="search" placeholder="Buscar" suffix-icon="el-icon-search" v-model="input2">
          </el-input>
        </transition>
      </div>
      <i class="icon-menu"></i>
    </div>
    <div class="line line-main-menu"></div>
  </header>
</template>

<script>
export default {
  name: 'koHeader4',
  data() {
    return {
      showIcon: false,
      routes: [
        {
          name: 'Inicio',
          route: '/'
        },
        {
          name: 'Productos',
          route: '/productos'
        },
        {
          name: 'Carrito',
          route: '/pedido'
        },
        {
          name: 'Nosotros',
          route: '/pedido'
        },
        {
          name: 'Contacto',
          route: '/contacto'
        }
      ]
    }
  },
  computed: {
    storeData() {
      return this.$store.state.tienda
    },
    userData() {
      return this.$store.state.userData
    },
    info() {
      return this.$store.state.tienda
    },
    style() {
      return this.$store.state.styleData
    },
    productsCart() {
      return this.$store.state.productsCart.length
    }
  },
  methods: {
    getShowIcon() {
      this.showIcon = !this.showIcon
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1400px;
  width: 100%;
  height: 70px;
  margin: 30px auto 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.navigation-list {
  display: flex;
  max-width: auto;
}
.icons {
  font-size: 18px;
  position: relative;
}
.icon-close {
  font-size: 14px;
  box-sizing: border-box;
  padding: 4px;
  vertical-align: middle;
}
.icons i {
  padding-right: 20px;
  cursor: pointer;
}
.icons i:hover {
  color: #f49a86;
}
.navigation-item {
  padding-right: 20px;
}
.navigation-link {
  font-size: 16px;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-decoration: none;
  font-weight: 400;
}
.container-logo {
  height: 100%;
  max-width: 150px;
  box-sizing: border-box;
  margin-right: 10px;
  margin-left: 10px;
}
.container-logo > img {
  height: 100%;
  width: 100%;
  object-fit: contain;
}
.line {
  width: 100%;
  height: 1px;
  background: rgb(209, 209, 209);
}
.search {
  width: 180px;
  padding: 0;
  position: absolute;
  left: -132%;
  margin-top: 5px;
}
.top-menu {
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 20px;
}
.icons-left > i {
  padding-right: 25px;
  font-size: 18px;
  cursor: pointer;
}
.icons-right > i {
  font-size: 18px;
  cursor: pointer;
}
.top-menu {
  display: none;
}
.icon-menu {
  display: none;
}
.search-top {
  display: none;
}
.icon-shopping-basket {
  position: relative;
}
.num-products {
  font-size: 10px;
  position: absolute;
  bottom: 0;
  right: 10px;
}
@media (max-width: 990px) {
  .top-menu {
    display: flex;
  }
  .header-navigation {
    display: none;
  }
  .icons {
    display: none;
  }
  .container {
    height: 50px;
    margin: 15px auto;
  }
  .line-main-menu {
    display: none;
  }
  .icon-menu {
    display: initial;
    font-size: 18px;
    padding-right: 20px;
    cursor: pointer;
  }
  .icons-right .icon-close {
    font-size: 12px;
  }
  .search-top {
    width: 180px;
    display: block;
    position: absolute;
    right: 19px;
    top: 50px;
  }
  .top-menu .num-products {
    right: 15px;
  }
}
</style>
