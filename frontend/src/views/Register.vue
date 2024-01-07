<template>
    <div id="register">
        <h2>Create account</h2>
        <b-form @submit.prevent="onSubmit">
        <b-form-group label="Email address:" label-for="email">
            <b-form-input id="email" v-model="form.email" type="email" placeholder="Enter email" required></b-form-input>
        </b-form-group>
        <b-form-group label="User Name:" label-for="username">
            <b-form-input id="username" v-model="form.username" placeholder="Enter name" required></b-form-input>
        </b-form-group>
        <b-form-group label="Password:" label-for="password">
            <b-form-input id="password" v-model="form.password" type="password" required></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Register</b-button>
        </b-form>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Register',

  components: {

  },

  data () {
    return {
      form: {
        email: '',
        username: '',
        password: ''
      }
    }
  },

  methods: {
    ...mapActions([
      'register'
    ]),
    async onSubmit (e) {
      e.preventDefault()
      try {
        await this.register(this.form)
        // this.$router.push({ name: 'Pocetna' })
      } catch (error) {
        console.error('Registration failed:', error)
      }
    }
  }
}
</script>

<style scoped>
</style>
