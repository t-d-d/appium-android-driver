'use strict';

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _androidHelpers = require('../android-helpers');

var _androidHelpers2 = _interopRequireDefault(_androidHelpers);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _mobileJsonWireProtocol = require('mobile-json-wire-protocol');

var _asyncbox = require('asyncbox');

var commands = {},
    helpers = {},
    extensions = {};

commands.doTouchAction = function callee$0$0(action, opts) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.t0 = action;
        context$1$0.next = context$1$0.t0 === 'tap' ? 3 : context$1$0.t0 === 'press' ? 6 : context$1$0.t0 === 'release' ? 9 : context$1$0.t0 === 'moveTo' ? 12 : context$1$0.t0 === 'wait' ? 15 : context$1$0.t0 === 'longPress' ? 18 : context$1$0.t0 === 'cancel' ? 22 : 24;
        break;

      case 3:
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.tap(opts.element, opts.x, opts.y, opts.count));

      case 5:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 6:
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(this.touchDown(opts.element, opts.x, opts.y));

      case 8:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 9:
        context$1$0.next = 11;
        return _regeneratorRuntime.awrap(this.touchUp(opts.element, opts.x, opts.y));

      case 11:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 12:
        context$1$0.next = 14;
        return _regeneratorRuntime.awrap(this.touchMove(opts.element, opts.x, opts.y));

      case 14:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 15:
        context$1$0.next = 17;
        return _regeneratorRuntime.awrap(_bluebird2['default'].delay(opts.ms));

      case 17:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 18:
        if (typeof opts.duration === 'undefined' || !opts.duration) {
          opts.duration = 1000;
        }
        context$1$0.next = 21;
        return _regeneratorRuntime.awrap(this.touchLongClick(opts.element, opts.x, opts.y, opts.duration));

      case 21:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 22:
        // TODO: clarify behavior of 'cancel' action and fix this
        _logger2['default'].warn("Cancel action currently has no effect");
        return context$1$0.abrupt('break', 25);

      case 24:
        _logger2['default'].errorAndThrow('unknown action ' + action);

      case 25:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// drag is *not* press-move-release, so we need to translate
// drag works fine for scroll, as well
helpers.doTouchDrag = function callee$0$0(gestures) {
  var longPress, moveTo, startX, startY, endX, endY, _ref, x, y, _ref2, apiLevel, duration;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        longPress = gestures[0];
        moveTo = gestures[1];
        startX = longPress.options.x || 0, startY = longPress.options.y || 0, endX = moveTo.options.x || 0, endY = moveTo.options.y || 0;

        if (!longPress.options.element) {
          context$1$0.next = 11;
          break;
        }

        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.getLocationInView(longPress.options.element));

      case 6:
        _ref = context$1$0.sent;
        x = _ref.x;
        y = _ref.y;

        startX += x || 0;
        startY += y || 0;

      case 11:
        if (!moveTo.options.element) {
          context$1$0.next = 19;
          break;
        }

        context$1$0.next = 14;
        return _regeneratorRuntime.awrap(this.getLocationInView(moveTo.options.element));

      case 14:
        _ref2 = context$1$0.sent;
        x = _ref2.x;
        y = _ref2.y;

        endX += x || 0;
        endY += y || 0;

      case 19:
        context$1$0.next = 21;
        return _regeneratorRuntime.awrap(this.adb.getApiLevel());

      case 21:
        apiLevel = context$1$0.sent;
        duration = apiLevel >= 5 ? 2 : 1;

        // make sure that if the long press has a duration, we use it.
        if (longPress.options && longPress.options.duration) {
          duration = Math.max(longPress.options.duration / 1000, duration);
        }

        // `drag` will take care of whether there is an element or not at that level
        context$1$0.next = 26;
        return _regeneratorRuntime.awrap(this.drag(startX, startY, endX, endY, duration, 1, longPress.options.element, moveTo.options.element));

      case 26:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 27:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// Release gesture needs element or co-ordinates to release it from that position
// or else release gesture is performed from center of the screen, so to fix it
// This method sets co-ordinates/element to release gesture if it has no options set already.
helpers.fixRelease = function callee$0$0(gestures) {
  var release, ref, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, gesture, opts, loc, size;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        release = _lodash2['default'].last(gestures);

        release.options = release.options || {};
        // nothing to do if release options are already set

        if (!(release.options.element || release.options.x && release.options.y)) {
          context$1$0.next = 4;
          break;
        }

        return context$1$0.abrupt('return');

      case 4:
        // without coordinates, `release` uses the center of the screen, which,
        // generally speaking, is not what we want
        // therefore: loop backwards and use the last command with an element and/or
        // offset coordinates
        gestures = _lodash2['default'].clone(gestures);
        ref = null;
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 9;
        _iterator = _getIterator(gestures.reverse());

      case 11:
        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
          context$1$0.next = 20;
          break;
        }

        gesture = _step.value;
        opts = gesture.options;

        if (!(opts.element || opts.x && opts.y)) {
          context$1$0.next = 17;
          break;
        }

        ref = gesture;
        return context$1$0.abrupt('break', 20);

      case 17:
        _iteratorNormalCompletion = true;
        context$1$0.next = 11;
        break;

      case 20:
        context$1$0.next = 26;
        break;

      case 22:
        context$1$0.prev = 22;
        context$1$0.t0 = context$1$0['catch'](9);
        _didIteratorError = true;
        _iteratorError = context$1$0.t0;

      case 26:
        context$1$0.prev = 26;
        context$1$0.prev = 27;

        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }

      case 29:
        context$1$0.prev = 29;

        if (!_didIteratorError) {
          context$1$0.next = 32;
          break;
        }

        throw _iteratorError;

      case 32:
        return context$1$0.finish(29);

      case 33:
        return context$1$0.finish(26);

      case 34:
        if (!ref) {
          context$1$0.next = 51;
          break;
        }

        opts = ref.options;

        if (!opts.element) {
          context$1$0.next = 50;
          break;
        }

        context$1$0.next = 39;
        return _regeneratorRuntime.awrap(this.getLocationInView(opts.element));

      case 39:
        loc = context$1$0.sent;

        if (!(opts.x && opts.y)) {
          context$1$0.next = 44;
          break;
        }

        // this is an offset from the element
        release.options = {
          x: loc.x + opts.x,
          y: loc.y + opts.y
        };
        context$1$0.next = 48;
        break;

      case 44:
        context$1$0.next = 46;
        return _regeneratorRuntime.awrap(this.getSize(opts.element));

      case 46:
        size = context$1$0.sent;

        release.options = {
          x: loc.x + size.width / 2,
          y: loc.y + size.height / 2
        };

      case 48:
        context$1$0.next = 51;
        break;

      case 50:
        release.options = _lodash2['default'].pick(opts, 'x', 'y');

      case 51:
        return context$1$0.abrupt('return', release);

      case 52:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[9, 22, 26, 34], [27,, 29, 33]]);
};

