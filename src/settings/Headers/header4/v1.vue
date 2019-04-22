<template>
  <div class="header">
    <draggable v-model="settingData.data.tabs">
      <transition-group name="list-complete">
        <div class="tab" v-for="(item, index) in settingData.data.tabs" :key="index">
          <div class="row">
            <el-input placeholder="Titulo" v-model="item.name"></el-input>
            <el-button-group>
              <el-button icon="el-icon-delete" @click="removeBrand(index)"></el-button>
              <el-button icon="el-icon-rank"></el-button>
            </el-button-group>
          </div>
          <RedirectTo v-model="item.redirect_to"/>
        </div>
      </transition-group>
    </draggable>
    <div v-if="show" class="btn-newtab" @click="createTab()">Nuevo Link</div>
  </div>
</template>

<script>
import RedirectTo from "../../_components/RedirectTo";
import draggable from "vuedraggable";
import { mapState } from "vuex";
export default {
  name: "koHeaderSetting4_v1",
  components: { RedirectTo, draggable },
  data() {
    return {
      activeName: "first",
      show: true
    };
  },
  computed: {
    settingData() {
      return this.$store.state.settingData;
    }
  },
  methods: {
    createTab() {
      const tab = {
        name: "",
        redirect_to: {
          type: 5,
          value: ""
        }
      };
      this.$store.state.settingData.data.tabs.push(tab);
    },
    removeBrand(index) {
      this.settingData.data.tabs.splice(index, 1);
    },
    handleColorText(color) {
      this.settingData.styleObject.colorText = color;
    },
    handleColorHover(color) {
      this.settingData.styleObject.colorHover = color;
    },
    handleClick() {
      this.show = !this.show;
    }
  }
};
</script>

<style scoped>
.row {
  display: grid;
  grid-auto-flow: column;
  grid-gap: 10px;
}
.tab {
  display: grid;
  grid-gap: 10px;
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 0 0 rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.15);
  margin-bottom: 15px;
}
.list-complete-item {
  padding: 4px;
  margin-top: 4px;
  border: solid 1px;
  transition: all 1s;
}
.list-complete-enter,
.list-complete-leave-active {
  opacity: 0;
}
.el-tabs__item {
  background-color: rgb(255, 0, 21) !important;
}
.btn-newtab {
  margin: 20px auto;
  background-color: rgb(36, 148, 114);
  padding: 10px 15px;
  width: 90px;
  cursor: pointer;
  color: #fff;
  font-weight: 600;
  border-radius: 5px;
}
.btn-newtab:hover {
  background-color: rgb(58, 194, 153);
}
</style>
