<template>
  <div class="pocetna">
    <div class="slika">
      <div class="tekst">
        <h2>Vereničko Prstenje</h2>
        <hr>
        <p>Nova kolekcija</p>
      </div>
      <img src="@/assets/pocetna.jpg" alt="">
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Pocetna',
  components: {
  }
}
</script>

<style scoped>

.pocetna {
  height: 77vh !important;
  margin-top: 4px;
}

img {
  margin-top: 130px;
  width: 100%;
}

h1{
  text-align: center;
  margin-top: 40px;
  font-weight: 900;
}

.tekst {
  position: absolute;
  top: 35%;
  left: 25%;
  transform: translate(-50%, -50%);
  font-family: Kanit, sans-serif;
}

.tekst p {
  font-weight: 500;
  font-size: 15px;
  color: #656565;
  text-transform: uppercase;
  letter-spacing: 4px;
  text-align: center;
}

.tekst h2 {
  color: #3b5f77;
  font-size: 80px;
  margin-top: 80px;
  font-weight: 500;
}

</style>
