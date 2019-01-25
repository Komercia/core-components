<template>
  <div class="slider">
    <swiper
      :options="swiperOption"
      ref="mySwiper"
      @someSwiperEvent="callback"
    >
      <swiper-slide v-for="(item, index) in setting.data">
        <div class="slide">
          <img
            :src="item.photo"
            alt=""
          >
        </div>
      </swiper-slide>
      <div
        class="pagination"
        slot="pagination"
      >
        <div
          class="btn"
          v-for="(item, index) in setting.data.length"
          @click="changeSlide(index)"
        ></div>
      </div>

    </swiper>

  </div>
</template>

<script>
export default {
  name: "ko-slider4",
  props: {
    setting: {
      type: Object,
      default: function() {
        return {
          name: "",
          data: [
            {
              photo:
                "https://cdn.shopify.com/s/files/1/0011/8423/5583/files/slideshow1_776d460a-9623-4173-a569-66e3ed4966ef.png?v=1529577793"
            }
          ]
        };
      }
    }
  },
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
