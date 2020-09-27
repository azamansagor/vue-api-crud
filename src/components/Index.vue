<template>
  <div>
    <h1>{{ msg }}</h1>
    <h3 v-if="loading">Loading</h3>

    <input type="text" class="form-control mb-2" v-model="searchText" placeholder="Search Here">
    <table class="table table-bordered">
      <thead>
        <tr
            :key="header.index"
            v-for="header in headers"
        >
          <th>Action</th>
          <th
              :key="column.index"
              v-for="(column , key) in header"
              @click="column.sortable ? sort(key): null "
          >
            {{ column.title }} - {{ column.hidden}}
            <!-- show sortable icon if allowed -->
            <span>
              <!-- conditional sort up/down icons -->
              <img v-if="(key===currentSort && currentSortDir == 'asc')" src="../assets/images/up.svg" height="15px">
              <img v-else src="../assets/images/down.svg" height="15px">
            </span>
          </th>
        </tr>
      </thead>

      <!-- table rows -->
      <draggable
          :list="filteredRows"
          tag="tbody"
          ghost-class="ghost"
          @change="afterDrag"
      >
        <tr
            :key="row.index"
            v-for="row in filteredRows"
            class="table-row"
        >
          <th>
            <router-link :to="{ name: 'update', params: {id: row.id } }" class="btn btn-primary btn-sm">Edit</router-link>
          </th>
          <td
              :key="single.index"
              v-for="single in formattedRows(row)"
          >
            {{ single }}
          </td>
        </tr>
      </draggable>
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
      //preloader
      loading: true,

      //api data
      headers: [],
      rows: [],
      formattedHeaders: [],

      //sorting properties
      currentSort: 'id',
      currentSortDir: 'asc',

      //search variables
      searchText : ''
    }
  },
  methods: {
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
    },

    //match data with column key
    formattedRows(row) {
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

    //sort data by column key
    sort(key){
      if(key === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
      }
      this.currentSort = key;

      this.filteredRows.sort((a,b) => {
        let modifier = 1;
        if(this.currentSortDir === 'desc') modifier = -1;
        if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      });
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
  },

  created() {
    this.rows = [];
    this.headers = [];
    this.getList();
  },
  computed:{
    filteredRows: function(){
      let filteredRowData = [];
      if(this.searchText == ""){
        filteredRowData = this.rows;
      }else{
        this.rows.map( (row)=> {
          Object.keys(row).map( (key) => {
            this.headers.map( (header) => {
              Object.keys(header).map( (single) => {
                // console.log(single);
                // console.log(header[single].searchable);
                if(key===single && header[single].searchable){
                  // console.log(row[key]);
                  if(row[key].toString().toLowerCase().match(this.searchText.toLowerCase().toLowerCase())){
                    filteredRowData.push(row);
                  }
                }
              });
            });
            // console.log(key);
            // if(key.toString().toLowerCase().match(this.searchText.toLowerCase().toLowerCase())){
            //   filteredRowData.push(row);
            // }

          });
        });

      }

      return filteredRowData;
      // return this.rows.filter( (row) => {
      //   if(this.searchText == ""){
      //     return row;
      //   }else{
      //     // return  Object.values(row).filter( (single ) => {
      //     //   console.log(single);
      //     //   return single.toString().toLowerCase().match(this.searchText.toString().toLowerCase());
      //     // } );
      //     Object.keys(row).filter( (key) => {
      //       // console.log(key);
      //       console.log(row);
      //       return row[key].toString().toLowerCase().match(this.searchText.toLowerCase().toLowerCase());
      //     });
      //
      //     // return row.name.toLowerCase().match(this.searchText.toLowerCase());
      //   }
      //
      // });
    }
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
