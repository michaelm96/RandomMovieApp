<template>
    <div class="card body" style="width: 22rem;">
      <img
        :src="'https://image.tmdb.org/t/p/original/'+ favorite.imageUrl"
        class="card-img-top"
        :alt="favorite.title"
      />
      <div class="card-body">
        <h5 class="card-title text title">{{ favorite.title }}</h5>
        <p class="card-text text">{{ favorite.description }}</p>
      </div>
      <div class="date">
        <p>
          <strong>Released date</strong>
        </p>
        <p>{{ favorite.released_date }}</p>
      </div>
      <div class="button">
        <a href="#" class="btn btn-success watch" @click.prevent="watchNow(favorite.title)">Watch Now</a>
        <a href="#" class="btn btn-primary havent" v-if="favorite.status === 'have'" @click.prevent="moveTo('haven\'t')">Haven't watch</a>
        <a href="#" class="btn btn-primary have" v-if="favorite.status !== 'have'" @click.prevent="moveTo('have')">Have watch</a>
        <a href="#" class="btn btn-danger delete" @click.prevent="deleteMovie(favorite.id)">Delete</a>
      </div>
      <watch v-if="watchClicked" @chosen="status = $event, addToFavorite()"></watch>
    </div>
</template>

<script>
import axios from "axios"

export default {
  name: "favoriteCard",
  props: ["favorite"],
  data() {
    return {
      watchClicked: false,
      added: true,
      title: this.favorite.title,
      movieId: this.favorite.movieId,
      imageUrl: this.favorite.imageUrl,
      description: this.favorite.description,
      status: ""
    };
  },
  methods: {
      moveTo(value){
          const access_token = localStorage.getItem("access_token");
          axios({
              method : "PUT",
              url: `http://localhost:3000/favorite/${this.favorite.id}`,
              headers:{
                  access_token
              },
              data:{
                  status : value
              }
          })
          .then(data =>{
              this.$parent.getFavorite()
          })
          .catch(err =>{
              console.log(err)
          })
      },
      deleteMovie(id){
          const access_token = localStorage.getItem("access_token");
          axios({
              method : "DELETE",
              url: `http://localhost:3000/favorite/${id}`,
              headers:{
                  access_token
              }
          })
          .then(data =>{
              this.$parent.getFavorite()
          })
          .catch(err =>{
              console.log(err)
          })
      },
      watchNow(title){
        this.$emit("watchNow", true)
        this.$emit("title", title)
    }
  }
};
</script>

<style scoped>

.body{
    background-image: linear-gradient(to top right, #00c3ff, #ffff1c);
}

.text, .button{
    font-family: 'Nunito', sans-serif;
}

.title{
    font-weight: bold;
    color: khaki;
    text-shadow: 0 0 7px #FF0000, 0 0 9px #0000FF, 0 0 5px #00ff00;
}

.card {
  margin: 0 2rem;
  justify-content: space-evenly;
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