<template>
  <div>
    <navbar
      class="navbar"
      @favorite="favoriteStatus = $event, getFavorite()"
      ref="childRef"
      @lastPageSearch="lastPageSearch = $event, lastPage = $event"
    ></navbar>
    <div class="container loginForm">
      <login v-if="!loggedIn"></login>
    </div>
    <div v-if="loggedIn">
      <div v-if="!favoritePage && !watchNow" class="cardRow">
        <movieCard
          v-for="(movie,index) in movieList"
          :key="index"
          :movie="movie"
          @title="watchTitle = $event"
          @watchNow="watchNow = $event, getData()"
        ></movieCard>
        <div v-if="!lastPageSearch" class="next" @click="nextPageSearch">
          <button class="btn btn-warning">
            Next
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>
        <div v-if="!lastPage" class="next" @click="nextPage">
          <button class="btn btn-warning">
            Next
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
      <div v-if="favoritePage && !watchNow" class="cardRow">
        <favorite v-for="(movie,index) in favoriteList" :key="index" :favorite="movie" @watchNow="watchNow = $event, getData()" @title="watchTitle = $event"></favorite>
      </div>
      <div v-if="watchNow">
        <watchMovie :watchTitle="watchTitle"></watchMovie>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import movieCard from "./components/movieCard";
import navbar from "./components/navbar";
import favorite from "./components/favorite";
import watchMovie from "./components/watchMovie";
import login from "./components/login";

export default {
  name: "App",
  data() {
    return {
      message: "Hello world",
      loggedIn: false,
      favoritePage: false,
      favoriteStatus: "",
      watchTitle: "",
      watchNow: false,
      lastPageSearch: true,
      lastPage: true,
      addedList: [],
      movieList: [],
      favoriteList: []
    };
  },
  components: {
    movieCard,
    navbar,
    favorite,
    watchMovie,
    login
  },
  methods: {
    getData() {
      const access_token = localStorage.getItem("access_token");
      axios
        .get("http://localhost:3000/movie/1/popular")
        .then(data => {
          this.movieList = [];
          this.favoritePage = false;
          this.lastPageSearch = true;
          this.lastPage = false;
          this.$refs.childRef.page = 1;
          for (let movie of data.data.results) {
            this.movieList.push(movie);
          }
          return axios({
            method: "GET",
            url: `http://localhost:3000/favorite`,
            headers: {
              access_token
            }
          }).then(data => {
            this.addedList = [];
            for (let movie of data.data) {
              this.addedList.push(movie);
            }
            let check = true;
            for (let movie of this.movieList) {
              for (let movieA of this.addedList) {
                if (movieA.movieId === movie.id) {
                  check = false;
                }
              }
              if (check) {
                movie["status"] = "notYet";
              } else {
                movie["status"] = "done";
              }
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    getFavorite() {
      const access_token = localStorage.getItem("access_token");
      axios({
        method: "GET",
        url: `http://localhost:3000/favorite/${this.favoriteStatus}`,
        headers: {
          access_token
        }
      })
        .then(data => {
          this.favoriteList = [];
          for (let movie of data.data) {
            this.favoriteList.push(movie);
          }
          this.favoritePage = true;
          this.watchNow = false;
        })
        .catch(err => {
          console.log(err.response.data);
        });
    },
    getNormal() {
      this.favoritePage = false;
      this.watchNow = false;
      this.getData();
    },
    nextPageSearch() {
      this.$refs.childRef.page++;
      this.$refs.childRef.searchMovie();
    },
    nextPage() {
      this.getData();
    }
  },
  created() {
    if (localStorage.getItem("access_token")) {
      this.loggedIn = true;
      this.getData();
    } else {
      this.loggedIn = false;
    }
  }
};
</script>

<style scoped>
.loginForm {
  max-width: 30%;
}

.next {
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.cardRow {
  display: grid;
  grid-gap: 3rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 2fr));
  margin-bottom: 3rem;
}

.navbar {
  padding: 1rem 2rem;
  margin-bottom: 3rem;
  background-color: #6b6b6b;
}
</style>