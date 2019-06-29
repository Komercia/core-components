<template>
  <router-link
    :to="`/productos/${data.slug}`"
    class="container-product"
  >
    <div class="img-grid-item">
      <image-cloudinary
        :src="data.foto_cloudinary"
        :width="300"
      />
    </div>
    <div class="grid-item-description">
      <p class="name-product">
        {{data.nombre}}
        <span v-show="data.marca">- {{data.marca}}</span>
      </p>
      <div class="price">{{data.precio | currency}}</div>
    </div>
    <!-- <button
      class="btn-product g-btn"
      type="button"
      name="button"
    >
      <a>Ir al Producto</a>
    </button> -->
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

<style scoped>
.container-product {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  justify-items: center;
  align-items: space-between;
  box-sizing: border-box;
  /* box-shadow: 0 0 22px 6px rgba(0, 0, 0, 0.112); */
  border: 1px solid rgb(245, 245, 245);
  transition: all ease 0.3s;
}
.container-product:hover {
  box-shadow: 0 0 18px 6px rgba(0, 0, 0, 0.112);
  transform: scale(1.03);
}
.img-grid-item {
  /* max-width: 250px; */
  width: 100%;
  height: 300px;
  display: grid;
  justify-items: center;
  justify-self: center;
  align-items: center;
  background-color: #eee;
  overflow: hidden;
}
.img-grid-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.grid-item-description {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  background-color: rgb(245, 245, 245);
  box-sizing: border-box;
  width: 100%;
}
.btn-product {
  display: flex;
  margin-top: 15px;
  cursor: pointer;
}
.name-product {
  text-align: center;
  color: #666;
  font-size: 14px;
  line-height: 1.2;
}
.category {
  color: #aaa;
  padding: 3px 0;
  font-size: 14px;
}
.price {
  font-weight: bold;
  font-size: 15px;
  color: #333;
  margin-top: 5px;
}
@media (max-width: 425px) {
  .img-grid-item {
    /* max-width: 150px; */
    max-height: 200px;
  }
}
</style>
