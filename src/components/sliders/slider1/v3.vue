<template>
<no-ssr>
  <carousel :perPage="1" :paginationEnabled="true" :autoplay="true" :loop="true" :autoplayTimeout="4000">
    <slide v-for="(banner, index) in setting.data" :key="index">
      <div :class="`${banner.posicion} slide_content`">
        <image-cloudinary :src="banner.foto_cloudinary" class="slide_photo" :alt="banner.titulo" />
        <div class="slide_texts" :style="`grid-gap: ${banner.spaces}px;`">
          <h1 v-if="banner.titulo" :style="`font-size: ${banner.titulosize}vw`">{{ banner.titulo }}</h1>
          <p v-if="banner.descripcion" :style="`font-size: ${banner.descripcionsize}px;`">{{ banner.descripcion }}</p>
          <template v-if="banner.redirect_to">
            <router-link v-if="banner.redirect_to.type == 1" :to="`/productos/${banner.redirect_to.value}`">
              <button type="button">Ir a la pagina</button>
            </router-link>
            <router-link v-else-if="banner.redirect_to.type == 2" :to="`/productos?category=${banner.redirect_to.value}`">
              <button type="button">Ir a la pagina</button>
            </router-link>
            <router-link v-else-if="banner.redirect_to.type == 3" :to="`/productos?search=${banner.redirect_to.value}`">
              <button type="button">Ir a la pagina</button>
            </router-link>
            <router-link v-else-if="banner.redirect_to.type == 4" :to="banner.redirect_to.value">
              <button type="button">Ir a la pagina</button>
            </router-link>
            <a v-else-if="banner.redirect_to.type == 5" :href="banner.redirect_to.value" target="_blank">
              <button type="button">Ir a la pagina</button>
            </a>
          </template>
        </div>
      </div>
    </slide>
  </carousel>
  </no-ssr>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'

export default {
  name: 'koSlider1_v3',
  props: {
    setting: {
      type: Object,
      default: function() {
        return {
          name: '',
          data: [
            {
              foto_cloudinary:
                'https://cdn.shopify.com/s/files/1/0011/8423/5583/files/slideshow1_776d460a-9623-4173-a569-66e3ed4966ef.png?v=1529577793'
            }
          ]
        }
      }
    }
  },
  components: {
    Carousel,
    Slide
  },
  data() {
    return {
      swipe: {
        activeIndex: 0
      }
    }
  },
  methods: {}
}
</script>

<style scoped>
.slide_content {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
}
.slide_photo {
  width: 100%;
}
.slide_texts {
  max-width: 50%;
  position: absolute;
  text-align: left;
  padding: 0 10vw;
  color: var(--text_color);
  display: grid;
  /*top: 0;*/
  /*left: 0;*/
}
.slide_texts h1 {
  /*font-size: 10vw;*/
  margin: 5px;
}
.slide_texts p {
  margin: 0px;
}
.slide_texts button {
  border-style: none;
  padding: 8px 40px;
  margin: 5px;
  background-color: var(--button_color);
  color: var(--button_text_color);
}

.left.slide_content {
  justify-content: flex-start;
}
.left.slide_content .slide_texts {
  text-align: left;
}

.center.slide_content {
  justify-content: center;
}
.center.slide_content .slide_texts {
  text-align: center;
}

.right.slide_content {
  justify-content: flex-end;
}
.right.slide_content .slide_texts {
  text-align: right;
}
@media (max-width: 700px) {
  .slide_texts p {
    display: none;
  }
}
</style>
