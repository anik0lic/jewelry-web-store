<template>
    <div>
        <ProizvodiJedan v-for="proizvod in proizvodi" :key="proizvod.id" :proizvod="proizvod" />
    </div>
</template>

<script>
import ProizvodiJedan from '@/components/ProizvodiJedan.vue'
import { mapActions } from 'vuex'

export default {
  name: 'ProizvodiLista',

  components: {
    ProizvodiJedan
  },

  data () {
    return {
      proizvodi: []
    }
  },

  props: {
    proizvodiIDs: Array
  },

  watch: {
    proizvodiIDs (nVal) {
      this.proizvodi = []

      nVal.map(obj => (
        this.getProizvod(obj.id)
          .then(proizvod => this.proizvodi.push(proizvod))
      ))
    }
  },

  methods: {
    ...mapActions([
      'getProizvod'
    ])
  },

  mounted () {
    this.proizvodiIDs.map(obj => (
      this.getProizvod(obj.id)
        .then(proizvod => this.proizvodi.push(proizvod))
    ))
  }
}
</script>
