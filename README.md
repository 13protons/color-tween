# color-tween

Tween between any two colors. Api inspired by [tween.js](https://github.com/tweenjs/tween.js), color transformations based on [color](https://www.npmjs.com/package/color)

## Installation

```bash
npm install color-tween --save
```

Or download files directly from the 'dist' folder for usage in browser.

## Usage

Be sure to check out the [examples](/examples) to see the library in use.

Create a new instance of `ColorTween`, with a supplied start point, end point, and update function, then make periodic calls to `.update()` to get the tweened value as a `Color` object. `tween.update()` returns the current animation color while the animation is active, and returns `null` once your animation is over, so `tween.update()` is useful for testing when to break your recursive animation callback;

Browser:

```javascript
var tween = new ColorTween('#000', '#FFF')
                  .onUpdate(someFn)
                  .start(animate);

function animate(){
    if(tween.update()) {
      requestAnimationFrame(animate);
    }
}

```

Node:

```javascript
var ColorTween = require('color-tween'); // Omit for browser use

var tween = new ColorTween('#000', '#FFF')
                  .onUpdate(someFn)
                  .start(animate);

// node:

function animate() {
    if (tween.update()) {
      setTimeout(animate, 50);
    }

    // or if you want super smooth by very chatty updates:

    // if (tween.update()) {
    //   setImmediate(animate);
    // }
}

```

### onUpdate

The `onUpdate` function is called whenever a tween's `.update()` method has been called, assuming the tween in still in progress. It is passed one value, a `Color` object constructed with Qix-'s [color](https://www.npmjs.com/package/color) library. This is an abstracted color value that can be modified with color transform methods or rendered into a useful color value.


```javascript
var tween = new ColorTween('#000', '#FFF')
                  .onUpdate(someFn)
                  .start(animate);

function someFn(color) {
  color.hex(); // returns value like #6a6a6a;
  color.rgb(); // returns object with rgb values like {r: 100, g: 100, b:100};
  color.rgb().string(); // returns string for css injection, like `rgb(100,100,100)`
  color.lighten(.5).hex(); // lighten color by 50%, return hex value
}
```

### Easing

Easing functions are specified as a string passed to the `.easing` method, with `linear` being the default:

```javascript
var tween = new ColorTween('#ffa500', '#40e0d0')
              .easing('cubic')
```

Supported easing functions:

> linear, quadratic, cubic, quartic, quintic, sinusoidal, exponential, circular, elastic, back, bounce

All Easing functions ease both the beginning and end of the animation, or are `InOut` by default. every function can be specified by name, or by adding `In`, `Out`, or `InOut` to specify which part of the animation to weight with the easing.

```javascript
.easing('cubic');      // the same as cubicInOut
.easing('cubicIn');
.easing('cubicOut');
.easing('cubicInOut');
```

### Duration

By Default, animations last for 1 second. Pass any positive integer into the `duration` method to make your animation last that number of milliseconds

```javascript
// This animation will progress for 25 seconds
var tween = new ColorTween('#000', '#FFF')
                  .duration(25000)
```

### Start

A Tween's `.start` method must be explicitly called to start the animation, otherwise you're just creating a tween object to be used later. Optionally pass in your recursive animation function to kick off the process on the next tick.

Remember that `tween.update()` returns a `Color` object for the current animation frame, or `null` if the animation time has elapsed.

```javascript
var tween = new ColorTween('#000', '#FFF')
              .start(animate);

function animate() {
    if (tween.update()) {
      // do some work, then recursively call animate
    }
}
```
