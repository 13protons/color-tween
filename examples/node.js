// Color Tween node example (use setTimeout or setImmediate instead of requestAnimationFrame)

var tween = new ColorTween('#000', '#FFF')
              .duration(1000)
              .easing('linear')
              .onUpdate(update)
              .onEnd(function(){
                console.log('nice run');
              })
              .start(animate);

function animate() {
    if (tween.update()) {
      setTimeout(animate, 50);
    }

    // or if you want super smooth by very chatty updates:

    // if (tween.update()) {
    //   setImmediate(animate);
    // }
}

function update(color) {
  var val = color.hex();
  console.log('updating color to', val);
}
