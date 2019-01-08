<template>
  <div class="main-header">
    <div class="container">
      <div class="content-header">
        <div class="name">
          <p>Ingresar</p>
          <i class="el-icon-arrow-down"></i>
        </div>
        <nav class="nav">
          <ul class="main-menu-list">
            <router-link
              tag="li"
              v-for='(item, index) in routes'
              :key='index'
              class="main-menu-item"
              :to="item.route"
            >{{item.name}}</router-link>
          </ul>
        </nav>
        <div class="content-icon-cart"><i class="icon-shopping-cart"></i></div>
      </div>
      <div
        class="logo-container"
        :style="setting.styleObject"
      >
        <img
          class="logo"
          :src="`https://api2.komercia.co/logos/${info.logo}`"
          :alt="info.nomre"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "koHeader5",
  props: {
    setting: {
      type: Object,
      default: function() {
        return {
          styleObject: {
            order: "3"
          }
        };
      }
    }
  },
  data() {
    return {
      routes: [
        {
          name: "Inicio",
          route: "/"
        },
        {
          name: "Productos",
          route: "/productos"
        },
        {
          name: "Carrito",
          route: "/pedido"
        },
        {
          name: "Contacto",
          route: "/contacto"
        }
      ]
    };
  },
  computed: {
    info() {
      return this.$store.state.tienda;
    }
  },
  methods: {
    redirectTo(route, index) {
      this.$router.push(route);
      this.windowsWidth = document.documentElement.clientWidth;
      if (this.windowsWidth < 800) {
        this.hideMenu();
      }
      console.log(index);
    }
  }
};
</script>

<style scoped>
.main-header {
  width: 100%;
  display: flex;
  justify-content: center;
  --main-text-color: #6f7072;
  padding: 20px 20px 0;
  box-sizing: border-box;
  margin-bottom: 40px;
}
.container {
  max-width: 1600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.content-header {
  width: 100%;
  height: 80px;
  display: flex;
  order: 2;
}
.logo-container {
  width: 200px;
  height: 80px;
  cursor: pointer;
}
.logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.name {
  display: flex;
  align-items: center;
  align-items: center;
  text-transform: uppercase;
  color: var(--main-text-color);
  font-size: 15px;
  cursor: pointer;
}
.name > p {
  margin-right: 3px;
}
.name > i {
  font-size: 10px;
  font-weight: bold;
}
.nav {
  flex: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content-icon-cart {
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--main-text-color);
  cursor: pointer;
}
.icon-shopping-cart {
  display: flex;
  justify-content: center;
  align-items: center;
}
.main-menu-list {
  display: flex;
  align-items: center;
  align-items: center;
}
.main-menu-item {
  padding: 15px 20px;
  cursor: pointer;
  color: var(--main-text-color);
  text-transform: uppercase;
  font-size: 15px;
  transition: all ease 0.1s;
}
.main-menu-item:hover {
  transform: scale(1.05);
}
.router-link-exact-active {
  font-weight: bold;
}
</style>
