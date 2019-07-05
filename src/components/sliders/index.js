export default {
  data() {
    return {
      swipe: {
        activeIndex: 0
      }
    };
  },
  computed: {
    bannersData() {
      return this.$store.state.banners;
    }
  },
  methods: {
    setBanner(banner) {
      return `${this.$urlHttp}/banners/${banner}`;
    }
  }
};
