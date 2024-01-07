<template>
    <div id="login">
        <h2>Log In</h2>
        <b-form @submit="onSubmit">
        <b-form-group label="User Name:" label-for="username">
            <b-form-input id="username" v-model="form.username" placeholder="Enter name" required></b-form-input>
        </b-form-group>
        <b-form-group label="Password:" label-for="password">
            <b-form-input id="password" v-model="form.password" type="password" required></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Uloguj se</b-button>
        </b-form>
        <h3>Nemate Nalog?</h3>
        <router-link to="/register"><b-button type="submit" variant="primary">Napravi Nalog</b-button></router-link>
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
          console.log(res)
        })
        // this.$router.push({ name: 'Pocetna' })
      } catch (error) {
        console.error('Login failed:', error)
      }
    }
    // onSubmit (e) {
    //   e.preventDefault()
    //   this.login(this.form)
    //   this.$router.push({ name: 'Pocetna' })
    // }
  }
}
</script>

<style scoped>
</style>
