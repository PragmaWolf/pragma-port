# PragmaPort #

Module for generation port number from string.
This module created just for fun.
Default busy ports is `3306`, `5432`, `6379`.

## Used and tested on ##

- NodeJS 7+ [Documentation](https://nodejs.org/dist/latest/docs/api/)

## Install ##

```bash
npm i --save-dev pragma-port
```

## Initialization and using ##

### On javascript file
```javascript
const pragmaPort = require('pragma-port');
const port = pragmaPort('sometext');
console.log(port); // -> 16452
```

### On console:
On Ubuntu checking system busy ports using `netstat -ntulp` command

    git clone https://github.com/PragmaWolf/pragma-port.git
    cd pragma-port
    node index.js --text=sometext
    // -> Port for text 'sometext' is 16452

# License #

[wtfpl]: wtfpl-badge-1.png "WTFPL License :)"
![No WTFPL License image :(][wtfpl]
