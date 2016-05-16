'use strict';

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

var _mobileJsonWireProtocol = require('mobile-json-wire-protocol');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var commands = {},
    helpers = {},
    extensions = {};

commands.getNetworkConnection = function callee$0$0() {
  var airplaneModeOn, connection, wifiOn, dataOn;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].info("Getting network connection");
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adb.isAirplaneModeOn());

      case 3:
        airplaneModeOn = context$1$0.sent;
        connection = airplaneModeOn ? 1 : 0;

        if (airplaneModeOn) {
          context$1$0.next = 14;
          break;
        }

        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(this.adb.isWifiOn());

      case 8:
        wifiOn = context$1$0.sent;

        connection += wifiOn ? 2 : 0;
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(this.adb.isDataOn());

      case 12:
        dataOn = context$1$0.sent;

        connection += dataOn ? 4 : 0;

      case 14:
        return context$1$0.abrupt('return', connection);

      case 15:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.setNetworkConnection = function callee$0$0(type) {
  var airplaneMode, wifi, data;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].info("Setting network connection");
        // decode the input
        airplaneMode = type % 2;

        type >>= 1;
        wifi = type % 2;

        type >>= 1;
        data = type % 2;
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(this.wrapBootstrapDisconnect(function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(this.adb.setAirplaneMode(airplaneMode));

              case 2:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        }));

      case 8:
        context$1$0.next = 10;
        return _regeneratorRuntime.awrap(this.wrapBootstrapDisconnect(function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(this.adb.broadcastAirplaneMode(airplaneMode));

              case 2:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        }));

      case 10:
        if (airplaneMode) {
          context$1$0.next = 13;
          break;
        }

        context$1$0.next = 13;
        return _regeneratorRuntime.awrap(this.wrapBootstrapDisconnect(function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(this.adb.setWifiAndData({ wifi: wifi, data: data }));

              case 2:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        }));

      case 13:
        context$1$0.next = 15;
        return _regeneratorRuntime.awrap(this.getNetworkConnection());

      case 15:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 16:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.toggleData = function callee$0$0() {
  var data;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this2 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.isDataOn());

      case 2:
        data = !context$1$0.sent;

        _logger2['default'].info('Turning network data ' + (data ? 'on' : 'off'));
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.wrapBootstrapDisconnect(function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(this.adb.setWifiAndData({ data: data }));

              case 2:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this2);
        }));

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.toggleWiFi = function callee$0$0() {
  var wifi;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this3 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.isWifiOn());

      case 2:
        wifi = !context$1$0.sent;

        _logger2['default'].info('Turning WiFi ' + (wifi ? 'on' : 'off'));
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.wrapBootstrapDisconnect(function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(this.adb.setWifiAndData({ wifi: wifi }));

              case 2:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this3);
        }));

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.toggleFlightMode = function callee$0$0() {
  var flightMode;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this4 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.isAirplaneModeOn());

      case 2:
        flightMode = !context$1$0.sent;

        _logger2['default'].info('Turning flight mode ' + (flightMode ? 'on' : 'off'));
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.wrapBootstrapDisconnect(function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(this.adb.setAirplaneMode(flightMode));

              case 2:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this4);
        }));

      case 6:
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(this.wrapBootstrapDisconnect(function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(this.adb.broadcastAirplaneMode(flightMode));

              case 2:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this4);
        }));

      case 8:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.setGeoLocation = function callee$0$0(location) {
  var cmd;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        cmd = ['am', 'startservice', '-e', 'longitude', location.longitude, '-e', 'latitude', location.latitude, 'io.appium.settings/.LocationService'];
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adb.shell(cmd));

      case 3:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.toggleLocationServices = function callee$0$0() {
  var api, seq;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].info("Toggling location services");
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adb.getApiLevel());

      case 3:
        api = context$1$0.sent;

        if (!(api > 15)) {
          context$1$0.next = 18;
          break;
        }

        seq = [19, 19];

        if (!(api === 16)) {
          context$1$0.next = 10;
          break;
        }

        // This version of Android has a "parent" button in its action bar
        seq.push(20); // down
        context$1$0.next = 14;
        break;

      case 10:
        if (!(api >= 19)) {
          context$1$0.next = 14;
          break;
        }

        // Newer versions of Android have the toggle in the Action bar
        seq = [22, 22, 19]; // right, right, up
        /*
         * Once the Location services switch is OFF, it won't receive focus
         * when going back to the Location Services settings screen unless we
         * send a dummy keyevent (UP) *before* opening the settings screen
         */
        context$1$0.next = 14;
        return _regeneratorRuntime.awrap(this.adb.keyevent(19));

      case 14:
        context$1$0.next = 16;
        return _regeneratorRuntime.awrap(this.toggleSetting('LOCATION_SOURCE_SETTINGS', seq));

      case 16:
        context$1$0.next = 19;
        break;

      case 18:
        throw new _mobileJsonWireProtocol.errors.NotYetImplementedError();

      case 19:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.toggleSetting = function callee$0$0(setting, preKeySeq) {
  var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, key, _ref, appPackage, appActivity;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this5 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        /*
         * preKeySeq is the keyevent sequence to send over ADB in order
         * to position the cursor on the right option.
         * By default it's [up, up, down] because we usually target the 1st item in
         * the screen, and sometimes when opening settings activities the cursor is
         * already positionned on the 1st item, but we can't know for sure
         */
        if (_lodash2['default'].isNull(preKeySeq)) {
          preKeySeq = [19, 19, 20]; // up, up, down
        }

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.openSettingsActivity(setting));

      case 3:
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 6;
        _iterator = _getIterator(preKeySeq);

      case 8:
        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
          context$1$0.next = 15;
          break;
        }

        key = _step.value;
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(this.doKey(key));

      case 12:
        _iteratorNormalCompletion = true;
        context$1$0.next = 8;
        break;

      case 15:
        context$1$0.next = 21;
        break;

      case 17:
        context$1$0.prev = 17;
        context$1$0.t0 = context$1$0['catch'](6);
        _didIteratorError = true;
        _iteratorError = context$1$0.t0;

      case 21:
        context$1$0.prev = 21;
        context$1$0.prev = 22;

        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }

      case 24:
        context$1$0.prev = 24;

        if (!_didIteratorError) {
          context$1$0.next = 27;
          break;
        }

        throw _iteratorError;

      case 27:
        return context$1$0.finish(24);

      case 28:
        return context$1$0.finish(21);

      case 29:
        context$1$0.next = 31;
        return _regeneratorRuntime.awrap(this.adb.getFocusedPackageAndActivity());

      case 31:
        _ref = context$1$0.sent;
        appPackage = _ref.appPackage;
        appActivity = _ref.appActivity;
        context$1$0.next = 36;
        return _regeneratorRuntime.awrap(this.wrapBootstrapDisconnect(function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(this.doKey(23));

              case 2:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this5);
        }));

      case 36:
        context$1$0.prev = 36;
        context$1$0.next = 39;
        return _regeneratorRuntime.awrap(this.adb.waitForNotActivity(appPackage, appActivity, 5000));

      case 39:
        context$1$0.next = 41;
        return _regeneratorRuntime.awrap(this.doKey(22));

      case 41:
        context$1$0.next = 43;
        return _regeneratorRuntime.awrap(this.doKey(23));

      case 43:
        context$1$0.next = 45;
        return _regeneratorRuntime.awrap(this.adb.waitForNotActivity(appPackage, appActivity, 5000));

      case 45:
        context$1$0.next = 49;
        break;

      case 47:
        context$1$0.prev = 47;
        context$1$0.t1 = context$1$0['catch'](36);

      case 49:
        context$1$0.next = 51;
        return _regeneratorRuntime.awrap(this.adb.back());

      case 51:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[6, 17, 21, 29], [22,, 24, 28], [36, 47]]);
};

