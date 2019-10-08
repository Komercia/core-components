<template>
  <div class="container-newsletter">
    <div class="newsletter">
      <div class="container-newsletter-description">
        <p class="newsletter-description">{{description.description1}}</p>
      </div>
      <div class="container-subscription">
        <input
          class="input-subscribe"
          type="text"
          placeholder="Correo electrónico"
          v-model="email"
        >
        <button
          class="btn-subscribe"
          type="text"
          @click="submitNewsletter"
        >Subscríbete</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "koNewsletter1",
  data() {
    return {
      description: {
        description1: "Suscribete a nuestro newsletter para obtener información"
      },
      email: null
    };
  },
  methods: {
    submitNewsletter() {
      if (this.email) {
        const json = {
          email: this.email,
          tienda: this.$store.state.id
        };
        axios.post(`https://api2.komercia.co/api/tienda/suscriptor`, json);
      }
    }
  }
};
</script>

<style>
.container-newsletter {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 150px;
  padding: 10px;
}
.newsletter {
  max-width: 800px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  justify-content: space-between;
  justify-items: center;
  margin: 0 20px;
}
.container-newsletter-description {
  width: 220px;
}
.newsletter-description {
  color: var(--text_color);
  line-height: 1.2;
  text-align: center;
}
.container-subscription {
  width: 100%;
  display: grid;
  grid-template-columns: 200px 150px;
  grid-gap: 10px;
  justify-content: center;
  align-content: center;
}
.btn-subscribe {
  width: 100%;
  background-color: var(--button_color);
  color: var(--button_text_color);
  border: 0;
  padding: 10px 30px;
  box-sizing: border-box;
  cursor: pointer;
}
.input-subscribe {
  padding: 8px 30px;
  border: 1px solid rgb(105, 105, 105);
}
@media (max-width: 550px) {
  .newsletter {
    grid-template: repeat(2, 1fr) / 1fr;
    grid-gap: 10px;
  }
}
@media (max-width: 380px) {
  .container-subscription {
    grid-template-columns: 180px 135px;
  }
}
@media (max-width: 340px) {
  .container-subscription {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
}
</style>
