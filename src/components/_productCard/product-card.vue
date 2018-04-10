<template>
  <div class="container-product">
    <img :src="setProduct(data.foto)" class="img-grid-item">
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
  methods: {
    setProduct(product) {
      return `${this.$urlHttp}/productos/${product}`;
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
.img-grid-item {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  color: var(--button_text_color);
  border: 0;
  cursor: pointer;
  padding: 0;
}
.btn-product a{
  padding: 10px 30px;
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
