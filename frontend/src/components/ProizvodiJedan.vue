<template>
    <div class="proizvod" @click="kliknutProizvod()">
      <!-- <img src="" alt=""> -->
      <p>nema slike</p>

      <h3>{{ proizvod.naziv }} {{ proizvod.cena }}</h3>
    </div>
</template>

<script>
export default {
  name: 'ProizvodJedan',

  props: {
    proizvod: Object
  },

  methods: {
    kliknutProizvod () {
      this.$router.push({ name: 'Proizvod', params: { id: this.proizvod.id } })
    }
  }
}
</script>
