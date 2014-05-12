# funnel

A component that tracks progress through a series of steps.

[![browser support](https://ci.testling.com/tanem/funnel.png)](https://ci.testling.com/tanem/funnel)


## Live Demo

[Check out the live demo on CodePen](http://codepen.io/tanem/pen/AaxDd), which uses the stand-alone file.


## Installation

Ensure [component(1)](http://component.io) is installed, then:

```sh
$ component install tanem/funnel
```


## Stand-alone

This library may be used stand-alone without the component tool. To build the stand-alone files, ensure [UglifyJS2](https://github.com/mishoo/UglifyJS2) is installed, then: 

```sh
$ make standalone
```

Then add ./funnel.js to your application and reference the `Funnel` global.


## Unit Tests

Ensure [testling](https://github.com/substack/testling) is installed, then:

```sh
$ make test
```


## JSHint

Ensure [JSHint](http://jshint.com/install/) is installed, then:

```sh
$ make jshint
```


## API

### new Funnel

Initialize a new `Funnel`:

```js
var Funnel = require('funnel');
var funnel = new Funnel();
```

### Funnel#name(name:String)

Set the name of the funnel.

```js
funnel.name('foo')
```

### Funnel#step(opts:Object)

Add a step to the funnel.

```js
funnel.step({
  label: 'foo',
  url: 'http://foo.com'
})
```

### Funnel#hit(url:String)

Hit the funnel.

If the the passed `url` matches a step url, then this will count as a step hit.

```js
funnel.hit('http://foo.com')
```

### Funnel#remove

Remove the funnel.

```js
funnel.remove()
```


## License

The MIT License (MIT)

Copyright (c) 2014 Tane Morgan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.