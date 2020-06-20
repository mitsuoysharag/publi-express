<template>
  <section class="login">
    <h1 class="login__title">Cotizador Online</h1>
    <Alert v-model="show_error" style="margin-bottom: 20px">Complete el formulario</Alert>
    <p class="login__message">Identifícate</p>

    <form class="form" @submit.prevent="checkForm">
      <div class="form__persona">
        <label>
          <input type="radio" name="persona" value="natural" v-model="persona" />
          <span class="checkmark"></span>
          <span>Persona Natural</span>
        </label>
        <label>
          <input type="radio" name="persona" value="jurídica" v-model="persona" />
          <span class="checkmark"></span>
          <span>Empresa</span>
        </label>
      </div>

      <input
        class="m-input"
        type="text"
        name="nombre"
        :placeholder="persona === 'natural' ? 'Nombre de contacto': 'Razón Social'"
        autocomplete="off"
        v-model.trim="nombre"
        required
      />
      <input
        class="m-input"
        type="number"
        name="telefono"
        placeholder="Teléfono / Celular"
        autocomplete="off"
        v-model.trim="telefono"
        required
      />
      <input
        class="m-input"
        type="email"
        name="correo"
        placeholder="Correo Electrónico"
        autocomplete="off"
        v-model.trim="correo"
        required
      />

      <v-select
        style="width: 100%; margin-top: 12px"
        name="distrito"
        :items="distritos"
        v-model="distrito"
        dark
        hide-details
      ></v-select>

      <button class="btn-submit">Ingresar</button>
    </form>

    <p
      class="login__nota"
    >Nota: Los datos proporcionados son confidenciales y para uso exclusivo de Publi Express.</p>
  </section>
</template>

<script>
import tarifa from "@/data/tarifa.json";
import Alert from "@/components/Alert";

export default {
  data: () => ({
    persona: "natural",
    nombre: "",
    telefono: "",
    correo: "",
    distrito: "Cercado de Lima",
    show_error: false,
    distritos: [
      // "Lima",
      // "Ancón",
      // "Ate",
      // "Barranco",
      // "Breña",
      // "Carabayllo",
      // "Chaclacayo",
      // "Chorrillos",
      // "Cieneguilla",
      // "Comas",
      // "El Agustino",
      // "Independencia",
      // "Jesús María",
      // "La Molina",
      // "La Victoria",
      // "Lince",
      // "Los Olivos",
      // "Lurigancho",
      // "Lurín",
      // "Magdalena del Mar",
      // "Miraflores",
      // "Pachacamac",
      // "Pucusuna",
      // "Pueblo Libre",
      // "Puente Piedra",
      // "Punta Hermosa",
      // "Punta Negra",
      // "Rímac",
      // "San Bartolo",
      // "San Borja",
      // "San Isidro",
      // "San Juan de Lurigancho",
      // "San Juan de Miraflores",
      // "San Luis",
      // "San Martin de Porres",
      // "San Miguel",
      // "Santa Anita",
      // "Santa María del Mar",
      // "Santa Rosa",
      // "Santiago de Surco",
      // "Surquillo",
      // "Villa El Salvador",
      // "Villa María del Triunfo"
    ]
  }),
  created() {
    this.distritos = Object.keys(tarifa);
  },
  methods: {
    checkForm() {
      this.show_error = false;
      
      if (
        this.persona &&
        this.nombre &&
        this.telefono &&
        this.correo &&
        this.distrito
      ) {
        this.$store.commit("setUsuario", {
          persona: this.persona,
          nombre: this.nombre,
          telefono: this.telefono,
          correo: this.correo,
          distrito: this.distrito
        });

        this.$router.push({ name: "catalogo" });
        return;
      }

      this.show_error = true;

      // this.errors = [];
      // if (!this.nombre) this.errors.push("");
      // if (!this.telefono) this.errors.push("");
      // if (!this.correo) this.errors.push("");
      // if (!this.distrito) this.errors.push("");
    }
  },
  components: {
    Alert
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/color.scss";

.login {
  max-width: 400px;
  padding: 20px;
  text-align: center;

  &__title {
    margin-bottom: 20px;
    padding: 12px 24px;
    background: $color-secondary;
    color: #fff;
    font-size: 1.3rem;
    text-transform: uppercase;
  }

  &__message {
    margin-bottom: 20px;
    color: #cf1e46;
    font-weight: bold;
    font-size: 1.1rem;
  }

  &__nota {
    margin-top: 32px;
    color: #fff;
    font-size: 0.9rem;
    line-height: 20px;
  }
}

.form {
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__persona {
    display: flex;
    label {
      margin: 0 12px;
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  }

  input {
    margin-top: 20px;
  }

  select {
    margin-top: 20px;
  }
}

.btn-submit {
  width: min-content;
  margin-top: 24px;
  padding: 8px 16px;
  background: $color-secondary;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 20px;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
