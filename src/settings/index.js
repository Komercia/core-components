import SliderSetting1 from './Sliders/slider1'
import SliderSetting11 from './Sliders/slider1-1'
import SeparatorSetting1 from './Separators/separator1'
import ContentSetting1 from './Contents/content1'
import VideoSetting1 from './Videos/video1'
import GridCategories2 from './grid-categories.vue'

const components = [
  SliderSetting1,
  SliderSetting11,
  SeparatorSetting1,
  ContentSetting1,
  VideoSetting1,
  GridCategories2
]

const modules = {}
modules.install = Vue => {
  for (let i = 0, size = components.length; i < size; i += 1) {
    Vue.component(components[i].name, components[i])
  }
}

export default modules
