<template>
    <div class="forma">
        <h2>Narudžbina</h2>
        <b-container fluid>
        <b-row>
            <b-col>
                <label for="ime_prezime">Ime i Prezime</label>
                <b-form-input id="ime_prezime" :state="validnoImeIPrezime" v-model="narudzbina.ime_prezime"></b-form-input>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <label>Adresa</label>
                <b-form-input id="adresa" :state="validnaAdresa" v-model="narudzbina.adresa"></b-form-input>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <label>Broj Telefona</label>
                <b-form-input id="telefon" :state="validanBrojTelefona" v-model="narudzbina.telefon"></b-form-input>
            </b-col>
        </b-row>
      </b-container>
      <div class="dugme">
        <b-button class="posalji" @click="posalji()">Pošalji</b-button>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      narudzbina: {
        ime_prezime: null,
        adresa: null,
        telefon: null,
        cena: this.$store.getters.ukupnaCena,
        vreme_narucivanja: new Date(),
        status: 'Novo'
      }
    }
  },

  computed: {
    validnoImeIPrezime () {
      if (this.narudzbina.ime_prezime == null) return null
      else if (this.narudzbina.ime_prezime.length > 4) return true
      else return false
    },
    validnaAdresa () {
      if (this.narudzbina.adresa == null) return null
      else if (this.narudzbina.adresa.length > 4) return true
      else return false
    },
    validanBrojTelefona () {
      if (this.narudzbina.telefon == null) return null
      else if (this.narudzbina.telefon.length > 6) return true
      else return false
    }
  },

  methods: {
    posalji () {
      if (this.validnoImeIPrezime && this.validnaAdresa && this.validanBrojTelefona) {
        fetch('http://localhost:9000/narudzbina', {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify(this.narudzbina)
        })
          .then(res => res.json())
          .then(res => {
            console.log(res)
            if (res.error) {
              this.statusnaPoruka = res.error
              this.statusnaPorukaTip = 'danger'
            } else {
              this.statusnaPorukaTip = 'success'
            }
          })
      } else {
        console.log('nije se poslalo')
      }
    }
  }

}
</script>

<style scoped>
.forma{
    font-size: 18px;
    font-family: Kanit, sans-serif;
}

.forma h2{
    color:#213E51;
    font-size: 33px;
    margin-left: 10px;
    font-weight: 800;
    font-family: Nunito, sans-serif;
}

.forma label{
    margin-top: 10px;
}

.forma input{
    height: 55%;
    font-size: 18px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

.forma input:focus{
    border: 1px solid #213E51;
    box-shadow: none;
}

.dugme{
    text-align: right;
    margin-right: 15px;
    margin-top: 25px;
    font-family: 'Nunito', sans-serif;
}

.dugme .posalji{
    background-color: #3b5f77;
}

.dugme .posalji:hover{
    background-color: #213E51;
}

.dugme .posalji:active{
    background-color: #213E51 !important;
}

</style>
