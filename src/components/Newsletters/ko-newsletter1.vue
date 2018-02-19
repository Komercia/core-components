<template>
  <div class="container-newsletter">
    <div class="newsletter">
      <div class="container-newsletter-description">
        <p class="newsletter-description">{{description.description1}}</p>
        <p class="newsletter-description">{{description.description2}}</p>
      </div>
      <div class="container-subscription">
        <input type="text">
        <button type="submit">Subscribete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      description: {
        description1:'Get 10% off your first order',
        description2:'Subscribe to our newsletter',

      }
    }
  }
}
</script>

<style>
.container-newsletter {
  display: flex;
  justify-content: center;
}
.newsletter {
  max-width: 600px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
