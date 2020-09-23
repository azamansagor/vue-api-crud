<template>
  <div>
    <component v-for="(field, index) in schema"
               :key="index"
               :is="modifyType(field.type)"
               :value="formData[field.name]"
               @input="updateForm(field.name, $event)"
               v-bind="field">
    </component>

    <h2>Fields</h2>
    <div v-for="field in fields">{{ field.type }}</div>
    <component v-for="(field, index) in fields"
               :key="index"
               :is="modifyType(field.type)"
               :value="formData[field.name]"
               @input="updateForm(field.name, $event)"
               v-bind="field">
    </component>
  </div>
</template>

<script>
import FormFields from '@/components/form/fields/index';

export default {
  name: "ReusableForm",
  components: { ...FormFields },
  props: ["schema", "value", "fields"],
  data() {
    return {
      formData: this.value || {}
    };
  },
  methods: {
    updateForm(fieldName, value) {
      this.$set(this.formData, fieldName, value);
      this.$emit("input", this.formData);
    },
    //modify the form fields as 'text' to "TextField" as it's conflicting with html fild type
    modifyType(fieldType){
      return fieldType.charAt(0).toUpperCase() + fieldType.slice(1) + 'Field';
    }
  }
};
</script>
