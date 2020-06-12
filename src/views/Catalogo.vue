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
      <section class="producto" v-for="(producto, idx) in productos_filtrados" :key="idx">
        <div class="producto__descripcion">{{producto.descripcion}}</div>
        <div class="producto__img">
          <img :src="producto.img" alt />
        </div>
      </section>
    </section>
  </div>
</template>

<script>
export default {
  data: () => ({
    tipo: "con-asa",
    productos: [
      // Con Asa
      {
        descripcion: "RP-01M - 14cm x 8cm x 20cm",
        img:
          "https://dhb3yazwboecu.cloudfront.net/512/2016/bolsa-kraft-asa-plana-32x13x41-medidas.jpg",
        tipo: "con-asa"
      },
      {
        descripcion: "RP-01M - 14cm x 8cm x 20cm",
        img:
          "https://dhb3yazwboecu.cloudfront.net/512/2016/bolsa-kraft-asa-plana-32x13x41-medidas.jpg",
        tipo: "con-asa"
      },
      {
        descripcion: "RP-01M - 14cm x 8cm x 20cm",
        img:
          "https://dhb3yazwboecu.cloudfront.net/512/2016/bolsa-kraft-asa-plana-32x13x41-medidas.jpg",
        tipo: "con-asa"
      },
      {
        descripcion: "RP-01M - 14cm x 8cm x 20cm",
        img:
          "https://dhb3yazwboecu.cloudfront.net/512/2016/bolsa-kraft-asa-plana-32x13x41-medidas.jpg",
        tipo: "con-asa"
      },
      {
        descripcion: "RP-01M - 14cm x 8cm x 20cm",
        img:
          "https://dhb3yazwboecu.cloudfront.net/512/2016/bolsa-kraft-asa-plana-32x13x41-medidas.jpg",
        tipo: "con-asa"
      },
      {
        descripcion: "RP-01M - 14cm x 8cm x 20cm",
        img:
          "https://dhb3yazwboecu.cloudfront.net/512/2016/bolsa-kraft-asa-plana-32x13x41-medidas.jpg",
        tipo: "con-asa"
      },
      // Sin Asa
      {
        descripcion: "RP-01M - 14cm x 8cm x 20cm",
        img:
          "https://www.iberbag.com/wp-content/uploads/2016/05/bolsa_americana_kraft_VERJURADO_10x6x22medidas.jpg",
        tipo: "sin-asa"
      },
      {
        descripcion: "RP-01M - 14cm x 8cm x 20cm",
        img:
          "https://www.iberbag.com/wp-content/uploads/2016/05/bolsa_americana_kraft_VERJURADO_10x6x22medidas.jpg",
        tipo: "sin-asa"
      },
      {
        descripcion: "RP-01M - 14cm x 8cm x 20cm",
        img:
          "https://www.iberbag.com/wp-content/uploads/2016/05/bolsa_americana_kraft_VERJURADO_10x6x22medidas.jpg",
        tipo: "sin-asa"
      },
      {
        descripcion: "RP-01M - 14cm x 8cm x 20cm",
        img:
          "https://www.iberbag.com/wp-content/uploads/2016/05/bolsa_americana_kraft_VERJURADO_10x6x22medidas.jpg",
        tipo: "sin-asa"
      },
      {
        descripcion: "RP-01M - 14cm x 8cm x 20cm",
        img:
          "https://www.iberbag.com/wp-content/uploads/2016/05/bolsa_americana_kraft_VERJURADO_10x6x22medidas.jpg",
        tipo: "sin-asa"
      },
      {
        descripcion: "RP-01M - 14cm x 8cm x 20cm",
        img:
          "https://www.iberbag.com/wp-content/uploads/2016/05/bolsa_americana_kraft_VERJURADO_10x6x22medidas.jpg",
        tipo: "sin-asa"
      }
    ]
  }),
  computed: {
    productos_filtrados() {
      return this.productos.filter(producto => producto.tipo === this.tipo);
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
    padding: 20px;
    background: $color-secondary;
    // background: #131313;
    // border-left: 2px solid $color-secondary;
    font-size: 0.85rem;
    text-align: center;
    font-weight: bold;

    display: flex;
    align-items: center;
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
  .catalogo {
    grid-template-columns: 1fr;
  }
}
</style>