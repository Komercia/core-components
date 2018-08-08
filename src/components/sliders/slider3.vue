<template>
  <div class="container">
    <div class="img-principal left">
      <img :src="setting[0].photo" alt="">
    </div>
    <div class="right">
      <div class="top">
        <img :src="setting[1].photo" alt="">
      </div>
      <div class="bottom">
        <img :src="setting[2].photo" alt="">
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'koSlider3',
  data() {
    return {}
  },
  props: {
    setting: {
      type: Array,
      default: function() {
        return [
          {
            photo:
              'https://images.unsplash.com/photo-1532365184436-ed06052719f3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a810a6c7a7aa38e50710cc92bfa22fd9&auto=format&fit=crop&w=1500&q=80'
          },
          {
            photo:
              'https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=03192d46f050d8f7a19aaecc8876d440&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb'
          },
          {
            photo:
              'https://images.unsplash.com/photo-1489459398140-fbc7392ee6f5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c1002c0175080cddd5ea53284d253209&auto=format&fit=crop&w=2208&q=80'
          }
        ]
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  max-width: 1800px;
  width: 100%;
  max-height: 700px;
  height: 50vw;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  grid-template-rows: 1fr;
  grid-auto-flow: column;
  grid-gap: 10px;
  overflow: hidden;
  background-color: var(--background_color);
}
.left {
  height: 50vw;
  width: 100%;
  overflow: hidden;
}
.left > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all ease 0.2s;
}
.left > img:hover {
  transform: scale(1.1);
}
.right {
  max-height: 700px;
  height: 50vw;
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-gap: 10px;
  overflow: hidden;
}
.top {
  width: 100%;
  overflow: hidden;
}
.top > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all ease 0.2s;
}
.top > img:hover {
  transform: scale(1.1);
}
.bottom {
  width: 100%;
  overflow: hidden;
}
.bottom > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all ease 0.2s;
}
.bottom > img:hover {
  transform: scale(1.1);
}
@media (max-width: 500px) {
  .container {
    grid-gap: 5px;
  }
  .right {
    grid-gap: 5px;
  }
}
</style>

