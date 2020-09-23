<template>
  <div>
    <label>{{label}}</label>
    <textarea
      :name="name"
      :value="value"
      @input="$emit('input',
      $event.target.value)"
      :placeholder="placeholder">
    </textarea>
  </div>
</template>
<script>
export default {
  name: 'TextareaField',
  props: ['placeholder', 'label', 'name', 'value']
}
</script>