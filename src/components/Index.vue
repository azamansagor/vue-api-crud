<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <template v-for="data in datas">
      <div v-for="(info, key) in data">
        {{ key}} ====== {{ info }} <br>
      </div>
    </template>

  </div>
</template>

<script>
export default {
  name: 'Index',
  props: {
    msg: String
  },
  data(){
    return{
      datas: {}
    }
  },
  mounted() {
    axios.get(`${this.$API_URL}/get_form.php`)
      .then( response =>  {
        this.datas = response.data.data.fields;
      }).catch(error => {
        console.log(error)
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
