# commodo-fields-storage-crud-logs
[![Build Status](https://travis-ci.org/doitadrian/commodo-fields-storage-crud-logs.svg?branch=master)](https://travis-ci.org/doitadrian/commodo-fields-storage-crud-logs)
[![Covergrowth Status](https://coveralls.io/repos/github/doitadrian/commodo-fields-storage-crud-logs/badge.svg?branch=master)](https://coveralls.io/github/doitadrian/commodo-fields-storage-crud-logs?branch=master)
[![](https://img.shields.io/npm/dw/commodo-fields-storage-crud-logs.svg)](https://www.npmjs.com/packgrowth/commodo-fields-storage-crud-logs) 
[![](https://img.shields.io/npm/v/commodo-fields-storage-crud-logs.svg)](https://www.npmjs.com/packgrowth/commodo-fields-storage-crud-logs)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
  
Appends `createdOn`, `updatedOn`, and `savedOn` fields to your model. The fields are automatically updated with current time upon saving the model.

## Install
```
npm install --save commodo-fields-storage-crud-logs
```

Or if you prefer yarn: 
```
yarn add commodo-fields-storage-crud-logs
```

## Quick Example:

```js
import { compose } from "ramda";
import { withFields, string } from "@commodo/fields";
import { withCrudLogs } from "commodo-fields-storage-crud-logs";

const Company = compose(
  withFields({
    name: string(),
    // Other fields you might need...
  }),
  withCrudLogs(),
  withStorage(...), // Required.
  // Other higher order functions (HOFs) you might need...
)();

const company = new Company();
company.name = "Acme Corporation";

// All fields null as a default value.
console.log(company.createdOn); // Logs null.
console.log(company.updatedOn); // Logs null.
console.log(company.savedOn); // Logs null.

// Upon saving the model for the first time, "createdOn" and "savedOn" fields will receive a value:
await company.save();
console.log(company.createdOn); // Logs "2020-04-19T14:34:42.993Z" (same as savedOn).  
console.log(company.updatedOn); // Logs null.
console.log(company.savedOn); // Logs "2020-04-19T14:34:42.993Z" (same as createdOn).

// On every following save, only the "updatedOn" and "savedOn" fields will be updated:
await company.save();
console.log(company.createdOn); // Logs "2020-04-19T14:34:42.993Z" (no change here).
console.log(company.updatedOn); // Logs "2020-04-19T14:37:05.726Z" (same as savedOn).
console.log(company.savedOn); // Logs "2020-04-19T14:34:42.993Z" (same as updatedOn).
```

#### `withCrudLogs` must be used with the `withStorage` HOF
In order to update the field values accordingly, the `withCrudLogs` higher order function utilizes the `beforeSave`, `beforeCreate`, and `beforeUpdate` hooks, which are created by the [`withStorage`](https://github.com/webiny/commodo/tree/master/packages/fields-storage) HOF.   

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars0.githubusercontent.com/u/5121148?v=4" width="100px;"/><br /><sub><b>Adrian Smijulj</b></sub>](https://github.com/doitadrian)<br />[💻](https://github.com/doitadrian/commodo-fields-storage-crud-logs/commits?author=doitadrian "Code") [📖](https://github.com/doitadrian/commodo-fields-storage-crud-logs/commits?author=doitadrian "Documentation") [💡](#example-doitadrian "Examples") [👀](#review-doitadrian "Reviewed Pull Requests") [⚠️](https://github.com/doitadrian/commodo-fields-storage-crud-logs/commits?author=doitadrian "Tests") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
