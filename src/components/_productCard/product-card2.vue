<template>
  <div class="product-card">
    <div class="img-product">
      <img :src="`https://api.komercia.co/tumb/${product.foto}`" :alt="product.name">
    </div>
    <div class="description-product">
      <p class="name-product">{{product.nombre.slice(0,25)}}</p>
      <p class="price">{{product.precio | currency}}
        <s>{{ product.precio * 1.2 | currency }}</s>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {}
  },
  filters: {
    currency(value) {
      if (value) {
        return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
      }
    }
  }
}
</script>

<style scoped>
.img-product {
  flex: 1;
  width: 100%;
  max-height: 300px;
  cursor: pointer;
  border: 1px solid transparent;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  /* background-color: #333; */
}
.description-product {
  background-color: #333;
}
.img-product {
  flex: 1;
  width: 100%;
  max-height: 300px;
  cursor: pointer;
  border: 1px solid transparent;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  /* background-color: #333; */
}
.img-product > img {
  width: 100%;
  max-height: 300px;
  object-fit: contain;
}
.name-product {
  margin: 20px 0 10px 20px;
  text-align: left;
  text-transform: capitalize;
  font-weight: 400;
  font-size: 15px;
  letter-spacing: 1.5;
  display: inline-block;
  color: #fff;
}
.name-product:hover {
  color: #f49a86;
  cursor: pointer;
}
.price {
  margin-left: 20px;
  margin-bottom: 10px;
  font-weight: 400;
  font-size: 13px;
  letter-spacing: 1.5;
  color: rgb(228, 228, 228);
  padding-bottom: 10px;
}
s {
  color: rgb(116, 116, 116);
  padding-left: 20px;
}
@media (max-width: 620px) {
  .name-product {
    font-size: 13px;
    margin-top: 10px;
  }
  .price {
    font-size: 11px;
    margin-bottom: 0;
  }
  .img-product {
    max-height: 250px;
  }
  .img-product > img {
    max-height: 250px;
  }
}
@media (max-width: 450px) {
  .name-product {
    font-size: 11px;
    /* margin-top: 10px; */
  }
  .price {
    font-size: 9px;
    /* margin-bottom: 0; */
  }
  .img-product {
    max-height: 200px;
  }
  .img-product > img {
    max-height: 200px;
  }
}
@media (max-width: 350px) {
  s {
    padding-left: 10px;
  }
}
</style>