helpers.doKey = function callee$0$0(key) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(_bluebird2['default'].delay(2000));

      case 2:
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.adb.keyevent(key));

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.wrapBootstrapDisconnect = function callee$0$0(wrapped) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        this.bootstrap.ignoreUnexpectedShutdown = true;
        context$1$0.prev = 1;
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(wrapped());

      case 4:
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.adb.restart());

      case 6:
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(this.bootstrap.start(this.opts.appPackage, this.opts.disableAndroidWatchers, this.acceptSslCerts));

      case 8:
        context$1$0.prev = 8;

        this.bootstrap.ignoreUnexpectedShutdown = false;
        return context$1$0.finish(8);

      case 11:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[1,, 8, 11]]);
};

_Object$assign(extensions, commands, helpers);
exports.commands = commands;
exports.helpers = helpers;
exports['default'] = extensions;

// no need to check anything else if we are in airplane mode

/*
 * TODO: Implement isRealDevice(). This method fails on
 * real devices, it should throw a NotYetImplementedError
 */
// up, up

// There's no global location services toggle on older Android versions

/*
 * Click and handle potential ADB disconnect that occurs on official
 * emulator when the network connection is disabled
 */

/*
 * In one particular case (enable Location Services), a pop-up is
 * displayed on some platforms so the user accepts or refuses that Google
 * collects location data. So we wait for that pop-up to open, if it
 * doesn't then proceed
 */
