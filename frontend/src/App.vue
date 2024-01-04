<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg">
      <div class="nav-wrapper container-fluid text-center">
        <div class="row w-100">
            <div class="col-2 flex">
              <a href="index.html"><img class="logo" src="@/assets/logo.png" alt="logo"></a>
            </div>
            <div class="col-8 collapse navbar-collapse flex">
              <ul class="navbar mb-lg-0">
                <li class="nav-item"><router-link to="/"  class="nav-link">Pocetna</router-link></li>
                <li class="nav-item"><router-link to="/proizvodi"  class="nav-link">Katalog</router-link></li>
              </ul>
            </div>
            <div class="col-2 flex">
              <router-link to="/korpa"><img class="bag" src="@/assets/bag.png" alt="bag"></router-link>
              <a href="#"><img class="user" src="@/assets/user.png" alt="user"></a>
            </div>
          </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,1000&display=swap');

  #app{
    font-family: 'Nunito', sans-serif;
  }

  html, body{
    margin: 0;
    background-color:#E9E7E8 !important;
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
      letter-spacing: 1px;
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
</style>
