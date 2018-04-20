import Chat from './components/chat/chat'
import Header1 from './components/headers/header1'
import Header2 from './components/headers/header2'
import Header3 from './components/headers/header3'
import Cart1 from './components/carts/cart1'
import Product1 from './components/products/product1'
import Contact1 from './components/contacts/contact1'
import Slider1 from './components/sliders/slider1'
import Slider2 from './components/sliders/slider2'
import Separator from './components/separators/separator1'
import Grid from './components/grids/grid1'
import ProductList1 from './components/product_lists/product_list1'
import Newsletter from './components/newsletters/newsletter1'
import Footer from './components/footers/footer1'

import SliderSetting1 from './settings/sliders/slider1'
import SeparatorSetting1 from './settings/separators/separator1'

const components = [
  Chat,
  Header1,
  Header2,
  Header3,
  Cart1,
  Product1,
  Contact1,
  Slider1,
  Slider2,
  Separator,
  Grid,
  ProductList1,
  Newsletter,
  Footer,
  SliderSetting1,
  SeparatorSetting1
]

const modules = {}
modules.install = (Vue) => {
  for (let i = 0, size = components.length; i < size; i += 1) {
    Vue.component(components[i].name, components[i]);
  }
}

export default modules
