<template>
  <div class="content2">
    <div class="content2_setting card row">
      <div class="">
        <p>Tamaño</p>
        <el-input-number v-model="settingData.data.width" :min="50" :max="300" :step="10"></el-input-number>
      </div>
      <div class="">
        <p>Espaciado</p>
        <el-input-number v-model="settingData.data.spaces" :min="0" :max="100" :step="2"></el-input-number>
      </div>
      <div class="">
        <p>Efecto</p>
        <el-select v-model="settingData.data.effect">
          <el-option
          v-for="effect in effects"
          :label="effect.label"
          :value="effect.value"
          />
        </el-select>
      </div>
    </div>
    <div class="content2__brands_list">
      <draggable v-model="settingData.data.brands">
        <transition-group name="list-complete">
          <div class="brands_item" v-for="(item, index) in settingData.data.brands" :key="index">
            <div class="row">
              <el-input placeholder="Titulo" v-model="item.title"></el-input>
              <el-button-group>
                <el-button icon="el-icon-delete" @click="removeBrand(index)"></el-button>
                <el-button icon="el-icon-rank"></el-button>
              </el-button-group>
            </div>
            <Upload :item="item" :src="item.source" @change="uploadBrand"/>
            <RedirectTo v-model="item.redirect_to"/>
          </div>
        </transition-group>
      </draggable>
    </div>
    <Upload v-if="settingData.data.brands.length <= 30" @change="uploadBrand"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import RedirectTo from '../../_components/RedirectTo.vue'
import Upload from '../../_components/Upload.vue'
import draggable from 'vuedraggable'
import axios from 'axios'

export default {
  name: 'koContentSetting2',
  components: { RedirectTo, Upload, draggable },
  data () {
    return {
        effects: [
          {
            label: 'Escala de grises',
            value: 'effect_grayscale',
            id: 0
          },
          {
            label: 'Blur',
            value: 'effect_blur',
            id: 1
          },
          {
            label: 'Tamaño',
            value: 'effect_size',
            id: 2
          },
          {
            label: 'Texto',
            value: 'effect_text',
            id: 3
          }
        ]
    }
  },
  computed: {
    ...mapState(['settingData'])
  },
  methods: {
    uploadBrand (event) {
      this.$cropper.upload({
        type: 'Banner',
        ratio: 0,
        file: event.target.files[0],
        desc: 'Peso maximo del banner 20M y tamaño de 1200px X 400px'
      }).then((response) => {
        this.createBrand(response)
      })
    },
    createBrand (blob) {
      let params = new FormData()
      params.append('file', blob)
      params.append('upload_preset', 'qciyydun')

      let config = {
        headers:
          {
            'content-type': 'multipart/form-data'
          }
      }
      axios.post('https://api.cloudinary.com/v1_1/komercia-store/image/upload', params, config).then((response) => {
        const newBanner = {
          title: '',
          source: response.data.secure_url,
          id_cloudinary: response.data.public_id,
          signature: response.data.signature,
          redirect_to: {
            type: 5,
            value: ''
          }
        }
        this.$store.state.settingData.data.brands.push(newBanner)
        this.$cropper.complete()
      }).catch(() => {
        this.$cropper.complete()
      })
    },
    removeBrand (index) {
      this.settingData.data.brands.splice(index, 1)
    }
  }
}
</script>

<style scoped>
  .content2{
    display: grid;
    align-content: start;
    grid-gap: 10px;
    padding: 5px;
  }
  .content2_setting{
    grid-template-columns: 1fr 1fr;
    grid-auto-flow: dense !important;
  }
  .content2_setting p{
    font-size: 14px;
    margin-bottom: 5px;
    font-weight: 600;
    line-height: .9;
  }
  .content2_setting .el-input-number{
    width: 130px;
  }
  .content2_setting div:nth-child(3){
    grid-column: 1 / span 2;
  }
  .content2_setting div:nth-child(3) .el-select{
    width: 100%;
  }
  .content2__brands_list > div > span{
    display: grid;
    grid-gap: 10px;
  }
  .brands_item{
    display: grid;
    grid-gap: 10px;
    background-color: #fff;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 0 0 rgba(0,0,0,.03);
    border: 1px solid rgba(0,0,0,.15);
  }
  .card{
    background-color: #fff;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 0 0 rgba(0,0,0,.03);
    border: 1px solid rgba(0,0,0,.15);
  }
  .row{
    display: grid;
    grid-auto-flow: column;
    grid-gap: 10px;
  }
  .list-complete-item {
    padding: 4px;
    margin-top: 4px;
    border: solid 1px;
    transition: all 1s;
  }
  .list-complete-enter, .list-complete-leave-active {
    opacity: 0;
  }
</style>
