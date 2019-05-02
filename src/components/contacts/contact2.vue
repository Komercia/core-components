<template>
  <div class="contacto">
    <div class="contacto_content">
      <div class="maps" v-show="geolocalizacion.length">
        <div id="map"></div>
        <div class="info">
          <p class="description">Visita nuestra tienda más cercana</p>
          <div class="block">
            <i class="icon-facebook-places"></i>
            <p class="address" v-if="geolocalizacion[0]">{{geolocalizacion[0].direccion}}</p>
          </div>
          <p class="invite">Te Esperamos</p>
        </div>
      </div>
      <div class="container-contact">
        <div class="contact">
          <div class="form section">
            <p class="title-section">Pónte en contacto con nosotros</p>
            <div class="content-inputs">
              <p class="text-secundary">
                <label>Nombre</label>
                <input type="text" v-model="nombre">
              </p>
              <p class="text-secundary">
                <label>Celular</label>
                <input type="text" v-model="numberphone">
              </p>
            </div>
            <p class="text-secundary">
              <label>Correo</label>
              <input type="text" v-model="email">
            </p>
            <p class="text-secundary">
              <label>Comentario</label>
              <textarea rows="8" v-model="comment"></textarea>
              <button class="submitContact" v-on:click="submitContact">Enviar</button>
            </p>
          </div>
          <div class="information section">
            <div class="section-about" v-if="storeData.descripcion">
              <p class="title-section">Información sobre nosotros</p>
              <p class="description-store text-secundary"><div v-html="storeData.descripcion"></div></p>
            </div>
            <div class="section-contact">
              <p class="title-section">Contáctanos</p>
              <div class="row">
                <div class="item">
                  <i class="icon-mail-5"></i>
                  <div class="info-item">
                    <p class="text-item text-secundary" v-if="storeData.telefono">
                      <span>Tel:</span> {{storeData.telefono}}</p>
                    <p class="text-item text-secundary" v-if="storeData.email_tienda">
                      <span>Correo:</span> {{storeData.email_tienda}}
                    </p>
                  </div>
                </div>
                <div class="item" v-if="geolocalizacion[0] && geolocalizacion[0].horario">
                  <i class="icon-clock-1-1"></i>
                  <div class="info-item">
                    <p class="text-item text-secundary">
                      <span>Horario:</span> {{geolocalizacion[0].horario}}
                    </p>
                  </div>
                </div>
                <div class="item" v-else>
                  <i class="icon-030-24-hours"></i>
                  <div class="info-item">
                    <p class="text-item text-secundary">
                      <span>Horario de soporte:</span> Atendemos tus dudas lo más pronto
                    </p>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="item">
                  <i class="icon-129-placeholder"></i>
                  <div class="info-item">
                    <p class="text-item text-secundary" v-if="geolocalizacion[0]">
                      <span>Dirección:</span> {{geolocalizacion[0].direccion}}</p>
                    <!-- <p class="text-item text-secundary" v-if="storeData">Correo: {{storeData.email_tienda}}</p> -->
                  </div>
                </div>
                <div class="item">
                  <i class="icon-019-fast-delivery" v-if="envios.estado"></i>
                  <div class="info-item" v-if="envios.estado">
                    <p class="text-item text-secundary">
                      <span>{{envio.titulo}}:</span>
                    </p>
                    <p class="text-item text-secundary">{{envio.desc}}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="social">
              <ul class="list-social">
                <li v-show="storeData.red_facebook">
                  <a class="color_facebook" :href="storeData.red_facebook" target="_blank">
                    <i class="icon-facebook" />
                  </a>
                </li>
                <li v-show="storeData.red_instagram">
                  <a class="color_instagram" :href="storeData.red_instagram" target="_blank">
                    <i class="icon-instagram-1" />
                  </a>
                </li>
                <li v-show="storeData.red_twitter">

                  <a class="color_twitter" :href="storeData.red_twitter" target="_blank">
                    <i class="icon-twitter" />
                  </a>
                </li>
                <li v-show="storeData.red_youtube">
                  <a class="color_youtube" :href="storeData.red_youtube" target="_blank">
                    <i class="icon-youtube-play" />
                  </a>
                </li>
                <li v-show="storeData.telefono.startsWith('3') && storeData.telefono.length > 8">
                  <a :href="`https://api.whatsapp.com/send?phone=57${storeData.telefono.replace(/\s/g, '').slice(0,10)}`" target="_blank">
                    <ko-whatsapp class="whatsapp" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import koWhatsapp from '../../Icons/whatsapp'

