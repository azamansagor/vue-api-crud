# vue-api-crud

## Project setup
Install required packages
```
npm install
```
Set API base URL in main.js file
```
//api base path
Vue.prototype.$API_URL = "http://localhost/api";
```

### Run Server
```
npm run serve
```


### Response Type
* Add form response status should be "success" , "error"


### API Form Input Values Example
Checkbox 
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