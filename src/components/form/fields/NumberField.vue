<template>
  <div class="form-group">
    <h6>
      <label :for="name">{{title}}</label>
    </h6>

    <ValidationProvider :rules="validate" v-slot="{ errors }">
      <input type="number"
             :id="name"
             class="form-control"
             :placeholder="title"
             :required="required"
             :name="name"
             v-model="inputValue"
             @input="$emit('input',inputValue)"
             v-bind="html_attr"
      >
      <small v-for="error in errors" class="form-text text-danger"> {{ errors[0] }} </small>
    </ValidationProvider>
  </div>
</template>

<script>

export default {
  name: 'NumberField',
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