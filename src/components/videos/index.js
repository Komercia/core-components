export default {
  props: {
    setting: {
      type: Object,
      default() {
        return {
          url: '',
          type: 'Youtube'
        };
      }
    }
  }
};
