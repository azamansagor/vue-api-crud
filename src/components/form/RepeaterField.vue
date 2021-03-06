<template>
  <div>
    <h6>
      <label :for="name">{{title}}</label>
    </h6>

    <div class="border border-gray p-4">
      <component v-for="(field, key, index) in new_repeater_fields"
                 :name="key"
                 :key="index"
                 :is="modifyType(field.type)"
                 @input="updateForm(key, $event)"
                 @remove="removeRow(key, $event)"
                 v-bind="field"
                 :repeater="true"
      >
      </component>
      <button @click.prevent="showModal = true" class="btn btn-secondary">Add New</button>
    </div>

    <!-- bootstrap modal for repeater field properties -->
    <transition name="modal" v-if="showModal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Add Repeater Field</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true" @click.prevent="showModal = false">&times;</span>
                </button>
              </div>
              <form @submit.prevent="addRow">
              <div class="modal-body">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="field_key">Field Key</label>
                        <input type="text" class="form-control" id="field_key" v-model="newFieldKey" placeholder="Only lower case text and underscore">
                        <small class="form-text text-muted">Example: title_text</small>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="title">Title</label>
                        <input type="text" class="form-control" id="title" v-model="newFields.title" placeholder="Field Title Text">
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="type">Input Type</label>
                        <select name="type" id="type" class="form-control" v-model="newFields.type">
                          <option value="" disabled>Select input type</option>
                          <template v-for="(inputType, key) in formInputTypes">
                            <option :value="key">{{  inputType }}</option>
                          </template>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="validate">Validation Rules</label><br>
                        <input type="text" class="form-control" id="validate" v-model="newFields.validate">
                        <small class="form-text text-muted">Separate rules with pipe | character e.g. only_letter_number|max:100</small>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="type">Required</label><br>
                        <div class="btn-group btn-group-toggle" data-toggle="buttons">
                          <label class="btn btn-secondary" :class="[newFields.required? 'active' : '']">
                            <span @click.prevent="newFields.required = true">Yes</span>
                          </label>
                          <label class="btn btn-secondary" :class="[ !newFields.required ? 'active' : '']">
                            <span @click.prevent="newFields.required = false">No</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click.prevent="showModal = false">Close</button>
                <input type="submit" class="btn btn-primary" value="Save changes">
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>
<script>
import FormFields from '@/components/form/fields';
import Vue from 'vue'

export default {
  name: 'RepeaterField',
  components: { ...FormFields },
  data(){
    return {
      showModal: false,
      newFieldKey: '',
      newFields: {
        title: '',
        type: '',
        required: false,
        validate: ''
      },
      new_repeater_fields: (typeof this.repeater_fields == "undefined") ? {} : this.repeater_fields,

      formData: this.inputValue || {},
      formInputTypes: {
        text: 'Text',
        number: 'Number',
        email: 'Email',
        textarea: 'Textarea',
      }
    }
  },
  props: [
    'name', 'title', 'type', 'required', 'validate', 'html_attr',
      'repeater_fields'
  ],
  methods: {
    updateForm(fieldName, value) {
      this.$set(this.formData, fieldName, value);
      this.$emit("input", this.formData);
    },
    //modify the form fields as 'text' to "TextField" as it's conflicting with html fild type
    modifyType(fieldType) {
      return fieldType.charAt(0).toUpperCase() + fieldType.slice(1).toLowerCase() + 'Field';
    },
    addRow(){
      let newObj = {};
      newObj[this.newFieldKey] = this.newFields;
      Object.assign(this.new_repeater_fields, newObj);
      this.newFieldKey =  '',
      this.newFields =  {
        title: '',
        type: '',
        required: false,
        validate: ''
      },
      this.showModal = false;
    },
    //remove a repeater field
    removeRow(value){
      if(this.new_repeater_fields.hasOwnProperty(value)){
        Vue.delete(this.new_repeater_fields, value)
      }
    }
  },

  mounted() {
    this.$emit('input', this.value);
  },


}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
</style>