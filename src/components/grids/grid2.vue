<template>
  <div class="grid-categories">
    <nav>
      <ul class="list-categories">
        <li class="tab" v-for="(item, index) in setting.data" :key="index" @click="selected(item)" :class="{tab: true, selected: select == item}">
          {{ item }}
        </li>
      </ul>
    </nav>
    <div class="grid-products">
      <div
        :is="selectedCard"
        :data="product"
        v-for="(product, index) in productsData.slice(0,5)"
        :key="index"
        class="card">
      </div>
    </div>
    <router-link to="/productos">
      <button class="btn-products">Ver más</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'koGrid2',
  props: {
    setting: {
      type: Object,
      default: function() {
        return {
          data: []
        }
      }
    }
  },
  created () {
    this.select = this.setting.data[0]
  },
  data() {
    return {
      select: ''
    }
  },
  computed: {
    selectedCard () {
      return this.$store.state.selectedCard
    },
    productsData() {
      return this.$store.state.productsData.filter(
        product => product.categoria == this.select
      )
    },
    categories() {
      return this.$store.state.categorias
    }
  },
  watch: {
    'setting.data': function (value) {
      this.select = value[0]
    }
  },
  methods: {
    selected(name) {
      this.select = name
    }
  }
}
</script>

<style scoped>
.grid-categories {
  width: 100%;
  height: auto;
  margin-top: 100px;
}
nav {
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
}
.list-categories {
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.grid-products {
  max-width: 1600px;
  width: 100%;
  margin: 30px auto;
  display: grid;
  grid-template-columns: repeat(5, minmax(250px, 1fr));
  /* grid-template-rows: 20vw; */
  grid-gap: 20px;
  grid-auto-flow: column;
  padding: 0 20px;
  box-sizing: border-box;
  justify-content: center;
}
.tab {
  background-color: #fff;
  border: 1px solid #fff;
  padding: 12px 20px;
  text-transform: uppercase;
  letter-spacing: 1.5;
  font-size: 16px;
  outline: none;
  cursor: pointer;
  color: #333;
  margin: 0 auto;
}
.selected {
  border: 1px solid #333;
}
.btn-products {
  width: 150px;
  background-color: var(--background_color);
  /* color: var(--button_text_color); */
  border: 2px solid #ddd;
  padding: 10px 30px;
  box-sizing: border-box;
  cursor: pointer;
  display: block;
  margin: 40px auto;
  text-transform: uppercase;
  transition: 0.3s all ease;
}
.btn-products:hover {
  background-color: var(--main_color);
  border: 2px solid var(--main_color);
  color: var(--background_color);
}
@media (max-width: 1660px) {
  .grid-products .card:nth-child(5) {
    display: none;
  }
  .grid-products {
    grid-template-columns: repeat(4, minmax(300px, 300px));
    justify-content: center;
  }
}
@media (max-width: 1310px) {
  .grid-products .card:nth-child(4) {
    display: none;
  }
  .grid-products {
    grid-template-columns: repeat(3, minmax(250px, 300px));
  }
}
@media (max-width: 810px) {
  .grid-products .card:nth-child(3) {
    display: none;
  }
  .grid-products {
    grid-template-columns: repeat(2, minmax(145px, 300px));
  }
}
@media (max-width: 620px) {
  .tab {
    font-size: 14px;
  }
  nav {
    max-width: 550px;
  }
  .grid-products {
    grid-gap: 10px;
    padding: 0 10px;
  }
}
@media (max-width: 450px) {
  .tab {
    font-size: 12px;
  }
}
@media (max-width: 400px) {
  .grid-products {
    grid-template-columns: repeat(auto-fill, minmax(145px, 300px));
    grid-auto-flow: initial;
  }
}
</style>
