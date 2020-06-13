<template>
  <v-container class="cotizacion">
    <div class="cotizacion__volver">
      <v-btn icon dark @click="volver()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </div>
    <div class="row no-gutters" style="align-items: center">
      <div class="col-md-4">
        <div class="cotizacion__img">
          <img src="@/assets/producto.jpeg" alt="Producto" />
          <div class="overlay">
            <img v-if="img" :src="img" alt="Imagen" />
          </div>
        </div>
      </div>
      <section class="cotizacion__detalle col-md-8">
        <!-- Bienvenida -->
        <p class="cotizacion__fecha">Lima, {{formatDate(new Date())}}</p>
        <h1 class="cotizacion__titulo">
          Cotizador
          <span class="red">Online</span>
        </h1>
        <p class="cotizacion__bienvenida">
          <span class="red">Bienvenido:</span>
          {{usuario.nombre}}
        </p>

        <!-- Filtro -->
        <section class="filtro">
          <table>
            <thead>
              <tr>
                <th>Bolsa</th>
                <th>Gramaje</th>
                <th>Cantidad</th>
                <th>Impresión</th>
                <th v-if="impresion !== 'no'">Lados</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span>{{producto.id}}</span>
                </td>
                <td>
                  <span>{{producto.gramaje}}Gr</span>
                </td>
                <td>
                  <v-select :items="cantidad_arr" v-model="cantidad" dark dense hide-details></v-select>
                </td>
                <td>
                  <v-select :items="impresion_arr" v-model="impresion" dark dense hide-details></v-select>
                </td>
                <td v-if="impresion !== 'no'">
                  <v-select :items="lados_arr" v-model="lados" dark dense hide-details></v-select>
                </td>
                <td v-if="impresion !== 'no'">
                  <v-icon style="cursor: pointer" dark onclick="iptFile.click()">mdi-image</v-icon>
                  <input
                    style="display: none"
                    onclick="this.value = null"
                    @change="onFileChange"
                    type="file"
                    id="iptFile"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <!-- Factura -->
        <section class="factura">
          <div class="factura__tipos">
            <label>
              <input type="radio" :value="false" v-model="factura" />
              <span class="checkmark"></span>
              <span>Sin Factura</span>
            </label>
            <label>
              <input type="radio" :value="true" v-model="factura" />
              <span class="checkmark"></span>
              <span>Con Factura</span>
            </label>
          </div>

          <v-text-field
            style="margin: 16px 0 40px"
            v-if="factura"
            v-model="ruc"
            label="RUC"
            autocomplete="off"
            dark
            dense
            hide-details
          ></v-text-field>
        </section>

        <!-- Tiempo -->
        <section class="tiempo">
          <span>Tipo de Entrega:</span>
          <v-select
            style="margin-top: -4px"
            :items="entrega_arr"
            item-text="text"
            item-value="value"
            v-model="entrega"
            dark
            dense
            hide-details
          ></v-select>
          <span>Tiempo de entrega:</span>
          <span>{{tiempo}}</span>
          <span v-if="entrega !== 'no'">Lugar de entrega:</span>
          <v-text-field
            v-if="entrega !== 'no'"
            style="margin-top: -2px"
            v-model="lugar"
            dark
            dense
            hide-details
            autocomplete="off"
          ></v-text-field>
        </section>

        <!-- Total -->
        <section class="total">
          <span class="total__item">Subtotal:</span>
          <span>S/. {{subtotal}}</span>
          <span class="total__item" v-if="factura">IGV:</span>
          <span v-if="factura">S/. {{igv}}</span>
          <span class="total__item">Total:</span>
          <span>S/. {{total}}</span>
        </section>

        <!-- Acciones -->
        <div class="cotizacion__acciones">
          <button class="btn" @click="dlg_comprar = true">Comprar Ya</button>
          <button class="btn" @click="sendMessage()">Comprar por Whatsapp</button>
        </div>
      </section>
    </div>

    <!-- DIALOG -->
    <v-dialog v-model="dlg_comprar" max-width="560">
      <v-card class="comprar">
        <v-card-title></v-card-title>
        <v-card-text>Aún no tenemos disponible ésta función. Sin embargo, nuestros vendedores pueden atenderle por Whatsapp.</v-card-text>
        <v-card-actions class="comprar__acciones">
          <button class="btn" @click="dlg_comprar = false; sendMessage()">Comprar por Whatsapp</button>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import productos_sin_asa from "@/data/productos_sin_asa.json";
