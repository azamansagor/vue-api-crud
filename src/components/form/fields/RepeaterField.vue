<template>
  <div>
    <label>{{label}}</label>

    <input type="text"
           :name="name"
           :value="value"
           @input="$emit('input',$event.target.value)"
           :placeholder="placeholder
           ">

  </div>
</template>
<script>
import FormFields from '@/components/form/fields/index';

export default {
  name: 'TextField',
  components: { ...FormFields },
  props: ['placeholder', 'label', 'name', 'value']
}
</script>