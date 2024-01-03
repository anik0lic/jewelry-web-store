<template>
    <div class="proizvod">
        <div v-if="proizvod">
            <h1>"proizvod.ime" + ' ' + proizvod.cena</h1>

            <!-- <img src="" alt=""> -->
            <div class="info">
                <h2>info</h2>
            </div>
        </div>

    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Proizvod',

  components: {

  },

  data () {
    return {
      proizvod: null
    }
  },

  methods: {
    ...mapActions([
      'getProizvod'
    ])
  },

  mounted () {
    this.getProizvod(this.$route.params.id)
      .then(res => {
        this.proizvod = res
      })
  }
}

</script>
