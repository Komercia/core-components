<template>
  <ul class="ko-radio_group">
    <li
      :class="{'ko-radio_group_option': true, 'option-selected': option.selected}"
      v-for="(option, index) in optionsData"
      v-on:click="selectOption(option, index)"
    >{{ option.option.toLowerCase() }}</li>
  </ul>
</template>

<script>
export default {
  props: ["options", "index"],
  mounted() {
    this.selectOption(this.options[0], 0);
  },
  data() {
    return {
      beforeNode: "",
      optionsData: this.options,
      beforeIndexOption: ""
    };
  },
  methods: {
    selectOption(option, index) {
      if (typeof this.beforeIndexOption === "number") {
        const changeOption = (this.optionsData[
          this.beforeIndexOption
        ].selected = false);
        this.optionsData.splice(index, 1, changeOption);
      }
      option.selected = true;
      this.optionsData.splice(index, 1, option);
      this.beforeIndexOption = index;
      this.saveOption(option);
    },
    saveOption(option) {
      this.$store.state.beforeCombination.splice(this.index, 1, option.option);
    }
  }
};
</script>

<style scoped>
.ko-radio_group {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
}
.ko-radio_group_option {
  padding-right: 8px;
  cursor: pointer;
  font-size: 14px;
  text-transform: capitalize !important;
  color: var(--text_color);
  opacity: 0.8;
}
.ko-radio_group_option:hover {
  transition: 0.2s;
}
.option-selected {
  color: var(--text_color);
  opacity: 1;
  text-decoration-line: underline;
}
</style>