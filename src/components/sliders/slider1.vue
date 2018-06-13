<template>
  <carousel :perPage="1" :paginationEnabled="true" :autoplay="true" :loop="true" :autoplayTimeout="4000">
    <slide v-for="(banner, index) in bannersData" :key="index">
      <div :class="`${banner.posicion} slide_content`">
        <img :src="setBanner(banner.ruta_banner)" class="slide_photo" :alt="banner.ruta_banner">
        <div class="slide_texts">
          <h1 v-if="banner.titulo">{{ banner.titulo }}</h1>
          <p v-if="banner.descripcion">{{ banner.descripcion }}</p>
          <a href="" v-if="banner.redireccion"><button type="button">Ir a la pagina</button></a>
        </div>
      </div>
    </slide>
  </carousel>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';

export default {
  name: 'koSlider1',
  components: {
    Carousel,
    Slide
  },
  data() {
    return {
      swipe: {
        activeIndex: 0
      },
    };
  },
  computed: {
    bannersData() {
      return this.$store.state.banners;
    },
  },
  methods: {
    setBanner(banner) {
      return `${this.$urlHttp}/banners/${banner}`;
    },
  },
}
</script>

<style scoped>
  .slide_content{
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
  }
  .slide_photo{
    width: 100%;
  }
  .slide_texts{
    max-width: 50%;
    position: absolute;
    text-align: left;
    padding: 0 10vw;
    color: var(--text_color);
    /*top: 0;*/
    /*left: 0;*/
  }
  .slide_texts h1{
    font-size: 10vw;
    margin: 5px;
  }
  .slide_texts p{
    margin: 5px;
  }
  .slide_texts button{
    border-style: none;
    padding: 8px 40px;
    margin: 5px;
    background-color: var(--button_color);
    color: var(--button_text_color);
  }

  .left.slide_content{
    justify-content: flex-start;
  }
  .left.slide_content .slide_texts{
    text-align: left;
  }

  .center.slide_content{
    justify-content: center;
  }
  .center.slide_content .slide_texts{
    text-align: center;
  }

  .right.slide_content{
    justify-content: flex-end;
  }
  .right.slide_content .slide_texts{
    text-align: right;
  }
  @media(max-width: 700px) {
    .slide_texts p{
      display: none;
    }
  }
</style>
