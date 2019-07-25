# first-run [![Build Status](https://travis-ci.org/sindresorhus/first-run.svg?branch=master)](https://travis-ci.org/sindresorhus/first-run)

> Check if it's the first time the process is run

Can be used to greet the user the first time they use your CLI app, show usage tip, initialize something, etc.


## Install

```
$ npm install first-run
```


## Usage

Simple use case, inside package(`name` and `version` will be take from `package.json`):

```js
// x.js
const firstRun = require('first-run');

console.log(firstRun()); // name and version will be inferred
```

```js
// clear.js
const firstRun = require('first-run');

firstRun.clear(); // name and version will be inferred
```

```
$ node x.js
true
$ node x.js
false
$ node clear.js
$ node x.js
true
$ node x.js
false
```

Then, after package version changes:

```
$ node x.js
true
$ node x.js
false
```


## API

### firstRun([options])

Returns true the first time function is executed on machine for specified `name` and `version` pair, false afterwards.

### firstRun.clear([options])

Clear the saved state for specified `name` and `version` pair. Next call of `firstRun` for this pair will return true.

#### options

Type: `Object`

##### name

Type: `string`<br>
Default: `name` field in your package.json

The name used to identify it.

##### version

Type: `string`<br>
Default: if `name` is not set, `version` field in your package.json, otherwise `undefined`.

The version used to identify it.

## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
