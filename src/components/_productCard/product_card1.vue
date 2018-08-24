<template>
  <router-link :to="`/productos/${data.slug}`" class="container-product">
    <div class="img-grid-item">
      <image-cloudinary :src="data.foto_cloudinary" />
    </div>
    <div class="grid-item-description">
      <div class="name-product">{{data.nombre}}</div>
      <div class="category">{{data.marca}}</div>
      <div class="price">{{data.precio | currency}}</div>
      <button class="btn-product g-btn" type="button" name="button">
        <a>Ir al Producto</a>
      </button>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "koProductCard1",
  props: ["data"],
  data() {
    return {};
  },
  computed: {
    foto() {
      if (this.data.placeholder) {
        return require(`../../assets/${this.data.foto}`);
      } else {
        return `${this.$urlHttp}/productos/${this.data.foto}`;
      }
    }
  },
  filters: {
    currency(value) {
      if (value) {
        return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
      }
      return "";
    }
  }
};
</script>

<style >
.container-product {
  width: 100%;
  height: 100%;
  display: grid;
  /*justify-content: center;*/
  align-items: end;
}
.img-grid-item {
  max-width: 250px;
  width: 100%;
  max-height: 250px;
  height: 250px;
  display: grid;
  justify-items: center;
  justify-self: center;
  align-items: center;
  box-shadow: 0 0 5px #eee;
  overflow: hidden;
}
.img-grid-item img {
  width: 90%;
  height: 90%;
  object-fit: contain;
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
  background-color: #f9f9f9;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  cursor: pointer;
  padding: 0;
  color: #555555;
}
.btn-product a {
  padding: 10px 30px;
}
.name-product {
  text-align: center;
  color: var(--text_color);
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;
}
.category {
  color: var(--text_color);
  padding: 3px 0;
  font-size: 14px;
}
.price {
  font-weight: bold;
  color: var(--text_color);
}
@media (max-width: 425px) {
  .img-grid-item {
    max-width: 150px;
    max-height: 150px;
  }
}
</style>
