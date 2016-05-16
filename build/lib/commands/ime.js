'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var _mobileJsonWireProtocol = require('mobile-json-wire-protocol');

var commands = {},
    helpers = {},
    extensions = {};

commands.isIMEActivated = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        return context$1$0.abrupt('return', true);

      case 1:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.availableIMEEngines = function callee$0$0() {
  var engines;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].debug("Retrieving available IMEs");
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adb.availableIMEs());

      case 3:
        engines = context$1$0.sent;

        _logger2['default'].debug('Engines: ' + JSON.stringify(engines));
        return context$1$0.abrupt('return', engines);

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getActiveIMEEngine = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].debug("Retrieving current default IME");
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adb.defaultIME());

      case 3:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.activateIMEEngine = function callee$0$0(imeId) {
  var availableEngines;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].debug('Attempting to activate IME ' + imeId);
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adb.availableIMEs());

      case 3:
        availableEngines = context$1$0.sent;

        if (!(availableEngines.indexOf(imeId) === -1)) {
          context$1$0.next = 7;
          break;
        }

        _logger2['default'].debug("IME not found, failing");
        throw new _mobileJsonWireProtocol.errors.IMENotAvailableError();

      case 7:
        _logger2['default'].debug("Found installed IME, attempting to activate");
        context$1$0.next = 10;
        return _regeneratorRuntime.awrap(this.adb.enableIME(imeId));

      case 10:
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(this.adb.setIME(imeId));

      case 12:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.deactivateIMEEngine = function callee$0$0() {
  var currentEngine;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getActiveIMEEngine());

      case 2:
        currentEngine = context$1$0.sent;

        _logger2['default'].debug('Attempting to deactivate ' + currentEngine);
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.adb.disableIME(currentEngine));

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

_Object$assign(extensions, commands, helpers);
exports.commands = commands;
exports.helpers = helpers;
exports['default'] = extensions;

