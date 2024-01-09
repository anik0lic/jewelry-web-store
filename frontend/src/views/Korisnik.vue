<template>
  <div id="korisnik-page">
    <div id="korisnik">
        <img src="@/assets/profile-picture.png" alt="profile picture">
        <div class="podaci">
            <h3>Username: <b>{{ user.username }}</b></h3>
            <h3>Email: <b>{{ user.email }}</b></h3>
        </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
      'user'
    ])
  },
  methods: {
    ...mapActions([
      'getUser'
    ])
  },
  mounted () {
    this.getUser(this.$store.getters.user_id)
  }
}
</script>

<style scoped>
#korisnik-page {
  height: 69vh;
  /* margin-top: 15px; */
}

#korisnik {
  margin-left: auto;
  margin-right: auto;
  margin-top: 80px;
  width: 40%;
  height: 430px;
  padding: 20px;
  padding-top: 70px;
  border-radius: 20px;
  background-color: white;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  text-align: center;
  font-family: Nunito, sans-serif;
}

img {
  width: 25%;
}

.podaci {
  margin-top: 30px;
}

.podaci h3 {
    font-size: 30px;
}

</style>
