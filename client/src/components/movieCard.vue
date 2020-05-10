<template>
  <div class="card body" style="width: 18rem;">
    <img
      :src="'https://image.tmdb.org/t/p/original/'+ movie.poster_path"
      class="card-img-top"
      :alt="movie.title"
    />
    <div class="card-body">
      <h5 class="card-title text title">{{ movie.title }}</h5>
      <p class="card-text text">{{ movie.overview }}</p>
    </div>
    <div class="date">
      <p>
        <strong>Released date</strong>
      </p>
      <p>{{ movie.release_date }}</p>
    </div>
    <div class="button">
      <a href="#" v-if="added" class="btn btn-primary favorite" @click.prevent="watchButton">Add to Favorite</a>
      <a href="#" class="btn btn-primary watch" @click.prevent="watchNow(movie.title)">Watch Now</a>
    </div>
    <watch v-if="watchClicked" @chosen="status = $event, addToFavorite(movie.title,movie.id,movie.poster_path,movie.overview,movie.release_date)"></watch>
  </div>
</template>

<script>
import axios from "axios"
import watch from "./watch";

export default {
  name: "movieCard",
  props: ["movie"],
  data() {
    return {
      watchClicked: false,
      added:true,
      title: this.movie.title,
      movieId: this.movie.id,
      imageUrl: this.movie.poster_path,
      description: this.movie.overview,
      released_date: this.movie.release_date,
      status:""
    };
  },
  methods: {
    watchButton() {
      this.watchClicked = !this.watchClicked;
    },

    addToFavorite(title,movieId,imageUrl,description,released_date){
        const access_token = localStorage.getItem("access_token")
        axios({
            method:"POST",
            url: `http://localhost:3000/favorite`,
            headers:{
                access_token
            },
            data:{
                title,
                movieId,
                imageUrl,
                description,
                released_date,
                status: this.status
            }
        })
        .then(res => {
            this.watchButton()
            this.added = false
        })
        .catch(err =>{
            console.log(err)
        })
    },
    watchNow(title){
        this.$emit("watchNow", true)
        this.$emit("title", title)
    }
  },
  components: {
    watch
  }
};
</script>

<style scoped>
.body{
    background-image: linear-gradient(to top right, #00c3ff, #ffff1c);
}

.card {
  margin: 2rem 3rem;
  justify-content: space-evenly;
}

.text, .button{
    font-family: 'Nunito', sans-serif;
}

.title{
    font-weight: bold;
    color: khaki;
    text-shadow: 0 0 7px #FF0000, 0 0 9px #0000FF, 0 0 5px #00ff00;
}

.button {
  display: flex;
  justify-content: space-between;
  margin: 1rem;
}

.favorite {
  background-color: red;
  border: none;
}

.date {
  margin-left: 1rem;
}
.watch {
  background-color: greenyellow;
  border: none;
}
</style>