// IME is always activated on Android devices
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9pbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O3NCQUFnQixXQUFXOzs7O3NDQUNKLDJCQUEyQjs7QUFFbEQsSUFBSSxRQUFRLEdBQUcsRUFBRTtJQUFFLE9BQU8sR0FBRyxFQUFFO0lBQUUsVUFBVSxHQUFHLEVBQUUsQ0FBQzs7QUFFakQsUUFBUSxDQUFDLGNBQWMsR0FBRzs7Ozs0Q0FFakIsSUFBSTs7Ozs7OztDQUNaLENBQUM7O0FBRUYsUUFBUSxDQUFDLG1CQUFtQixHQUFHO01BRXpCLE9BQU87Ozs7QUFEWCw0QkFBSSxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQzs7eUNBQ25CLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFOzs7QUFBeEMsZUFBTzs7QUFDWCw0QkFBSSxLQUFLLGVBQWEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBRyxDQUFDOzRDQUMxQyxPQUFPOzs7Ozs7O0NBQ2YsQ0FBQzs7QUFFRixRQUFRLENBQUMsa0JBQWtCLEdBQUc7Ozs7QUFDNUIsNEJBQUksS0FBSyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7O3lDQUMvQixJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRTs7Ozs7Ozs7OztDQUNuQyxDQUFDOztBQUVGLFFBQVEsQ0FBQyxpQkFBaUIsR0FBRyxvQkFBZ0IsS0FBSztNQUU1QyxnQkFBZ0I7Ozs7QUFEcEIsNEJBQUksS0FBSyxpQ0FBK0IsS0FBSyxDQUFHLENBQUM7O3lDQUNwQixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRTs7O0FBQWpELHdCQUFnQjs7Y0FDaEIsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBOzs7OztBQUN4Qyw0QkFBSSxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQztjQUM5QixJQUFJLCtCQUFPLG9CQUFvQixFQUFFOzs7QUFFekMsNEJBQUksS0FBSyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7O3lDQUNuRCxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7Ozs7eUNBQ3pCLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQzs7Ozs7OztDQUM3QixDQUFDOztBQUVGLFFBQVEsQ0FBQyxtQkFBbUIsR0FBRztNQUN6QixhQUFhOzs7Ozt5Q0FBUyxJQUFJLENBQUMsa0JBQWtCLEVBQUU7OztBQUEvQyxxQkFBYTs7QUFDakIsNEJBQUksS0FBSywrQkFBNkIsYUFBYSxDQUFHLENBQUM7O3lDQUNqRCxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUM7Ozs7Ozs7Q0FDekMsQ0FBQzs7QUFFRixlQUFjLFVBQVUsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDcEMsUUFBUSxHQUFSLFFBQVE7UUFBRSxPQUFPLEdBQVAsT0FBTztxQkFDWCxVQUFVIiwiZmlsZSI6ImxpYi9jb21tYW5kcy9pbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbG9nIGZyb20gJy4uL2xvZ2dlcic7XG5pbXBvcnQgeyBlcnJvcnMgfSBmcm9tICdtb2JpbGUtanNvbi13aXJlLXByb3RvY29sJztcblxubGV0IGNvbW1hbmRzID0ge30sIGhlbHBlcnMgPSB7fSwgZXh0ZW5zaW9ucyA9IHt9O1xuXG5jb21tYW5kcy5pc0lNRUFjdGl2YXRlZCA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgLy8gSU1FIGlzIGFsd2F5cyBhY3RpdmF0ZWQgb24gQW5kcm9pZCBkZXZpY2VzXG4gIHJldHVybiB0cnVlO1xufTtcblxuY29tbWFuZHMuYXZhaWxhYmxlSU1FRW5naW5lcyA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgbG9nLmRlYnVnKFwiUmV0cmlldmluZyBhdmFpbGFibGUgSU1Fc1wiKTtcbiAgbGV0IGVuZ2luZXMgPSBhd2FpdCB0aGlzLmFkYi5hdmFpbGFibGVJTUVzKCk7XG4gIGxvZy5kZWJ1ZyhgRW5naW5lczogJHtKU09OLnN0cmluZ2lmeShlbmdpbmVzKX1gKTtcbiAgcmV0dXJuIGVuZ2luZXM7XG59O1xuXG5jb21tYW5kcy5nZXRBY3RpdmVJTUVFbmdpbmUgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIGxvZy5kZWJ1ZyhcIlJldHJpZXZpbmcgY3VycmVudCBkZWZhdWx0IElNRVwiKTtcbiAgcmV0dXJuIGF3YWl0IHRoaXMuYWRiLmRlZmF1bHRJTUUoKTtcbn07XG5cbmNvbW1hbmRzLmFjdGl2YXRlSU1FRW5naW5lID0gYXN5bmMgZnVuY3Rpb24gKGltZUlkKSB7XG4gIGxvZy5kZWJ1ZyhgQXR0ZW1wdGluZyB0byBhY3RpdmF0ZSBJTUUgJHtpbWVJZH1gKTtcbiAgbGV0IGF2YWlsYWJsZUVuZ2luZXMgPSBhd2FpdCB0aGlzLmFkYi5hdmFpbGFibGVJTUVzKCk7XG4gIGlmIChhdmFpbGFibGVFbmdpbmVzLmluZGV4T2YoaW1lSWQpID09PSAtMSkge1xuICAgIGxvZy5kZWJ1ZyhcIklNRSBub3QgZm91bmQsIGZhaWxpbmdcIik7XG4gICAgdGhyb3cgbmV3IGVycm9ycy5JTUVOb3RBdmFpbGFibGVFcnJvcigpO1xuICB9XG4gIGxvZy5kZWJ1ZyhcIkZvdW5kIGluc3RhbGxlZCBJTUUsIGF0dGVtcHRpbmcgdG8gYWN0aXZhdGVcIik7XG4gIGF3YWl0IHRoaXMuYWRiLmVuYWJsZUlNRShpbWVJZCk7XG4gIGF3YWl0IHRoaXMuYWRiLnNldElNRShpbWVJZCk7XG59O1xuXG5jb21tYW5kcy5kZWFjdGl2YXRlSU1FRW5naW5lID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICBsZXQgY3VycmVudEVuZ2luZSA9IGF3YWl0IHRoaXMuZ2V0QWN0aXZlSU1FRW5naW5lKCk7XG4gIGxvZy5kZWJ1ZyhgQXR0ZW1wdGluZyB0byBkZWFjdGl2YXRlICR7Y3VycmVudEVuZ2luZX1gKTtcbiAgYXdhaXQgdGhpcy5hZGIuZGlzYWJsZUlNRShjdXJyZW50RW5naW5lKTtcbn07XG5cbk9iamVjdC5hc3NpZ24oZXh0ZW5zaW9ucywgY29tbWFuZHMsIGhlbHBlcnMpO1xuZXhwb3J0IHsgY29tbWFuZHMsIGhlbHBlcnMgfTtcbmV4cG9ydCBkZWZhdWx0IGV4dGVuc2lvbnM7XG4iXX0=