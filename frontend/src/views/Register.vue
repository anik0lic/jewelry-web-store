<template>
  <div id="register-page">
    <div id="register">
        <h2>Napravite nalog</h2>
        <b-form @submit.prevent="onSubmit">
        <b-form-group label="Email adresa:" label-for="email" class="label">
            <b-form-input id="email" v-model="form.email" type="email" required></b-form-input>
        </b-form-group>
        <b-form-group label="Username:" label-for="username" class="label">
            <b-form-input id="username" v-model="form.username" required></b-form-input>
        </b-form-group>
        <b-form-group label="Password:" label-for="password" class="label">
            <b-form-input id="password" v-model="form.password" type="password" required></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Napravi</b-button>
        </b-form>
    </div>
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
        await this.register(this.form).then(res => {
          if (this.$store.getters.user_id) {
            this.$router.push({ name: 'Proizvodi' })
          }
        })
      } catch (error) {
        console.error('Registration failed:', error)
      }
    }
  }
}
</script>

<style scoped>
#register-page {
  height: 69vh;
}

#register {
  margin-left: auto;
  margin-right: auto;
  margin-top: 80px;
  width: 30%;
  height: 530px;
  padding: 20px;
  padding-top: 60px;
  border-radius: 20px;
  background-color: white;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  text-align: center;
  font-family: Nunito, sans-serif;
}

#register form {
  width: 70%;
  margin-left: auto;
  margin-right: auto;
}

#register h2 {
  font-size: 40px;
  margin-bottom: 20px;
}

#register input {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  border-radius: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  height: 55%;
}

#register input:focus{
  border: 1px solid #213E51;
  box-shadow: none;
}

#register .label {
  font-size: 18px;
  font-weight: 400;
  margin-top: 12px;
  text-align: left;
  font-family: Kanit, sans-serif;
}

#register button {
  background-color: #3b5f77;
  border-radius: 20px;
  padding-right: 15px;
  padding-left: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 18px;
  margin-top: 15px;
  border: none;
}

#register button:hover{
  background-color: #213E51;
}

</style>
