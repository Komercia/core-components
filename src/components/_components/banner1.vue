<template lang="html">
<div class="container">
    <div class="item header">
      <img src="../assets/head.jpg" class="imgdown">
        <div class="item">
        <h4>MID SEASON</h4>
        <h1> SALE</h1>
        <p>UP TO</p>
        <p> 50% OFF</p>
        </div>
        <button class="button ">SHOP NOW</button>
   </div>

    <div class="item left">
        <img src="../assets/left.jpg" class="imgdown">
        <div class="item">
            MID SEASON SALE<br>
            SALE UP TO 50% OFF
            <button class="button">SHOP NOW</button>
        </div>

    </div>

    <div class="item midlane">
      <img src="../assets/center.jpg" class="imgdown">
          <div class="item">
            <p>NEW ARRIVALS<br>
            BROWSE OUR NEW COLLECTIONS</p>
           <button class="button">BROWSE</button>
         </div>
   </div>

   <div class="item right">
      <img src="../assets/right.jpg" class="imgdown">
      <div class="item">
            <p>GET THE LOOK<br>
            NOT READY FOR SUMMER?</p>
            <button class="button">GET THE LOOK</button>
      </div>
    </div>
</div>

</template>

<script>
export default {
  name: 'banner1',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
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
      font-family: helvetica ;
      font-weight: bold;
      max-width: 1366px;
      max-height: 80vh;
      word-break: break-all;
      word-wrap: break-word;
      hyphens: auto;


}

.item{
      display: grid;
      width:auto;
}


.item .item{
      display: grid;
      align-content:center;
      justify-content: center;
      width: 70%;
      text-align: justify;
      font-size: 15px;
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
      opacity: .5;
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
      opacity: 0.5;
      z-index: -1;
}


.button {
      margin-top:10px;
      font-weight: bold;
      background-color: black;
      border: none;
      color: white;
      height: 30px;
      width: 100px;
      text-align: center;
      font-size: 12px;
      cursor: pointer;

}

.header .button{
      height: 40px;
      width: 150px;
      background-color: brown;
      font-size: 15px;
      margin-left: 3%;
      z-index: 2;
}
.header .button:hover{
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
     /* padding: 10px; */

}

.header{
     display: grid;
     align-content:center;
     justify-content: center;
     padding: 0;
     margin: 0;
     height: 300px;
}

.header .item{
     border: solid white;
     height:auto;
     width:70%;
     border-width: 10px;
     border-style: double;
     text-align: center;
     font-size: 12px;
     z-index: 2;

 }

.header .button{
    height: 30px;
    width: 100px;
    background-color: brown;
    font-size: 12px;
    margin-top: 6px;
    margin-left: 28%;
    z-index: 2;

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
