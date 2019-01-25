<template>
  <div class="slider">
    <swiper
      :options="swiperOption"
      ref="mySwiper"
    >
      <swiper-slide
        v-for="(item, index) in setting.data.banners"
        :key="index"
      >
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
          v-for="(item, index) in setting.data.banners.length"
          @click="changeSlide(index)"
          :key="index"
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
          data: {
            banners: [
              {
                photo:
                  "https://lh3.googleusercontent.com/RjgDMs-pimIHX-BVgssw1xlXOydfu6fvW42SVywW0ykZhmwV0aUTVSoODyrX-qWbF5CnaHjhP563CXTIiQg3=w1920-h969-rw",
                redirect_to: "https://komercia.co"
              },
              {
                photo:
                  "https://lh3.googleusercontent.com/zmAuDgr5Dt4oDuw02nFkYuBKjQPtNz4TevAZEE8_M7uVCcdq1CqKvgDyw55HXJ_xwTWgBUIYVLJclzBykE70I3BiER5soLvZNRL0rdxOkWcQNRYLn81-ePGcjaVjRknrsptblzTnhlC6OwanU1fCCgfeKTw33gRd1pLzcuQhHpAafkMQboRydOjwh7cha5Ey_iUwlPlV1d7s12iO6eE8zQO54PlSbV7YGQSXN3lDPw4ue4WNqIiscajJsnFIdQs2klN57__Ayuk6HieVTiTKatN-9zpeAFK1krTDy8DyF0MAmu6NTa_N_LQ736SMtiGphub-YvqY2p_gqlZJDIxBvu3vFpnAlHRxQRQzIne8l5HE5Xn7rKeg8uROFwefYgHoEwnezu-yXeRuw5s-E9HzQnRIG5jm8A3u-dO2jB6E7zOOV9J9Yb3MVRZz9mmsIOoIkU9V0S2rVT-td3Jj0cGXVS5444YuYgpRuswHfed26RlDukq3svH0VVUzP-xK1XtkUzSaWOG2jNyk0w2gmKLAk2Zq7YReYdDTPfszixtN6zfrx9PXFsakqYIoqip6uxqiRzoDrUoAYP_byAZCObAN4PkGgLC5KaQN=w1920-h969",
                redirect_to: ""
              }
            ]
          }
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
  methods: {
    changeSlide(index) {
      this.swiper.slideTo(index, 1000, false);
    }
  }
};
</script>

<style scoped>
.slider {
  cursor: pointer;
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
  /* transform: rotate(15deg); */
}
.btn:hover::before {
  border-left: 15px solid rgb(0, 183, 255);
}
</style>
