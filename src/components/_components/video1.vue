<template>
<div class="container">
  <div class="containervideo">
      <div class="video">
        <iframe width="560" height="315" :src="`https://www.youtube.com/embed/${youtubeVideoId}?rel=0&amp;showinfo=0`" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen v-if="active">
        </iframe>
        <iframe :src="`https://player.vimeo.com/video/${youtubeVideoId}`" width="560" height="315" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen v-else>
        </iframe>
      </div>
  </div>
</div>
</template>

<script>
export default {
  name:'koVideo1',
  data() {
    return {
      url:'',
      youtubeVideoId:'',
      active:true,
    };
  },
  watch:{
    url () {
      this.getYoutubeVideoId(this.url);
    }
  },
  methods:{
    vimeooryoutubem(){
      this.active = !this.active
    },
    getYoutubeVideoId (url) {
      if(url.includes('youtube')){
        if (url !== undefined) {
          let id = ''
          if (url) {
            let index = url.indexOf('?v=')
            if (index > 0) {
              id = url.substring(index + 3)
              this.validVideo = true
            }else {
              this.validVideo = false
            }
          }else {
            this.validVideo = false
          }
          this.youtubeVideoId = id
        }
      }else {
        if (url !== undefined) {
          let id ='';
          if (url) {
            let index = url.indexOf('m/')
         if (index > 0) {
           id = url.substring(index + 2)
           this.validVideo = true
         }else {
           this.validVideo = false
         }
       }else {
         this.validVideo = false
       }
       this.youtubeVideoId = id
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
