<template>
  <div>
    <div class="filter">
      <button
        class="btn"
        :class="{' btn--active': tipo ==='con-asa'}"
        @click="tipo = 'con-asa'"
      >Con Asa</button>
      <button
        class="btn"
        :class="{' btn--active': tipo === 'sin-asa'}"
        @click="tipo = 'sin-asa'"
      >Sin Asa</button>
    </div>

    <section class="catalogo">
      <section
        class="producto"
        v-for="(producto, idx) in productos_filtrados"
        :key="idx"
        @click="seleccionar(producto)"
      >
        <div class="producto__descripcion">
          <span class="producto__id">{{producto.id}}</span>
          <span
            class="producto__medidas"
          >{{`${producto.ancho} x ${producto.base} x ${producto.alto}`}}</span>
        </div>
        <div class="producto__img">
          <img :src="`http://publiexpress.pe/cotizaciones/${producto.id}.jpeg`" :alt="producto.id" />
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import productos_sin_asa from "@/data/productos_sin_asa.json";
import productos_con_asa from "@/data/productos_con_asa.json";

export default {
  data: () => ({
    tipo: "con-asa"
  }),
  computed: {
    productos_filtrados() {
      return this.tipo === "con-asa" ? productos_con_asa : productos_sin_asa;
    }
  },
  methods: {
    seleccionar(producto) {
      this.$router.push({ name: "cotizacion", params: { id: producto.id } });
    }
  }
};
</script>

<style lang='scss' scoped>
@import "@/styles/color.scss";

.filter {
  width: max-content;
  margin: 24px auto 20px;
}

.btn {
  margin: 0 4px;
  padding: 8px 48px;
  background: transparent;
  color: #fff;
  border-radius: 20px;
  font-size: 0.85rem;
  transition: background-color 0.3s;

  &--active {
    background: $color-secondary;
    // border-bottom: 4px solid $color-secondary;
  }
}

.catalogo {
  max-width: 750px;
  margin-bottom: 12px;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.producto {
  overflow: hidden;
  margin: 10px;
  color: #fff;
  border-radius: 8px;
  transition: all 0.3s;
  cursor: pointer;
  display: flex;

  &:hover {
    transform: scale(1.02);
  }

  &__descripcion {
    flex-grow: 1;
    padding: 20px;
    background: $color-secondary;
    // background: #1c2a2a;
    // border-left: 4px solid $color-secondary;
    font-size: 0.85rem;
    text-align: center;
    font-weight: bold;

    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  &__medidas {
    margin-top: 10px;
    font-size: 0.75rem;
  }
  &__img {
    img {
      height: 150px;
      vertical-align: bottom;
    }
  }
}

// Medium devices (tablets, 768px and up)
@media (max-width: 1200px) {
}
// Medium devices (tablets, 768px and up)
@media (max-width: 992px) {
}
// Medium devices (tablets, 768px and up)
@media (max-width: 768px) {
  .catalogo {
    grid-template-columns: 1fr;
  }
}
// Small devices (landscape phones, 576px and up)
@media (max-width: 576px) {
}
</style>