import Chat from './components/chat/chat'
import Header1 from './components/headers/header1'
import Header2 from './components/headers/header2'
import Header3 from './components/headers/header3'
import Header4 from './components/headers/header4'
import Cart1 from './components/carts/cart1'
import Product1 from './components/products/product1'
import Contact1 from './components/contacts/contact1'
import Content1 from './components/contents/content1'
import Video1 from './components/_components/video1.vue'
import Slider1 from './components/sliders/slider1'
import Slider11 from './components/sliders/slider1-1'
import Separator from './components/separators/separator1'
import Grid from './components/grids/grid1'
import Grid2 from './components/grids/grid-categorias-home.vue'
import ProductList1 from './components/product_lists/product_list1'
import ProductList2 from './components/product_lists/product_list2'
import Newsletter from './components/newsletters/newsletter1'
import Footer1 from './components/footers/footer1'
import Footer2 from './components/footers/footer2'
import Order1 from './components/_order/order1'

const components = [
  Chat,
  Header1,
  Header2,
  Header3,
  Header4,
  Cart1,
  Product1,
  Contact1,
  Content1,
  Slider1,
  Slider11,
  Separator,
  Grid,
  Grid2,
  ProductList1,
  Newsletter,
  Footer1,
  Footer2,
  Order1,
  ProductList2,
  Video1
]

const modules = {}
modules.install = Vue => {
  for (let i = 0, size = components.length; i < size; i += 1) {
    Vue.component(components[i].name, components[i])
  }
}
export default modules
