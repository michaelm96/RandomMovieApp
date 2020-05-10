<template>
  <button v-google-signin-button="clientId" class="google-signin-button">Sign with Google</button>
</template>

<script>
import GoogleSignInButton from "vue-google-signin-button-directive";
import axios from "axios";

export default {
  directives: {
    GoogleSignInButton
  },
  data: () => ({
    clientId:
      "490763043990-f3ivj2ipognikej300evi95pccm31lu1.apps.googleusercontent.com"
  }),
  methods: {
    OnGoogleAuthSuccess(idToken) {
      // Receive the idToken and make your magic with the backend
      axios({
        method: 'POST',
        url: 'http://localhost:3000/googleLogin',
        data: { idToken }
      })
        .then(res => {
          localStorage.setItem("access_token", res.data.access_token);
          this.$parent.$parent.loggedIn = true;
          this.$parent.$parent.getData();
        })
        .catch(err => {
          console.log(err);
        });
    },
    OnGoogleAuthFail(error) {
      console.log(error);
    }
  }
};
</script>

<style>
.google-signin-button {
  color: white;
  background-color: red;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>