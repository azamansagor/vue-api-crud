<template>
  <div>
    <label :for="name">{{title}}</label>

    <ValidationProvider :rules="validate" v-slot="{ errors }">
      <select
          :id="name"
          class="form-control"
          :placeholder="title"
          :required="required"
          :name="name"
          v-model="inputValue"
          @change="$emit('input',inputValue)"
          v-bind="html_attr"
          >
        <template v-for="option in options" >
          <option v-bind:value="option.key" v-bind:selected="option.key == inputValue">{{ option.label }}</option>
        </template>
      </select>
      <span v-for="error in errors">{{ errors[0] }}</span>
    </ValidationProvider>

  </div>
</template>

<script>

export default {
  name: 'SelectField',
  data(){
    return {
      inputValue : this.default,
    }
  },
  props: [
    'name', 'title', 'type', 'required', 'value',
    'validate', 'html_attr', 'options', 'default'
  ],
}
</script>