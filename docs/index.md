<div style="display: flex; justify-content: end">
    <a href="https://github.com/bemky/dolla" style="display:inline-flex; align-items:center; gap: 0.5em; text-decoration: none;">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
        Dolla on GitHub
    </a>
</div>
    
<div style="display: flex; justify-content: center; padding: 10%;">
    <img src="/logo.svg" width="300">
</div>

<p style="font-weight: 300; font-size: 1.2rem">
    Dolla is a library of javascipt methods that augment existing DOM methods. Dolla is platform-agnotstic, with each method being fully tree-shakeable by any bundler. No dependencies, just helpful methods you can include as you need them. 
</p>

# Installation
```
npm install dolla
```

# Usage
Import only the methods you use.
```
import {createElement} from 'dolla';

document.body.append(createElement('div', {
    class: 'text-bold',
    style: 'text-decoration: underline',
    content: ['Hello World']
}))
```