<template>
  <div>
    <h6>
      <label :for="name">{{title}}</label>
    </h6>

    <ValidationProvider :rules="validate" v-slot="{ errors }">
      <template v-for="option in options">

        <div class="form-check" :id="name">
          <input
              class="form-check-input"
              type="checkbox"
              :id="option.key"
              :placeholder="title"
              :required="required"
              :name="name"
              v-model="inputValue"
              @change="$emit('input',inputValue)"
              v-bind="html_attr"
              :value="option.key"
              :checked="option.key === inputValue"
          >

          <label class="form-check-label" :for="option.key">
            {{ option.label }}
          </label>
        </div>
      </template>
      <small v-for="error in errors" class="form-text text-danger"> {{ errors[0] }} </small>
    </ValidationProvider>

  </div>
</template>

<script>

export default {
  name: 'CheckboxField',
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