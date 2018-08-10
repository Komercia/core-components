<template>
  <div class="setting_video">
    <div class="">
      <p class="title">Destino del video</p>
      <p class="desc">Escoge el origen del video y luego escribe la url en el campo de texto</p>
    </div>
    <el-radio-group v-model="settingData.type">
      <el-radio-button label="Youtube"></el-radio-button>
      <el-radio-button label="Vimeo"></el-radio-button>
    </el-radio-group>
    <el-input placeholder="Escribe la url" v-model="url">
      <template slot="prepend">
        <icon-base
          :icon-name="settingData.type"
          width="24"
          height="24"
          viewBox="0 0 18 18">
          <icon-youtube v-if="settingData.type == 'Youtube'"/>
          <icon-vimeo v-else/>
        </icon-base>
      </template>
    </el-input>
  </div>
</template>

<script>
import IconYoutube from "../../Icons/Youtube.vue";
import IconVimeo from "../../Icons/Vimeo.vue";

export default {
  name: 'koVideoSetting1',
  components: { IconYoutube, IconVimeo },
  data () {
    return {
      url: '',
      validVideo: false
    }
  },
  watch: {
    url (value) {
      this.settingData.url = ''
      this.getYoutubeVideoId(value)
    }
  },
  computed: {
    settingData () {
      return this.$store.state.settingData
    }
  },
  methods: {
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
          this.settingData.url = id
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
       this.settingData.url = id
          }
        }
      }
  }
}
</script>

<style scoped>
  .setting_video{
    display: grid;
    justify-content: center;
    justify-items: center;
    align-content: start;
    grid-row-gap: 7px;
    padding: 10px;
    box-sizing: border-box;
  }
  .row{
    display: grid;
    grid-auto-flow: column;
    margin-bottom: 10px;
  }
  .title {
    text-align: center;
    font-size: 30px;
    font-weight: 300;
    background-color: transparent;
    margin-bottom: 10px;
  }
  .desc {
    box-sizing: border-box;
    padding: 0 20px;
    line-height: 1.5;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.568);
    text-align: center;
  }
</style>
