const position = (start, end, elapsed, duration) => {
  if (elapsed > duration) {
    return end;
  }
  return start + (end - start) * easeInOutCubic(elapsed / duration);
};

export function scrollTo(el, duration = 500, callback) {
  const context = window;
  const start = context.scrollTop || window.pageYOffset;
  let end;
  if (!el) {
    return;
  }
  if (typeof el === 'number') {
    end = parseInt(el, 10);
  } else {
    end = getTop(el, start);
  }

  const clock = Date.now();
  const requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    function (fn) {
      window.setTimeout(fn, 15);
    };

  const step = function () {
    const elapsed = Date.now() - clock;
    window.scroll(0, position(start, end, elapsed, duration));

    if (elapsed > duration) {
      if (typeof callback === 'function') {
        callback(el);
      }
    } else {
      requestAnimationFrame(step);
    }
  };
  step();
}