// Perform one gesture
helpers.performGesture = function callee$0$0(gesture) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.doTouchAction(gesture.action, gesture.options || {}));

      case 3:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 6:
        context$1$0.prev = 6;
        context$1$0.t0 = context$1$0['catch'](0);

        if (!((0, _mobileJsonWireProtocol.isErrorType)(context$1$0.t0, _mobileJsonWireProtocol.errors.NoSuchElementError) && gesture.action === 'release' && gesture.options.element)) {
          context$1$0.next = 14;
          break;
        }

        delete gesture.options.element;
        _logger2['default'].debug('retrying release without element opts: ' + gesture.options + '.');
        context$1$0.next = 13;
        return _regeneratorRuntime.awrap(this.doTouchAction(gesture.action, gesture.options || {}));

      case 13:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 14:
        throw context$1$0.t0;

      case 15:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 6]]);
};

commands.performTouch = function callee$0$0(gestures) {
  var swipeOpts, actions, press, wait, fixedGestures, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, g;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!this.isWebContext()) {
          context$1$0.next = 2;
          break;
        }

        throw new _mobileJsonWireProtocol.errors.NotYetImplementedError();

      case 2:
        if (!(gestures.length === 4 && gestures[0].action === 'press' && gestures[1].action === 'wait' && gestures[2].action === 'moveTo' && gestures[3].action === 'release')) {
          context$1$0.next = 9;
          break;
        }

        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.getSwipeOptions(gestures));

      case 5:
        swipeOpts = context$1$0.sent;
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(this.swipe(swipeOpts.startX, swipeOpts.startY, swipeOpts.endX, swipeOpts.endY, swipeOpts.duration, swipeOpts.touchCount, swipeOpts.element));

      case 8:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 9:
        actions = _lodash2['default'].pluck(gestures, "action");

        if (!(actions[0] === 'longPress' && actions[1] === 'moveTo' && actions[2] === 'release')) {
          context$1$0.next = 16;
          break;
        }

        context$1$0.next = 13;
        return _regeneratorRuntime.awrap(this.doTouchDrag(gestures));

      case 13:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 16:
        if (actions.length === 2) {
          // `press` without a wait is too slow and gets interpretted as a `longPress`
          if (_lodash2['default'].first(actions) === 'press' && _lodash2['default'].last(actions) === 'release') {
            actions[0] = 'tap';
            gestures[0].action = 'tap';
          }

          // the `longPress` and `tap` methods release on their own
          if ((_lodash2['default'].first(actions) === 'tap' || _lodash2['default'].first(actions) === 'longPress') && _lodash2['default'].last(actions) === 'release') {
            gestures.pop();
            actions.pop();
          }
        } else {
          // longpress followed by anything other than release should become a press and wait
          if (actions[0] === 'longPress') {
            actions = ['press', 'wait'].concat(_toConsumableArray(actions));

            press = gestures.shift();

            press.action = 'press';
            wait = {
              action: 'wait',
              options: { ms: press.options.duration || 1000 }
            };

            delete press.options.duration;
            gestures = [press, wait].concat(_toConsumableArray(gestures));
          }
        }

        // fix release action then perform all actions

        if (!(actions[actions.length - 1] === 'release')) {
          context$1$0.next = 21;
          break;
        }

        context$1$0.next = 20;
        return _regeneratorRuntime.awrap(this.fixRelease(gestures));

      case 20:
        actions[actions.length - 1] = context$1$0.sent;

      case 21:
        context$1$0.next = 23;
        return _regeneratorRuntime.awrap(this.parseTouch(gestures, false));

      case 23:
        fixedGestures = context$1$0.sent;
        _iteratorNormalCompletion2 = true;
        _didIteratorError2 = false;
        _iteratorError2 = undefined;
        context$1$0.prev = 27;
        _iterator2 = _getIterator(fixedGestures);

      case 29:
        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
          context$1$0.next = 36;
          break;
        }

        g = _step2.value;
        context$1$0.next = 33;
        return _regeneratorRuntime.awrap(this.performGesture(g));

      case 33:
        _iteratorNormalCompletion2 = true;
        context$1$0.next = 29;
        break;

      case 36:
        context$1$0.next = 42;
        break;

      case 38:
        context$1$0.prev = 38;
        context$1$0.t0 = context$1$0['catch'](27);
        _didIteratorError2 = true;
        _iteratorError2 = context$1$0.t0;

      case 42:
        context$1$0.prev = 42;
        context$1$0.prev = 43;

        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
          _iterator2['return']();
        }

      case 45:
        context$1$0.prev = 45;

        if (!_didIteratorError2) {
          context$1$0.next = 48;
          break;
        }

        throw _iteratorError2;

      case 48:
        return context$1$0.finish(45);

      case 49:
        return context$1$0.finish(42);

      case 50:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[27, 38, 42, 50], [43,, 45, 49]]);
};

