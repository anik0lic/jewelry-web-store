<template>
    <div>
      <b-container class="bv-example-row">
      <b-row>
        <b-col cols="2">
          <div>
            <h4>Kategorije</h4>
            <label><input type="checkbox" v-model="selectedCategory" value="1" /> Prstenje</label>
            <label><input type="checkbox" v-model="selectedCategory" value="2" /> Ogrlice</label>
            <label><input type="checkbox" v-model="selectedCategory" value="3" /> Narukvice</label>
            <label><input type="checkbox" v-model="selectedCategory" value="4" /> Mindjuse</label>
            <hr>
            <h4>Materijali</h4>
            <label><input type="checkbox" v-model="selectedMaterial" value="1" /> Srebro</label>
            <label><input type="checkbox" v-model="selectedMaterial" value="2" /> Zlato</label>
            <label><input type="checkbox" v-model="selectedMaterial" value="3" /> Roze Zlato</label>
          </div>
        </b-col>
        <b-col cols="10">
          <div>
            <button @click="prev()">Prethodno</button>
            ...
            <button @click="next()">Sledece</button>
          </div>
          <div class="proizvodi">
            <ProizvodKartica v-for="proizvod in currentPageItems" :key="proizvod.id" :proizvod="proizvod" />
          </div>
        </b-col>
      </b-row>
    </b-container>
    </div>
</template>

<script>
import ProizvodKartica from '@/components/ProizvodKartica.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Proizvodi',
  components: {
    ProizvodKartica
  },
  data () {
    return {
      perPage: 10,
      pageNumber: 0,
      selectedCategory: [],
      selectedMaterial: []
    }
  },
  computed: {
    ...mapState([
      'proizvodi'
    ]),
    filteredCategory () {
      if (!this.selectedCategory.length) {
        return this.proizvodi
      } else {
        return this.proizvodi.filter(p =>
          this.selectedCategory.includes(p.kategorija_id.toString())
        )
      }
    },
    filteredProducts () {
      if (!this.selectedMaterial.length) {
        return this.filteredCategory
      } else {
        console.log(this.selectedMaterial)
        console.log(this.filteredCategory)
        return this.filteredCategory.filter(p =>
          this.selectedMaterial.includes(p.materijal[0].materijal_id.toString())
        )
      }
    },
    currentPageItems () {
      return this.filteredProducts.slice(this.pageNumber * this.perPage, this.pageNumber * this.perPage + this.perPage)
    }
  },
  methods: {
    ...mapActions([
      'fetchProizvodi'
    ]),
    next () {
      if (this.pageNumber * 10 < this.proizvodi.length) {
        this.pageNumber++
      }
    },
    prev () {
      if (this.pageNumber > 0) {
        this.pageNumber--
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
