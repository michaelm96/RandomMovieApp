<template>
  <div class="arrow">
    <ul class="list">
      <input @click.prevent="have('haven\'t')" class="btn btn-primary category" type="button" value="Haven't watch yet">
      <br>
      <input @click.prevent="have('have')" class="btn btn-warning category" type="button" value="Have watched">
    </ul>
  </div>
</template>

<script>
export default {
    name:"watch",
    methods:{
        have(status){
            this.$emit('chosen', status)
        }
    }
}
</script>

<style scoped>
    .list{
        display: grid;
        color: red;
        padding: 0 1rem ;
        font-family: 'Nunito', sans-serif;
    }

    .category{
        justify-content: center;
    }
</style>