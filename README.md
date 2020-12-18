# Dolla
A light set of helpers for building and manipulating DOM

## Installation

    npm install dolla

```javascript
import {createElement} from 'dolla';

document.body.append(createElement('div', {
    class: 'text-bold',
    style: 'text-decoration: underline',
    children: ['Hello World']
}))
```

## Development
### Build
    npm run build
### Test
    npm run test
### Release
    npm publish