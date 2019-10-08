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
    },
    url() {
      return this.$store.state.urlHttp;
    }
  },
  methods: {
    setBanner(banner) {
      return `${this.url}/banners/${banner}`;
    }
  }
};
