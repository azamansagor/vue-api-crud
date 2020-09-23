<template>
  <div>
    <label>{{label}}</label>
    <div v-for="option in options">
      <input type="radio"
             :value="option.label"
             :name="option.key"
             @input="$emit('input',
           $event.target.value)"
      >
      <label>{{ option.label }}</label>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RadioField',
  props: ['multi', 'options', 'name', 'label', 'value']
}
</script>