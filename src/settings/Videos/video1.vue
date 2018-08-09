<template>
  <div class="setting">
    <div class="row">
      <div class="">
        <p class="title">Destino:</p>
        <p class="desc">Escoge de donde es la url de tu video</p>
      </div>
      <el-radio-group v-model="settingData.type" size="mini">
        <el-radio-button label="Youtube"></el-radio-button>
        <el-radio-button label="Vimeo"></el-radio-button>
      </el-radio-group>
    </div>
    <el-input placeholder="Escribe la url" v-model="settingData.url">
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
  computed: {
    settingData () {
      return this.$store.state.settingData
    }
  }
}
</script>

<style scoped>
  .row{
    display: grid;
    grid-auto-flow: column;
    margin-bottom: 10px;
  }
  .title {
    font-weight: 600;
  }
  .desc {
    font-size: 13px;
  }
</style>
