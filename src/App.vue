<template>
  <div id="app">
    <ko-header1 />
    <ko-slider1 />
    <ko-separator1 />
    <ko-grid1 />
    <ko-newsletter1 />
    <ko-footer1 />
  </div>
</template>

<script>
import koHeader1 from './components/headers/header1';
import koSlider1 from './components/sliders/slider1';
import koSeparator1 from './components/separators/separator1';
import koGrid1 from './components/grids/grid1';
import koNewsletter1 from './components/newsletters/newsletter1';
import koFooter1 from './components/footers/footer1';

export default {
  name: 'app',
  components: {
    koHeader1,
    koSlider1,
    koSeparator1,
    koGrid1,
    koNewsletter1,
    koFooter1,
  },
  created() {
    this.$store.commit('GET_DATA')
  }
};
</script>

<style>
@import './assets/css/main.css';
</style>
