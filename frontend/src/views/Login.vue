<template>
    <div id="login-page">
      <div id="login">
        <h2>Ulogujte se</h2>
        <b-form @submit="onSubmit">
        <b-form-group label="Username:" label-for="username" class="label">
            <b-form-input id="username" v-model="form.username" required></b-form-input>
        </b-form-group>
        <b-form-group label="Password:" label-for="password" class="label">
            <b-form-input id="password" v-model="form.password" type="password" required></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Uloguj se</b-button>
        </b-form>
        <h3>Nemate Nalog?</h3>
        <router-link to="/register"><b-button type="submit" variant="primary">Napravi Nalog</b-button></router-link>
      </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',

  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    async onSubmit (e) {
      e.preventDefault()
      try {
        await this.login(this.form).then(res => {
          if (this.$store.getters.user_id) {
            this.$router.push({ name: 'Proizvodi' })
          }
        })
      } catch (error) {
        console.error('Login failed:', error)
      }
    }
  }
}
</script>

<style scoped>
#login-page {
  height: 69vh;
}

#login {
    margin-left: auto;
    margin-right: auto;
    margin-top: 80px;
    width: 30%;
    height: 550px;
    padding: 20px;
    padding-top: 50px;
    border-radius: 20px;
    background-color: white;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    text-align: center;
    font-family: Nunito, sans-serif;
}

#login form {
  width: 70%;
  margin-left: auto;
  margin-right: auto;
}

#login h2 {
  font-size: 40px;
}

#login input {
    /* width: 60%; */
    margin-left: auto;
    margin-right: auto;
    /* margin-top: 10px; */
    margin-bottom: 10px;
    border-radius: 10px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    height: 55%;
}

#login input:focus{
  border: 1px solid #213E51;
  box-shadow: none;
}

#login .label {
    font-size: 18px;
    font-weight: 400;
    margin-top: 12px;
    text-align: left;
    font-family: Kanit, sans-serif;
}

#login button {
  background-color: #3b5f77;
  border-radius: 20px;
  padding-right: 15px;
  padding-left: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 18px;
  margin-top: 10px;
  border: none;
}

#login button:hover{
  background-color: #213E51;
}

#login h3 {
  font-size: 30px;
  margin-top: 30px;
  margin-bottom: -2px;
}

</style>
