<template>
    <div>
      <div>
        <button @click="prev()">Prethodno</button>
        ...
        <button @click="next()">Sledece</button>
      </div>
      <div class="proizvodi">
        <ProizvodiLista v-if="proizvodi" :proizvodiIDs="proizvodi.slice(current * 10, current * 10 + 10)" />
        <p v-else>lista nije spremna</p>
      </div>
    </div>
</template>

<script>
import ProizvodiLista from '@/components/ProizvodiLista.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Proizvodi',
  components: {
    ProizvodiLista
  },
  data () {
    return {
      current: 0
    }
  },
  computed: {
    ...mapState([
      'proizvodi'
    ])
  },
  methods: {
    ...mapActions([
      'fetchProizvodi'
    ]),
    next () {
      if (this.current * 10 < this.proizvodi.length) {
        this.current++
      }
    },
    prev () {
      if (this.current > 0) {
        this.current--
      }
    }
  },
  mounted () {
    this.fetchProizvodi()
  }
}
</script>

<style scoped>
  .proizvodi{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>
