<p align="center">
    <a href="http://dollajs.com/" style="display:block; max-width:400px;">
        <img src="https://raw.githubusercontent.com/bemky/dolla/master/docs-src/source/assets/images/logo.svg" width="400" alt="Dolla">
    </a>
    <p align="center">
        A light set of helpers for building and manipulating DOM. This toolkit is platform-agnotstic, with each method being fully tree-shakeable by your bundler.<br>
        <a href="http://dollajs.com/">
            Documentation
        </a>
    </p>
</p>

## Installation

    npm install dolla


## Usage

Import only the methods you use.
```javascript
import {createElement} from 'dolla';

document.body.append(createElement('div', {
    class: 'text-bold',
    style: 'text-decoration: underline',
    content: ['Hello World']
}))
```

## Development
### Build
    npm run build
### Test
    npm run test
### Release
    npm publish