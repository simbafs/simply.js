**Methed -- message()**
=====================
```js
simple.message(req,fn(msg,arg))
  req => string. only react when argv[0] is req
  fn => function to solve req when user type
	  msg => origin msg object. Object
		arg => splitted command and arguments. Array
return => simple. Object
```

