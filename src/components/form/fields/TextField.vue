<template>
  <div class="form-group">
    <h6>
      <label :for="name">{{title}}</label>
    </h6>

    <ValidationProvider :rules="validate" v-slot="{ errors }">
      <div class="input-group">
        <input type="text"
               :id="name"
               class="form-control"
               :placeholder="title"
               :required="required"
               :name="name"
               v-model="inputValue"
               @input="$emit('input',inputValue)"
               v-bind="html_attr"
        >
        <div class="input-group-prepend">
          <div class="input-group-text btn btn-danger"
               v-if="repeater" @click="$emit('remove', name)"
          >
            &times;
          </div>
        </div>

      </div>

      <small v-for="error in errors" class="form-text text-danger"> {{ errors[0] }} </small>
    </ValidationProvider>
  </div>
</template>

<script>

export default {
  name: 'TextField',
  data(){
    return {
      inputValue : this.value
    }
  },
  props: [
    'name', 'title', 'type', 'required', 'value', 'validate', 'html_attr', 'repeater'
  ],
  mounted() {
    this.$emit('input', this.value);
  }
}
</script>