// Get the top position of an element in the document
const getTop = (element, start) => {
  // return value of html.getBoundingClientRect().top ... IE : 0, other browsers : -pageYOffset
  if (element.nodeName === 'HTML') {
    return -start;
  }
  return element.getBoundingClientRect().top + start;
};

const easeInOutCubic = (t) => {
  if (t < 0.5) {
    return 4 * t * t * t;
  }
  return (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
};

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

export function erSynligIViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
