import SliderSetting1 from './slider1'
import SliderSetting1_1 from './slider1-1'
import SeparatorSetting1 from './separator1'
import ContentSetting1 from './content1'
import GridCategories2 from './grid-categories.vue'

const components = [
  SliderSetting1,
  SliderSetting1_1,
  SeparatorSetting1,
  ContentSetting1,
  GridCategories2
]

const modules = {}
modules.install = Vue => {
  for (let i = 0, size = components.length; i < size; i += 1) {
    Vue.component(components[i].name, components[i])
  }
}

export default modules
