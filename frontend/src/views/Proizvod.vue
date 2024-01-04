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
            <!-- <p>Materijal: {{  proizvod.materijal[0].materijal_id }}</p> -->
            <h4>{{ proizvod.cena.toLocaleString() }} RSD</h4>
            <p>{{ proizvod.opis }}</p>
            <div>
              <p>Kolicina</p>
              <div class="quantity">
                <b-input-group>
                  <b-input-group-prepend>
                    <b-btn variant="info" @click="decrement()" class="dugme">-</b-btn>
                  </b-input-group-prepend>

                  <b-form-input type="number" min="0.00" :value="quantity" class="broj"></b-form-input>

                  <b-input-group-append>
                    <b-btn variant="info" @click="increment()" class="dugme">+</b-btn>
                  </b-input-group-append>
                </b-input-group>
              </div>
            </div>
            <div>
              <button>Dodaj U Korpu</button>
            </div>
          </b-col>
        </b-row>
      </b-container>
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
    margin: 50px;
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
    display: flex;
    align-items: center;
    overflow: hidden;
    border: solid 1px;

    .broj, .dugme{
      background: transparent;
      color: inherit;
      font-weight: bold;
      font-size: inherit;
      border: none;
      display: inline-block;
      min-width: 0;
      height: 2.5rem;
      line-height: 1;
    }
  }

</style>
