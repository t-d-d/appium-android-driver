"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _Object$assign = require("babel-runtime/core-js/object/assign")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _androidHelpers = require('../android-helpers');

var _androidHelpers2 = _interopRequireDefault(_androidHelpers);

//import _ from 'lodash';
//import { errors } from 'mobile-json-wire-protocol';
//import log from '../logger';

var commands = {},
    helpers = {},
    extensions = {};

commands.getAttribute = function callee$0$0(attribute, elementId) {
  var p;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        p = { attribute: attribute, elementId: elementId };
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:getAttribute", p));

      case 3:
        return context$1$0.abrupt("return", context$1$0.sent);

      case 4:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getName = function callee$0$0(elementId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getAttribute("className", elementId));

      case 2:
        return context$1$0.abrupt("return", context$1$0.sent);

      case 3:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

commands.elementDisplayed = function callee$0$0(elementId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getAttribute("displayed", elementId));

      case 2:
        context$1$0.t0 = context$1$0.sent;
        return context$1$0.abrupt("return", context$1$0.t0 === 'true');

      case 4:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

commands.elementEnabled = function callee$0$0(elementId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getAttribute("enabled", elementId));

      case 2:
        context$1$0.t0 = context$1$0.sent;
        return context$1$0.abrupt("return", context$1$0.t0 === 'true');

      case 4:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

commands.elementSelected = function callee$0$0(elementId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getAttribute("selected", elementId));

      case 2:
        context$1$0.t0 = context$1$0.sent;
        return context$1$0.abrupt("return", context$1$0.t0 === 'true');

      case 4:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.setElementValue = function callee$0$0(keys, elementId) {
  var replace = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
  var text, params;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        text = keys;

        if (keys instanceof Array) {
          text = keys.join("");
        }

        params = {
          elementId: elementId,
          text: text,
          replace: replace,
          unicodeKeyboard: this.opts.unicodeKeyboard
        };
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:setText", params));

      case 5:
        return context$1$0.abrupt("return", context$1$0.sent);

      case 6:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

commands.setValue = function callee$0$0(keys, elementId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.setElementValue(keys, elementId, false));

      case 2:
        return context$1$0.abrupt("return", context$1$0.sent);

      case 3:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

commands.replaceValue = function callee$0$0(keys, elementId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.setElementValue(keys, elementId, true));

      case 2:
        return context$1$0.abrupt("return", context$1$0.sent);

      case 3:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

commands.setValueImmediate = function callee$0$0(keys, elementId) {
  var text;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        text = keys;

        if (keys instanceof Array) {
          text = keys.join("");
        }

        // first, make sure we are focused on the element
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.click(elementId));

      case 4:
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.adb.inputText(text));

      case 6:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getText = function callee$0$0(elementId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:getText", { elementId: elementId }));

      case 2:
        return context$1$0.abrupt("return", context$1$0.sent);

      case 3:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

commands.clear = function callee$0$0(elementId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:clear", { elementId: elementId }));

      case 2:
        return context$1$0.abrupt("return", context$1$0.sent);

      case 3:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

commands.click = function callee$0$0(elementId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:click", { elementId: elementId }));

      case 2:
        return context$1$0.abrupt("return", context$1$0.sent);

      case 3:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getLocation = function callee$0$0(elementId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:getLocation", { elementId: elementId }));

      case 2:
        return context$1$0.abrupt("return", context$1$0.sent);

      case 3:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getLocationInView = function callee$0$0(elementId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getLocation(elementId));

      case 2:
        return context$1$0.abrupt("return", context$1$0.sent);

      case 3:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getSize = function callee$0$0(elementId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:getSize", { elementId: elementId }));

      case 2:
        return context$1$0.abrupt("return", context$1$0.sent);

      case 3:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

commands.touchLongClick = function callee$0$0(elementId, x, y, duration) {
  var params;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        params = { elementId: elementId, x: x, y: y, duration: duration };

        _androidHelpers2["default"].removeNullProperties(params);
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:touchLongClick", params));

      case 4:
        return context$1$0.abrupt("return", context$1$0.sent);

      case 5:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

commands.touchDown = function callee$0$0(elementId, x, y) {
  var params;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        params = { elementId: elementId, x: x, y: y };

        _androidHelpers2["default"].removeNullProperties(params);
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:touchDown", params));

      case 4:
        return context$1$0.abrupt("return", context$1$0.sent);

      case 5:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

commands.touchUp = function callee$0$0(elementId, x, y) {
  var params;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        params = { elementId: elementId, x: x, y: y };

        _androidHelpers2["default"].removeNullProperties(params);
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:touchUp", params));

      case 4:
        return context$1$0.abrupt("return", context$1$0.sent);

      case 5:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

commands.touchMove = function callee$0$0(elementId, x, y) {
  var params;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        params = { elementId: elementId, x: x, y: y };

        _androidHelpers2["default"].removeNullProperties(params);
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:touchMove", params));

      case 4:
        return context$1$0.abrupt("return", context$1$0.sent);

      case 5:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

commands.complexTap = function callee$0$0(tapCount, touchCount, duration, x, y) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("click", { x: x, y: y }));

      case 2:
        return context$1$0.abrupt("return", context$1$0.sent);

      case 3:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

commands.tap = function callee$0$0(elementId) {
  var x = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
  var y = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
  var count = arguments.length <= 3 || arguments[3] === undefined ? 1 : arguments[3];
  var i;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        i = 0;

      case 1:
        if (!(i < count)) {
          context$1$0.next = 17;
          break;
        }

        if (!elementId) {
          context$1$0.next = 12;
          break;
        }

        if (!(x !== 0 || y !== 0)) {
          context$1$0.next = 8;
          break;
        }

        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:click", { elementId: elementId, x: x, y: y }));

      case 6:
        context$1$0.next = 10;
        break;

      case 8:
        context$1$0.next = 10;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:click", { elementId: elementId }));

      case 10:
        context$1$0.next = 14;
        break;

      case 12:
        context$1$0.next = 14;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("click", { x: x, y: y }));

      case 14:
        i++;
        context$1$0.next = 1;
        break;

      case 17:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

_Object$assign(extensions, commands, helpers);
exports.commands = commands;
exports.helpers = helpers;
exports["default"] = extensions;

// then send through adb

// we are either tapping on the default location of the element
// or an offset from the top left corner
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9lbGVtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs4QkFBMkIsb0JBQW9COzs7Ozs7OztBQUsvQyxJQUFJLFFBQVEsR0FBRyxFQUFFO0lBQUUsT0FBTyxHQUFHLEVBQUU7SUFBRSxVQUFVLEdBQUcsRUFBRSxDQUFDOztBQUVqRCxRQUFRLENBQUMsWUFBWSxHQUFHLG9CQUFnQixTQUFTLEVBQUUsU0FBUztNQUN0RCxDQUFDOzs7O0FBQUQsU0FBQyxHQUFHLEVBQUMsU0FBUyxFQUFULFNBQVMsRUFBRSxTQUFTLEVBQVQsU0FBUyxFQUFDOzt5Q0FDakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxDQUFDOzs7Ozs7Ozs7O0NBQ2xFLENBQUM7O0FBRUYsUUFBUSxDQUFDLE9BQU8sR0FBRyxvQkFBZ0IsU0FBUzs7Ozs7eUNBQzdCLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQzs7Ozs7Ozs7OztDQUN2RCxDQUFDOztBQUVGLFFBQVEsQ0FBQyxnQkFBZ0IsR0FBRyxvQkFBZ0IsU0FBUzs7Ozs7eUNBQ3RDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQzs7OzsrREFBSyxNQUFNOzs7Ozs7O0NBQ2xFLENBQUM7O0FBRUYsUUFBUSxDQUFDLGNBQWMsR0FBRyxvQkFBZ0IsU0FBUzs7Ozs7eUNBQ3BDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQzs7OzsrREFBSyxNQUFNOzs7Ozs7O0NBQ2hFLENBQUM7O0FBRUYsUUFBUSxDQUFDLGVBQWUsR0FBRyxvQkFBZ0IsU0FBUzs7Ozs7eUNBQ3JDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQzs7OzsrREFBSyxNQUFNOzs7Ozs7O0NBQ2pFLENBQUM7O0FBRUYsT0FBTyxDQUFDLGVBQWUsR0FBRyxvQkFBZ0IsSUFBSSxFQUFFLFNBQVM7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RUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDcEMsUUFBUSxHQUFSLFFBQVE7UUFBRSxPQUFPLEdBQVAsT0FBTztxQkFDWCxVQUFVIiwiZmlsZSI6ImxpYi9jb21tYW5kcy9lbGVtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFuZHJvaWRIZWxwZXJzIGZyb20gJy4uL2FuZHJvaWQtaGVscGVycyc7XG4vL2ltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG4vL2ltcG9ydCB7IGVycm9ycyB9IGZyb20gJ21vYmlsZS1qc29uLXdpcmUtcHJvdG9jb2wnO1xuLy9pbXBvcnQgbG9nIGZyb20gJy4uL2xvZ2dlcic7XG5cbmxldCBjb21tYW5kcyA9IHt9LCBoZWxwZXJzID0ge30sIGV4dGVuc2lvbnMgPSB7fTtcblxuY29tbWFuZHMuZ2V0QXR0cmlidXRlID0gYXN5bmMgZnVuY3Rpb24gKGF0dHJpYnV0ZSwgZWxlbWVudElkKSB7XG4gIGxldCBwID0ge2F0dHJpYnV0ZSwgZWxlbWVudElkfTtcbiAgcmV0dXJuIGF3YWl0IHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oXCJlbGVtZW50OmdldEF0dHJpYnV0ZVwiLCBwKTtcbn07XG5cbmNvbW1hbmRzLmdldE5hbWUgPSBhc3luYyBmdW5jdGlvbiAoZWxlbWVudElkKSB7XG4gIHJldHVybiBhd2FpdCB0aGlzLmdldEF0dHJpYnV0ZShcImNsYXNzTmFtZVwiLCBlbGVtZW50SWQpO1xufTtcblxuY29tbWFuZHMuZWxlbWVudERpc3BsYXllZCA9IGFzeW5jIGZ1bmN0aW9uIChlbGVtZW50SWQpIHtcbiAgcmV0dXJuIGF3YWl0IHRoaXMuZ2V0QXR0cmlidXRlKFwiZGlzcGxheWVkXCIsIGVsZW1lbnRJZCkgPT09ICd0cnVlJztcbn07XG5cbmNvbW1hbmRzLmVsZW1lbnRFbmFibGVkID0gYXN5bmMgZnVuY3Rpb24gKGVsZW1lbnRJZCkge1xuICByZXR1cm4gYXdhaXQgdGhpcy5nZXRBdHRyaWJ1dGUoXCJlbmFibGVkXCIsIGVsZW1lbnRJZCkgPT09ICd0cnVlJztcbn07XG5cbmNvbW1hbmRzLmVsZW1lbnRTZWxlY3RlZCA9IGFzeW5jIGZ1bmN0aW9uIChlbGVtZW50SWQpIHtcbiAgcmV0dXJuIGF3YWl0IHRoaXMuZ2V0QXR0cmlidXRlKFwic2VsZWN0ZWRcIiwgZWxlbWVudElkKSA9PT0gJ3RydWUnO1xufTtcblxuaGVscGVycy5zZXRFbGVtZW50VmFsdWUgPSBhc3luYyBmdW5jdGlvbiAoa2V5cywgZWxlbWVudElkLCByZXBsYWNlID0gZmFsc2UpIHtcbiAgbGV0IHRleHQgPSBrZXlzO1xuICBpZiAoa2V5cyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgdGV4dCA9IGtleXMuam9pbihcIlwiKTtcbiAgfVxuXG4gIGxldCBwYXJhbXMgPSB7XG4gICAgZWxlbWVudElkLFxuICAgIHRleHQsXG4gICAgcmVwbGFjZSxcbiAgICB1bmljb2RlS2V5Ym9hcmQ6IHRoaXMub3B0cy51bmljb2RlS2V5Ym9hcmRcbiAgfTtcblxuICByZXR1cm4gYXdhaXQgdGhpcy5ib290c3RyYXAuc2VuZEFjdGlvbihcImVsZW1lbnQ6c2V0VGV4dFwiLCBwYXJhbXMpO1xufTtcblxuY29tbWFuZHMuc2V0VmFsdWUgPSBhc3luYyBmdW5jdGlvbiAoa2V5cywgZWxlbWVudElkKSB7XG4gIHJldHVybiBhd2FpdCB0aGlzLnNldEVsZW1lbnRWYWx1ZShrZXlzLCBlbGVtZW50SWQsIGZhbHNlKTtcbn07XG5cbmNvbW1hbmRzLnJlcGxhY2VWYWx1ZSA9IGFzeW5jIGZ1bmN0aW9uIChrZXlzLCBlbGVtZW50SWQpIHtcbiAgcmV0dXJuIGF3YWl0IHRoaXMuc2V0RWxlbWVudFZhbHVlKGtleXMsIGVsZW1lbnRJZCwgdHJ1ZSk7XG59O1xuXG5jb21tYW5kcy5zZXRWYWx1ZUltbWVkaWF0ZSA9IGFzeW5jIGZ1bmN0aW9uIChrZXlzLCBlbGVtZW50SWQpIHtcbiAgbGV0IHRleHQgPSBrZXlzO1xuICBpZiAoa2V5cyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgdGV4dCA9IGtleXMuam9pbihcIlwiKTtcbiAgfVxuXG4gIC8vIGZpcnN0LCBtYWtlIHN1cmUgd2UgYXJlIGZvY3VzZWQgb24gdGhlIGVsZW1lbnRcbiAgYXdhaXQgdGhpcy5jbGljayhlbGVtZW50SWQpO1xuXG4gIC8vIHRoZW4gc2VuZCB0aHJvdWdoIGFkYlxuICBhd2FpdCB0aGlzLmFkYi5pbnB1dFRleHQodGV4dCk7XG59O1xuXG5jb21tYW5kcy5nZXRUZXh0ID0gYXN5bmMgZnVuY3Rpb24gKGVsZW1lbnRJZCkge1xuICByZXR1cm4gYXdhaXQgdGhpcy5ib290c3RyYXAuc2VuZEFjdGlvbihcImVsZW1lbnQ6Z2V0VGV4dFwiLCB7ZWxlbWVudElkfSk7XG59O1xuXG5jb21tYW5kcy5jbGVhciA9IGFzeW5jIGZ1bmN0aW9uIChlbGVtZW50SWQpIHtcbiAgcmV0dXJuIGF3YWl0IHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oXCJlbGVtZW50OmNsZWFyXCIsIHtlbGVtZW50SWR9KTtcbn07XG5cbmNvbW1hbmRzLmNsaWNrID0gYXN5bmMgZnVuY3Rpb24gKGVsZW1lbnRJZCkge1xuICByZXR1cm4gYXdhaXQgdGhpcy5ib290c3RyYXAuc2VuZEFjdGlvbihcImVsZW1lbnQ6Y2xpY2tcIiwge2VsZW1lbnRJZH0pO1xufTtcblxuY29tbWFuZHMuZ2V0TG9jYXRpb24gPSBhc3luYyBmdW5jdGlvbiAoZWxlbWVudElkKSB7XG4gIHJldHVybiBhd2FpdCB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKFwiZWxlbWVudDpnZXRMb2NhdGlvblwiLCB7ZWxlbWVudElkfSk7XG59O1xuXG5jb21tYW5kcy5nZXRMb2NhdGlvbkluVmlldyA9IGFzeW5jIGZ1bmN0aW9uIChlbGVtZW50SWQpIHtcbiAgcmV0dXJuIGF3YWl0IHRoaXMuZ2V0TG9jYXRpb24oZWxlbWVudElkKTtcbn07XG5cbmNvbW1hbmRzLmdldFNpemUgPSBhc3luYyBmdW5jdGlvbiAoZWxlbWVudElkKSB7XG4gIHJldHVybiBhd2FpdCB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKFwiZWxlbWVudDpnZXRTaXplXCIsIHtlbGVtZW50SWR9KTtcbn07XG5cbmNvbW1hbmRzLnRvdWNoTG9uZ0NsaWNrID0gYXN5bmMgZnVuY3Rpb24gKGVsZW1lbnRJZCwgeCwgeSwgZHVyYXRpb24pIHtcbiAgbGV0IHBhcmFtcyA9IHtlbGVtZW50SWQsIHgsIHksIGR1cmF0aW9ufTtcbiAgYW5kcm9pZEhlbHBlcnMucmVtb3ZlTnVsbFByb3BlcnRpZXMocGFyYW1zKTtcbiAgcmV0dXJuIGF3YWl0IHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oXCJlbGVtZW50OnRvdWNoTG9uZ0NsaWNrXCIsIHBhcmFtcyk7XG59O1xuXG5jb21tYW5kcy50b3VjaERvd24gPSBhc3luYyBmdW5jdGlvbiAoZWxlbWVudElkLCB4LCB5KSB7XG4gIGxldCBwYXJhbXMgPSB7ZWxlbWVudElkLCB4LCB5fTtcbiAgYW5kcm9pZEhlbHBlcnMucmVtb3ZlTnVsbFByb3BlcnRpZXMocGFyYW1zKTtcbiAgcmV0dXJuIGF3YWl0IHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oXCJlbGVtZW50OnRvdWNoRG93blwiLCBwYXJhbXMpO1xufTtcblxuY29tbWFuZHMudG91Y2hVcCA9IGFzeW5jIGZ1bmN0aW9uIChlbGVtZW50SWQsIHgsIHkpIHtcbiAgbGV0IHBhcmFtcyA9IHtlbGVtZW50SWQsIHgsIHl9O1xuICBhbmRyb2lkSGVscGVycy5yZW1vdmVOdWxsUHJvcGVydGllcyhwYXJhbXMpO1xuICByZXR1cm4gYXdhaXQgdGhpcy5ib290c3RyYXAuc2VuZEFjdGlvbihcImVsZW1lbnQ6dG91Y2hVcFwiLCBwYXJhbXMpO1xufTtcblxuY29tbWFuZHMudG91Y2hNb3ZlID0gYXN5bmMgZnVuY3Rpb24gKGVsZW1lbnRJZCwgeCwgeSkge1xuICBsZXQgcGFyYW1zID0ge2VsZW1lbnRJZCwgeCwgeX07XG4gIGFuZHJvaWRIZWxwZXJzLnJlbW92ZU51bGxQcm9wZXJ0aWVzKHBhcmFtcyk7XG4gIHJldHVybiBhd2FpdCB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKFwiZWxlbWVudDp0b3VjaE1vdmVcIiwgcGFyYW1zKTtcbn07XG5cbmNvbW1hbmRzLmNvbXBsZXhUYXAgPSBhc3luYyBmdW5jdGlvbiAodGFwQ291bnQsIHRvdWNoQ291bnQsIGR1cmF0aW9uLCB4LCB5KSB7XG4gIHJldHVybiBhd2FpdCB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKFwiY2xpY2tcIiwge3gsIHl9KTtcbn07XG5cbmNvbW1hbmRzLnRhcCA9IGFzeW5jIGZ1bmN0aW9uIChlbGVtZW50SWQsIHggPSAwLCB5ID0gMCwgY291bnQgPSAxKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgIGlmIChlbGVtZW50SWQpIHtcbiAgICAgIC8vIHdlIGFyZSBlaXRoZXIgdGFwcGluZyBvbiB0aGUgZGVmYXVsdCBsb2NhdGlvbiBvZiB0aGUgZWxlbWVudFxuICAgICAgLy8gb3IgYW4gb2Zmc2V0IGZyb20gdGhlIHRvcCBsZWZ0IGNvcm5lclxuICAgICAgaWYgKHggIT09IDAgfHwgeSAhPT0gMCkge1xuICAgICAgICBhd2FpdCB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKFwiZWxlbWVudDpjbGlja1wiLCB7ZWxlbWVudElkLCB4LCB5fSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhd2FpdCB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKFwiZWxlbWVudDpjbGlja1wiLCB7ZWxlbWVudElkfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGF3YWl0IHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oXCJjbGlja1wiLCB7eCwgeX0pO1xuICAgIH1cbiAgfVxufTtcblxuT2JqZWN0LmFzc2lnbihleHRlbnNpb25zLCBjb21tYW5kcywgaGVscGVycyk7XG5leHBvcnQgeyBjb21tYW5kcywgaGVscGVycyB9O1xuZXhwb3J0IGRlZmF1bHQgZXh0ZW5zaW9ucztcbiJdfQ==