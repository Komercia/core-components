<template>
  <div class="redirect_to">
    <p>Escoge la opcion a donde se va a redirigir</p>
    <hr>
    <div class="redirect_to__type">
      <p><strong>Tipo</strong></p>
      <el-select
        size="small"
        v-model="selectedOption"
        clearable
        placeholder="Seleccionar tipo"
      >
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.label"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </div>
    <div class="redirect_to__destination">
      <p v-if="selectedOption !== ''"><strong>Destino</strong></p>
      <el-select
        size="small"
        v-model="selectedValue"
        placeholder="Selecciona producto"
        v-if="selectedOption === 1"
      >
        <el-option
          v-for="item in productsData"
          :key="item.id"
          :label="item.nombre"
          :value="item.slug"
        >
        </el-option>
      </el-select>
      <el-select
        size="small"
        v-model="selectedValue"
        placeholder="Selecciona categoria"
        v-if="selectedOption === 2"
      >
        <el-option
          v-for="item in categorias"
          :key="item.id"
          :label="item.nombre_categoria_producto"
          :value="item.nombre_categoria_producto"
        >
        </el-option>
      </el-select>
      <el-input
        size="small"
        v-model="selectedValue"
        placeholder="Escribe la palabra"
        v-if="selectedOption === 3"
      />
      <el-select
        size="small"
        v-model="selectedValue"
        placeholder="Selecciona la pagina"
        v-if="selectedOption === 4"
      >
        <el-option
          v-for="item in pages"
          :key="item.path"
          :label="item.label"
          :value="item.path"
        >
        </el-option>
      </el-select>
      <el-input
        size="small"
        v-model="selectedValue"
        placeholder="Escribe el enlace"
        v-if="selectedOption === 5"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["value"],
  created() {},
  data() {
    return {
      refresh: true,
      options: [
        {
          id: 1,
          label: "Producto"
        },
        {
          id: 2,
          label: "Categoria"
        },
        {
          id: 3,
          label: "Buscador"
        },
        {
          id: 4,
          label: "Pagina Interna"
        },
        {
          id: 5,
          label: "Url Externa"
        }
      ],
      pages: [
        {
          label: "Inicio",
          path: "/"
        },
        {
          label: "Productos",
          path: "/productos"
        },
        {
          label: "Contacto",
          path: "/contacto"
        },
        {
          label: "Carrito",
          path: "/pedido"
        }
      ]
    };
  },
  computed: {
    ...mapState(["productsData", "categorias"]),
    selectedOption: {
      get() {
        return this.value.type;
      },
      set(newValue) {
        this.selectedValue = "";
        this.output({
          type: newValue,
          value: this.selectedValue
        });
      }
    },
    selectedValue: {
      get() {
        return this.value.value;
      },
      set(newValue) {
        this.output({
          type: this.selectedOption,
          value: newValue
        });
      }
    }
  },
  methods: {
    output(payload) {
      this.$emit("input", payload);
    }
  }
};
</script>

<style scoped>
.redirect_to {
  display: grid;
  /*grid-gap: 5px;*/
  justify-items: end;
  background-color: #49525d;
  border-radius: 3px;
  padding: 10px 0;
}
.redirect_to p {
  width: 100%;
  text-align: center;
  font-size: 13px;
  color: #fff;
}
.redirect_to__type {
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  grid-gap: 5px;
  padding: 5px 10px;
}
.redirect_to__destination {
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  grid-gap: 5px;
  padding: 5px 10px;
}
hr {
  width: 100%;
  border-style: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.19);
  margin: 8px 0;
}
</style>
