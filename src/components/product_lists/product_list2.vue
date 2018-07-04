<template lang="html">
 <div class="container">
   <div class="normal">
     <div class="box">
       <div class="searcher">
         <koSearcher @searcher="Searchproduct"/>
       </div>
       <div class="lateral">
             <koCategories @SelectionSubcategory="SelectedSubCategory"/>
             <!-- <el-button type="primary" icon="el-icon-search" @click="PriceSlider">Search</el-button> -->
             <div class="block">
               <el-slider
               v-model="price"
               range
               :max="1000000" >
             </el-slider>
             </div>
       </div>

     </div>
     <div class="productos">
          <div class="product_list_wrapper">
              <paginate
              name="products"
              :list="products"
              :per="12"
              tag="div"
              class="product_list">
              <ko-product-card v-for="product in paginated('products')" :key="product.id" :data="product" />
              </paginate>
              <div class="pagelink">
                <paginate-links
                  for="products"
                  :show-step-links="true"
                  :limit="5">
                </paginate-links>
             </div>
          </div>
      </div>
   </div>
   <div class="responsive">
     <div class="box" v-if="active">
       <div class="closebutton">
         <el-button type="danger" circle @click="Activeselect"><i class="material-icons">
clear
</i></el-button>
       </div>
       <div class="selects">
          <div class="searcher">
            <koSearcher @searcher="Searchproduct"/>
          </div>
          <div class="lateral">
            <koCategories @SelectionSubcategory="SelectedSubCategory"/>
            <div class="buttoncat">
             <el-button type="info" @click="Allcategories">Mostrar todos los productos</el-button>
            </div>
         </div>
       </div>
     </div>

     <div class="productos">
       <div class="openbutton">
         <el-button type="info" circle @click="Activeselect" class="buttonclose"><i class="material-icons">
tune
</i></el-button>
       </div>
          <div class="product_list_wrapper">
              <paginate
              name="products"
              :list="products"
              :per="12"
              tag="div"
              class="product_list">
              <ko-product-card v-for="product in paginated('products')" :key="product.id" :data="product" />
              </paginate>
              <div class="pagelink">
                <paginate-links
                  for="products"
                  :show-step-links="true"
                  :limit="5">
                </paginate-links>
              </div>
          </div>
      </div>
   </div>
 </div>
</template>

<script>
import KoProductCard from '../_productCard/product-card';
import koCategories  from '../_categories/categories_1';
import koSearcher from '../_components/searcher';
export default {
  name: 'koProductList2',
  components: { KoProductCard, koCategories,koSearcher },
  created(){
    this.products=this.$store.state.productsData;
  },
  data() {
    return {
      paginate: ['products'],
      products:[],
      active:false,
      price:[0,1000000],
      valor:'',
      options: {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: ["nombre"]
      },
    }
},
watch:{
  '$store.state.productsData':function (value) {
    this.products=value;
   },
  price:function(value){
    this.products=this.Fullproducts.filter((producto)=>{
      if (producto.precio>this.price[0] && producto.precio<this.price[1]) {return producto;}
    });
  }
},
  computed: {
    Fullproducts() {
      return this.$store.state.productsData;
    },
  },
  methods:{
    Activeselect(){
      this.active=!this.active
    },
    Allcategories(){
      this.products=this.$store.state.productsData;
      this.active=!this.active
    },
    Searchproduct(search) {
      if (search!= "") {
        this.$search(search,this.Fullproducts,this.options).then(results => {
        this.products=results
        this.active=!this.active
      })
    }else {
       this.products=this.$store.state.productsData;

    }
  },
    SelectedSubCategory(value) {
      this.products = this.Fullproducts.filter((product)=>product.subcategoria === value);
      this.active=!this.active
    },

  }
}
</script>
<style scoped>
.normal{
  margin:0 auto;
  max-width: 1366px;
  display: grid;
  grid-template-areas:"searcher productos productos"
                      "lateral  productos productos"
                      "pagelink pagelink pagelink";
  grid-template-columns: 200px 1fr;
  grid-template-rows: 100px 1fr;
  grid-column-gap: 20px;
  align-items: start;
}
.buttonclose{
  z-index:0;
}
.responsive{
  display: none;
}
.pagelink{
  grid-area: pagelink;
  display: flex;
  justify-content: center;
}
.normal .box{
  position: sticky;
  top:20px;
}
.normal .box .lateral{
  grid-area: lateral;
  position: sticky;
  top: 10px;
  display: grid;
}
.normal .box .block{
  margin: 0 30px 0 30px;
}
.normal .box .searcher{
  grid-area: searcher;
}
.normal .productos{
  grid-area:productos;
}
.normal .productos .product_list{
  display: grid;
  grid-template-columns: repeat(4,1fr);
}

@media screen and (max-width:800px) {
 .normal{
    display: none;
  }
 .responsive{
    display: flex;
    flex-direction: column;
  }
  .responsive .productos .product_list_wrapper .product_list{
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
 .responsive .box{
    display: grid;
    height: 100%;
    width: 100%;
    background-color: #7b7a7aad ;
    z-index: 1;
    position: fixed;
    grid-auto-rows: 40px 1fr;
    align-items: center;

  }
 .responsive .box .searcher{
   margin:0 2px 0 2px;
 }
 .responsive .box .lateral{
   margin-bottom: 10px;
 }
 .responsive .box .selects{
   display: grid;
    justify-content: center;
 }
 .responsive .productos{
    z-index: 0;
  }
  .responsive .box .closebutton{
    margin:10px;
    margin-top: 41px;
  }
  .responsive .productos .openbutton{
    height: 50px;
    position: fixed;
    z-index: 1;
    margin:10px;
  }
  .responsive .box .selects .buttoncat{
    display:grid;
    margin: 0 5px 0 5px;
  }
}
</style>
