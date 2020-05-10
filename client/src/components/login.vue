<template>
  <div class="formBorder">
    <form class="formBorder1" @submit.prevent="logging">
      <div class="form-group">
        <h1 class="loginTitle">Login</h1>
        <p class="invalid">{{ errMessage }}</p>
        <label for="exampleInputEmail1">Email</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          v-model="email"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1" v-model="password" />
      </div>
      <button type="submit" class="btn btn-primary submit">Submit</button>
      <p>Or</p>
    </form>
    <google></google>
  </div>
</template>

<script>
import axios from "axios";
import google from "./googleSignIn";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      errMessage: ""
    };
  },
  methods: {
    logging() {
      axios
        .post("http://localhost:3000/login", {
          email: this.email,
          password: this.password
        })
        .then(res => {
          localStorage.setItem("access_token", res.data.access_token);
          this.$parent.loggedIn = true;
          this.$parent.getData();
        })
        .catch(err => {
          this.errMessage = err.response.data.message;
        });
    }
  },
  components: {
    google
  }
};
</script>

<style scoped>
.formBorder {
  padding: 1rem;
  border: #00f solid 3px;
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(to top right, #00c3ff, #ffff1c);
  font-family: 'Nunito', sans-serif;
}
.formBorder1 {
  padding: 0rem;
  display: flex;
  flex-direction: column;
}
.formBorder p {
  text-align: center;
}

.btn{
    justify-content: center;
    align-items: center;
}

.form-group {
  padding: 1rem;
}

.loginTitle {
  text-align: center;
}

.submit {
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  margin-top: 0rem;
}

.invalid {
  text-align: center;
  background-color: red;
  font-weight: bold;
}
</style>