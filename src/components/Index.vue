<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: {
    msg: String
  },
  mounted(){
    axios.get( this.$API_URL, {

    } )
    .then( response => {
      console.log(response);
    })
    .catch( error => {
      console.log(error);
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