helpers.parseTouch = function callee$0$0(gestures, multi) {
  var touchStateObjects, prevPos, time, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, state, timeOffset;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        // because multi-touch releases at the end by default
        if (multi && _lodash2['default'].last(gestures).action === 'release') {
          gestures.pop();
        }

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap((0, _asyncbox.asyncmap)(gestures, function callee$1$0(gesture) {
          var options, elementId, pos, size, touchStateObject, offset;
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                options = gesture.options;

                if (!_lodash2['default'].contains(['press', 'moveTo', 'tap', 'longPress'], gesture.action)) {
                  context$2$0.next = 23;
                  break;
                }

                options.offset = false;
                elementId = gesture.options.element;

                if (!elementId) {
                  context$2$0.next = 16;
                  break;
                }

                context$2$0.next = 7;
                return _regeneratorRuntime.awrap(this.getLocationInView(elementId));

              case 7:
                pos = context$2$0.sent;
                context$2$0.next = 10;
                return _regeneratorRuntime.awrap(this.getSize(elementId));

              case 10:
                size = context$2$0.sent;

                if (gesture.options.x || gesture.options.y) {
                  options.x = pos.x + (gesture.options.x || 0);
                  options.y = pos.y + (gesture.options.y || 0);
                } else {
                  options.x = pos.x + size.width / 2;
                  options.y = pos.y + size.height / 2;
                }
                touchStateObject = {
                  action: gesture.action,
                  options: options,
                  timeOffset: 0.005
                };
                return context$2$0.abrupt('return', touchStateObject);

              case 16:
                // expects absolute coordinates, so we need to save these as offsets
                // and then translate when everything is done
                options.offset = true;
                options.x = gesture.options.x || 0;
                options.y = gesture.options.y || 0;

                touchStateObject = {
                  action: gesture.action,
                  options: options,
                  timeOffset: 0.005
                };
                return context$2$0.abrupt('return', touchStateObject);

              case 21:
                context$2$0.next = 27;
                break;

              case 23:
                offset = 0.005;

                if (gesture.action === 'wait') {
                  options = gesture.options;
                  offset = parseInt(gesture.options.ms) / 1000;
                }
                touchStateObject = {
                  action: gesture.action,
                  options: options,
                  timeOffset: offset
                };
                return context$2$0.abrupt('return', touchStateObject);

              case 27:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        }, false));

      case 3:
        touchStateObjects = context$1$0.sent;
        prevPos = null, time = 0;
        _iteratorNormalCompletion3 = true;
        _didIteratorError3 = false;
        _iteratorError3 = undefined;
        context$1$0.prev = 8;

        for (_iterator3 = _getIterator(touchStateObjects); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          state = _step3.value;

          if (_lodash2['default'].isUndefined(state.options.x) && _lodash2['default'].isUndefined(state.options.y)) {
            // this happens with wait
            state.options.x = prevPos.x;
            state.options.y = prevPos.y;
          }
          if (state.options.offset && prevPos) {
            // the current position is an offset
            state.options.x += prevPos.x;
            state.options.y += prevPos.y;
          }
          delete state.options.offset;
          prevPos = state.options;

          if (multi) {
            timeOffset = state.timeOffset;

            time += timeOffset;
            state.time = _androidHelpers2['default'].truncateDecimals(time, 3);

            // multi gestures require 'touch' rather than 'options'
            state.touch = state.options;
            delete state.options;
          }
          delete state.timeOffset;
        }
        context$1$0.next = 16;
        break;

      case 12:
        context$1$0.prev = 12;
        context$1$0.t0 = context$1$0['catch'](8);
        _didIteratorError3 = true;
        _iteratorError3 = context$1$0.t0;

      case 16:
        context$1$0.prev = 16;
        context$1$0.prev = 17;

        if (!_iteratorNormalCompletion3 && _iterator3['return']) {
          _iterator3['return']();
        }

      case 19:
        context$1$0.prev = 19;

        if (!_didIteratorError3) {
          context$1$0.next = 22;
          break;
        }

        throw _iteratorError3;

      case 22:
        return context$1$0.finish(19);

      case 23:
        return context$1$0.finish(16);

      case 24:
        return context$1$0.abrupt('return', touchStateObjects);

      case 25:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[8, 12, 16, 24], [17,, 19, 23]]);
};

commands.performMultiAction = function callee$0$0(actions, elementId) {
  var states, opts;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this2 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!this.isWebContext()) {
          context$1$0.next = 2;
          break;
        }

        throw new _mobileJsonWireProtocol.errors.NotYetImplementedError();

      case 2:
        if (!(actions.length === 1)) {
          context$1$0.next = 4;
          break;
        }

        throw new Error("Multi Pointer Gestures need at least two actions. " + "Use Touch Actions for a single action.");

      case 4:
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap((0, _asyncbox.asyncmap)(actions, function callee$1$0(action) {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(this.parseTouch(action, true));

              case 2:
                return context$2$0.abrupt('return', context$2$0.sent);

              case 3:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this2);
        }, false));

      case 6:
        states = context$1$0.sent;
        opts = undefined;

        if (!elementId) {
          context$1$0.next = 15;
          break;
        }

        opts = {
          elementId: elementId,
          actions: states
        };
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:performMultiPointerGesture", opts));

      case 12:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 15:
        opts = {
          actions: states
        };
        context$1$0.next = 18;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("performMultiPointerGesture", opts));

      case 18:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 19:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

_Object$assign(extensions, commands, helpers);
exports.commands = commands;
exports.helpers = helpers;
exports['default'] = extensions;

// lollipop takes a little longer to get things rolling

// sometimes there are no options

// this is the center of the element

// sometime the element is not available when releasing, retry without it

// press-wait-moveTo-release is `swipe`, so use native method

// some things are special

// we need to change the time (which is now an offset)
// and the position (which may be an offset)

