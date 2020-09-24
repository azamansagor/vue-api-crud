<template>
  <div>
    <h1>{{ msg }}</h1>
    <h3 v-if="loading">Loading</h3>
    <table class="table table-bordered">
      <thead>
        <tr
            v-bind:key="header.index"
            v-for="header in headers"
        >
          <th
              v-bind:key="column.index"
              v-for="(column , key) in header"
              @click="column.sortable ? sort(key): null "
          >
            {{ column.title }}

            <span v-if="column.sortable">
              <img v-if="(key===currentSort && currentSortDir == 'asc')" src="../assets/images/up.svg" height="16px">
              <img v-else src="../assets/images/down.svg" height="16px">
            </span>
          </th>
        </tr>
      </thead>

      <draggable
          :list="rows"
          tag="tbody"
          ghost-class="ghost"
          @change="afterDrag"
      >
        <tr
            :key="row.index"
            v-for="row in sortedRows"
            class="table-row"
        >
          <td
              :key="single.index"
              v-for="single in result(row)"
          >
            {{ single }}
          </td>
        </tr>
      </draggable>

      <!--
      <tr v-bind:key="row.index" v-for="row in rows">
        <td v-bind:key="single.index" v-for="single in result(row) ">{{ single }}</td>
      </tr>
      -->
    </table>

  </div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  name: 'Index',
  props: {
    msg: String
  },
  components: {
    draggable
  },
  data(){
    return{
      headers: [{}],
      rows: [{}],
      loading: true,

      //sorting
      currentSort: 'id',
      currentSortDir: 'asc'
    }
  },
  methods: {
    //sort data by column key
    sort(key){
      if(key === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
      }
      this.currentSort = key;
    },

    //send data to server after drag
    afterDrag(){
      axios.post(
          `${this.$API_URL}/reorder.php`,
          { headers: this.headers, rows: this.rows},
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
          })
          .then( response =>  {
            console.log(response);
          }).catch(error => {
            console.log(error)
          }
      );
    },

    //match data with column
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

    //get data list from api
    getList(){
      axios.get(`${this.$API_URL}/list.php`)
          .then( response =>  {
            this.headers = response.data.data.headers;
            this.rows = response.data.data.rows;
            this.loading = false;
          }).catch(error => {
            console.log(error)
          }
      );
    }
  },

  created() {
    this.rows = [{}];
    this.headers = [{}];
    this.getList();
  },
  computed: {
    sortedRows:function() {
      return this.rows.sort((a,b) => {
        let modifier = 1;
        if(this.currentSortDir === 'desc') modifier = -1;
        if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table-row:hover{
  background: #e4e4e4;
  cursor: move;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
