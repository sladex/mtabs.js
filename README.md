mtabs.js
========

Native JavaScript library for creating tab layout.

Demos and docs: http://sladex.org/mtabs.js/

Basic Usage
---------------
````html
<div id="mbabs">
  <div>
    <a class="mtabs-link mtabs-selected" href="#mbabs-content-1">Tab 1</a>
    <a class="mtabs-link" href="#mbabs-content-2">Tab 2</a>
    <a class="mtabs-link" href="#mbabs-content-3">Tab 3</a>
  </div>
  <div class="mtabs-content" id="mbabs-content-1">Lorem ipsum dolor sit amet...</div>
  <div class="mtabs-content" id="mbabs-content-2">Suspendisse pharetra ullamcorper...</div>
  <div class="mtabs-content" id="mbabs-content-3">Sed eget nulla eget ante imperdiet...</div>
</div>

<script src="js/mtabs.min.js"></script>
<script>
  mtabs('mbabs');
</script>
````

Options
---------------
````javascript
mtabs('elementId', optionsObject);
````
- `index` Index of the tab to be selected on load. _Default is '0'_
- `sclass` CSS class name for selected tab. _Default is 'mtabs-selected'_
- `ev` Change tab on this event (e.g. mouseover, mousedown, dblclick, etc.). _Default is 'click'_
- `hash` Follow the location.hash value (it will overwrite index property). _Default is 'true'_
- `cb` Callback function. _Default is 'null'_

Callback arguments
---------------
````javascript
function (index, tabs, tabsC, tabsL) {
  console.log(this);  // current tab
  console.log(index); // numeric index of this tab
  console.log(tabs);  // array of all tabs
  console.log(tabsC); // array of the elements linked to the tabs
  console.log(tabsL); // array on all tabs links (look wrapper expample on the demo page)
}
````

Browser support
---------------
Supports all modern browsers.

In order to support old browsers (IE8-IE9, Android 2-2.3, Opera Mini), you'll need to include [classList][1] polyfill.

License
---------------
Copyright (c) 2013 sladex, released under the MIT License.

  [1]: https://github.com/eligrey/classList.js
