<template>
  <div class="container-product">
    <img :src="foto" class="img-grid-item">
    <div class="grid-item-description">
      <div class="name-product">{{data.nombre}}</div>
      <div class="category">{{data.categoria}}</div>
      <div class="price">{{data.precio | currency}}</div>
      <button class="btn-product" type="button" name="button"><router-link :to="`/productos/${data.slug}`">Ir al Producto</router-link></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: ['data'],
  data() {
    return {

    };
  },
  computed: {
    foto() {
      if(this.data.placeholder) {
        return require(`../../assets/${this.data.foto}`);
      }else {
        return `${this.$urlHttp}/productos/${this.data.foto}`;
      }
    }
  },
  filters: {
    currency(value) {
      if (value) {
        return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
      }
      return '';
    }
  },
};
</script>

<style >
.container-product{
  display: grid;
  justify-content: center;
}
.img-grid-item {
  max-width: 300px;
  max-height: 300px;
  box-shadow: 0 0 5px #eee;
}
.grid-item-description {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
}
.btn-product {
  display: flex;
  margin-top: 15px;
  background-color: var(--button_color);
  border: 0;
  cursor: pointer;
  padding: 0;
}
.btn-product a{
  padding: 10px 30px;
  color: var(--button_text_color);
}
.name-product {
  text-align: center;
  color: rgb(51, 53, 61);
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;
}
.category {
  color: rgb(153, 153, 153);
  padding: 3px 0;
  font-size: 14px;
}
.price {
  font-weight: bold;
}
</style>
