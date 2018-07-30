<template>
<div class="container">
  <div class="item item_image">
    <img :src="setting.data[0].photo">
  </div>
  <div class="item item_content">
    <div class="item texto">
      <h1>{{ setting.data[0].title }}</h1>
      <p>{{ setting.data[0].description }}</p>
      <a :href="setting.data[0].redirect_url">
        <button class="button">{{setting.data[0].button_text}}</button>
      </a>
    </div>
  </div>
  <div class="item item_content item_last">
    <div class="item texto">
      <h1>{{ setting.data[1].title }}</h1>
      <p>{{ setting.data[1].description }}</p>
      <a :href="setting.data[1].redirect_url">
        <button class="button">{{setting.data[1].button_text}}</button>
      </a>
    </div>
  </div>
  <div class="item item_image">
    <img :src="setting.data[1].photo">
  </div>
</div>
</template>

<script>

export default {
  name: 'koContent1',
  props: {
    setting: {
      type: Object,
      default: function () {
        return {
          name: '',
          data: [{
            photo: 'https://images.pexels.com/photos/910329/pexels-photo-910329.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            title: 'SUMMER',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
            redirect_url: '',
            button_text: 'SHOP NOW'
          },
          {
            photo: 'https://images.pexels.com/photos/1153838/pexels-photo-1153838.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            title: 'SPRING',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            redirect_url: '',
            button_text: 'SELL IT',
          }]
        }
      }
    }
  },
}
</script>

<style scoped>
.container{
  display: grid;
  grid-template: repeat(2, 1fr)/repeat(2, 1fr);
  max-width: 1366px;
  margin: 0 auto;

}
.item{
  font-size: 12px;
}
.item .texto{
  max-width: 250px;
  width: 100%;
  text-align: justify;
  line-height: 22px;
  font-size: 15px;
}
.item .button{
  font-weight: bold;
  background-color: var(--button_color);
  border: none;
  color:var(--button_text_color);
  height: 30px;
  width: 150px;
  text-align: center;
  font-size: 12px;
  cursor: pointer;
  margin-top: 10px;
}
.item .button:hover{
  transform: scale(1.1);
}
.item_image{
  overflow: hidden;
}
.item_image img{
  max-height: 500px;
  height: 100%;
  object-fit: cover;
  width: 100%;
  z-index: 1;
}
h1{
  margin-top: 0px;
  margin-bottom: 10px;
}
.item_content{
  display: grid;
  align-items: center;
  justify-items: center;
  overflow: hidden;

}
@media screen and (max-width:800px) {
  .container{
    grid-template: repeat(4, 1fr)/ 1fr;
    max-height: 50%;
  }
  .item_last{
    order: 3;
  }
  .item .texto{
    width: initial;
    padding: 25px;
  }
}
</style>
