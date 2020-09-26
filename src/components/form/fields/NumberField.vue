<template>
  <div class="form-group">
    <label :for="name">{{title}}</label>

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
      <span v-for="error in errors">{{ errors[0] }}</span>
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