// Android needs at least two actions to be able to perform a multi pointer gesture
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy90b3VjaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O3NCQUFnQixXQUFXOzs7O3NCQUNiLFFBQVE7Ozs7OEJBQ0ssb0JBQW9COzs7O3dCQUNqQyxVQUFVOzs7O3NDQUNZLDJCQUEyQjs7d0JBQ3RDLFVBQVU7O0FBRW5DLElBQUksUUFBUSxHQUFHLEVBQUU7SUFBRSxPQUFPLEdBQUcsRUFBRTtJQUFFLFVBQVUsR0FBRyxFQUFFLENBQUM7O0FBRWpELFFBQVEsQ0FBQyxhQUFhLEdBQUcsb0JBQWdCLE1BQU0sRUFBRSxJQUFJOzs7O3lCQUMzQyxNQUFNOzhDQUNQLEtBQUssMEJBRUwsT0FBTywwQkFFUCxTQUFTLDBCQUVULFFBQVEsMkJBRVIsTUFBTSwyQkFFTixXQUFXLDJCQUtYLFFBQVE7Ozs7O3lDQWRFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQzs7Ozs7Ozt5Q0FFbEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozt5Q0FFNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozt5Q0FFMUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozt5Q0FFNUMsc0JBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7Ozs7OztBQUU3QixZQUFJLE9BQU8sSUFBSSxDQUFDLFFBQVEsS0FBSyxXQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFF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Y0FDZixJQUFJLCtCQUFPLHNCQUFzQixFQUFFOzs7Y0FJdkMsT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUE7Ozs7O2NBQ2hCLElBQUksS0FBSyxDQUFDLG9EQUFvRCxHQUNwRCx3Q0FBd0MsQ0FBQzs7Ozt5Q0FHeEMsd0JBQVMsT0FBTyxFQUFFLG9CQUFPLE1BQU07Ozs7O2lEQUNuQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUM7Ozs7Ozs7Ozs7U0FDM0MsRUFBRSxLQUFLLENBQUM7OztBQUZMLGNBQU07QUFJTixZQUFJOzthQUNKLFNBQVM7Ozs7O0FBQ1gsWUFBSSxHQUFHO0FBQ0wsbUJBQVMsRUFBVCxTQUFTO0FBQ1QsaUJBQU8sRUFBRSxNQUFNO1NBQ2hCLENBQUM7O3lDQUNXLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLG9DQUFvQyxFQUFFLElBQUksQ0FBQzs7Ozs7O0FBRWxGLFlBQUksR0FBRztBQUNMLGlCQUFPLEVBQUUsTUFBTTtTQUNoQixDQUFDOzt5Q0FDVyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyw0QkFBNEIsRUFBRSxJQUFJLENBQUM7Ozs7Ozs7Ozs7Q0FFN0UsQ0FBQzs7QUFFRixlQUFjLFVBQVUsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDcEMsUUFBUSxHQUFSLFFBQVE7UUFBRSxPQUFPLEdBQVAsT0FBTztxQkFDWCxVQUFVIiwiZmlsZSI6ImxpYi9jb21tYW5kcy90b3VjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBsb2cgZnJvbSAnLi4vbG9nZ2VyJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgYW5kcm9pZEhlbHBlcnMgZnJvbSAnLi4vYW5kcm9pZC1oZWxwZXJzJztcbmltcG9ydCBCIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCB7IGVycm9ycywgaXNFcnJvclR5cGUgfSBmcm9tICdtb2JpbGUtanNvbi13aXJlLXByb3RvY29sJztcbmltcG9ydCB7IGFzeW5jbWFwIH0gZnJvbSAnYXN5bmNib3gnO1xuXG5sZXQgY29tbWFuZHMgPSB7fSwgaGVscGVycyA9IHt9LCBleHRlbnNpb25zID0ge307XG5cbmNvbW1hbmRzLmRvVG91Y2hBY3Rpb24gPSBhc3luYyBmdW5jdGlvbiAoYWN0aW9uLCBvcHRzKSB7XG4gIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgY2FzZSAndGFwJzpcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLnRhcChvcHRzLmVsZW1lbnQsIG9wdHMueCwgb3B0cy55LCBvcHRzLmNvdW50KTtcbiAgICBjYXNlICdwcmVzcyc6XG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy50b3VjaERvd24ob3B0cy5lbGVtZW50LCBvcHRzLngsIG9wdHMueSk7XG4gICAgY2FzZSAncmVsZWFzZSc6XG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy50b3VjaFVwKG9wdHMuZWxlbWVudCwgb3B0cy54LCBvcHRzLnkpO1xuICAgIGNhc2UgJ21vdmVUbyc6XG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy50b3VjaE1vdmUob3B0cy5lbGVtZW50LCBvcHRzLngsIG9wdHMueSk7XG4gICAgY2FzZSAnd2FpdCc6XG4gICAgICByZXR1cm4gYXdhaXQgQi5kZWxheShvcHRzLm1zKTtcbiAgICBjYXNlICdsb25nUHJlc3MnOlxuICAgICAgaWYgKHR5cGVvZiBvcHRzLmR1cmF0aW9uID09PSAndW5kZWZpbmVkJyB8fCAhb3B0cy5kdXJhdGlvbikge1xuICAgICAgICBvcHRzLmR1cmF0aW9uID0gMTAwMDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLnRvdWNoTG9uZ0NsaWNrKG9wdHMuZWxlbWVudCwgb3B0cy54LCBvcHRzLnksIG9wdHMuZHVyYXRpb24pO1xuICAgIGNhc2UgJ2NhbmNlbCc6XG4gICAgICAvLyBUT0RPOiBjbGFyaWZ5IGJlaGF2aW9yIG9mICdjYW5jZWwnIGFjdGlvbiBhbmQgZml4IHRoaXNcbiAgICAgIGxvZy53YXJuKFwiQ2FuY2VsIGFjdGlvbiBjdXJyZW50bHkgaGFzIG5vIGVmZmVjdFwiKTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBsb2cuZXJyb3JBbmRUaHJvdyhgdW5rbm93biBhY3Rpb24gJHthY3Rpb259YCk7XG4gIH1cbn07XG5cblxuLy8gZHJhZyBpcyAqbm90KiBwcmVzcy1tb3ZlLXJlbGVhc2UsIHNvIHdlIG5lZWQgdG8gdHJhbnNsYXRlXG4vLyBkcmFnIHdvcmtzIGZpbmUgZm9yIHNjcm9sbCwgYXMgd2VsbFxuaGVscGVycy5kb1RvdWNoRHJhZyA9IGFzeW5jIGZ1bmN0aW9uIChnZXN0dXJlcykge1xuICBsZXQgbG9uZ1ByZXNzID0gZ2VzdHVyZXNbMF07XG4gIGxldCBtb3ZlVG8gPSBnZXN0dXJlc1sxXTtcbiAgbGV0IHN0YXJ0WCA9IGxvbmdQcmVzcy5vcHRpb25zLnggfHwgMCxcbiAgICAgIHN0YXJ0WSA9IGxvbmdQcmVzcy5vcHRpb25zLnkgfHwgMCxcbiAgICAgIGVuZFggPSBtb3ZlVG8ub3B0aW9ucy54IHx8IDAsXG4gICAgICBlbmRZID0gbW92ZVRvLm9wdGlvbnMueSB8fCAwO1xuICBpZiAobG9uZ1ByZXNzLm9wdGlvbnMuZWxlbWVudCkge1xuICAgIGxldCB7eCwgeX0gPSBhd2FpdCB0aGlzLmdldExvY2F0aW9uSW5WaWV3KGxvbmdQcmVzcy5vcHRpb25zLmVsZW1lbnQpO1xuICAgIHN0YXJ0WCArPSB4IHx8IDA7XG4gICAgc3RhcnRZICs9IHkgfHwgMDtcbiAgfVxuICBpZiAobW92ZVRvLm9wdGlvbnMuZWxlbWVudCkge1xuICAgIGxldCB7eCwgeX0gPSBhd2FpdCB0aGlzLmdldExvY2F0aW9uSW5WaWV3KG1vdmVUby5vcHRpb25zLmVsZW1lbnQpO1xuICAgIGVuZFggKz0geCB8fCAwO1xuICAgIGVuZFkgKz0geSB8fCAwO1xuICB9XG5cbiAgbGV0IGFwaUxldmVsID0gIGF3YWl0IHRoaXMuYWRiLmdldEFwaUxldmVsKCk7XG4gIC8vIGxvbGxpcG9wIHRha2VzIGEgbGl0dGxlIGxvbmdlciB0byBnZXQgdGhpbmdzIHJvbGxpbmdcbiAgbGV0IGR1cmF0aW9uID0gYXBpTGV2ZWwgPj0gNSA/IDIgOiAxO1xuICAvLyBtYWtlIHN1cmUgdGhhdCBpZiB0aGUgbG9uZyBwcmVzcyBoYXMgYSBkdXJhdGlvbiwgd2UgdXNlIGl0LlxuICBpZiAobG9uZ1ByZXNzLm9wdGlvbnMgJiYgbG9uZ1ByZXNzLm9wdGlvbnMuZHVyYXRpb24pIHtcbiAgICBkdXJhdGlvbiA9IE1hdGgubWF4KGxvbmdQcmVzcy5vcHRpb25zLmR1cmF0aW9uIC8gMTAwMCwgZHVyYXRpb24pO1xuICB9XG5cbiAgLy8gYGRyYWdgIHdpbGwgdGFrZSBjYXJlIG9mIHdoZXRoZXIgdGhlcmUgaXMgYW4gZWxlbWVudCBvciBub3QgYXQgdGhhdCBsZXZlbFxuICByZXR1cm4gYXdhaXQgdGhpcy5kcmFnKHN0YXJ0WCwgc3RhcnRZLCBlbmRYLCBlbmRZLCBkdXJhdGlvbiwgMSwgbG9uZ1ByZXNzLm9wdGlvbnMuZWxlbWVudCwgbW92ZVRvLm9wdGlvbnMuZWxlbWVudCk7XG59O1xuXG4vLyBSZWxlYXNlIGdlc3R1cmUgbmVlZHMgZWxlbWVudCBvciBjby1vcmRpbmF0ZXMgdG8gcmVsZWFzZSBpdCBmcm9tIHRoYXQgcG9zaXRpb25cbi8vIG9yIGVsc2UgcmVsZWFzZSBnZXN0dXJlIGlzIHBlcmZvcm1lZCBmcm9tIGNlbnRlciBvZiB0aGUgc2NyZWVuLCBzbyB0byBmaXggaXRcbi8vIFRoaXMgbWV0aG9kIHNldHMgY28tb3JkaW5hdGVzL2VsZW1lbnQgdG8gcmVsZWFzZSBnZXN0dXJlIGlmIGl0IGhhcyBubyBvcHRpb25zIHNldCBhbHJlYWR5LlxuaGVscGVycy5maXhSZWxlYXNlID0gYXN5bmMgZnVuY3Rpb24gKGdlc3R1cmVzKSB7XG4gIC8vIHNvbWV0aW1lcyB0aGVyZSBhcmUgbm8gb3B0aW9uc1xuICBsZXQgcmVsZWFzZSA9IF8ubGFzdChnZXN0dXJlcyk7XG4gIHJlbGVhc2Uub3B0aW9ucyA9IHJlbGVhc2Uub3B0aW9ucyB8fCB7fTtcbiAgLy8gbm90aGluZyB0byBkbyBpZiByZWxlYXNlIG9wdGlvbnMgYXJlIGFscmVhZHkgc2V0XG4gIGlmIChyZWxlYXNlLm9wdGlvbnMuZWxlbWVudCB8fCAocmVsZWFzZS5vcHRpb25zLnggJiYgcmVsZWFzZS5vcHRpb25zLnkpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIHdpdGhvdXQgY29vcmRpbmF0ZXMsIGByZWxlYXNlYCB1c2VzIHRoZSBjZW50ZXIgb2YgdGhlIHNjcmVlbiwgd2hpY2gsXG4gIC8vIGdlbmVyYWxseSBzcGVha2luZywgaXMgbm90IHdoYXQgd2Ugd2FudFxuICAvLyB0aGVyZWZvcmU6IGxvb3AgYmFja3dhcmRzIGFuZCB1c2UgdGhlIGxhc3QgY29tbWFuZCB3aXRoIGFuIGVsZW1lbnQgYW5kL29yXG4gIC8vIG9mZnNldCBjb29yZGluYXRlc1xuICBnZXN0dXJlcyA9IF8uY2xvbmUoZ2VzdHVyZXMpO1xuICBsZXQgcmVmID0gbnVsbDtcbiAgZm9yIChsZXQgZ2VzdHVyZSBvZiBnZXN0dXJlcy5yZXZlcnNlKCkpIHtcbiAgICBsZXQgb3B0cyA9IGdlc3R1cmUub3B0aW9ucztcbiAgICBpZiAob3B0cy5lbGVtZW50IHx8IChvcHRzLnggJiYgb3B0cy55KSkge1xuICAgICAgcmVmID0gZ2VzdHVyZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBpZiAocmVmKSB7XG4gICAgbGV0IG9wdHMgPSByZWYub3B0aW9ucztcbiAgICBpZiAob3B0cy5lbGVtZW50KSB7XG4gICAgICBsZXQgbG9jID0gYXdhaXQgdGhpcy5nZXRMb2NhdGlvbkluVmlldyhvcHRzLmVsZW1lbnQpO1xuICAgICAgaWYgKG9wdHMueCAmJiBvcHRzLnkpIHtcbiAgICAgICAgLy8gdGhpcyBpcyBhbiBvZmZzZXQgZnJvbSB0aGUgZWxlbWVudFxuICAgICAgICByZWxlYXNlLm9wdGlvbnMgPSB7XG4gICAgICAgICAgeDogbG9jLnggKyBvcHRzLngsXG4gICAgICAgICAgeTogbG9jLnkgKyBvcHRzLnlcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHRoaXMgaXMgdGhlIGNlbnRlciBvZiB0aGUgZWxlbWVudFxuICAgICAgICBsZXQgc2l6ZSA9IGF3YWl0IHRoaXMuZ2V0U2l6ZShvcHRzLmVsZW1lbnQpO1xuICAgICAgICByZWxlYXNlLm9wdGlvbnMgPSB7XG4gICAgICAgICAgeDogbG9jLnggKyBzaXplLndpZHRoIC8gMixcbiAgICAgICAgICB5OiBsb2MueSArIHNpemUuaGVpZ2h0IC8gMlxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZWxlYXNlLm9wdGlvbnMgPSBfLnBpY2sob3B0cywgJ3gnLCAneScpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVsZWFzZTtcbn07XG5cbi8vIFBlcmZvcm0gb25lIGdlc3R1cmVcbmhlbHBlcnMucGVyZm9ybUdlc3R1cmUgPSBhc3luYyBmdW5jdGlvbiAoZ2VzdHVyZSkge1xuICB0cnkge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLmRvVG91Y2hBY3Rpb24oZ2VzdHVyZS5hY3Rpb24sIGdlc3R1cmUub3B0aW9ucyB8fCB7fSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAvLyBzb21ldGltZSB0aGUgZWxlbWVudCBpcyBub3QgYXZhaWxhYmxlIHdoZW4gcmVsZWFzaW5nLCByZXRyeSB3aXRob3V0IGl0XG4gICAgaWYgKGlzRXJyb3JUeXBlKGUsIGVycm9ycy5Ob1N1Y2hFbGVtZW50RXJyb3IpICYmIGdlc3R1cmUuYWN0aW9uID09PSAncmVsZWFzZScgJiZcbiAgICAgICAgZ2VzdHVyZS5vcHRpb25zLmVsZW1lbnQpIHtcbiAgICAgIGRlbGV0ZSBnZXN0dXJlLm9wdGlvbnMuZWxlbWVudDtcbiAgICAgIGxvZy5kZWJ1ZyhgcmV0cnlpbmcgcmVsZWFzZSB3aXRob3V0IGVsZW1lbnQgb3B0czogJHtnZXN0dXJlLm9wdGlvbnN9LmApO1xuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuZG9Ub3VjaEFjdGlvbihnZXN0dXJlLmFjdGlvbiwgZ2VzdHVyZS5vcHRpb25zIHx8IHt9KTtcbiAgICB9XG4gICAgdGhyb3cgZTtcbiAgfVxufTtcblxuY29tbWFuZHMucGVyZm9ybVRvdWNoID0gYXN5bmMgZnVuY3Rpb24gKGdlc3R1cmVzKSB7XG4gIGlmICh0aGlzLmlzV2ViQ29udGV4dCgpKSB7XG4gICAgdGhyb3cgbmV3IGVycm9ycy5Ob3RZZXRJbXBsZW1lbnRlZEVycm9yKCk7XG4gIH1cblxuICAvLyBwcmVzcy13YWl0LW1vdmVUby1yZWxlYXNlIGlzIGBzd2lwZWAsIHNvIHVzZSBuYXRpdmUgbWV0aG9kXG4gIGlmIChnZXN0dXJlcy5sZW5ndGggPT09IDQgJiZcbiAgICAgIGdlc3R1cmVzWzBdLmFjdGlvbiA9PT0gJ3ByZXNzJyAmJlxuICAgICAgZ2VzdHVyZXNbMV0uYWN0aW9uID09PSAnd2FpdCcgJiZcbiAgICAgIGdlc3R1cmVzWzJdLmFjdGlvbiA9PT0gJ21vdmVUbycgJiZcbiAgICAgIGdlc3R1cmVzWzNdLmFjdGlvbiA9PT0gJ3JlbGVhc2UnKSB7XG5cbiAgICBsZXQgc3dpcGVPcHRzID0gYXdhaXQgdGhpcy5nZXRTd2lwZU9wdGlvbnMoZ2VzdHVyZXMpO1xuICAgIHJldHVybiBhd2FpdCB0aGlzLnN3aXBlKHN3aXBlT3B0cy5zdGFydFgsIHN3aXBlT3B0cy5zdGFydFksIHN3aXBlT3B0cy5lbmRYLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXBlT3B0cy5lbmRZLCBzd2lwZU9wdHMuZHVyYXRpb24sIHN3aXBlT3B0cy50b3VjaENvdW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXBlT3B0cy5lbGVtZW50KTtcbiAgfVxuICBsZXQgYWN0aW9ucyA9IF8ucGx1Y2soZ2VzdHVyZXMsIFwiYWN0aW9uXCIpO1xuXG4gIGlmIChhY3Rpb25zWzBdID09PSAnbG9uZ1ByZXNzJyAmJiBhY3Rpb25zWzFdID09PSAnbW92ZVRvJyAmJiBhY3Rpb25zWzJdID09PSAncmVsZWFzZScpIHtcbiAgICAvLyBzb21lIHRoaW5ncyBhcmUgc3BlY2lhbFxuICAgIHJldHVybiBhd2FpdCB0aGlzLmRvVG91Y2hEcmFnKGdlc3R1cmVzKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoYWN0aW9ucy5sZW5ndGggPT09IDIpIHtcbiAgICAgIC8vIGBwcmVzc2Agd2l0aG91dCBhIHdhaXQgaXMgdG9vIHNsb3cgYW5kIGdldHMgaW50ZXJwcmV0dGVkIGFzIGEgYGxvbmdQcmVzc2BcbiAgICAgIGlmIChfLmZpcnN0KGFjdGlvbnMpID09PSAncHJlc3MnICYmIF8ubGFzdChhY3Rpb25zKSA9PT0gJ3JlbGVhc2UnKSB7XG4gICAgICAgIGFjdGlvbnNbMF0gPSAndGFwJztcbiAgICAgICAgZ2VzdHVyZXNbMF0uYWN0aW9uID0gJ3RhcCc7XG4gICAgICB9XG5cbiAgICAgIC8vIHRoZSBgbG9uZ1ByZXNzYCBhbmQgYHRhcGAgbWV0aG9kcyByZWxlYXNlIG9uIHRoZWlyIG93blxuICAgICAgaWYgKChfLmZpcnN0KGFjdGlvbnMpID09PSAndGFwJyB8fCBfLmZpcnN0KGFjdGlvbnMpID09PSAnbG9uZ1ByZXNzJykgJiYgXy5sYXN0KGFjdGlvbnMpID09PSAncmVsZWFzZScpIHtcbiAgICAgICAgZ2VzdHVyZXMucG9wKCk7XG4gICAgICAgIGFjdGlvbnMucG9wKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGxvbmdwcmVzcyBmb2xsb3dlZCBieSBhbnl0aGluZyBvdGhlciB0aGFuIHJlbGVhc2Ugc2hvdWxkIGJlY29tZSBhIHByZXNzIGFuZCB3YWl0XG4gICAgICBpZiAoYWN0aW9uc1swXSA9PT0gJ2xvbmdQcmVzcycpIHtcbiAgICAgICAgYWN0aW9ucyA9IFsncHJlc3MnLCAnd2FpdCcsIC4uLmFjdGlvbnNdO1xuXG4gICAgICAgIGxldCBwcmVzcyA9IGdlc3R1cmVzLnNoaWZ0KCk7XG4gICAgICAgIHByZXNzLmFjdGlvbiA9ICdwcmVzcyc7XG4gICAgICAgIGxldCB3YWl0ID0ge1xuICAgICAgICAgIGFjdGlvbjogJ3dhaXQnLFxuICAgICAgICAgIG9wdGlvbnM6IHttczogcHJlc3Mub3B0aW9ucy5kdXJhdGlvbiB8fCAxMDAwfVxuICAgICAgICB9O1xuICAgICAgICBkZWxldGUgcHJlc3Mub3B0aW9ucy5kdXJhdGlvbjtcbiAgICAgICAgZ2VzdHVyZXMgPSBbcHJlc3MsIHdhaXQsIC4uLmdlc3R1cmVzXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBmaXggcmVsZWFzZSBhY3Rpb24gdGhlbiBwZXJmb3JtIGFsbCBhY3Rpb25zXG4gICAgaWYgKGFjdGlvbnNbYWN0aW9ucy5sZW5ndGggLSAxXSA9PT0gJ3JlbGVhc2UnKSB7XG4gICAgICBhY3Rpb25zW2FjdGlvbnMubGVuZ3RoIC0gMV0gPSBhd2FpdCB0aGlzLmZpeFJlbGVhc2UoZ2VzdHVyZXMpO1xuICAgIH1cblxuICAgIGxldCBmaXhlZEdlc3R1cmVzID0gYXdhaXQgdGhpcy5wYXJzZVRvdWNoKGdlc3R1cmVzLCBmYWxzZSk7XG4gICAgZm9yIChsZXQgZyBvZiBmaXhlZEdlc3R1cmVzKSB7XG4gICAgICBhd2FpdCB0aGlzLnBlcmZvcm1HZXN0dXJlKGcpO1xuICAgIH1cbiAgfVxufTtcblxuaGVscGVycy5wYXJzZVRvdWNoID0gYXN5bmMgZnVuY3Rpb24gKGdlc3R1cmVzLCBtdWx0aSkge1xuICAvLyBiZWNhdXNlIG11bHRpLXRvdWNoIHJlbGVhc2VzIGF0IHRoZSBlbmQgYnkgZGVmYXVsdFxuICBpZiAobXVsdGkgJiYgXy5sYXN0KGdlc3R1cmVzKS5hY3Rpb24gPT09ICdyZWxlYXNlJykge1xuICAgIGdlc3R1cmVzLnBvcCgpO1xuICB9XG5cbiAgbGV0IHRvdWNoU3RhdGVPYmplY3RzID0gYXdhaXQgYXN5bmNtYXAoZ2VzdHVyZXMsIGFzeW5jIChnZXN0dXJlKSA9PiB7XG4gICAgbGV0IG9wdGlvbnMgPSBnZXN0dXJlLm9wdGlvbnM7XG4gICAgaWYgKF8uY29udGFpbnMoWydwcmVzcycsICdtb3ZlVG8nLCAndGFwJywgJ2xvbmdQcmVzcyddLCBnZXN0dXJlLmFjdGlvbikpIHtcbiAgICAgIG9wdGlvbnMub2Zmc2V0ID0gZmFsc2U7XG4gICAgICBsZXQgZWxlbWVudElkID0gZ2VzdHVyZS5vcHRpb25zLmVsZW1lbnQ7XG4gICAgICBpZiAoZWxlbWVudElkKSB7XG4gICAgICAgIGxldCBwb3MgPSBhd2FpdCB0aGlzLmdldExvY2F0aW9uSW5WaWV3KGVsZW1lbnRJZCk7XG4gICAgICAgIGxldCBzaXplID0gYXdhaXQgdGhpcy5nZXRTaXplKGVsZW1lbnRJZCk7XG4gICAgICAgIGlmIChnZXN0dXJlLm9wdGlvbnMueCB8fCBnZXN0dXJlLm9wdGlvbnMueSkge1xuICAgICAgICAgIG9wdGlvbnMueCA9IHBvcy54ICsgKGdlc3R1cmUub3B0aW9ucy54IHx8IDApO1xuICAgICAgICAgIG9wdGlvbnMueSA9IHBvcy55ICsgKGdlc3R1cmUub3B0aW9ucy55IHx8IDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9wdGlvbnMueCA9ICBwb3MueCArIChzaXplLndpZHRoIC8gMik7XG4gICAgICAgICAgb3B0aW9ucy55ID0gcG9zLnkgKyAoc2l6ZS5oZWlnaHQgLyAyKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdG91Y2hTdGF0ZU9iamVjdCA9IHtcbiAgICAgICAgICBhY3Rpb246IGdlc3R1cmUuYWN0aW9uLFxuICAgICAgICAgIG9wdGlvbnMsXG4gICAgICAgICAgdGltZU9mZnNldDogMC4wMDUsXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0b3VjaFN0YXRlT2JqZWN0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZXhwZWN0cyBhYnNvbHV0ZSBjb29yZGluYXRlcywgc28gd2UgbmVlZCB0byBzYXZlIHRoZXNlIGFzIG9mZnNldHNcbiAgICAgICAgLy8gYW5kIHRoZW4gdHJhbnNsYXRlIHdoZW4gZXZlcnl0aGluZyBpcyBkb25lXG4gICAgICAgIG9wdGlvbnMub2Zmc2V0ID0gdHJ1ZTtcbiAgICAgICAgb3B0aW9ucy54ID0gKGdlc3R1cmUub3B0aW9ucy54IHx8IDApO1xuICAgICAgICBvcHRpb25zLnkgPSAoZ2VzdHVyZS5vcHRpb25zLnkgfHwgMCk7XG5cbiAgICAgICAgbGV0IHRvdWNoU3RhdGVPYmplY3QgPSB7XG4gICAgICAgICAgYWN0aW9uOiBnZXN0dXJlLmFjdGlvbixcbiAgICAgICAgICBvcHRpb25zLFxuICAgICAgICAgIHRpbWVPZmZzZXQ6IDAuMDA1LFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdG91Y2hTdGF0ZU9iamVjdDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IG9mZnNldCA9IDAuMDA1O1xuICAgICAgaWYgKGdlc3R1cmUuYWN0aW9uID09PSAnd2FpdCcpIHtcbiAgICAgICAgb3B0aW9ucyA9IGdlc3R1cmUub3B0aW9ucztcbiAgICAgICAgb2Zmc2V0ID0gKHBhcnNlSW50KGdlc3R1cmUub3B0aW9ucy5tcykgLyAxMDAwKTtcbiAgICAgIH1cbiAgICAgIGxldCB0b3VjaFN0YXRlT2JqZWN0ID0ge1xuICAgICAgICBhY3Rpb246IGdlc3R1cmUuYWN0aW9uLFxuICAgICAgICBvcHRpb25zLFxuICAgICAgICB0aW1lT2Zmc2V0OiBvZmZzZXQsXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHRvdWNoU3RhdGVPYmplY3Q7XG4gICAgfVxuICB9LCBmYWxzZSk7XG4gIC8vIHdlIG5lZWQgdG8gY2hhbmdlIHRoZSB0aW1lICh3aGljaCBpcyBub3cgYW4gb2Zmc2V0KVxuICAvLyBhbmQgdGhlIHBvc2l0aW9uICh3aGljaCBtYXkgYmUgYW4gb2Zmc2V0KVxuICBsZXQgcHJldlBvcyA9IG51bGwsXG4gICAgICB0aW1lID0gMDtcbiAgZm9yIChsZXQgc3RhdGUgb2YgdG91Y2hTdGF0ZU9iamVjdHMpIHtcbiAgICBpZiAoXy5pc1VuZGVmaW5lZChzdGF0ZS5vcHRpb25zLngpICYmIF8uaXNVbmRlZmluZWQoc3RhdGUub3B0aW9ucy55KSkge1xuICAgICAgLy8gdGhpcyBoYXBwZW5zIHdpdGggd2FpdFxuICAgICAgc3RhdGUub3B0aW9ucy54ID0gcHJldlBvcy54O1xuICAgICAgc3RhdGUub3B0aW9ucy55ID0gcHJldlBvcy55O1xuICAgIH1cbiAgICBpZiAoc3RhdGUub3B0aW9ucy5vZmZzZXQgJiYgcHJldlBvcykge1xuICAgICAgLy8gdGhlIGN1cnJlbnQgcG9zaXRpb24gaXMgYW4gb2Zmc2V0XG4gICAgICBzdGF0ZS5vcHRpb25zLnggKz0gcHJldlBvcy54O1xuICAgICAgc3RhdGUub3B0aW9ucy55ICs9IHByZXZQb3MueTtcbiAgICB9XG4gICAgZGVsZXRlIHN0YXRlLm9wdGlvbnMub2Zmc2V0O1xuICAgIHByZXZQb3MgPSBzdGF0ZS5vcHRpb25zO1xuXG4gICAgaWYgKG11bHRpKSB7XG4gICAgICB2YXIgdGltZU9mZnNldCA9IHN0YXRlLnRpbWVPZmZzZXQ7XG4gICAgICB0aW1lICs9IHRpbWVPZmZzZXQ7XG4gICAgICBzdGF0ZS50aW1lID0gYW5kcm9pZEhlbHBlcnMudHJ1bmNhdGVEZWNpbWFscyh0aW1lLCAzKTtcblxuICAgICAgLy8gbXVsdGkgZ2VzdHVyZXMgcmVxdWlyZSAndG91Y2gnIHJhdGhlciB0aGFuICdvcHRpb25zJ1xuICAgICAgc3RhdGUudG91Y2ggPSBzdGF0ZS5vcHRpb25zO1xuICAgICAgZGVsZXRlIHN0YXRlLm9wdGlvbnM7XG4gICAgfVxuICAgIGRlbGV0ZSBzdGF0ZS50aW1lT2Zmc2V0O1xuICB9XG4gIHJldHVybiB0b3VjaFN0YXRlT2JqZWN0cztcbn07XG5cblxuY29tbWFuZHMucGVyZm9ybU11bHRpQWN0aW9uID0gYXN5bmMgZnVuY3Rpb24gKGFjdGlvbnMsIGVsZW1lbnRJZCkge1xuICBpZiAodGhpcy5pc1dlYkNvbnRleHQoKSkge1xuICAgIHRocm93IG5ldyBlcnJvcnMuTm90WWV0SW1wbGVtZW50ZWRFcnJvcigpO1xuICB9XG5cbiAgLy8gQW5kcm9pZCBuZWVkcyBhdCBsZWFzdCB0d28gYWN0aW9ucyB0byBiZSBhYmxlIHRvIHBlcmZvcm0gYSBtdWx0aSBwb2ludGVyIGdlc3R1cmVcbiAgaWYgKGFjdGlvbnMubGVuZ3RoID09PSAxKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTXVsdGkgUG9pbnRlciBHZXN0dXJlcyBuZWVkIGF0IGxlYXN0IHR3byBhY3Rpb25zLiBcIiArXG4gICAgICAgICAgICAgICAgICAgIFwiVXNlIFRvdWNoIEFjdGlvbnMgZm9yIGEgc2luZ2xlIGFjdGlvbi5cIik7XG4gIH1cblxuICBsZXQgc3RhdGVzID0gYXdhaXQgYXN5bmNtYXAoYWN0aW9ucywgYXN5bmMgKGFjdGlvbikgPT4ge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLnBhcnNlVG91Y2goYWN0aW9uLCB0cnVlKTtcbiAgfSwgZmFsc2UpO1xuXG4gIGxldCBvcHRzO1xuICBpZiAoZWxlbWVudElkKSB7XG4gICAgb3B0cyA9IHtcbiAgICAgIGVsZW1lbnRJZCxcbiAgICAgIGFjdGlvbnM6IHN0YXRlc1xuICAgIH07XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oXCJlbGVtZW50OnBlcmZvcm1NdWx0aVBvaW50ZXJHZXN0dXJlXCIsIG9wdHMpO1xuICB9IGVsc2Uge1xuICAgIG9wdHMgPSB7XG4gICAgICBhY3Rpb25zOiBzdGF0ZXNcbiAgICB9O1xuICAgIHJldHVybiBhd2FpdCB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKFwicGVyZm9ybU11bHRpUG9pbnRlckdlc3R1cmVcIiwgb3B0cyk7XG4gIH1cbn07XG5cbk9iamVjdC5hc3NpZ24oZXh0ZW5zaW9ucywgY29tbWFuZHMsIGhlbHBlcnMpO1xuZXhwb3J0IHsgY29tbWFuZHMsIGhlbHBlcnMgfTtcbmV4cG9ydCBkZWZhdWx0IGV4dGVuc2lvbnM7XG4iXX0=