<template>
  <!-- <h1>Narudzbina</h1> -->
  <div class="narudzbina">
    <div class="podaci">
      <KorpaForma/>
    </div>
    <div class="korpa">
      <h2>Vaša Korpa</h2>
      <hr>
      <ProizvodIzKorpe v-for="proizvod in korpa" :key="proizvod.id" :proizvod="proizvod"/>
      <p v-if="!korpa.length">Nemate ništa u korpi 😢</p>
      <hr>
      <div class="ukupno">
        <h3>Ukupna Cena: {{ ukupnaCena.toLocaleString() }} RSD</h3>
      </div>
    </div>
  </div>
</template>

<script>
import ProizvodIzKorpe from '@/components/ProizvodIzKorpe.vue'
import KorpaForma from '@/components/KorpaForma.vue'

export default {
  components: {
    ProizvodIzKorpe,
    KorpaForma
  },

  computed: {
    korpa () {
      return this.$store.getters.proizvodiIzKorpe
    },
    ukupnaCena () {
      return this.$store.getters.ukupnaCena
    }
  }

}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@100;200;300;400;500;600;700;800;900&display=swap');
.narudzbina{
  text-align: center;
  margin-top: 4px;
  height: 77vh;
}

.podaci, .korpa{
  display: inline-block;
  vertical-align: top;
  background-color: white;
  margin-top: 30px;
  padding: 30px;
  border-radius: 30px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  text-align: left;
  font-family: 'Kanit', sans-serif;
}

.podaci{
  width: 40%;
  margin-right: 30px;
}

.podaci input{
  width: 100%;
  height: 70%;
}

.korpa{
  width: 35%;
  margin-left: 30px;
}

.korpa h2{
  font-size: 33px;
  font-family: 'Nunito', sans-serif;
  font-weight: 800;
  color: #213E51;
}

.ukupno{
  display: block;
  text-align: right;
}

.ukupno h3{
  font-size: 25px;
  color: #213E51;
}
</style>
