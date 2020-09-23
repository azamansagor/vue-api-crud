<template>
  <div>
    <h1>{{ msg }}</h1>
    <h3 v-if="loading">Loading</h3>
    <table>
      <tr v-bind:key="header.index" v-for="header in headers">
        <th v-bind:key="column.index" v-for="column in header">{{ column.title }}</th>
      </tr>
      <tr v-bind:key="row.index" v-for="row in rows">
        <td v-bind:key="single.index" v-for="single in result(row) ">{{ single }}</td>
      </tr>
    </table>

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
      headers: {},
      rows: {},
      loading: true
    }
  },
  methods: {
    result(row) {
      let newRow = {};
      let rowKeys = Object.keys(row);
      let headerKeys = Object.keys(this.headers[0]);

      headerKeys.forEach(header => {
        rowKeys.forEach(singleRow => {
          if (row.hasOwnProperty(header)) {
            if (header === singleRow) {
              newRow[header] = row[singleRow];
            }
          } else {
            newRow[header] = "";
          }
        });
      });
      return newRow;
    },
    getList(){
      axios.get(`${this.$API_URL}/list.php`)
          .then( response =>  {
            this.headers = response.data.data.headers;
            this.rows = response.data.data.rows;

            setTimeout( () => {
              this.loading = false;
            }, 5000)
          }).catch(error => {
            console.log(error)
          }
      );
    }
  },

  created() {
    this.rows = "";
    this.headers = "";
    this.getList();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}
th, td{
  height: 50px;
  text-align: center;
}
th, td{
  padding: 15px;
}
th, td {
  border: 1px solid #ddd;
}
</style>
