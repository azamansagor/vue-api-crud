<template>
  <div>
    <h6>
      <label :for="name">{{title}}</label>
    </h6>

    <ValidationProvider :rules="validate" v-slot="{ errors }">
      <textarea type="text"
             :id="name"
             class="form-control"
             :placeholder="title"
             :required="required"
             :name="name"
             v-model="inputValue"
             @input="$emit('input',inputValue)"
             v-bind="html_attr"
      ></textarea>
      <small v-for="error in errors" class="form-text text-danger"> {{ errors[0] }} </small>
    </ValidationProvider>
  </div>
</template>
<script>

export default {
  name: 'TextareaField',
  data(){
    return {
      inputValue : this.value
    }
  },
  props: [
    'name', 'title', 'type', 'required', 'value', 'validate', 'html_attr'
  ],
}
</script>