<template>
  <div>
    <label>{{label}}</label>

    <input type="email"
           :name="name"
           :value="value"
           @input="$emit('input',$event.target.value)"
           :placeholder="placeholder
           ">

  </div>
</template>
<script>
export default {
  name: 'EmailField',
  props: ['placeholder', 'label', 'name', 'value']
}
</script>