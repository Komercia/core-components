<template>
  <div
    class="whatsapp"
    v-if="whatsapp"
  >
    <div
      class="btn-whatsapp"
      @click="redirectWhatsapp()"
    >
      <whatsapp-icon />
    </div>
  </div>
</template>

<script>
import WhatsappIcon from "../../Icons/whatsapp2";
export default {
  name: "whatsapp",
  components: {
    WhatsappIcon
  },
  computed: {
    whatsapp() {
      return this.$store.state.whatsapp;
    }
  },
  methods: {
    redirectWhatsapp() {
      window.open(
        `https://web.whatsapp.com/send?phone=57${this.whatsapp}&text=Hola`,
        "_blank"
      );
    }
  }
};
</script>

<style scoped>
.whatsapp {
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 0;
  height: 0;
  z-index: 99999999;
}
.btn-whatsapp {
  position: fixed;
  right: 10px;
  bottom: 10px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  cursor: pointer;
  background-color: rgb(255, 255, 255);
}
</style>
