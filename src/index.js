import Cart1 from './components/carts/cart1'
import Chat from './components/chat/chat'
import Header1 from './components/headers/header1'
import Header2 from './components/headers/header2'
import Header3 from './components/headers/header3'
import Product1 from './components/products/product1'
import Contact1 from './components/contacts/contact1'
import Slider from './components/sliders/slider1'
import Separator from './components/separators/separator1'
import Grid from './components/grids/grid1'
import Newsletter from './components/newsletters/newsletter1'
import Footer from './components/footers/footer1'

const components = [
  Chat,
  Header1,
  Header2,
  Header3,
  Cart1,
  Product1,
  Contact1,
  Slider,
  Separator,
  Grid,
  Newsletter,
  Footer
]

const modules = {}
modules.install = (Vue) => {
  for (let i = 0, size = components.length; i < size; i += 1) {
    Vue.component(components[i].name, components[i]);
  }
}


export default modules
