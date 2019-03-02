<template>
  <div class="loader">
    <img
      src="https://res.cloudinary.com/komercia-store/image/upload/v1551545737/komercia/preview.gif"
      alt="loading"
    >
  </div>
</template>

<script>
export default {
  name: "koPreloader1",
  created() {
    this.repeatLoad();
    this.load();
  },
  data() {
    return {
      loader: false
    };
  },
  methods: {
    repeatLoad() {
      let interval = setInterval(() => {
        if (this.loader) {
          const loader = document.querySelector(".loader");
          loader.className += " hidden";
          clearTimeout(interval);
        } else {
          this.load();
        }
      }, 5000);
    },
    load() {
      window.addEventListener("load", () => {
        this.loader = true;
      });
    }
  }
};
</script>

<style scoped>
.loader {
  position: fixed;
  z-index: 9999999999999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loader > img {
  max-width: 800px;
  width: 100%;
}
.loader.hidden {
  animation: fadeOut 1s;
  animation-fill-mode: forwards;
}

@keyframes fadeOut {
  100% {
    opacity: 0;
    visibility: hidden;
  }
}
</style>