import productos_con_asa from "@/data/productos_con_asa.json";

export default {
  data: () => ({
    producto: {},
    productos: [],
    img: "",
    //
    factura: false,
    cantidad: "100",
    impresion: "no",
    lados: "1",
    lugar: "",
    entrega: "no",
    ruc: "",
    //
    cantidad_arr: ["100", "500", "1000"],
    impresion_arr: ["no", "1", "2"],
    lados_arr: ["1", "2"],
    entrega_arr: [
      { value: "no", text: "Recojo en tienda" },
      { value: "gratis", text: "Envío Gratuito" },
      { value: "express", text: "Express" }
    ],
    dlg_comprar: false
  }),
  created() {
    productos_sin_asa.forEach(p => (p.tipo = "sin-asa"));
    productos_con_asa.forEach(p => (p.tipo = "con-asa"));
    this.productos = productos_sin_asa.concat(productos_con_asa);
    this.producto = this.productos.find(
      producto => producto.id === this.$router.currentRoute.params["id"]
    );
  },
  computed: {
    usuario() {
      return this.$store.state.usuario || {};
    },
    subtotal() {
      let subtotal = Number(this.producto[this.cantidad]);
      if (this.impresion !== "no")
        subtotal += Number(
          this.producto[`${this.cantidad}_${this.impresion}_${this.lados}`]
        );

      if (this.entrega === "express") subtotal += 10;

      return subtotal.toFixed(2);
    },
    igv() {
      let igv = this.factura ? Number(this.subtotal) * 0.18 : 0;
      return igv.toFixed(2);
    },
    total() {
      let total = Number(this.subtotal) + Number(this.igv);
      return total.toFixed(2);
    },
    tiempo() {
      let tiempo = "";
      if (this.entrega === "no") {
        tiempo = `${this.impresion === "no" ? "2" : "5"} días`;
      } else if (this.entrega === "express") {
        tiempo = `${this.impresion === "no" ? "1" : "3"} días`;
      } else if (this.entrega === "gratis") {
        var d = new Date();
        let offset = Math.min(
          (2 + 7 - d.getDay() + 2) % 7,
          (6 + 7 - d.getDay() + 2) % 7
        );
        d.setDate(d.getDate() + offset);
        return this.formatDate(d, false);
      }
      return tiempo;
    }
  },
  methods: {
    onFileChange(e) {
      let file = e.target.files[0];
      let fr = new FileReader();
      fr.readAsDataURL(file);
      fr.onload = () => {
        this.img = fr.result;
      };
    },
    volver() {
      this.$router.push({ name: "catalogo" });
    },
    formatDate(d, year = true) {
      let months = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
      ];
      let datestring = `${d.getDate()} de ${months[d.getMonth()]}`;
      datestring += year ? ` de ${d.getFullYear()}` : "";

      return datestring;
    },
    sendMessage() {
      let api = "https://api.whatsapp.com";
      let phone = "51991615223";
      // let phone = "51955525493";
      let text = `
      Buen dia, me llamo *${this.usuario.nombre} (Persona ${
        this.usuario.persona === "natural" ? "Natural" : "Jurídica"
      })*, con el correo ${this.usuario.correo} con el número *${
        this.usuario.telefono
      }*.%0A%0A
      Con la intención de solicitar el siguiente pedido:%0A%0A
      Tipo de Bolsa: *${
        this.producto.tipo === "sin-asa" ? "Sin Asa" : "Con Asa"
      }*%0A
      Bolsa: *${this.producto.id}*%0A
      Medidas: *${this.producto.ancho} x ${this.producto.base} x ${
        this.producto.alto
      }*%0A
      Color: *${this.producto.color}*%0A
      Gramaje: *${this.producto.gramaje}gr*%0A
      Cantidad: *${this.cantidad} unidades*%0A
      Tipo de Envío: *${
        this.entrega_arr.find(e => e.value === this.entrega).text
      }*%0A
      ${
        this.impresion === "no"
          ? ""
          : `
      Impresión: *${this.impresion} Colores*%0A
      Lados: *${this.lados}*%0A%0A`
      }
      Tipo de Pago: ${
        this.factura
          ? `*Con Factura*%0A
      RUC: *${this.ruc}*%0A`
          : "*Sin Factura*%0A"
      }
      Con Subtotal: *S/ ${this.subtotal}*%0A
      ${this.entrega === "express" ? "Con Precio de Delivery: *S/ 10*%0A" : ""}
      Dando un Total: *S/ ${this.total}*%0A%0A
      Con el tiempo de entrega: *${this.tiempo}*%0A
      En el lugar de entrega: *Lugar de entrega: ${this.lugar}*%0A`;
      text = text.replace(/\s+/g, " ");

      window.open(`${api}/send?phone=${phone}&text=${text}`, "_blank");
    }
  }
};
</script>

