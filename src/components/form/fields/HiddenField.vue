<template>
  <div>
    <label>{{label}}</label>
    <input type="hidden"
           :name="name"
           :value="value"
           @input="$emit('input',
           $event.target.value)"
           :placeholder="placeholder">
  </div>
</template>
<script>
export default {
  name: 'HiddenField',
  props: ['placeholder', 'label', 'name', 'value']
}
</script>