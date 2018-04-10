<template>
  <ul class="ko-radio_group">
    <li :class="{'ko-radio_group_option': true, 'option-selected': option.selected}"
        v-for="(option, index) in optionsData"
        v-on:click="selectOption(option, index)">
        {{ option.option }}
    </li>
  </ul>
</template>

<script>
export default {
  props: ['options', 'index'],
  mounted(){
    this.selectOption(this.options[0], 0)
  },
  data(){
    return {
      beforeNode: '',
      optionsData: this.options,
      beforeIndexOption: '',
    }
  },
  methods: {
    selectOption(option, index){
      if(typeof this.beforeIndexOption === 'number'){
        const changeOption = this.optionsData[this.beforeIndexOption].selected = false;
        this.optionsData.splice(index, 1, changeOption)
      }
      option.selected = true;
      this.optionsData.splice(index, 1, option)
      this.beforeIndexOption = index;
      this.saveOption(option);
    },
    saveOption(option){
      this.$store.state.beforeCombination.splice(this.index, 1, option.option);
    }
  }
}
</script>

<style scoped>
  .ko-radio_group{
    display: flex;
    flex-wrap: wrap;
    list-style: none;
  }
  .ko-radio_group_option{
    margin: 3px;
    border: 1px solid #EEE;
    padding: 5px 8px;
    background-color: #FFF;
    cursor: pointer;
    border-radius: 5px;
    box-shadow: 1px 1px 4px 0px rgba(0,0,0,0.1);
    font-size: 15px;
  }
  .ko-radio_group_option:hover{
    box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.0);
    transition: .2s;
  }
  .option-selected{
    color: #FFF;
    border: 0px solid #FFF;
    background-color: var(--main_color);
  }
</style>
