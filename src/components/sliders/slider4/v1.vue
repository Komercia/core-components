<template>
  <div class="slider">
    <swiper
      :options="swiperOption"
      ref="mySwiper"
      @someSwiperEvent="callback"
    >
      <!-- slides -->
      <swiper-slide>I'm Slide 1</swiper-slide>
      <swiper-slide>I'm Slide 2</swiper-slide>
      <swiper-slide>I'm Slide 3</swiper-slide>
      <swiper-slide>I'm Slide 4</swiper-slide>
      <swiper-slide>I'm Slide 5</swiper-slide>
      <swiper-slide>I'm Slide 6</swiper-slide>
      <swiper-slide>I'm Slide 7</swiper-slide>
      <!-- Optional controls -->
      <div
        class="swiper-pagination"
        slot="pagination"
      ></div>
      <div
        class="swiper-button-prev"
        slot="button-prev"
      ></div>
      <div
        class="swiper-button-next"
        slot="button-next"
      ></div>
      <div
        class="swiper-scrollbar"
        slot="scrollbar"
      ></div>
    </swiper>
  </div>
</template>

<script>
eexport default {
    name: 'ko-slider4',
    data() {
      return {
        swiperOption: {
          // some swiper options/callbacks
        }
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    mounted() {
      // current swiper instance
      console.log('this is current swiper instance object', this.swiper)
      this.swiper.slideTo(3, 1000, false)
    }
  }
</script>

<style scoped>
</style>