<style lang='scss' scoped>
@import "@/styles/color.scss";

.cotizacion {
  padding: 0;
  color: #fff;

  &__volver {
    padding: 10px;
    padding-bottom: 0;
  }

  &__img {
    position: relative;
    margin: 20px !important;
    height: min-content;
    img {
      margin: 0 auto;
      display: block;
      max-width: 400px;
      width: 100%;
    }
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 40%;
      }
    }
  }

  &__fecha {
    text-align: end;
    margin-bottom: 10px;
  }

  &__detalle {
    padding: 10px !important;
  }

  &__titulo {
    font-size: 2rem;
    text-transform: uppercase;
  }
  &__bienvenida {
    margin-top: 6px;
    font-size: 1.4rem;
  }
  &__acciones {
    margin-top: 30px;
    .btn {
      margin-right: 10px;
    }
  }
}

.filtro {
  overflow-x: auto;
  margin-top: 20px;
  padding: 12px;
  background: #ffffff15;
  text-align: center;
}

.factura {
  margin-top: 20px;

  &__tipos {
    display: flex;
  }
}

.tiempo {
  width: max-content;
  max-width: 100%;
  margin-top: 30px;
  // padding: 0 20px;

  display: grid;
  grid-template-columns: repeat(2, auto);
  column-gap: 16px;
  row-gap: 12px;
  align-items: center;
}

.comprar {
  & * {
    font-size: 1.1rem !important;
  }
  &__acciones {
    padding: 0 0 20px;
    display: flex;
    justify-content: center;
    & * {
      font-size: 0.8rem !important;
    }
  }
}

//
label {
  margin: 0 12px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.btn {
  width: max-content;
  padding: 8px 12px;
  background: $color-secondary;
  color: #fff;
  font-size: 0.8rem;
  text-transform: uppercase;
  border-radius: 20px;
  transition: background-color 0.3s;

  &:hover {
    background: #c70a30;
  }
}

.total {
  padding: 12px 16px;
  margin: 20px 0 0 auto;
  width: max-content;
  background: #ffffff15;
  color: #e2e2e2;

  display: grid;
  grid-template-columns: repeat(2, auto);
  column-gap: 20px;
  row-gap: 8px;

  &__item {
    color: #fff;
    font-size: 1rem;
    font-weight: bold;
    text-align: end;
    text-transform: uppercase;
  }
}

.red {
  color: $color-secondary;
}
</style>