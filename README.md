# vue2-model
Data modularization for javascript
## install
### npm install
```
npm i vue2-model
```

### Compiles and hot-reloads for development
```
npm run serve
```
## Model
### Column Define:
- **String**: "" || String
- **Number**: 0 || Number
- **Date**: Date
- **Array**: []
- **Object**: {}
### Default Parameter

```javascript
{
  // when use dispose data, remove empty array.
  removeEmptyArray: false,
  
  // when use parse data, remove null value.
  removeNull: false,
  
  // remove null value from array.
  removeNullFromArray: false,
  
  // remove null value from object.
  removeEmptyObject: true,
}
```
### Const

```javascript
  Model.S // money ten 十
  Model.B // money hundred 百
  Model.Q // money thousand 千
  Model.W //money ten thousand 万
  Model.SW // money one hundred thousand 十万
  Model.BW // money million 百万
  Model.QW // money ten million 千万
  Model.Y // money billion 亿
```
### Methods

- **parse**:   
    * **Fill property**: Creating a complete object data,  allows you to get rid of the boredom of {{a&&a.b?a.b.c:''}}
    * **Data conversion**: create a complete object data. Standardized data conversion, fill in null values and undefined fields. Format and add preset fields based on the original data
    * **Default value**: define default value

- **dispose**:  
    * On the basis of 'parse', delete the field names that do not exist in the preset fields to reduce the data volume.

    Example: the value modified by input is String, and is converted to digital format through dispose.
## demo

**demo.js**
``` javascript
import Model from "vue2-model";

let Demo = new Model({
    id: 0,
    name: { type: String ,reName: 'enName'},
    create_time: {
        type: Date,
        format: 'l'  // use manba date format, "l": "YYYY-MM-DD",
    },
    tags: [],
    rating: {
    	type: Number,
    	default: 4  // use default value, only effective for String, Number, Date
    },
    click_num: {
        type: Number,
        unit: Model.Q, // money transfor, a unit of 1000
        format: 'except' //ride   default except
    }
});
export default Demo;

```
### parse
**Usage 1**: fill property

``` javascript
import Demo from './Demo.js'
let demoValue = Demo.parse({});
```
demoValue: 
``` javascript
{
    id: null,
    enName: null,
    create_time: null,
    tags: [],
    rating: 4, // use default value
    click_num: null
}
```
**Usage 2**: conversion amount and date
``` javascript
import Demo from './Demo.js'
let demoValue = Demo.parse({
	id: 21,
    name: 'zzhzz',
    create_time: '2022-09-22 16:43:29',
    tags: [],
    click_num:10000,
    others:'123'
});
```
demoValue: 
``` javascript
{
    id: 21,
    enName: 'zzhzz',
    create_time: '2022-09-22',
    tags: [],
    rating: 4, // use default value
    click_num: 10,
    others:'123'
}
```
### dispose
**Usage 1**: remove null property

``` javascript
import Demo from './Demo.js'
let Demo = Demo.dispose({
	id: null,
	source: "2017-06-09",
	description: null,
	tags: [],
	companyId: null,
	rate: "0.1",
	salary: 10
});
```
demoValue: 

``` javascript
{
	click_num: 10000
    create_time: "2022-09-22"
    enName: "zzhzz"
    id: 21
}
```
## Advanced

```javascript

// Demo.js

let Demo = new Model({
    id: 0,
    country: "",
    rate: 0
});
export default Demo;


// Demo1.js

let Demo1 = new Model({
    id: 0,
    major: "",
    school: ""
});
export default Edu;


// User.js

import Edu from "./Edu";
import Demo from "./Demo";
let User = new Model({
    demo: Demo,
    edu: [Edu]
});
export default User;

```

### parse
```javascript
import User from './User'
let user = User.parse({
    demo:{
        id:123123
    },
    edu:[{
        id: 12
    }],
})
```

**result**:
```javascript
{   
    demo: {
        id: 123123,
        country: null,
        rate: null
    },
    edu: [{
        id: 12,
        school: null
        major: null,
    }]
}
```

### dispose

``` javascript
import User from './User'

let user = User.dispose({
    demo:{
        id:123123,
        country: 123,
        rate: null
    },
    edu:[{
        id: 12,
        school: "school"
        major: null,
    }],
})
```

**result**:
```javascript
{   
    demo: {
        id:123123,
        country: 123,
    },
    edu: [{
        id: 12,
        school: "school"
    }]
}
```
**manba-config.js**
The default is the ISO date format of the current time zone, for example: 2016-04-19T00:00:00+08:00
```javascript
import Model from 'vue2-model';
// Redefining the format of the date conversion
Model.config({
  disposeDateFormat(date) {
    // change to use timestamp
    return manba(date).time();
  }
})
```