<template lang="html">
<div class="container">
    <div class="item header">
       <img :src="setting[0].photo" class="imgdown">
        <div class="item">
          <p class="phrase" :style="{ fontSize:setting[0].fontsize + 'px' }">
            {{setting[0].title}}
          </p>
        </div>
        <button class="button ">{{setting[0].button_text}}</button>
    </div>

    <div class="item left">
        <img :src="setting[1].photo" class="imgdown">
        <div class="item">
            <p>{{setting[1].title}}</p>
            <button class="button">{{setting[1].button_text}}</button>
        </div>

    </div>

    <div class="item midlane">
      <img :src="setting[2].photo" class="imgdown">
          <div class="item">
            <p>{{setting[2].title}}</p>
           <button class="button">{{setting[2].button_text}}</button>
         </div>
   </div>

   <div class="item right">
      <img :src="setting[3].photo" class="imgdown">
      <div class="item">
            <p>{{setting[3].title}}</p>
            <button class="button">{{setting[3].button_text}}</button>
      </div>
   </div>
</div>

</template>

<script>
export default {
  name: 'koSlider2',
  props: {
    setting: {
      type: Array,
      default: function () {
        return [{
          photo: 'https://images.pexels.com/photos/1154638/pexels-photo-1154638.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          title: 'ALL FREE',
          fontsize: 25,
          redirect_url: '',
          button_text: 'CLICK NOW'
        },
        {
          photo: 'https://images.unsplash.com/photo-1438029071396-1e831a7fa6d8?ixlib=rb-0.3.5&s=9e7a727e0656634634ca38120e466a6b&auto=format&fit=crop&w=992&q=80',
          title: 'SUMMER',
          redirect_url: '',
          button_text: 'SHOP NOW'
        },
        {
          photo: 'https://images.unsplash.com/photo-1526855051836-66a11ba27090?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=87e69a477ddd5f980131b77d8ab8d5ff&auto=format&fit=crop&w=1575&q=80',
          title: 'SPRING',
          redirect_url: '',
          button_text: 'BROWSE IT',
        },
        {
          photo: 'https://images.pexels.com/photos/843277/pexels-photo-843277.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          title: 'WINTER',
          redirect_url: '',
          button_text: 'READY ?'
        }]
      }
    }
  },

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
      margin:0 auto;
      display: grid;
      grid-template:6fr 2fr / repeat(3,1fr);
      grid-template-areas:"header  header header"
                          "left midlane right" ;
      font-weight: bold;
      max-width: 1366px;
      max-height: 80vh;
      /* word-break: break-all; */
      word-wrap: break-word;
      hyphens: auto;
}
.item{
      display: grid;
      width:auto;
}
.phrase{
      width: 100%;
      font-size: 30px;
      text-transform: uppercase;
      font-weight: 500;
}
.item .item{
      display: grid;
      align-content:center;
      justify-content: center;
      width: 70%;
      text-align: justify;
      font-size: 15px;
      z-index: 2;
}
.header{
      overflow: hidden;
      position: relative;
      grid-area: header;
      padding-top: 50px;
      padding-left:100px;
      color: white;
      background-color: black;
}
.header .item{
      border: solid white;
      height:150px;
      width: 150px;
      border-width: 10px;
      border-style: double;
      padding: 10px 20px;
      text-align: center;
      font-size: 16px;
      z-index: 2;
}
.header img{
      object-fit: cover;
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      opacity: 0.6;
      z-index: 1;
}
.left, .midlane, .right{
      overflow: hidden;
      position: relative;
      height: 125px;
      padding-top: 10px;
      padding-left:50px;
}
.left{
      grid-area: left;
}
.midlane{
      grid-area: midlane;
}
.right{
      grid-area:right;
}
.imgdown{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      object-fit: cover;
      opacity: 0.7;
      z-index: 1;
}
.button {
      margin-top:10px;
      font-weight: bold;
      background-color: var(--button_color);
      border: none;
      color: var(--button_text_color);
      height: 30px;
      width: 100px;
      text-align: center;
      font-size: 12px;
      cursor: pointer;
      transition: 0.3s;
}
.header .button{
      height: 40px;
      width: 150px;
      background-color:var(--button_color);
      font-size: 15px;
      margin-left: 3%;
      z-index: 2;
}
.button:hover{
  transform: scale(1.1);
}

@media screen and (max-width:800px) {
.container{
     width: auto;
     max-height: 750px;
     grid-template:1fr 1fr 1fr 1fr / 4fr;
     grid-template-areas: "header"
                            "left"
                            "midlane"
                            "right";
     grid-gap:10px;
}
.header{
     padding: 0;
     margin: 0;
     height: 300px;
     display: grid;
     align-items: center;
     justify-items: center;
}
.header .item{
     height:120px ;
     width:150px;
 }
.header .button{
     background-color: var(--button_color);
     font-size: 12px;
     z-index: 2;
     margin-left: 0;
     width: 100px;
}
.phrase{
  font-size: 25px;
}
.item .item{
    font-size: 15px;
}
.left, .midlane, .right{
    max-height: 100%;
    height: 100%;
    padding-top: 0;
    margin: 0 10px;
}
}

</style>
