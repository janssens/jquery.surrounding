# jquery.surrounding

_A lightweight jquery plugin plugin which takes an ordinary image tag and transforms it into a gorgeous interactive 360° panorama_

## Install

A packaged source file includes everything you need to use jquery.surrounding.

+ [jquery.surrounding.min.js](https://raw.github.com/janssens/jquery.surrounding/master/jquery.surrounding.min.js)
+ [jquery.surrounding.js](https://raw.github.com/janssens/jquery.surrounding/master/jquery.surrounding.js)

## Required

+ [jquery.mousewheel.js](https://raw.github.com/brandonaaron/jquery-mousewheel/master/jquery.mousewheel.js)

## Initialize

### In JavaScript

``` js
jQuery(document).ready(function(){
			jQuery(".my360").surround();
			jQuery(".my360empty").surround({source:"../360.jpg",step:10}); // step is the mousewheel delta multiplier
});
```

### In HTML

``` html
<div class="my360">
  <img src="360.jpg" />
</div>
<div class="my360empty">
</div>
```

### In CSS

``` css
.my360,.my360empty{
	width: 50%;
	height: 100px;
}
```
## Demo

+ [jquery.surrounding demo page](http://gaetan.janssens.free.fr/plugins/jquery.surrounding/)

## License

Masonry is licensed GPL 2.

* * *

Copyright (c) 2013 Gaëtan Janssens