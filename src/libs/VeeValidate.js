import Vue from 'vue';
import { ValidationProvider, extend } from 'vee-validate';
import { email, max , min , alpha_spaces , integer , alpha_num } from 'vee-validate/dist/rules';


Vue.component('ValidationProvider', ValidationProvider);

extend('max', {
    ...max,
    message: 'This field must be {_number_} characters long'
});

extend('min', {
    ...min,
    message: 'This field must be {_number_} characters long'
});

extend('email', {
    ...email,
    message: 'Invalid Email.'
});

extend('only_letters', {
    ...alpha_spaces,
    message: 'Only letters are allowed'
});

extend('integer', {
    ...integer,
    message: 'Only numbers are allowed'
});

extend('only_letter_number', {
    ...alpha_num,
    message: 'Only letters and numbers are allowed'
});