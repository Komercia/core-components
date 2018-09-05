<template>
  <footer>
    <div class="footer">
      <div class="col col1">
        <ul>
          <li>
            <p class="title">Contacto</p>
          </li>
          <li class="item-col1" v-if="info[0]">
            <p>
              <span>Dirección:</span> {{info[0].direccion}}
            </p>
          </li>
          <li class="item-col1">
            <p>
              <span>Teléfonos:</span> {{storeData.telefono}}
            </p>
          </li>
          <li class="item-col1">
            <p>
              <span>Email:</span> {{storeData.email_tienda}}
            </p>
          </li>
          <li class="item-col1" v-if="info[0]">
            <p>
              <span>Horario:</span> {{info[0].horario}}
            </p>
          </li>
        </ul>
      </div>
      <div class="col col3">
        <ul class="list-footer">
          <li>
            <p class="title">Tienda</p>
          </li>
          <li v-for='(item, index) in routes' :key='index' class="navigation-item" v-show="activeRoute(item)">
            <router-link :to="item.route" class="navigation-link">{{item.name}}</router-link>
          </li>
        </ul>
      </div>
      <div class="col col4">
        <ul class="list-footer">
          <li>
            <p class="title">Siguenos</p>
          </li>
          <li v-show="storeData.red_facebook !== ''">
            <i class="icon-facebook-official" />
            <a :href="storeData.red_facebook" target="_blank">Facebook</a>
          </li>
          <li v-show="storeData.red_instagram !== ''">
            <i class="icon-instagram" />
            <a :href="storeData.red_instagram" target="_blank">Instagram</a>
          </li>
          <li v-show="storeData.red_twitter !== ''">
            <i class="icon-twitter" />
            <a :href="storeData.red_twitter" target="_blank">Twitter</a>
          </li>
          <li v-show="storeData.red_youtube !== ''">
            <i class="icon-youtube" />
            <a :href="storeData.red_youtube" target="_blank">Youtube</a>
          </li>
        </ul>
      </div>
      <div class="col col5">
        <ul class="list-footer">
          <li>
            <p class="title">Suscríbete</p>
          </li>
          <li>
            <p>Suscríbete para recibir información sobre promociones y nuevos productos</p>
          </li>
          <li>
            <div class="ko-input">
              <input type="email" placeholder="Escribe tu email" v-model="email" @keyup.enter="toSubscribe">
              <i class="icon-paper-plane-2" @click="toSubscribe"></i>
              <transition name="slide-fade">
                <span class="response" v-show="toSubscribeResponse">Ya estas suscrito!</span>
              </transition>
            </div>
          </li>
          <li>
            <p>Copyright © 2018 by komercia. All Rights Reserved. </p>
            <a class="link-komercia" href="http://komercia.co">Powered by Komercia</a>
          </li>
        </ul>
      </div>
    </div>
    <!-- <div class="footer-footer">
      <p>&copy; copyright 2018 -
        <span>Hecho con
          <i class="heart"></i> en Colombia</span>
      </p>
    </div> -->
  </footer>
</template>

<script>
import axios from 'axios'

export default {
  name: 'koFooter3',
  data() {
    return {
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
          route: '/nosotros'
        },
        {
          name: 'Contacto',
          route: '/contacto'
        }
      ],
      email: '',
      toSubscribeResponse: false
    }
  },
  computed: {
    info() {
      return this.$store.state.geolocalizacion
    },
    storeData() {
      return this.$store.state.tienda
    }
  },
  methods: {
    activeRoute(item) {
      if (item.name != 'Nosotros') {
        return true
      }
      return !!(
        this.storeData.mision ||
        this.storeData.vision ||
        this.storeData.nosotros
      )
    },
    toSubscribe() {
      this.toSubscribeResponse = false
      const params = {
        correo: this.email,
        tienda: this.storeData.id_tienda
      }
      axios
        .post('https://templates.komercia.co/api/suscriptores', params)
        .then(() => {
          this.email = ''
          this.toSubscribeResponse = true
        })
    }
  }
}
</script>

<style scoped>
@import 'https://unpkg.com/komercia-fuentes@1.0.0/styles.css';
footer {
  width: 100%;
  background-color: #111;
  height: auto;
  margin-top: 60px;
}
.footer {
  display: flex;
  max-width: 1600px;
  height: auto;
  padding: 40px 0;
  margin: 0 auto;
  flex-wrap: wrap;
}
.logo {
  width: 80px;
  padding-bottom: 20px;
  position: absolute;
  top: -33px;
}
.col {
  flex: 1;
  box-sizing: border-box;
  padding: 20px;
}
.col3,
.col4 {
  flex: 0.6;
}
.col1,
.col5 {
  flex: 1.2;
}
.col5 {
  padding-left: 50px;
}
.col5 p {
  line-height: 1.5;
  font-size: 14px;
  letter-spacing: 1px;
}
li {
  list-style: none;
  text-align: left;
  padding-top: 14px;
  color: rgba(255, 255, 255, 0.459);
}
li a {
  text-decoration: none;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.459);
  cursor: pointer;
}
li a:hover {
  color: var(--main_color);
}
p > span {
  font-weight: 600;
}
i {
  vertical-align: middle;
}
.data:last-child {
  padding-bottom: 50px;
}
.item-col1 p {
  font-size: 14px;
  letter-spacing: 0.6px;
  line-height: 1.5;
}
.container-header {
  max-width: 100%;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
}
.icon-left {
  width: 18px;
  vertical-align: middle;
  margin-right: 5px;
  fill: rgb(49, 49, 49);
}

.footer-footer {
  color: rgba(0, 0, 0, 0.404);
  height: 80px;
  text-align: center;
  font-size: 14px;
  background-color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
}
.footer-footer > p > span {
  color: rgba(0, 0, 0, 0.404);
  font-weight: 400;
}
.politicas {
  display: none;
}
.informacion {
  display: none;
}
.heart {
  fill: #f14b5a;
  width: 12px;
}
.title {
  font-weight: 600;
  margin-bottom: 0;
  background-color: transparent;
  color: #fff;
  text-align: left;
  height: 40px;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.icon-paper-plane-2 {
  padding-right: 10px;
  font-size: 16px;
  cursor: pointer;
}
.input-footer {
  margin-top: 20px;
}
.ko-input {
  position: relative;
  display: grid;
  align-content: start;
  grid-row-gap: 5px;
}
.ko-input input {
  width: 100%;
  padding: 10px 35px 10px 15px;
  box-sizing: border-box;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.459);
  font-size: 14px;
  border-radius: 2px;
  outline-color: #fff;
  color: #fff;
}
.ko-input i.icon-paper-plane-2 {
  position: absolute;
  top: 12.5px;
  right: 5px;
  z-index: 2;
}
.ko-input .response {
  justify-self: start;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 0 10px;
  height: 32px;
  line-height: 30px;
  font-size: 12px;
  color: #fff;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: 1px solid rgba(255, 255, 255, 0.2);
  white-space: nowrap;
  height: 28px;
  line-height: 26px;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.1s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-10px);
  opacity: 0;
}
.link-komercia {
  font-size: 13px;
  letter-spacing: 0.8px;
  line-height: 2;
}
@media (max-width: 650px) {
  .col5 {
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
