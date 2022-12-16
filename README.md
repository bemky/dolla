# Dolla
A light set of helpers for building and manipulating DOM. This toolkit is platform-agnotstic, with each method being fully tree-shakeable by your bundler.

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