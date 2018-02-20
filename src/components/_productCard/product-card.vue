<template>
  <div class="container-product">
    <img :src="setProduct(data.foto)" class="img-grid-item">
    <div class="grid-item-description">
      <div class="name-product">{{data.nombre}}</div>
      <div class="category">{{data.categoria}}</div>
      <div class="price">{{data.precio | currency}}</div>
      <button class="btn-product" type="button" name="button">Ir al Producto</button>
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
  margin-top: 15px;
  background-color: #000;
  color: #fff;
  border: 0;
  padding: 10px 30px;
  cursor: pointer;
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
