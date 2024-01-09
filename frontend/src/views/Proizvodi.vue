<template>
    <div id="proizvodi-page">
      <b-container class="bv-example-row">
      <b-row>
        <b-col cols="2">
          <div class="filteri">
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
          <div class="proizvodi">
            <ProizvodKartica v-for="proizvod in currentPageItems" :key="proizvod.id" :proizvod="proizvod" />
          </div>
          <div class="dugmici">
            <button @click="prev(), scrollToTop()">&lt;</button>
            <button @click="next(), scrollToTop()">&gt;</button>
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
      if ((this.pageNumber + 1) * 10 < this.proizvodi.length) {
        this.pageNumber++
      }
    },
    prev () {
      if (this.pageNumber > 0) {
        this.pageNumber--
      }
    },
    scrollToTop () {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
  },
  mounted () {
    this.fetchProizvodi()
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@100;200;300;400;500;600;700;800;900&display=swap');

  .proizvodi{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 30px;
  }
  .filteri{
    display: grid;
    margin-top: 60px;
    font-family: Kanit, sans-serif;
    padding: 20px;
  }

  .filteri h4{
    color: #213E51;
    letter-spacing: 1px;
    font-size: 27px;
  }

  .filteri label{
    font-weight: 300;
    margin-bottom: 3px;
    color: #404040;
    accent-color: #3b5f77;
    font-size: 18px;
    letter-spacing: 1px;
  }

  .dugmici{
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
  }

  .dugmici button{
    margin:10px;
    background-color: white;
    color: #213E51;
    border: 0;
    border-radius: 10px;
    font-size: 30px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    width: 50px;
    font-weight: 700;
  }

  .dugmici button:hover{
    background-color: #3b5f77;
    color: white;
    transition: all .5s ease;
   -webkit-transition: all .5s ease;
  }

</style>
