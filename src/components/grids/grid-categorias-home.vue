<template>
  <div class="grid-categories">
    <nav>
      <ul class="list-categories">
        <li v-for="item in 5">
          <button>categoria</button>
        </li>
      </ul>
    </nav>
    <div class="grid-products">
      <div class="card" v-for="card in 5">
        <div class="img-product"></div>
        <div class="description-product">
          <p>Nombre Producto</p>
          <p class="price">$300.000
            <s>350.00</s>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'gridCategorias'
}
</script>

<style scoped>
.grid-categories {
  width: 100%;
  height: auto;
  margin-top: 100px;
}
nav {
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
}
.list-categories {
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.grid-products {
  max-width: 1600px;
  width: 100%;
  max-height: 460px;
  height: 100vh;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-template-rows: 1fr;
  grid-gap: 10px;
  grid-auto-flow: column;
}
.card {
  /* height: 100%; */
  background-color: black;
}
</style>
