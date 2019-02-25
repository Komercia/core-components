<template>
  <div class="container">
    <div :class="{container_settings: true, hidden: showSettingsButton}">
      <div class="title">
        <div class="select_stores">
          <el-select v-model="id_store" placeholder="Select" v-on:change="updateIdStore" clearable>
            <el-option
              v-for="item in stores"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <el-button type="primary" icon="el-icon-plus" @click="handleSetting"></el-button>
      </div>

      <el-dialog title="Crear un ajuste nuevo" :visible.sync="dialogNewSettingVisible">
        <el-select v-model="selectSection" clearable>
          <el-option
            v-for="(section, index) in sections"
            :key="index"
            :label="section.name"
            :value="section.type"
          ></el-option>
        </el-select>
        <br>
        <br>
        <json-editor :onChange="onChange" :json="initialJson"/>
        <br>
        <el-button type="primary" @click="createComponent">Crear</el-button>
      </el-dialog>

      <div class="component_setting">
        <div v-if="settingData" :is="settingData.name"/>
      </div>
    </div>

    <div class="container_components">
      <div class="title hidden_menu_components" style="margin-bottom: 10px ">
        <a v-on:click="hiddenSettings" class="hidden_settings_button">
          <el-button type="primary" icon="el-icon-menu" circle></el-button>
        </a>

        <h1>
          Arriba
          <i class="el-icon-upload2"/>
          <el-select
            v-model="selectComponentAbove"
            placeholder="Select Component "
            style="margin-left:10px "
            clearable
          >
            <el-option-group v-for="group in components " :key="group.label" :label="group.label">
              <el-option
                v-for="item in group.options"
                :key="item.name"
                :label="item.label"
                :value="item.name"
              ></el-option>
            </el-option-group>
          </el-select>
        </h1>

        <h1>Componente Principal
          <el-select
            v-model="selectComponent"
            placeholder="Select Component "
            style="margin-left:10px "
            clearable
          >
            <el-option-group v-for="group in components " :key="group.label" :label="group.label">
              <el-option
                v-for="item in group.options"
                :key="item.name"
                :label="item.label"
                :value="item.name"
              ></el-option>
            </el-option-group>
          </el-select>
        </h1>

        <h1>
          Abajo
          <i class="el-icon-download"/>
          <el-select
            v-model="selectComponentDown"
            placeholder="Select Component "
            style="margin-left:10px "
            clearable
          >
            <el-option-group v-for="group in components " :key="group.label" :label="group.label">
              <el-option
                v-for="item in group.options"
                :key="item.name"
                :label="item.label"
                :value="item.name"
              ></el-option>
            </el-option-group>
          </el-select>
        </h1>
      </div>

      <div class="component_principal">
        <div :is="selectComponentAbove"/>
        <div :is="selectComponent" v-if="settingData" :setting="settingData"/>
        <div :is="selectComponent" v-else/>
        <div :is="selectComponentDown"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import JSONEditor from "vue2-jsoneditor";

export default {
  name: "stage",
  components: {
    "json-editor": JSONEditor
  },
  data() {
    return {
      id_store: 1,
      dialogNewSettingVisible: false,
      selectComponent: "koHeader1",
      selectSetting: null,
      showSettingsButton: false,
      selectComponentAbove: "",
      selectComponentDown: "",
      selectSection: "",
      initialJson: {
        label: "",
        name: "ko-",
        setting: {
          name: "ko"
        },
        source: "",
        type: ""
      },
      json: {},
      stores: [
        { value: 1, label: "Topalxe - 1" },
        { value: 290, label: "Prontodental - 290" },
        { value: 452, label: "EngelShoes - 452" },
        { value: 364, label: "Ace Delivery's - 364" },
        { value: 729, label: "Prueba54545 - 729" },
        { value: 349, label: "Demo 1 - 349" },
        { value: 574, label: "Child Clothes - 574" },
        { value: 247, label: "TecnoAqua SAS - 247" },
        { value: 824, label: "Ticbu - 824" },
        { value: 715, label: "Frenos Colombia - 715" },
        { value: 401, label: "Demo Camilo - 401" },
        { value: 605, label: "Origen SP" }
      ]
    };
  },
  computed: {
    ...mapState(["sections", "components", "settingData"]),
    idTienda: {
      get() {
        return this.$store.state.idTienda;
      },
      set(newValue) {
        this.$store.dispatch("UPDATE_ID_TIENDA", newValue);
      }
    }
  },
  watch: {
    selectComponent(value) {
      for (let component of Object.values(this.components)) {
        if (component.options.length) {
          for (let option of component.options) {
            if (value === option.name) {
              const setting = option.setting || null;
              this.$store.commit("SET_SETTING", setting);
            }
          }
        }
      }
    }
  },
  methods: {
    handleSetting() {
      this.dialogNewSettingVisible = !this.dialogNewSettingVisible;
    },
    onChange(newJson) {
      this.json = newJson;
    },
    createComponent() {
      this.$store.dispatch("CREATE_COMPONENT", {
        newComponent: this.json,
        selectedSection: this.selectSection
      });
    },
    hiddenSettings() {
      this.showSettingsButton == true
        ? (this.showSettingsButton = false)
        : (this.showSettingsButton = true);
    },
    updateIdStore() {
      this.idTienda = this.id_store;
    }
  }
};
</script>

<style scoped>
.el-slider__button-wrapper {
  z-index: 98 !important;
}
.container {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
  background-color: #e8ecef;
}
.container_settings {
  width: 450px;
  height: 100%;
  display: grid;
  align-content: flex-start;
  padding-right: 20px;
  background-color: #e8ecef;
}
.component_setting {
  margin-top: 10px;
  width: 100%;
  overflow: auto;
}
.container_responsive_icons {
  display: flex;
  width: 100%;
  height: 70px;
  margin-top: 20px;
  margin-bottom: 10px;
  background: #fff;
  border-radius: 2px;
  justify-content: space-around;
  align-items: center;
  align-self: flex-end;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
.container_responsive_icons img {
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.container_responsive_icons img:hover {
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22);
  transform: scale(1.1);
}
.hidden_settings_button {
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;
}
.container_components {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #e8ecef;
}
.component_principal {
  overflow: auto;
  height: 100%;
  width: 100%;
  background-color: #fff;
}
.title {
  display: flex;
  width: 100%;
  height: 60px;
  margin-top: 0px;
  align-items: center;
  justify-content: space-around;
  background-color: white;
}
.title h1 {
  font-size: 15px;
  font-weight: 800;
  color: #4c4c4c;
}
.hidden {
  display: none;
}
@media (max-width: 700px) {
  .hidden_menu_components {
    display: none;
  }
}
</style>
