<template>
  <div class="form-group">
    <ValidationProvider :rules="validate" v-slot="{ errors }">
      <input type="hidden"
             :id="name"
             class="form-control"
             :placeholder="title"
             :required="required"
             :name="name"
             v-model="inputValue"
             @input="$emit('input',inputValue)"
             v-bind="html_attr"
      >
      <span v-for="error in errors">{{ errors[0] }}</span>
    </ValidationProvider>
  </div>
</template>

<script>

import { extend } from 'vee-validate';

extend('only_letters', (inputValue) => {
  return inputValue.match("^[a-zA-Z ]*$");
});

export default {
  name: 'HiddenField',
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