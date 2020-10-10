<template>
  <div>
      <component v-for="(field, key, index) in fields"
                 :key="index"
                 :is="modifyType(field.type)"
                 @input="updateForm(key, $event)"
                 v-bind="field"
                  :name="key">
      </component>
  </div>
</template>

<script>
import FormFields from '@/components/form/fields/index';
import RepeaterField from '@/components/form/RepeaterField';

export default {
  name: "ReusableForm",
  components: { ...FormFields, RepeaterField },
  props: ["fields"],
  data() {
    return {
      formData: this.inputValue || {}
    };
  },
  methods: {
    updateForm(fieldName, value) {
      this.$set(this.formData, fieldName, value);
      this.$emit("input", this.formData);
    },
    //modify the form fields as 'text' to "TextField" as it's conflicting with html field type
    modifyType(fieldType){
      return fieldType.charAt(0).toUpperCase() + fieldType.slice(1).toLowerCase() + 'Field';
    }
  }
};
</script>
