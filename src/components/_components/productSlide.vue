<template>
  <swiper :options="swiperOption">
    <!-- slides -->
    <swiper-slide><img class="photo" :src="setPhoto(photo)"></swiper-slide>
    <swiper-slide v-for="photo in photos" :key="photo.id"><img class="photo" :src="setPhoto(photo.foto)"></swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination"  slot="pagination"></div>
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
    components: { swiper, swiperSlide },
    name: 'carrousel',
    props: ['photos', 'photo'],
    data() {
          return {
            swiperOption: {
              direction: 'horizontal',
              pagination: '.swiper-pagination',
              setWrapperSize: true,
              paginationClickable: true,
              grabCursor : true,
              autoplay: 2500,
            }
          }
        },
        methods: {
          setPhoto(photo){
            return `${this.$urlHttp}/tumb/${photo}`;
          }
        }
      }
    </script>

<style scoped>
  .swiper-container {
    max-width: 100%;
    overflow: hidden;
    height: 350px;
    background-color: #FFF;
  }
  .swiper-slide {
      height: 100%;
      text-align: center;
      font-size: 18px;
      background: #fff;
      /* Center slide text vertically */
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
  }
  .photos .responsive .swiper-slide .photo{
    max-width: 100%;
    max-height: 100%;
    margin: 0 auto;
  }
  .photos .responsive .swiper-slide.swiper-slide-next .photo{
    /*visibility: hidden;*/
  }
  .photos .responsive .swiper-pagination-bullet{
    background-color: rgba(255,255,255,0.5);
  }
  .photos .responsive .swiper-pagination-bullet-active{
    background-color: #FFF;
  }
</style>
