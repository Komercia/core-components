import Header from './components/headers/header1'
import Slider from './components/sliders/slider1'
import Separator from './components/separators/separator1'
import Grid from './components/grids/grid1'
import Newsletter from './components/newsletters/newsletter1'
import Footer from './components/footers/footer1'

const components = [
  Header,
  Slider,
  Separator,
  Grid,
  Newsletter,
  Footer
]

const modules = {}
modules.install = (Vue) => {
  for (const component of components) {
    Vue.component(component.name, component)
  }
}


export default modules
