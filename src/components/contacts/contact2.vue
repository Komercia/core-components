<template>
  <div class="contacto">
    <div class="contacto_content">
      <div class="maps" v-show="geolocalizacion.length">
        <div id="map"></div>
        <div class="info">
          <p class="description">Visita nuestra tienda en Villavicencio</p>
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
            <input type="text" placeholder="Nombres" v-model="nombre">
            <input type="text" placeholder="Correo electrónico" v-model="email">
            <input type="text" placeholder="Celular" v-model="numberphone">
            <textarea rows="8" placeholder="Comentario" v-model="comment"></textarea>
            <button class="submitContact" v-on:click="submitContact">Enviar</button>
          </div>
          <div class="information section">
            <p class="title-section">Información sobre nosotros</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'koContact2',
  mounted() {
    this.makeMap()
  },
  watch: {
    geolocalizacion() {
      this.makeMap()
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
      }
    }
  },
  computed: {
    geolocalizacion() {
      return this.$store.state.geolocalizacion
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
    }
  }
}
</script>

<style scoped>
@import 'https://unpkg.com/komercia-fuentes@1.0.4/styles.css';
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
  border: solid 0.5px #e8e9ed;
  margin: 16px 0;
  resize: none;
}
.form input:focus,
.form textarea:focus {
  border: solid 1px #cecfd0;
}
.form input {
  max-width: 350px;
  height: 40px;
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
.info {
  background-color: var(--main_color);
  color: var(--background_color);
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
  margin: 0 auto;
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
