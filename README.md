# groupby-json

Javascript helper for json object grouping for multiple properties

![npm](https://img.shields.io/npm/v/groupby-json?color=green&style=flat-square) ![GitHub issues](https://img.shields.io/github/issues/pedroentringer/groupby-json) ![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/groupby-json)

## Installation

Install with npm or yarn

```
npm install groupby-json
```

or

```
yarn add groupby-json
```

## Import

Include the module

```javascript
const { groupBy } = require('groupby-json');
//or
import { groupBy } from 'groupby-json';
```

## Grouping

### Array Demo

```javascript
const users = [
  {
    country: 'BR',
    zoneCode: 15,
    firstName: 'Pedro',
    lastName: 'Entringer',
  },
  {
    country: 'BR',
    zoneCode: 15,
    firstName: 'Daniel',
    lastName: 'Siller',
  },
  {
    country: 'BR',
    zoneCode: 15,
    firstName: 'Otavio',
    lastName: 'Siller',
  },
  {
    country: 'BR',
    zoneCode: 16,
    firstName: 'Lucas',
    lastName: 'Siller',
  },
  {
    country: 'LU',
    zoneCode: 22,
    firstName: 'Roberto',
    lastName: 'Entringer',
  },
];
```

### Group Definition

Group by `country` and `zoneCode`

```javascript
const groupByDefinitions = [
  {
    tag: 'country', //name of the tag that contains the main value
    childName: 'zoneCodes', //tag name in which data should be saved after grouping
  },
  {
    tag: 'zoneCode', //name of the tag that contains the main value
    childName: 'users', //tag name in which data should be saved after grouping
  },
];
```

### for groupig

```javascript
const grouped = groupBy(users, groupByDefinitions);

console.log(grouped);
```

Result:

```json
[
  {
    "country": "BR",
    "zoneCodes": [
      {
        "zoneCode": 15,
        "users": [
          {
            "country": "BR",
            "zoneCode": 15,
            "firstName": "Pedro",
            "lastName": "Entringer"
          },
          {
            "country": "BR",
            "zoneCode": 15,
            "firstName": "Daniel",
            "lastName": "Siller"
          },
          {
            "country": "BR",
            "zoneCode": 15,
            "firstName": "Otavio",
            "lastName": "Siller"
          }
        ]
      },
      {
        "zoneCode": 16,
        "users": [
          {
            "country": "BR",
            "zoneCode": 16,
            "firstName": "Lucas",
            "lastName": "Siller"
          }
        ]
      }
    ]
  },
  {
    "country": "LU",
    "zoneCodes": [
      {
        "zoneCode": 22,
        "users": [
          {
            "country": "LU",
            "zoneCode": 22,
            "firstName": "Roberto",
            "lastName": "Entringer"
          }
        ]
      }
    ]
  }
]
```