export default {
  name: 'koContact2',
  components: {
    koWhatsapp
  },
  mounted() {
    this.makeMap()
    if (Object.keys(this.$store.state.envios).length) {
      this.setOptionEnvio()
    }
  },
  watch: {
    geolocalizacion() {
      this.makeMap()
    },
    envios() {
      this.setOptionEnvio()
    }
  },
  data() {
    return {
      nombre: '',
      email: '',
      numberphone: '',
      comment: '',
      message: {
        text: '',
        open: false
      },
      envio: {
        titulo: '',
        desc: ''
      }
    }
  },
  computed: {
    geolocalizacion() {
      return this.$store.state.geolocalizacion
    },
    storeData() {
      return this.$store.state.tienda
    },
    envios() {
      return this.$store.state.envios
    }
  },
  methods: {
    submitContact() {
      const json = {
        nombre: this.nombre,
        correo: this.email,
        celular: this.numberphone,
        comentario: this.comment,
        tienda: this.$store.state.id
      }
      axios
        .post(`https://templates.komercia.co/api/mensaje-contacto`, json)
        .then(response => {
          this.nombre = ''
          this.email = ''
          this.numberphone = ''
          this.comment = ''
          this.$store.state.id = ''
        })
    },
    makeMap() {
      let place = { latitud: 4.14, longitud: -73.63 }
      if (this.geolocalizacion && this.geolocalizacion.length != 0) {
        place = this.geolocalizacion[0]
      }
      const firstPlace = { lat: place.latitud, lng: place.longitud }
      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: firstPlace
      })
      if (this.geolocalizacion) {
        for (const place of this.geolocalizacion) {
          const marker = new google.maps.Marker({
            position: { lat: place.latitud, lng: place.longitud },
            map
          })
        }
      }
    },
    setOptionEnvio() {
      if (this.envios.estado) {
        switch (this.envios.valores.envio_metodo) {
          case 'gratis':
            this.envio = {
              titulo: 'Envío gratis',
              desc: 'Disfruta de este obsequio por parte de la tienda.'
            }
            break
          case 'tarifa_plana':
            this.envio = {
              titulo: 'Tarifa plana',
              desc: 'Este costo de envio no varia'
            }
            break
          case 'precio':
            this.envio = {
              titulo: 'Tarifa por precio',
              desc:
                'Segun la suma del costo de tus productos te cobraran el envio'
            }
            break
          case 'peso':
            this.envio = {
              titulo: 'Tarifa por peso',
              desc: ''
            }
            break
          default:
        }
      } else {
        this.envio = {
          titulo: '',
          desc: ''
        }
      }
    }
  }
}
</script>

