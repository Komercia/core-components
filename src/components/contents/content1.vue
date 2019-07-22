<template>
  <div class="container">
    <div class="item item_image">
      <img :src="fitImage(setting.data[0].photo)" />
    </div>
    <div class="item item_content">
      <div class="item texto">
        <h2>{{ setting.data[0].title }}</h2>
        <p>{{ setting.data[0].description }}</p>
        <a :href="setting.data[0].redirect_url">
          <button class="button">{{setting.data[0].button_text}}</button>
        </a>
      </div>
    </div>
    <div class="item item_content item_last">
      <div class="item texto">
        <h2>{{ setting.data[1].title }}</h2>
        <p>{{ setting.data[1].description }}</p>
        <a :href="setting.data[1].redirect_url">
          <button class="button">{{setting.data[1].button_text}}</button>
        </a>
      </div>
    </div>
    <div class="item item_image">
      <img :src="setting.data[1].photo" />
    </div>
  </div>
</template>

<script>
export default {
  name: "koContent1",
  props: {
    setting: {
      type: Object,
      default: function() {
        return {
          name: "",
          data: [
            {
              photo:
                "https://res.cloudinary.com/komercia-store/image/upload/v1550852556/placeholder/product-image-placeholder.jpg",
              title: "SUMMER",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              redirect_url: "",
              button_text: "SHOP NOW"
            },
            {
              photo:
                "https://res.cloudinary.com/komercia-store/image/upload/v1550852556/placeholder/product-image-placeholder.jpg",
              title: "SPRING",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              redirect_url: "",
              button_text: "SELL IT"
            }
          ]
        };
      }
    }
  },
  methods: {
    fitImage(image) {
      let fitImage = image.split("/upload/");
      return (
        "https://res.cloudinary.com/komercia-store/image/upload/w_600,q_auto:best,f_auto/" +
        fitImage[1]
      );
    }
  }
};
</script>

<style scoped>
.container {
  display: grid;
  grid-template: repeat(2, 1fr) / repeat(2, 1fr);
  max-width: 1366px;
  margin: 0 auto;
}
.item {
  font-size: 12px;
}
.item .texto {
  max-width: 400px;
  width: 100%;
  text-align: justify;
  line-height: 22px;
  font-size: 16px;
  padding: 20px;
  box-sizing: border-box;
  color: var(--text_color);
}
.item .button {
  font-weight: bold;
  background-color: var(--button_color);
  border: none;
  color: var(--button_text_color);
  height: 30px;
  width: 150px;
  text-align: center;
  font-size: 12px;
  cursor: pointer;
  margin-top: 10px;
}
.item .button:hover {
  transform: scale(1.1);
}
.item_image {
  overflow: hidden;
}
.item_image img {
  max-height: 500px;
  height: 100%;
  object-fit: cover;
  width: 100%;
  z-index: 1;
}
h2 {
  margin-top: 0px;
  margin-bottom: 10px;
  font-size: 20px;
}
.item_content {
  display: grid;
  align-items: center;
  justify-items: center;
  overflow: hidden;
}
@media screen and (max-width: 800px) {
  .container {
    grid-template: repeat(4, 1fr) / 1fr;
    max-height: 50%;
  }
  .item_last {
    order: 3;
  }
  .item .texto {
    width: initial;
  }
}
@media screen and (max-width: 600px) {
  .item .texto {
    font-size: 14px;
  }
}
</style>
