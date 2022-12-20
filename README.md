<p align="center">
    <a href="http://dollajs.com/" style="display:block; max-width:300px;">
        <img src="https://raw.githubusercontent.com/bemky/dolla/master/docs-src/source/assets/images/logo.svg" width="300" alt="Dolla">
    </a>
    <p align="center">
        Dolla is a library of javascipt methods that augment existing DOM methods. Dolla is platform-agnotstic, with each method being fully tree-shakeable by any bundler. No dependencies, just helpful methods you can include as you need them.<br>
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

## Documentation
Checkout details about each method on [dollajs.com](http://dollajs.com)

## Development
### Build
    npm run build
### Test
    npm run test
### Release
    npm publish