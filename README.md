# vue-api-crud

## Project setup
Install required packages
```
npm install
```
Set API base URL inside src/main.js file
```
//api base path
Vue.prototype.$API_URL = "http://localhost/api";
```

### Run Server
```
npm run serve
```
### Component Tree
```
App.vue
|__Home.vue
|  |__Index.vue
|__Add
|  |__src/components/form
|     |__ReusableForm.vue
|        |__ fields/index.js as FormFields
|        |__ RepeaterField.vue
|__Update
|  |__src/components/form
|     |__ReusableForm.vue
|        |__ fields/index.js as FormFields
|        |__ RepeaterField.vue
|__src/components/Preloader.vue as Preloader
```
### Notes
* Form response status should be "success" or "error"
* Search string matches from the starting of the string

### API Form Input Values Example
Checkbox with default values
```
"checkbox_example":  {
  "title": "Checkbox Title",
  "type": "checkbox",
  "required": true,
  "default": ["check1", "check2"],
  "options": [
    {
      "key": "check1",
      "label": "Check 1"
    },
    {
      "key": "check2",
      "label": "Check 2"
    },
    {
      "key": "check3",
      "label": "Check 3"
    }
  ],
  "html_attr": {
    "class": "cls0 cls2",
    "id": "the-id-2",
    "data-something": "anything, can be some json value too"
  }
}
```