<template>
  <swiper :options="swiperOption" ref="mySwiper">
    <!-- slides -->
    <swiper-slide>
      <image-cloudinary class="photo" :src="setPhoto(photo)"/>
    </swiper-slide>
    <swiper-slide v-for="photo in photos" :key="photo.id">
      <img class="photo" :src="setPhoto(photo.foto_cloudinary)">
    </swiper-slide>
    <swiper-slide v-if="idYoutube && idYoutube !== ''">
      <div class="youtube">
        <button class="youtube__action_back" @click="changeSlide()">
          <i class="material-icons">keyboard_backspace</i>
        </button>
        <iframe
          style="max-width: 400px; width: 100%"
          height="250"
          :src="`https://www.youtube.com/embed/${idYoutube}?rel=0&amp;controls=0&amp;showinfo=0`"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  components: { swiper, swiperSlide },
  name: "carrousel",
  props: ["photos", "photo", "idYoutube"],
  data() {
    return {
      swiperOption: {
        direction: "horizontal",
        pagination: ".swiper-pagination",
        setWrapperSize: true,
        paginationClickable: true,
        grabCursor: true,
        autoplay: 2500
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  methods: {
    setPhoto(photo) {
      if (photo === "placeholder1.svg") {
        return require(`../../assets/${photo}`);
      } else {
        return photo;
      }
    },
    changeSlide() {
      this.swiper.slidePrev(500, false);
    }
  }
};
</script>

<style scoped>
.swiper-container {
  max-width: 100%;
  overflow: hidden;
  height: 350px;
}
.swiper-slide {
  height: 100%;
  text-align: center;
  font-size: 18px;
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
.swiper-slide .photo {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  margin: 0 auto;
}
.photos .responsive .swiper-slide.swiper-slide-next .photo {
  /*visibility: hidden;*/
}
.photos .responsive .swiper-pagination-bullet {
  background-color: rgba(255, 255, 255, 0.5);
}
.photos .responsive .swiper-pagination-bullet-active {
  background-color: #fff;
}
.youtube {
  width: 99%;
  max-width: 400px;
  display: grid;
  justify-items: start;
  grid-gap: 5px;
}
.youtube__action_back {
  background-color: var(--button_color);
  color: var(--button_text_color);
  border-style: none;
  outline: none;
}
</style>
