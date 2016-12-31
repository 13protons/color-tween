var Easing = require('./easing.js');
var Color = require('color');
var now = Date.now;

module.exports = function (startColorString, endColorString) {
  var startColor = Color(startColorString).rgb().array();
  var endColor = Color(endColorString).rgb().array();
  var tween = this;
  params = {
    updater: function(){},
    ender: function(){},
    length: 1000,
    startTime: undefined,
    easing: Easing('linear')
  }

// Public API
  tween.onUpdate = overwrite('updater');
  tween.onEnd = overwrite('ender');
  tween.start = start;
  tween.duration = overwrite('length');
  tween.stop = stop;
  tween.update = update;
  tween.easing = setEasing;

  return tween;

/* --------------- */

  function setEasing(name) {
    params.easing = Easing(name) || Easing('linear');
    return tween;
  }

  function start(cb) {
    params.startTime = now();
    if (typeof(cb) === 'function'){
      setTimeout(cb);
    }
    return tween;
  }

  function update() {
    if (params.startTime) {
      var frame = renderFrame();
      if (frame.progress > 1) {
        done();
      } else {
        params.updater(frame.frame);
      }
      return frame.frame;
    }
    return null;
  }

  function renderFrame() {
    var pos = now() - params.startTime
    var percent = pos / params.length;

    var frame = endColor.map(function(val, i) {
      return startColor[i] + (val - startColor[i]) * params.easing(percent);
    });

    return {
      frame: Color.rgb(frame),
      progress: percent
    }
  }

  function done() {
    params.updater(Color.rgb(endColor));
    stop();
    return tween;
  }

  function stop() {
    params.startTime = undefined;
    params.ender(Color.rgb(endColor));
    return tween;
  }

  function overwrite(key) {
    return function(val) {
      params[key] = val;
      return tween;
    }
  }
}
