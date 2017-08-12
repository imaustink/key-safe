# Key Safe

A helper for storing keys on disk, securely.

# Ussage

```javascript
var KeySafe = require('./index');
var keysafe = new KeySafe('/Users/austin/.test_keysafe');

keysafe.set('The cake is a lie', 'test');
keysafe.unlock('test'); // 'The cake is a lie'
```
