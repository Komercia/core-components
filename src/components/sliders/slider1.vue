<template>
    <swiper :options="swiperOption">
      <swiper-slide v-for="(banner, index) in banners" :key="index">
        <img  class="banner" :src="setBanner(banner.ruta_banner)">
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev">
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27 44'>
          <path d='M0,22L22,0l2.1,2.1L4.2,22l19.9,19.9L22,44L0,22L0,22L0,22z' :fill="settingsComponent.arrowColor"/>
        </svg>
      </div>
      <div class="swiper-button-next" slot="button-next">
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27 44'>
          <path d='M27,22L27,22L5,44l-2.1-2.1L22.8,22L2.9,2.1L5,0L27,22L27,22z' :fill='settingsComponent.arrowColor'/>
        </svg>
      </div>
  </swiper>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';

export default {
  components: { swiper, swiperSlide },
  name: 'koSlider1',
  data() {
    return {
      swiperOption: {
        loop: true,
        direction: 'horizontal',
        // pagination: '.swiper-pagination',
        setWrapperSize: true,
        paginationClickable: true,
        // grabCursor: true,
        autoplay: 3500,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
      },
      settingsComponent: {
        arrowColor: '#fff'
      },
    };
  },
  computed: {
    banners() {
      return this.$store.state.banners;
    },
  },
  methods: {
    setBanner(banner) {
      return `${this.$urlHttp}/banners/${banner}`;
    },
  },
};
</script>

<style>

</style>
