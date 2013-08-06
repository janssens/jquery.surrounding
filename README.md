# jquery.surrounding

_A lightweight jquery plugin plugin which takes an ordinary image tag and transforms it into a gorgeous interactive 360° panorama_

## Install

A packaged source file includes everything you need to use jquery.surrounding.

+ [jquery.surrounding.min.js](https://github.com/janssens/jquery.surrounding/blob/master/jquery.surrounding.js)
+ [jquery.surrounding.js](https://github.com/janssens/jquery.surrounding/blob/master/jquery.surrounding.min.js)

## Initialize

### In JavaScript

``` js
jQuery(document).ready(function(){
			jQuery(".my360").surround();
			jQuery(".my360empty").surround({"source":"../360.jpg"});
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

Add a class of `js-masonry` to your element. Options can be set in JSON in `data-masonry-options`.

``` css
.my360,.my360empty{
	width: 50%;
	height: 100px;
}
```

## License

Masonry is licensed GPL 2.

* * *

Copyright (c) 2013 Gaëtan Janssens