<template>
  <nav class="navbar navbar-expand-sm fontStyle">
    <a class="navbar-brand" href @click.prevent="getHome()">Random Movie</a>
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
      <div class="inline" v-if="this.$parent.loggedIn">
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >Favorite</a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a
              class="dropdown-item dropdownMenu"
              href="#"
              @click.prevent="goToFavoriteHave('have')"
            >Have Watched</a>
            <a
              class="dropdown-item dropdownMenu"
              href="#"
              @click.prevent="goToFavoriteHave('haven\'t')"
            >Haven't watch</a>
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" @click.prevent="logout(true), signOut()">Logout</a>
        </li>
      </div>
    </ul>
    <form class="form-inline my-2 my-lg-0" v-if="this.$parent.loggedIn" @submit.prevent="searchMovie(), page=1">
      <input
        class="form-control mr-sm-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        v-model="search"
      />
      <button class="btn btn-outline-success ml-auto mr-auto" type="submit">Search</button>
    </form>
  </nav>
</template>

<script>
import axios from "axios";

export default {
  name: "navbar",
  data() {
    return {
      search: "",
      page: "1"
    };
  },
  methods: {
    goToFavoriteHave(value) {
      this.$emit("favorite", value);
    },
    getHome() {
      this.$parent.getNormal();
    },
    searchMovie() {
      const access_token = localStorage.getItem("access_token");
      this.$parent.watchNow = false
      axios
        .get(`http://localhost:3000/movie/${this.search}/${this.page}`)
        .then(data => {
          this.$parent.movieList = [];
          this.$parent.lastPageSearch = false;
          this.$parent.lastPage = true;
          for (let movie of data.data.results) {
            this.$parent.movieList.push(movie);
          }
          if (data.data.page === data.data.total_pages) {
            this.$emit("lastPageSearch", true);
          }
          return axios({
            method: "GET",
            url: `http://localhost:3000/favorite`,
            headers: {
              access_token
            }
          });
        })
        .then(data => {
          this.$parent.addedList = [];
          for (let movie of data.data) {
            this.$parent.addedList.push(movie);
          }
          let check = true;
          for (let i = 0; i < this.$parent.movieList.length; i++) {
            for (let j = 0; j < this.$parent.addedList.length; j++) {
              if (this.$parent.addedList[j].movieId === this.$parent.movieList[i].id) {
                check = false;
              }
            }
            if (check) {
              this.$parent.movieList[i]["status"] = "notYet";
            } else {
              this.$parent.movieList[i]["status"] = "done";
            }
            console.log(this.$parent.movieList[i].status)
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    logout(status) {
      if (status) {
        localStorage.removeItem("access_token");
        this.$parent.loggedIn = false;
      } else {
        this.$parent.loggedIn = true;
      }
    },
    signOut() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(()=> {
        console.log("User signed out.");
        this.$parent.loggedIn = false;
      });
    }
  }
};
</script>

<style scoped>
.inline{
  display: inline-flex;
}

.fontStyle {
  font-family: "Luckiest Guy", cursive;
  text-shadow: 2px 2px black;
  padding-bottom: 0px;
  margin-bottom: 0rem;
}
.dropdownMenu {
  color: #041e87;
  text-shadow: none;
}
</style>