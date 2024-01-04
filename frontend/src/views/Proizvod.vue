<template>
    <div class="proizvod">
      <b-container class="bv-example-row">
        <b-row>
          <b-col cols="6" class="slika">
            <img :src="proizvod.slika" alt="">
          </b-col>
          <b-col cols="6">
            <h3>{{ proizvod.naziv }}</h3>
            <h5>Kategorija: {{  proizvod.kategorija.naziv }}</h5>
            <h4>{{ proizvod.cena.toLocaleString() }} RSD</h4>
            <p>{{ proizvod.opis }}</p>
            <div>
              <div class="quantity">
                <p>Kolicina</p>
                <b-input-group>
                  <b-btn variant="info" @click="decrement()" class="minus">-</b-btn>
                  <b-form-input type="number" min="0.00" :value="quantity" class="broj" disabled></b-form-input>
                  <b-btn variant="info" @click="increment()" class="plus">+</b-btn>
                </b-input-group>
              </div>
            </div>
            <div>
              <button @click="dodajUKorpu()">Dodaj U Korpu</button>
            </div>
            <div class="korpa" v-if="ukupnaKolicina">
                <h3>U korpi</h3>
                <h4>{{ ukupnaKolicina }}</h4>
                <button @click="izbaciIzKorpe()">Izbaci Iz Korpe</button>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'Proizvod',

  components: {

  },

  data () {
    return {
      proizvod: null,
      quantity: 1
    }
  },

  methods: {
    ...mapActions([
      'getProizvod'
    ]),
    ...mapMutations([
      'addUKorpu',
      'removeIzKorpe'
    ]),
    increment () {
      this.quantity++
    },
    decrement () {
      if (this.quantity !== 1) {
        this.quantity--
      }
    },
    dodajUKorpu () {
      this.addUKorpu({ proizvod: this.proizvod, kolicina: this.quantity })
    },
    izbaciIzKorpe () {
      this.removeIzKorpe(this.proizvod)
    }
  },

  computed: {
    ukupnaKolicina () {
      return this.$store.getters.kolicinaProizvoda(this.proizvod)
    }
  },

  mounted () {
    console.log(this.$route.params.id)
    this.getProizvod(this.$route.params.id)
      .then(res => {
        console.log(res)
        this.proizvod = res
      })
    console.log(this.proizvod)
  }
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@100;200;300;400;500;600;700;800;900&display=swap');
  .proizvod{
    margin: 40px;
    padding: 30px;
    background-color: white;
    border-radius: 40px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    font-family: 'Kanit', sans-serif;
    color: #213E51;
  }
  .slika{
    text-align: center;
  }

  img{
    width: 80%;
    border-radius: 40px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }

  .quantity{
    max-width: 150px;
    width: 100%;
    margin-bottom: 15px;
  }

  .quantity button{
    background-color: #efefef;
    border: none;
  }

  .quantity button:active{
    background-color: #213E51;
    color: #E9E7E8
  }

  .quantity input {
    text-align: center;
    background-color: #efefef;
    border: 0;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .quantity p {
    margin-bottom: 0;
  }

</style>
