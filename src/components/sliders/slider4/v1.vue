<template>
  <div class="slider">
    <swiper
      :options="swiperOption"
      ref="mySwiper"
      @someSwiperEvent="callback"
    >
      <swiper-slide v-for="(item, index) in 3">
        <div class="slide">
          <img
            src="https://images.unsplash.com/photo-1547564091-6c5a23ce7aba"
            alt=""
          >
        </div>
      </swiper-slide>

      <!-- <div
        class="swiper-pagination"
        slot="pagination"
      ></div> -->
      <div
        class="pagination"
        slot="pagination"
      >
        <div
          class="btn"
          v-for="(item, index) in 3"
          @click="changeSlide(index)"
        ></div>
      </div>

    </swiper>

  </div>
</template>

<script>
export default {
  name: "ko-slider4",
  data() {
    return {
      swiperOption: {
        slidesPerView: 1,
        // spaceBetween: 30,
        mousewheel: true,
        // width: "1600",
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {
    // current swiper instance
    console.log("this is current swiper instance object", this.swiper);
    this.swiper.slideTo(3, 1000, false);
  },
  methods: {
    changeSlide(index) {
      this.swiper.slideTo(index, 1000, false);
    }
  }
};
</script>

<style scoped>
.slider {
  /* width: 100%; */
}
.swiper-container {
  max-width: 1600px !important;
}
.slide {
  max-width: 1600px;
  width: 100%;
  height: 500px;
  position: relative;
}
.slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.swiper-slide {
  /* width: 1600px !important; */
}
.pagination {
  width: 100px;
  position: absolute;
  right: 50px;
  bottom: 25px;
  z-index: 9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* right: 200px; */
}
.btn {
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-left: 20px solid rgb(0, 183, 255);
  border-bottom: 10px solid transparent;
  transform: rotate(15deg);
  position: relative;
  cursor: pointer;
}
.btn::before {
  content: "";
  position: absolute;
  top: -8px;
  left: -19px;
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-left: 16px solid rgb(255, 255, 255);
  border-bottom: 8px solid transparent;
  /* transform: rotate(15deg); */
}
</style>
