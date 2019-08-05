<template>
  <div class="slider">
    <div v-show="showSwiper" class="content-swiper">
      <div
        v-swiper:mySwiper="swiperOption"
        ref="mySwiper"
        @slideChange="activeBtn"
      >
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(item, index) in setting.data.banners"
            :key="index"
          >
            <router-link
              :to="`/productos/${item.redirect_to.value}`"
              v-if="item.redirect_to.type == 1"
            >
              <div class="slide">
                <image-cloudinary
                  :src="item.photo"
                  :width="1600"
                />
              </div>
            </router-link>
            <router-link
              :to="`/productos?category=${item.redirect_to.value}`"
              v-if="item.redirect_to.type == 2"
            >
              <div class="slide">
                <image-cloudinary
                  :src="item.photo"
                  :width="1600"
                />
              </div>
            </router-link>
            <router-link
              :to="`/productos?search=${item.redirect_to.value}`"
              v-if="item.redirect_to.type == 3"
            >
              <div class="slide">
                <image-cloudinary
                  :src="item.photo"
                  :width="1600"
                />
              </div>
            </router-link>
            <router-link
              :to="item.redirect_to.value"
              v-if="item.redirect_to.type == 4"
            >
              <div class="slide">
                <image-cloudinary
                  :src="item.photo"
                  :width="1600"
                />
              </div>
            </router-link>
            <a
              :href="item.redirect_to.value"
              v-else-if="item.redirect_to.type == 5"
              :key="index"
            >
              <div class="slide">
                <image-cloudinary
                  :src="item.photo"
                  :width="1600"
                />
              </div>
            </a>
          </div>
        </div>
        <div
          class="pagination"
          slot="pagination"
          v-if="setting.data.banners.length > 1"
        >
          <div
            class="btn"
            :class="{selected: index == indexBtn}"
            v-for="(item, index) in setting.data.banners.length"
            :style="`border-left: 20px solid ${btnColor}`"
            @click="changeSlide(index)"
            :key="index"
          ></div>
        </div>
      </div>
    </div>
    <div class="content-swiper-responsive">
      <div
        v-swiper:mySwiper="swiperOption2"
        ref="mySwiper2"
        @slideChange="activeBtn2"
      >
        <div class="swiper-wrapper">
          <div
            v-for="(item, index) in banners"
            :key="index"
          >
            <router-link
              :to="`/productos/${item.redirect_to.value}`"
              v-if="item.redirect_to.type == 1"
            >
              <div class="slide-responsive">
                <image-cloudinary
                  :src="item.photo"
                  :width="600"
                />
              </div>
            </router-link>
            <router-link
              :to="`/productos?category=${item.redirect_to.value}`"
              v-if="item.redirect_to.type == 2"
            >
              <div class="slide-responsive">
                <image-cloudinary
                  :src="item.photo"
                  :width="600"
                />
              </div>
            </router-link>
            <router-link
              :to="`/productos?search=${item.redirect_to.value}`"
              v-if="item.redirect_to.type == 3"
            >
              <div class="slide-responsive">
                <image-cloudinary
                  :src="item.photo"
                  :width="600"
                />
              </div>
            </router-link>
            <router-link
              :to="item.redirect_to.value"
              v-if="item.redirect_to.type == 4"
            >
              <div class="slide-responsive">
                <image-cloudinary
                  :src="item.photo"
                  :width="600"
                />
              </div>
            </router-link>
            <a
              :href="item.redirect_to.value"
              v-else-if="item.redirect_to.type == 5"
              :key="index"
            >
              <div class="slide-responsive">
                <image-cloudinary
                  :src="item.photo"
                  :width="600"
                />
              </div>
            </a>
          </div>
        </div>
        <div
          class="pagination2"
          slot="pagination"
          v-if="banners.length"
        >
          <div
            class="btn2"
            :class="{selected: index == indexBtn2}"
            v-for="(item, index) in banners.length"
            :style="`border-left: 20px solid ${btnColor}`"
            @click="changeSlide2(index)"
            :key="index"
          ></div>
        </div>
      </div>
    </div>
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
          data: {
            banners: [
              {
                photo:
                  "https://res.cloudinary.com/komercia/image/upload/v1548879392/xt7bugfrnpmdpym096kz.png",
                redirect_to: "https://komercia.co"
              },
              {
                photo:
                  "https://res.cloudinary.com/komercia/image/upload/v1548888097/fyu1rbego6hwmtrwpbqx.png",
                redirect_to: ""
              }
            ],
            bannersResponsive: [
              {
                photo:
                  "https://res.cloudinary.com/komercia/image/upload/v1548879392/xt7bugfrnpmdpym096kz.png"
              },
              {
                photo:
                  "https://res.cloudinary.com/komercia/image/upload/v1548888097/fyu1rbego6hwmtrwpbqx.png",
                redirect_to: ""
              }
            ]
          }
        };
      }
    }
  },
  mounted() {
    this.showSwiper = true
  },
  data() {
    return {
      showSwiper:false,
      indexBtn: 0,
      indexBtn2: 0,
      swiperOption: {
        slidesPerView: 1,
        // spaceBetween: 30,
        mousewheel: false,
        // width: "1600",
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      },
      swiperOption2: {
        slidesPerView: 1,
        // spaceBetween: 30,
        mousewheel: true,
        // width: "800",
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
    },
    swiper2() {
      return this.$refs.mySwiper2.swiper;
    },
    btnColor() {
      return this.setting.styleObject.btnColor;
    },
    banners() {
      if (this.setting.data.bannersResponsive.length == 0) {
        return this.setting.data.banners;
      } else {
        return this.setting.data.bannersResponsive;
      }
    }
  },
  methods: {
    changeSlide(index) {
      this.swiper.slideTo(index, 1000, false);
    },
    changeSlide2(index) {
      this.indexBtn2 = this.swiper2.activeIndex;
      this.swiper2.slideTo(index, 1000, false);
    },
    activeBtn() {
      this.indexBtn = this.swiper.activeIndex;
    },
    activeBtn2() {
      this.indexBtn2 = this.swiper2.activeIndex;
    }
  }
};
</script>

