<template>
    <div class="header">
        <nav class="navbar navbar-expand-lg">
        <div class="nav-wrapper container-fluid text-center">
            <div class="row w-100">
                <div class="col-2 flex">
                <a href="/"><img class="logo" src="@/assets/logo.png" alt="logo"></a>
                </div>
                <div class="col-8 collapse navbar-collapse flex">
                <ul class="navbar mb-lg-0">
                    <li class="nav-item"><router-link to="/"  class="nav-link">Pocetna</router-link></li>
                    <li class="nav-item"><router-link to="/proizvodi"  class="nav-link">Katalog</router-link></li>
                </ul>
                </div>
                <div class="col-2 flex items">
                  <div class="korpa">
                      <router-link to="/korpa"><img class="bag" src="@/assets/bag.png" alt="bag">
                          <span v-if="brojProizvodaUKorpi > 0" class="align-items-center justify-content-center badge rounded-pill">
                          {{ brojProizvodaUKorpi }}
                          </span>
                      </router-link>
                  </div>
                  <router-link v-if="!token" to="/login"><img class="user" src="@/assets/user.png" alt="user"></router-link>
                  <b-dropdown v-if="token" right variant="link" toggle-class="customDropdown" no-caret>
                    <template #button-content><img src="@/assets/user.png" alt="user"></template>
                    <b-dropdown-item href="#" class="dropdown"><router-link v-if="token" to="/korisnik" class="dropdown-item">Detalji</router-link></b-dropdown-item>
                    <b-dropdown-item href="#" class="dropdown-item dropdown" @click="logout">Odjavi se</b-dropdown-item>
                  </b-dropdown>
                </div>
            </div>
        </div>
        </nav>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    brojProizvodaUKorpi () {
      return this.$store.getters.ukupnoProizvoda
    },
    ...mapState([
      'token',
      'user_id'
    ])
  },
  methods: {
    ...mapMutations([
      'removeToken',
      'setToken',
      'removeUser',
      'removeSveIzKorpe'
    ]),
    logout () {
      this.removeToken()
      this.removeUser()
      this.removeSveIzKorpe()
      this.$router.push({ name: 'Pocetna' })
    }
  },
  mounted () {
    if (localStorage.token) {
      this.setToken(localStorage.token)
    }
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,1000&display=swap');

  #app{
    font-family: 'Nunito', sans-serif;
  }

  html, body{
    margin: 0;
    background-color:#ededed !important;
    color: #656565;
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
  }

  nav{
    background-color: #fff;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }

  .logo{
      width: 50px;
  }

  .bag, .user{
      margin-left: 12px;
  }

  .user {
    margin-top: 3.5px
  }

  .korpa{
    position: relative;
  }

  .korpa span{
    background-color: #3b5f77;
    position:absolute;
    top:-2px;
    left:0;
    text-indent:0px;
  }

  .nav-item{
      list-style: none;
      padding: 0;
      margin-left: 10px;
      margin-right: 10px;
  }

  html .nav-link{
      font-size: 18px;
      font-weight: 600;
      padding-left: 10px;
      padding-right: 10px;
      padding-top: 4px;
      position: relative;
      letter-spacing: 2px;
      color: #213E51;
  }

  .flex{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .nav-link,
  .nav-link:after,
  .nav-link:before {
      transition: all .5s;

  }

  .nav-link::after{
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      width: 0%;
      content: '.';
      color: transparent;
      background: #213E51;
      height: 2px;
  }

  .nav-link:hover:after {
    width: 100%;
  }

  .customDropdown {
    padding-left: 6px !important;
    margin-top: 4px !important;
    width: 50% !important;
  }

  .dropdown-item:active {
    background-color: #3b5f77 !important;
    color: white
  }

  .dropdown-item {
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 1px;
    color: #213E51;
    text-decoration: none;
  }

  .dropdown-item:active {
    background-color: #fff;
  }
</style>