// right
// click

// TODO: Confirm we need this delay. Seems to work without it.
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9uZXR3b3JrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O3NCQUFnQixXQUFXOzs7O3NCQUNiLFFBQVE7Ozs7c0NBQ0MsMkJBQTJCOzt3QkFDcEMsVUFBVTs7OztBQUV4QixJQUFJLFFBQVEsR0FBRyxFQUFFO0lBQUUsT0FBTyxHQUFHLEVBQUU7SUFBRSxVQUFVLEdBQUcsRUFBRSxDQUFDOztBQUVqRCxRQUFRLENBQUMsb0JBQW9CLEdBQUc7TUFFMUIsY0FBYyxFQUNkLFVBQVUsRUFJUixNQUFNLEVBRU4sTUFBTTs7OztBQVJaLDRCQUFJLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDOzt5Q0FDWixJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFOzs7QUFBbEQsc0JBQWM7QUFDZCxrQkFBVSxHQUFHLGNBQWMsR0FBRyxDQUFDLEdBQUcsQ0FBQzs7WUFHbEMsY0FBYzs7Ozs7O3lDQUNFLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFOzs7QUFBbEMsY0FBTTs7QUFDVixrQkFBVSxJQUFLLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxBQUFDLENBQUM7O3lDQUNaLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFOzs7QUFBbEMsY0FBTTs7QUFDVixrQkFBVSxJQUFLLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxBQUFDLENBQUM7Ozs0Q0FHMUIsVUFBVTs7Ozs7OztDQUNsQixDQUFDOztBQUVGLFFBQVEsQ0FBQyxvQkFBb0IsR0FBRyxvQkFBZ0IsSUFBSTtNQUc5QyxZQUFZLEVBRVosSUFBSSxFQUVKLElBQUk7Ozs7OztBQU5SLDRCQUFJLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDOztBQUVuQyxvQkFBWSxHQUFHLElBQUksR0FBRyxDQUFDOztBQUMzQixZQUFJLEtBQUssQ0FBQyxDQUFDO0FBQ1AsWUFBSSxHQUFHLElBQUksR0FBRyxDQUFDOztBQUNuQixZQUFJLEtBQUssQ0FBQyxD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c291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGxvZyBmcm9tICcuLi9sb2dnZXInO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IGVycm9ycyB9IGZyb20gJ21vYmlsZS1qc29uLXdpcmUtcHJvdG9jb2wnO1xuaW1wb3J0IEIgZnJvbSAnYmx1ZWJpcmQnO1xuXG5sZXQgY29tbWFuZHMgPSB7fSwgaGVscGVycyA9IHt9LCBleHRlbnNpb25zID0ge307XG5cbmNvbW1hbmRzLmdldE5ldHdvcmtDb25uZWN0aW9uID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICBsb2cuaW5mbyhcIkdldHRpbmcgbmV0d29yayBjb25uZWN0aW9uXCIpO1xuICBsZXQgYWlycGxhbmVNb2RlT24gPSBhd2FpdCB0aGlzLmFkYi5pc0FpcnBsYW5lTW9kZU9uKCk7XG4gIGxldCBjb25uZWN0aW9uID0gYWlycGxhbmVNb2RlT24gPyAxIDogMDtcblxuICAvLyBubyBuZWVkIHRvIGNoZWNrIGFueXRoaW5nIGVsc2UgaWYgd2UgYXJlIGluIGFpcnBsYW5lIG1vZGVcbiAgaWYgKCFhaXJwbGFuZU1vZGVPbikge1xuICAgIGxldCB3aWZpT24gPSBhd2FpdCB0aGlzLmFkYi5pc1dpZmlPbigpO1xuICAgIGNvbm5lY3Rpb24gKz0gKHdpZmlPbiA/IDIgOiAwKTtcbiAgICBsZXQgZGF0YU9uID0gYXdhaXQgdGhpcy5hZGIuaXNEYXRhT24oKTtcbiAgICBjb25uZWN0aW9uICs9IChkYXRhT24gPyA0IDogMCk7XG4gIH1cblxuICByZXR1cm4gY29ubmVjdGlvbjtcbn07XG5cbmNvbW1hbmRzLnNldE5ldHdvcmtDb25uZWN0aW9uID0gYXN5bmMgZnVuY3Rpb24gKHR5cGUpIHtcbiAgbG9nLmluZm8oXCJTZXR0aW5nIG5ldHdvcmsgY29ubmVjdGlvblwiKTtcbiAgLy8gZGVjb2RlIHRoZSBpbnB1dFxuICBsZXQgYWlycGxhbmVNb2RlID0gdHlwZSAlIDI7XG4gIHR5cGUgPj49IDE7XG4gIGxldCB3aWZpID0gdHlwZSAlIDI7XG4gIHR5cGUgPj49IDE7XG4gIGxldCBkYXRhID0gdHlwZSAlIDI7XG5cbiAgYXdhaXQgdGhpcy53cmFwQm9vdHN0cmFwRGlzY29ubmVjdChhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgdGhpcy5hZGIuc2V0QWlycGxhbmVNb2RlKGFpcnBsYW5lTW9kZSk7XG4gIH0pO1xuICBhd2FpdCB0aGlzLndyYXBCb290c3RyYXBEaXNjb25uZWN0KGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCB0aGlzLmFkYi5icm9hZGNhc3RBaXJwbGFuZU1vZGUoYWlycGxhbmVNb2RlKTtcbiAgfSk7XG4gIGlmICghYWlycGxhbmVNb2RlKSB7XG4gICAgYXdhaXQgdGhpcy53cmFwQm9vdHN0cmFwRGlzY29ubmVjdChhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCB0aGlzLmFkYi5zZXRXaWZpQW5kRGF0YSh7d2lmaSwgZGF0YX0pO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIGF3YWl0IHRoaXMuZ2V0TmV0d29ya0Nvbm5lY3Rpb24oKTtcbn07XG5cbmNvbW1hbmRzLnRvZ2dsZURhdGEgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIGxldCBkYXRhID0gIShhd2FpdCB0aGlzLmFkYi5pc0RhdGFPbigpKTtcbiAgbG9nLmluZm8oYFR1cm5pbmcgbmV0d29yayBkYXRhICR7ZGF0YSA/ICdvbicgOiAnb2ZmJ31gKTtcbiAgYXdhaXQgdGhpcy53cmFwQm9vdHN0cmFwRGlzY29ubmVjdChhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgdGhpcy5hZGIuc2V0V2lmaUFuZERhdGEoe2RhdGF9KTtcbiAgfSk7XG59O1xuXG5jb21tYW5kcy50b2dnbGVXaUZpID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICBsZXQgd2lmaSA9ICEoYXdhaXQgdGhpcy5hZGIuaXNXaWZpT24oKSk7XG4gIGxvZy5pbmZvKGBUdXJuaW5nIFdpRmkgJHt3aWZpID8gJ29uJyA6ICdvZmYnfWApO1xuICBhd2FpdCB0aGlzLndyYXBCb290c3RyYXBEaXNjb25uZWN0KGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCB0aGlzLmFkYi5zZXRXaWZpQW5kRGF0YSh7d2lmaX0pO1xuICB9KTtcbn07XG5cbmNvbW1hbmRzLnRvZ2dsZUZsaWdodE1vZGUgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIC8qXG4gICAqIFRPRE86IEltcGxlbWVudCBpc1JlYWxEZXZpY2UoKS4gVGhpcyBtZXRob2QgZmFpbHMgb25cbiAgICogcmVhbCBkZXZpY2VzLCBpdCBzaG91bGQgdGhyb3cgYSBOb3RZZXRJbXBsZW1lbnRlZEVycm9yXG4gICAqL1xuICBsZXQgZmxpZ2h0TW9kZSA9ICEoYXdhaXQgdGhpcy5hZGIuaXNBaXJwbGFuZU1vZGVPbigpKTtcbiAgbG9nLmluZm8oYFR1cm5pbmcgZmxpZ2h0IG1vZGUgJHtmbGlnaHRNb2RlID8gJ29uJyA6ICdvZmYnfWApO1xuICBhd2FpdCB0aGlzLndyYXBCb290c3RyYXBEaXNjb25uZWN0KGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCB0aGlzLmFkYi5zZXRBaXJwbGFuZU1vZGUoZmxpZ2h0TW9kZSk7XG4gIH0pO1xuICBhd2FpdCB0aGlzLndyYXBCb290c3RyYXBEaXNjb25uZWN0KGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCB0aGlzLmFkYi5icm9hZGNhc3RBaXJwbGFuZU1vZGUoZmxpZ2h0TW9kZSk7XG4gIH0pO1xufTtcblxuY29tbWFuZHMuc2V0R2VvTG9jYXRpb24gPSBhc3luYyBmdW5jdGlvbiAobG9jYXRpb24pIHsgICAgXG4gICBsZXQgY21kID0gWydhbScsICdzdGFydHNlcnZpY2UnLCAnLWUnLCAnbG9uZ2l0dWRlJywgbG9jYXRpb24ubG9uZ2l0dWRlLFxuICAgICAgICAgICAgICAnLWUnLCAnbGF0aXR1ZGUnLCBsb2NhdGlvbi5sYXRpdHVkZSwgJ2lvLmFwcGl1bS5zZXR0aW5ncy8uTG9jYXRpb25TZXJ2aWNlJ107XG4gICByZXR1cm4gYXdhaXQgdGhpcy5hZGIuc2hlbGwoY21kKTtcbn07XG5cbmNvbW1hbmRzLnRvZ2dsZUxvY2F0aW9uU2VydmljZXMgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIGxvZy5pbmZvKFwiVG9nZ2xpbmcgbG9jYXRpb24gc2VydmljZXNcIik7XG4gIGxldCBhcGkgPSBhd2FpdCB0aGlzLmFkYi5nZXRBcGlMZXZlbCgpO1xuXG4gIGlmIChhcGkgPiAxNSkge1xuICAgIGxldCBzZXEgPSBbMTksIDE5XTsgLy8gdXAsIHVwXG4gICAgaWYgKGFwaSA9PT0gMTYpIHtcbiAgICAgIC8vIFRoaXMgdmVyc2lvbiBvZiBBbmRyb2lkIGhhcyBhIFwicGFyZW50XCIgYnV0dG9uIGluIGl0cyBhY3Rpb24gYmFyXG4gICAgICBzZXEucHVzaCgyMCk7IC8vIGRvd25cbiAgICB9IGVsc2UgaWYgKGFwaSA+PSAxOSkge1xuICAgICAgLy8gTmV3ZXIgdmVyc2lvbnMgb2YgQW5kcm9pZCBoYXZlIHRoZSB0b2dnbGUgaW4gdGhlIEFjdGlvbiBiYXJcbiAgICAgIHNlcSA9IFsyMiwgMjIsIDE5XTsgLy8gcmlnaHQsIHJpZ2h0LCB1cFxuICAgICAgLypcbiAgICAgICAqIE9uY2UgdGhlIExvY2F0aW9uIHNlcnZpY2VzIHN3aXRjaCBpcyBPRkYsIGl0IHdvbid0IHJlY2VpdmUgZm9jdXNcbiAgICAgICAqIHdoZW4gZ29pbmcgYmFjayB0byB0aGUgTG9jYXRpb24gU2VydmljZXMgc2V0dGluZ3Mgc2NyZWVuIHVubGVzcyB3ZVxuICAgICAgICogc2VuZCBhIGR1bW15IGtleWV2ZW50IChVUCkgKmJlZm9yZSogb3BlbmluZyB0aGUgc2V0dGluZ3Mgc2NyZWVuXG4gICAgICAgKi9cbiAgICAgIGF3YWl0IHRoaXMuYWRiLmtleWV2ZW50KDE5KTtcbiAgICB9XG4gICAgYXdhaXQgdGhpcy50b2dnbGVTZXR0aW5nKCdMT0NBVElPTl9TT1VSQ0VfU0VUVElOR1MnLCBzZXEpO1xuICB9IGVsc2Uge1xuICAgIC8vIFRoZXJlJ3Mgbm8gZ2xvYmFsIGxvY2F0aW9uIHNlcnZpY2VzIHRvZ2dsZSBvbiBvbGRlciBBbmRyb2lkIHZlcnNpb25zXG4gICAgdGhyb3cgbmV3IGVycm9ycy5Ob3RZZXRJbXBsZW1lbnRlZEVycm9yKCk7XG4gIH1cbn07XG5cbmhlbHBlcnMudG9nZ2xlU2V0dGluZyA9IGFzeW5jIGZ1bmN0aW9uIChzZXR0aW5nLCBwcmVLZXlTZXEpIHtcbiAgLypcbiAgICogcHJlS2V5U2VxIGlzIHRoZSBrZXlldmVudCBzZXF1ZW5jZSB0byBzZW5kIG92ZXIgQURCIGluIG9yZGVyXG4gICAqIHRvIHBvc2l0aW9uIHRoZSBjdXJzb3Igb24gdGhlIHJpZ2h0IG9wdGlvbi5cbiAgICogQnkgZGVmYXVsdCBpdCdzIFt1cCwgdXAsIGRvd25dIGJlY2F1c2Ugd2UgdXN1YWxseSB0YXJnZXQgdGhlIDFzdCBpdGVtIGluXG4gICAqIHRoZSBzY3JlZW4sIGFuZCBzb21ldGltZXMgd2hlbiBvcGVuaW5nIHNldHRpbmdzIGFjdGl2aXRpZXMgdGhlIGN1cnNvciBpc1xuICAgKiBhbHJlYWR5IHBvc2l0aW9ubmVkIG9uIHRoZSAxc3QgaXRlbSwgYnV0IHdlIGNhbid0IGtub3cgZm9yIHN1cmVcbiAgICovXG4gIGlmIChfLmlzTnVsbChwcmVLZXlTZXEpKSB7XG4gICAgcHJlS2V5U2VxID0gWzE5LCAxOSwgMjBdOyAvLyB1cCwgdXAsIGRvd25cbiAgfVxuXG4gIGF3YWl0IHRoaXMub3BlblNldHRpbmdzQWN0aXZpdHkoc2V0dGluZyk7XG5cbiAgZm9yIChsZXQga2V5IG9mIHByZUtleVNlcSkge1xuICAgIGF3YWl0IHRoaXMuZG9LZXkoa2V5KTtcbiAgfVxuXG4gIGxldCB7YXBwUGFja2FnZSwgYXBwQWN0aXZpdHl9ID0gYXdhaXQgdGhpcy5hZGIuZ2V0Rm9jdXNlZFBhY2thZ2VBbmRBY3Rpdml0eSgpO1xuXG4gIC8qXG4gICAqIENsaWNrIGFuZCBoYW5kbGUgcG90ZW50aWFsIEFEQiBkaXNjb25uZWN0IHRoYXQgb2NjdXJzIG9uIG9mZmljaWFsXG4gICAqIGVtdWxhdG9yIHdoZW4gdGhlIG5ldHdvcmsgY29ubmVjdGlvbiBpcyBkaXNhYmxlZFxuICAgKi9cbiAgYXdhaXQgdGhpcy53cmFwQm9vdHN0cmFwRGlzY29ubmVjdChhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgdGhpcy5kb0tleSgyMyk7XG4gIH0pO1xuXG4gIC8qXG4gICAqIEluIG9uZSBwYXJ0aWN1bGFyIGNhc2UgKGVuYWJsZSBMb2NhdGlvbiBTZXJ2aWNlcyksIGEgcG9wLXVwIGlzXG4gICAqIGRpc3BsYXllZCBvbiBzb21lIHBsYXRmb3JtcyBzbyB0aGUgdXNlciBhY2NlcHRzIG9yIHJlZnVzZXMgdGhhdCBHb29nbGVcbiAgICogY29sbGVjdHMgbG9jYXRpb24gZGF0YS4gU28gd2Ugd2FpdCBmb3IgdGhhdCBwb3AtdXAgdG8gb3BlbiwgaWYgaXRcbiAgICogZG9lc24ndCB0aGVuIHByb2NlZWRcbiAgICovXG4gIHRyeSB7XG4gICAgYXdhaXQgdGhpcy5hZGIud2FpdEZvck5vdEFjdGl2aXR5KGFwcFBhY2thZ2UsIGFwcEFjdGl2aXR5LCA1MDAwKTtcbiAgICBhd2FpdCB0aGlzLmRvS2V5KDIyKTsgLy8gcmlnaHRcbiAgICBhd2FpdCB0aGlzLmRvS2V5KDIzKTsgLy8gY2xpY2tcbiAgICBhd2FpdCB0aGlzLmFkYi53YWl0Rm9yTm90QWN0aXZpdHkoYXBwUGFja2FnZSwgYXBwQWN0aXZpdHksIDUwMDApO1xuICB9IGNhdGNoIChpZ24pIHt9XG5cbiAgYXdhaXQgdGhpcy5hZGIuYmFjaygpO1xufTtcblxuaGVscGVycy5kb0tleSA9IGFzeW5jIGZ1bmN0aW9uIChrZXkpIHtcbiAgLy8gVE9ETzogQ29uZmlybSB3ZSBuZWVkIHRoaXMgZGVsYXkuIFNlZW1zIHRvIHdvcmsgd2l0aG91dCBpdC5cbiAgYXdhaXQgQi5kZWxheSgyMDAwKTtcbiAgYXdhaXQgdGhpcy5hZGIua2V5ZXZlbnQoa2V5KTtcbn07XG5cbmhlbHBlcnMud3JhcEJvb3RzdHJhcERpc2Nvbm5lY3QgPSBhc3luYyBmdW5jdGlvbiAod3JhcHBlZCkge1xuICB0aGlzLmJvb3RzdHJhcC5pZ25vcmVVbmV4cGVjdGVkU2h1dGRvd24gPSB0cnVlO1xuICB0cnkge1xuICAgIGF3YWl0IHdyYXBwZWQoKTtcbiAgICBhd2FpdCB0aGlzLmFkYi5yZXN0YXJ0KCk7XG4gICAgYXdhaXQgdGhpcy5ib290c3RyYXAuc3RhcnQodGhpcy5vcHRzLmFwcFBhY2thZ2UsIHRoaXMub3B0cy5kaXNhYmxlQW5kcm9pZFdhdGNoZXJzLCB0aGlzLmFjY2VwdFNzbENlcnRzKTtcbiAgfSBmaW5hbGx5IHtcbiAgICB0aGlzLmJvb3RzdHJhcC5pZ25vcmVVbmV4cGVjdGVkU2h1dGRvd24gPSBmYWxzZTtcbiAgfVxufTtcblxuT2JqZWN0LmFzc2lnbihleHRlbnNpb25zLCBjb21tYW5kcywgaGVscGVycyk7XG5leHBvcnQgeyBjb21tYW5kcywgaGVscGVycyB9O1xuZXhwb3J0IGRlZmF1bHQgZXh0ZW5zaW9ucztcbiJdfQ==