<style scoped>
.slider {
  cursor: pointer;
}
.content-swiper-responsive {
  display: none;
}
.content-swiper .swiper-container {
  max-width: 1600px !important;
}
.slide {
  max-width: 1600px;
  width: 100%;
  height: auto;
  position: relative;
}
.slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.pagination {
  width: 100px;
  position: absolute;
  right: 50px;
  bottom: 25px;
  z-index: 9;
  display: flex;
  justify-content: flex-end;
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
  margin-left: 12px;
}
.btn:nth-child(2) {
  transform: rotate(35deg);
}
.btn::before {
  content: "";
  position: absolute;
  top: -6px;
  left: -18px;
  width: 0;
  height: 0;
  border-top: 6px solid transparent;
  border-left: 15px solid rgb(255, 255, 255);
  border-bottom: 6px solid transparent;
  transform: scale(1);
  /* transform: rotate(15deg); */
}
.btn:hover::before {
  transform: scale(0);
}
.btn.selected::before {
  transform: scale(0);
}
@media (max-width: 700px) {
  .slider {
    position: relative;
  }
  .content-swiper-responsive {
    display: initial;
  }
  .content-swiper {
    display: none;
  }
  .content-swiper-responsive .swiper-container {
    max-width: 700px !important;
    position: initial !important;
    width: 100%;
  }
  .slide-responsive {
    max-width: 700px;
    width: 100%;
    height: auto;
    position: initial;
  }
  .slide-responsive img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .btn {
    display: none;
  }
  .btn2 {
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-left: 20px solid rgb(0, 183, 255);
    border-bottom: 10px solid transparent;
    transform: rotate(15deg);
    position: relative;
    cursor: pointer;
    margin-left: 12px;
  }
  .btn2:nth-child(2) {
    transform: rotate(35deg);
  }
  .btn2::before {
    content: "";
    position: absolute;
    top: -6px;
    left: -18px;
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-left: 15px solid rgb(255, 255, 255);
    border-bottom: 6px solid transparent;
    transform: scale(1);
    /* transform: rotate(15deg); */
  }
  .btn2:hover::before {
    transform: scale(0);
  }
  .btn2.selected::before {
    transform: scale(0);
  }
  .pagination2 {
    width: 100px;
    position: absolute;
    right: calc(50% - 30px);
    bottom: -40px;
    z-index: 9;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    /* right: 200px; */
  }
}
</style>
