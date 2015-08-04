## jQuery.tagsinput.js
A jQuery plugin for tags input

## Usage
html
``` html
<input type="text" id="tag-input">
```
javascript
``` javascript
$('#tag-input').tagsinput(options);
```

##Options
* tagKeys:  

A string array can contains "enter", "tab", "space";default:['enter', 'tab', 'space']

* keyDeletion:  

Boolean type that means if can delete last tag by typing "backspace" key;default:false

* separator:  
Tags separator;default:','