<template>
  <div class="video">
    <p class="title">{{ watchTitle }}</p>
    <video width="800" controls>
      <source src type="video/mp4" />
      <source src type="video/ogg" />Your browser does not support HTML video.
    </video>
    <p>(No need to wait this is fake)</p>
  </div>
</template>

<script>
export default {
  props: ["watchTitle"]
};
</script>

<style scoped>
.video {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0px;
}

.video p {
  font-family: "Luckiest Guy", cursive;
  color: khaki;
  text-shadow: 0 0 7px #ff0000, 0 0 9px #0000ff, 0 0 5px #00ff00;
}

.title {
  font-size: 30px;
}
</style>