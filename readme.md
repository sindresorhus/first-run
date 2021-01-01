# first-run

> Check if it's the first time the process is run

Can be used to greet the user the first time they use your CLI app, show usage tip, initialize something, etc.


## Install

```
$ npm install first-run
```


## Usage

```js
// x.js
const firstRun = require('first-run');

console.log(firstRun());
```

```
$ node x.js
true
$ node x.js
false
```


## API

### firstRun([options])

### firstRun.clear([options])

Clear the state.

#### options

Type: `Object`

##### name

Type: `string`<br>
Default: `name` field in your package.json

The name used to identify it.


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
