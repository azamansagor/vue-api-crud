<template>
  <div class="add">
    <h1>This is a add page</h1>
    <ReusableForm
      :schema="schema"
      v-model="formData"
      :fields = "fields"
    ></ReusableForm>
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
        firstName: "Evan"
      },
      schema: [
        {
          type: "select",
          name: "title",
          multi: false,
          label: "Title",
          options: ["", "Mr", "Ms", "Mx", "Dr", "Madam", "Lord"]
        },
        {
          type: "text",
          placeholder: "First Name",
          label: "First Name",
          name: "firstName"
        },
        {
          type: "number",
          placeholder: "Age",
          name: "age",
          label: "Age",
          minValue: 0
        }
      ],
      fields: []
    };
  },
  methods: {
    getFormData(){
      axios.get(`${this.$API_URL}/get_form.php`)
          .then( response =>  {
            this.fields = response.data.data.fields[0];
          }).catch(error => {
            console.log(error)
          }
      );
    }
  },
  created(){
    this.getFormData()
  }
};
</script>

