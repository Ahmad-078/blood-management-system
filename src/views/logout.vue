<template>
  <div class="container-fluid m-4 p-4 bg-dark text-white">
  <h4 class="d-flex justify-content-center m-4 p-4">Logging Out...</h4>
  </div>
</template>

<script>
export default {
mounted(){
    setTimeout(() => {
        this.$router.push({path:'/login'})
    }, 1500);
}
}
</script>

<style>

</style>