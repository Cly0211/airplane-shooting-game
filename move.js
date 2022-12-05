/**
 * @param {Element} eleBar 拖拽触发元素
 * @param {Object} options 可选参数
 * @returns
 */
 export default function (eleBar, options) {
  var defaults = {
    target: eleBar,
    bounding: window,
    edgeLock: true,
    onMove: function () {},
    onEnd: function () {},
  };

  options = options || {};

  var params = {};
  for (var key in defaults) {
    if (typeof options[key] != "undefined") {
      params[key] = options[key];
    } else {
      params[key] = defaults[key];
    }
  }

  // 拖拽元素
  var eleTarget = params.target;
  // 限制范围
  var bounding = params.bounding;
  var objBounding = bounding;

  // 事件类型处理
  var objEventType = {
    start: "mousedown",
    move: "mousemove",
    end: "mouseup",
  };
  // 坐标存储数据
  var store = {};
  eleBar.addEventListener(objEventType.start, function (event) {
    store.y = event.pageY;
    store.x = event.pageX;
    store.isMoving = true;
    store.top = parseFloat(getComputedStyle(eleTarget).top) || 0;
    store.left = parseFloat(getComputedStyle(eleTarget).left) || 0;

    if (params.edgeLock === true && bounding) {
      objBounding = bounding.getBoundingClientRect();

      // 拖拽元素的 bounding 位置
      var objBoundingTarget = eleTarget.getBoundingClientRect();

      // 可移动范围
      store.range = {
        y: [
          objBounding.top - objBoundingTarget.top,
          objBounding.bottom - objBoundingTarget.bottom,
        ],
        x: [
          objBounding.left - objBoundingTarget.left,
          objBounding.right - objBoundingTarget.right,
        ],
      };
    }
  });
  document.addEventListener(
    objEventType.move,
    function (event) {
      if (store.isMoving) {
        event.preventDefault();
        // 兼顾移动端
        if (event.touches && event.touches.length) {
          event = event.touches[0];
        }

        var distanceY = event.pageY - store.y;
        var distanceX = event.pageX - store.x;

        // 边界的判断与处理
        if (params.edgeLock === true && bounding) {
          var minX = Math.min.apply(null, store.range.x);
          var maxX = Math.max.apply(null, store.range.x);
          var minY = Math.min.apply(null, store.range.y);
          var maxY = Math.max.apply(null, store.range.y);

          if (distanceX < minX) {
            distanceX = minX;
          } else if (distanceX > maxX) {
            distanceX = maxX;
          }

          if (distanceY < minY) {
            distanceY = minY;
          } else if (distanceY > maxY) {
            distanceY = maxY;
          }
        }

        var top = store.top + distanceY;
        var left = store.left + distanceX;

        eleTarget.style.top = top + "px";
        eleTarget.style.left = left + "px";

        // 回调
        params.onMove(left, top);
      }
    },
    {
      passive: false,
    }
  );
  document.addEventListener(objEventType.end, function () {
    if (store.isMoving) {
      store.isMoving = false;

      params.onEnd();
    }
  });
};
