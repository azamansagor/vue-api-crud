<template>
  <div class="w-100 mt-3">
    <div class="col-md-8 m-auto">
      <div class="card">
        <div class="card-header"> Update Data </div>

        <form @submit.prevent="submitForm">
          <div class="card-body">
            <div v-for="message in messages" class="alert alert-warning alert-dismissible fade show" role="alert">
              {{ message }}
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <ReusableForm
                v-model="formData"
                :fields="fields"
            ></ReusableForm>
          </div>
          <div class="card-footer text-center">
            <button type="submit" class="btn btn-primary btn-lg mt-2" >Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import ReusableForm from "@/components/form/ReusableForm";
import Preloader from "@/components/Preloader";

export default {
  name: "Update",
  components: {Preloader, ReusableForm },
  data() {
    return {
      formData: {}, //form submission data list
      fields: [], //form fields from API call
      messages: [], //Error Messages
      loading: false, //loading status
    };
  },
  props: ['id'],
  methods: {
    getFormData(){
      axios.get(`${this.$API_URL}/get_form.php`)
          .then( response =>  {
            this.fields = response.data.data.fields[0];
          }).catch(error => {
            this.messages = ["Something went wrong. Try again"]
          }
      );
    },
    //submit form data to the server
    submitForm(){
      axios.post(
          `${this.$API_URL}/submit_form.php`,
          { formData: this.formData},
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
          })
          .then( response =>  {
            // Show errors on the top of the form
            this.messages = response.data.messages;

            // Alert status
            this.$swal.fire({
              position: 'top-end',
              icon: response.data.status == 'success' ? 'success' : 'error',
              title: response.data.status == 'success' ? 'Data added Successfully' : 'Something went wrong. Kindly submit again',
              showConfirmButton: false,
              timer: 1500,
              toast: true
            });

            //Submit button spinner loading status
            setTimeout(()=> {
              this.loading = false;
            }, 1000)

          }).catch(error => {
            this.messages = error.data.messages;

            // Alert status
            this.$swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Something went wrong. Kindly submit again',
              showConfirmButton: false,
              timer: 1500,
              toast: true
            });
          }
      );
    }
  },
  created(){
    this.getFormData()
  }
};
</script>


