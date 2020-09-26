<template>
  <div>
    <label :for="name">{{title}}</label>

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
      <span v-for="error in errors">{{ errors[0] }}</span>
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