<style scoped>
@import 'https://unpkg.com/komercia-fuentes@1.0.5/styles.css';
.contacto {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
header {
  position: relative;
  width: 100%;
  height: 90px;
  background-color: #9b9b9b;
  padding: 0 20px;
}
.contacto_content {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px 0;
}
.maps {
  position: relative;
  width: 100%;
  max-height: 500px;
  height: 100%;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  z-index: 1;
}
#map {
  /* max-width: 480px; */
  width: 100%;
  height: 480px;

  background-color: transparent;
}
.form {
  flex: 1;
  bottom: 10px;
  background-color: #fff;
  box-sizing: border-box;
  padding: 0px 16px;
  margin: 0 10px;
  color: #333;
}
.form input,
.form textarea {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding-left: 10px;
  background-color: transparent;
  overflow: hidden;
  outline: none;
  border-style: none;
  border: solid 0.5px rgba(129, 129, 129, 0.25);
  margin: 5px 0 16px;
}
.form input:focus,
.form textarea:focus {
  border: solid 1px rgba(0, 0, 0, 0.6);
}
.form input {
  height: 40px;
}
.content-inputs p:first-child {
  margin-right: 40px;
}
.form textarea {
  box-sizing: border-box;
  padding: 15px 10px;
}
.form .submitContact {
  border-style: none;
  padding: 10px 40px;
  margin: 0 10px 10px 0px;
  outline: none;
  cursor: pointer;
  background-color: var(--button_color);
  color: var(--button_text_color);
}
.message {
  position: absolute;
  max-width: 400px;
  height: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: black;
  background-color: #fff;
  z-index: 3;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 5px;
  overflow: hidden;
  transform: translateY(0px);
  opacity: 0;
  transition: 0.3s;
}
.message i {
  padding: 10px;
  background-color: #13ce66;
  color: #fff;
}
.message p {
  margin: 0 10px;
  text-align: center;
  font-size: 15px;
  color: #656565;
}
.section-contact{
  color: var(--text_color);
}
.info {
  background-color: var(--main_color);
  color: var(--text_color);
  box-sizing: border-box;
  padding: 45px;
  max-width: 350px;
  width: 100%;
  height: 300px;
  position: absolute;
  left: 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.description {
  font-weight: 400;
  letter-spacing: 0.5px;
  font-size: 20px;
  line-height: 1.2;
  text-transform: uppercase;
}
.block {
  display: flex;
}
.info i {
  font-size: 40px;
  display: flex;
  padding-right: 15px;
  align-items: center;
}
.address {
  font-size: 14px;
  line-height: 1.5;
  align-self: center;
  text-transform: capitalize;
  opacity: 0.8;
}
.invite {
  display: block;
  font-size: 14px;
  /* text-transform: uppercase; */
  border-bottom: 1px solid #eee;
  align-self: flex-start;
}
.container-contact {
  max-width: 1200px;
  width: 100%;
  margin: 60px auto;
}
.contact {
  display: flex;
}
.information {
  flex: 1;
}
.section {
  box-sizing: border-box;
  padding: 20px;
}
.title-section {
  text-transform: uppercase;
  font-weight: 600;
  font-size: 20px;
  display: flex;
  align-items: center;
  margin: 20px 0;
}
.title-section::after {
  content: '';
  border-bottom: 1px solid #eee;
  width: 150px;
  height: 1px;
  display: flex;
  margin-left: 20px;
}
.openMessage {
  height: initial;
  opacity: 1;
  transform: translateY(20px);
}
label {
  font-size: 14px;
}
.content-inputs {
  display: flex;
  justify-content: space-between;
}
.content-inputs > p {
  flex: 1;
}
.description-store {
  font-size: 14px;
  line-height: 1.5;
}
.text-secundary {
  color: var(--text_color);
}
.form .text-secundary{
  color: #333;
}
.row {
  display: flex;
  margin: 30px 0;
  /* height: 150px; */
}
.row .item:last-child {
  padding-left: 10px;
}
.info-item {
  padding-left: 10px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
}
.info-item p {
  font-size: 13px;
  line-height: 1.2;
}
.row i {
  font-size: 40px;
  align-self: center;
  display: flex;
}
.item {
  display: flex;
  flex: 1;
}
.text-item span {
  font-weight: 600;
}
ul {
  display: flex;
}
li > a {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 20px 0 0;
}
a > i {
  color: #fff;
  font-size: 22px;
  display: flex;
}
.color_facebook {
  background-color: #365493;
}
.color_instagram {
  background-color: #dc1c66;
}
.color_twitter {
  background-color: #33ccff;
}
.color_youtube {
  background-color: #cb2027;
}
.color_facebook:hover {
  background-color: rgba(54, 84, 147, 0.6);
}
.color_instagram:hover {
  background-color: rgba(220, 28, 102, 0.6);
}
.color_twitter:hover {
  background-color: rgba(51, 204, 255, 0.6);
}
.color_youtub:hovere {
  background-color: rgba(203, 32, 39, 0.6);
}
.whatsapp {
  fill: #27d367;
  width: 40px;
  background: var(--background_color);
}
@media (max-width: 1260px) {
  .contacto_content {
    grid-auto-flow: column;
    grid-template: auto auto / 1fr;
    grid-row-gap: 20px;
  }
}
@media (max-width: 920px) {
}
</style>
