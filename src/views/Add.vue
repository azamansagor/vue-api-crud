<template>
  <div class="w-100 mt-3">
    <div class="col-md-8 m-auto">
      <div class="card">
        <div class="card-header">
          Add Data
        </div>
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
import Form from "@/components/form/ReusableForm";
import ReusableForm from "@/components/form/ReusableForm";

export default {
  name: "Add",
  components: {ReusableForm, Form },
  data() {
    return {
      formData: {
      },
      fields: [],
      messages: []
    };
  },
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
          }).catch(error => {
            console.log(error);
            this.messages = error.data.messages;
          }
      );
    }
  },
  created(){
    this.getFormData()
  }
};
</script>

