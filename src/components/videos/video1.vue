<template>
<div class="container">
  <div class="containervideo">
      <div class="video">
        <iframe width="560" height="315" :src="`https://www.youtube.com/embed/${setting.url}?rel=0&amp;showinfo=0`" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen v-if="setting.type === 'Youtube'">
        </iframe>
        <iframe :src="`https://player.vimeo.com/video/${setting.url}`" width="560" height="315" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen v-else>
        </iframe>
      </div>
  </div>
</div>
</template>

<script>
export default {
  name:'koVideo1',
  props: {
    setting: {
      type: Object,
      default: function () {
        return {
          url: '',
          type: 'Youtube'
        }
      }
    }
  }
}
</script>

<style scoped>
.container{
  height:500px;
  background-color: #fff;
  color: white;
  display:flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}
.containervideo {
  max-width: 700px;
  width: 100%;
}
.video {
  position: relative;
  padding-bottom: 56.25%; /* 16/9 ratio */
  /* padding-top: 30px; IE6 workaround */
  height: 0;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0px 0px 68px -12px gray;
}
.video iframe,
.video object,
.video embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
