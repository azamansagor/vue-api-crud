<template>
  <div>
    <Preloader v-if="loading"></Preloader>
    <h1>{{ msg }}</h1>

    <!-- Search input field -->
    <input type="text" class="form-control mb-2" v-model="searchText" placeholder="Search Here">

    <!-- List Table -->
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
            {{ column.title }}
            <!-- show sortable icon if allowed -->
            <span v-if="column.sortable">
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
          <!-- Edit column -->
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
import Preloader from "@/components/Preloader";

export default {
  name: 'Index',
  props: {
    msg: String
  },
  components: {
    Preloader,
    draggable
  },
  data(){
    return{
      //preloader
      loading: true,

      //api data
      headers: [],
      rows: [],

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
            // header column based row column show
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
            // Alert status
            this.$swal.fire({
              position: 'top-end',
              icon: response.data.status == 'success' ? 'success' : 'error',
              title: response.data.status == 'success' ? 'Data Order Successful' : 'Something Went Wrong. Drag Again',
              showConfirmButton: false,
              timer: 1500,
              toast: true
            });
          }).catch(error => {
            // Alert status
            this.$swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Something went wrong. Drag again',
              showConfirmButton: false,
              timer: 1500,
              toast: true
            });
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
    // filter row based on search box text
    filteredRows: function(){
      let filteredRowData = [];
      if(this.searchText == ""){
        filteredRowData = this.rows;
      }else{
        this.rows.map( (row)=> {
          Object.keys(row).map( (key) => {
            this.headers.map( (header) => {
              Object.keys(header).map( (single) => {
                if(key===single && header[single].searchable){
                  if(
                      row[key].toString().toLowerCase().match(this.searchText.toLowerCase().toLowerCase()) &&
                      row[key].toString().toLowerCase().startsWith(this.searchText.toLowerCase().toLowerCase())
                  ){
                    filteredRowData.push(row);
                  }
                }
              });
            });
          });
        });
      }

      return filteredRowData;
    }
  }
}
</script>

<!-- CSS for table hover and placeholder design -->
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
