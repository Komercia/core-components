<template>
  <div class="container-newsletter">
    <div class="newsletter">
      <div class="container-newsletter-description">
        <p class="newsletter-description">{{description.description1}}</p>
      </div>
      <div class="container-subscription">
        <input class="input-subscribe" type="text" placeholder="Correo electrónico" v-model="email">
        <button class="btn-subscribe" type="text" @click="submitNewsletter">Subscríbete</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'koNewsletter1',
  data() {
    return {
      description: {
        description1:'Get 10% off your first order Subscribe to our newsletter',
      },
      email: null,
    };
  },
  methods: {
    submitNewsletter() {
      const json = {
        correo: this.email,
        tienda: this.$store.state.id,
      };
      axios.post(`${this.$urlHttp}/api/front/suscriptores`, json);
    }
  }
}
</script>

<style>
.container-newsletter {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
}
.newsletter {
  max-width: 800px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.container-newsletter-description {
  /* background-color: bisque; */
  max-width: 220px;
  width: 100%;
}
.newsletter-description {
  color: gray;
  line-height: 1.2;
}
.btn-subscribe {
  background-color: #000;
  color: #fff;
  border: 0;
  padding: 10px 30px;
  cursor: pointer;
  margin-left: 15px;
}
.input-subscribe {
  padding: 8px 30px;
}
</style>
