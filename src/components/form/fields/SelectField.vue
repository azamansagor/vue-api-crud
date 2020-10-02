<template>
  <div>
    <h6>
      <label :for="name">{{title}}</label>
    </h6>

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
      <small v-for="error in errors" class="form-text text-danger"> {{ errors[0] }} </small>
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
  mounted() {
    this.$emit('input', this.value);
  }
}
</script>