'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _androidHelpers = require('../android-helpers');

var _androidHelpers2 = _interopRequireDefault(_androidHelpers);

var _appiumSupport = require('appium-support');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

//import { errors } from 'mobile-json-wire-protocol';

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var commands = {},
    helpers = {},
    extensions = {};

var logTypesSupported = {
  'logcat': 'Logs for Android applications on real device and emulators via ADB'
};

commands.keys = function callee$0$0(keys) {
  var params;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        // Protocol sends an array; rethink approach
        keys = _lodash2['default'].isArray(keys) ? keys.join('') : keys;
        params = {
          text: keys,
          replace: false
        };

        if (this.opts.unicodeKeyboard) {
          params.unicodeKeyboard = true;
        }
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction('setText', params));

      case 5:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getDeviceTime = function callee$0$0() {
  var out;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].info('Attempting to capture android device date and time');
        context$1$0.prev = 1;
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.adb.shell(['date']));

      case 4:
        out = context$1$0.sent;
        return context$1$0.abrupt('return', out.trim());

      case 8:
        context$1$0.prev = 8;
        context$1$0.t0 = context$1$0['catch'](1);

        _logger2['default'].errorAndThrow('Could not capture device date and time: ' + context$1$0.t0);

      case 11:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[1, 8]]);
};

commands.getPageSource = function () {
  return this.bootstrap.sendAction('source');
};

commands.back = function () {
  return this.bootstrap.sendAction('pressBack');
};

commands.hideKeyboard = function callee$0$0() {
  var _ref, isKeyboardShown, canCloseKeyboard;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.isSoftKeyboardPresent());

      case 2:
        _ref = context$1$0.sent;
        isKeyboardShown = _ref.isKeyboardShown;
        canCloseKeyboard = _ref.canCloseKeyboard;

        if (isKeyboardShown) {
          context$1$0.next = 7;
          break;
        }

        throw new Error("Soft keyboard not present, cannot hide keyboard");

      case 7:
        if (!canCloseKeyboard) {
          context$1$0.next = 11;
          break;
        }

        return context$1$0.abrupt('return', this.back());

      case 11:
        _logger2['default'].info("Keyboard has no UI; no closing necessary");

      case 12:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.openSettingsActivity = function callee$0$0(setting) {
  var _ref2, appPackage, appActivity;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.getFocusedPackageAndActivity());

      case 2:
        _ref2 = context$1$0.sent;
        appPackage = _ref2.appPackage;
        appActivity = _ref2.appActivity;
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(this.adb.shell(['am', 'start', '-a', 'android.settings.' + setting]));

      case 7:
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(this.adb.waitForNotActivity(appPackage, appActivity, 5000));

      case 9:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getWindowSize = function () {
  return this.bootstrap.sendAction('getDeviceSize');
};

commands.getCurrentActivity = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.getFocusedPackageAndActivity());

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent.appActivity);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getLogTypes = function () {
  return _lodash2['default'].keys(logTypesSupported);
};

commands.getLog = function (logType) {
  if (!_lodash2['default'].has(logTypesSupported, logType)) {
    throw new Error('Unsupported log type ' + logType + '. ' + ('Supported types are ' + JSON.stringify(logTypesSupported)));
  }

  if (logType === 'logcat') {
    return this.adb.getLogcatLogs();
  }
};

commands.isAppInstalled = function (appPackage) {
  return this.adb.isAppInstalled(appPackage);
};

commands.removeApp = function (appPackage) {
  return this.adb.uninstallApk(appPackage);
};

commands.installApp = function callee$0$0(appPath) {
  var _ref3, apkPackage;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(appPath));

      case 2:
        if (context$1$0.sent) {
          context$1$0.next = 4;
          break;
        }

        _logger2['default'].errorAndThrow('Could not find app apk at ' + appPath);

      case 4:
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.adb.packageAndLaunchActivityFromManifest(appPath));

      case 6:
        _ref3 = context$1$0.sent;
        apkPackage = _ref3.apkPackage;
        return context$1$0.abrupt('return', _androidHelpers2['default'].installApkRemotely(this.adb, appPath, apkPackage, this.opts.fastReset));

      case 9:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.background = function callee$0$0(seconds) {
  var _ref4, appPackage, appActivity;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.getFocusedPackageAndActivity());

      case 2:
        _ref4 = context$1$0.sent;
        appPackage = _ref4.appPackage;
        appActivity = _ref4.appActivity;
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(this.adb.goToHome());

      case 7:
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(_bluebird2['default'].delay(seconds * 1000));

      case 9:
        return context$1$0.abrupt('return', this.adb.startApp({
          pkg: this.opts.appPackage,
          activity: this.opts.appActivity,
          action: this.opts.intentAction,
          category: this.opts.intentCategory,
          flags: this.opts.intentFlags,
          waitPkg: appPackage,
          waitActivity: appActivity,
          optionalIntentArguments: this.opts.optionalIntentArguments,
          stopApp: this.opts.stopAppOnReset || !this.opts.dontStopAppOnReset
        }));

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getStrings = function callee$0$0(language) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (language) {
          context$1$0.next = 5;
          break;
        }

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adb.getDeviceLanguage());

      case 3:
        language = context$1$0.sent;

        _logger2['default'].info('No language specified, returning strings for: ' + language);

      case 5:
        if (!this.apkStrings[language]) {
          context$1$0.next = 7;
          break;
        }

        return context$1$0.abrupt('return', this.apkStrings[language]);

      case 7:
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(_androidHelpers2['default'].pushStrings(language, this.adb, this.opts));

      case 9:
        this.apkStrings[language] = context$1$0.sent;
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction('updateStrings'));

      case 12:
        return context$1$0.abrupt('return', this.apkStrings[language]);

      case 13:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.launchApp = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.initAUT());

      case 2:
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.startAUT());

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.startActivity = function callee$0$0(appPackage, appActivity, appWaitPackage, appWaitActivity, intentAction, intentCategory, intentFlags, optionalIntentArguments, dontStopAppOnReset) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].debug('Starting package \'' + appPackage + '\' and activity \'' + appActivity + '\'');
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adb.startApp({
          pkg: appPackage,
          activity: appActivity,
          waitPkg: appWaitPackage || appPackage,
          waitActivity: appWaitActivity || appActivity,
          action: intentAction,
          category: intentCategory,
          flags: intentFlags,
          optionalIntentArguments: optionalIntentArguments,
          stopApp: !dontStopAppOnReset
        }));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.reset = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!this.opts.fullReset) {
          context$1$0.next = 10;
          break;
        }

        _logger2['default'].info("Running old fashion reset (reinstall)");
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.adb.stopAndClear(this.opts.appPackage));

      case 4:
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.adb.uninstallApk(this.opts.appPackage));

      case 6:
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(_androidHelpers2['default'].installApkRemotely(this.adb, this.opts.app, this.opts.appPackage, this.opts.fastReset));

      case 8:
        context$1$0.next = 13;
        break;

      case 10:
        _logger2['default'].info("Running fast reset (stop and clear)");
        context$1$0.next = 13;
        return _regeneratorRuntime.awrap(this.adb.stopAndClear(this.opts.appPackage));

      case 13:
        context$1$0.next = 15;
        return _regeneratorRuntime.awrap(this.startAUT());

      case 15:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 16:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.startAUT = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.startApp({
          pkg: this.opts.appPackage,
          activity: this.opts.appActivity,
          action: this.opts.intentAction,
          category: this.opts.intentCategory,
          flags: this.opts.intentFlags,
          waitPkg: this.opts.appWaitPackage,
          waitActivity: this.opts.appWaitActivity,
          optionalIntentArguments: this.opts.optionalIntentArguments,
          stopApp: this.opts.stopAppOnReset || !this.opts.dontStopAppOnReset
        }));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// we override setUrl to take an android URI which can be used for deep-linking
// inside an app, similar to starting an intent
commands.setUrl = function callee$0$0(uri) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.startUri(uri, this.opts.appPackage));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// closing app using force stop
commands.closeApp = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.forceStop(this.opts.appPackage));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

_Object$assign(extensions, commands, helpers);
exports.commands = commands;
exports.helpers = helpers;
exports['default'] = extensions;

// Return cached strings

// TODO: This is mutating the current language, but it's how appium currently works
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9nZW5lcmFsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztzQkFBYyxRQUFROzs7OzhCQUNLLG9CQUFvQjs7Ozs2QkFDNUIsZ0JBQWdCOzt3QkFDckIsVUFBVTs7Ozs7O3NCQUVSLFdBQVc7Ozs7QUFFM0IsSUFBSSxRQUFRLEdBQUcsRUFBRTtJQUFFLE9BQU8sR0FBRyxFQUFFO0lBQUUsVUFBVSxHQUFHLEVBQUUsQ0FBQzs7QUFFakQsSUFBTSxpQkFBaUIsR0FBRztBQUN4QixVQUFRLEVBQUcsb0VBQW9FO0NBQ2hGLENBQUM7O0FBRUYsUUFBUSxDQUFDLElBQUksR0FBRyxvQkFBZ0IsSUFBSTtNQUc5QixNQUFNOzs7OztBQURWLFlBQUksR0FBRyxvQkFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDMUMsY0FBTSxHQUFHO0FBQ1gsY0FBSSxFQUFFLElBQUk7QUFDVixpQkFBTyxFQUFFLEtBQUs7U0FDZjs7QUFDRCxZQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO0FBQzdCLGdCQUFNLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztTQUMvQjs7eUNBQ1ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQzs7Ozs7Ozs7OztDQUMxRCxDQUFDOztBQUVGLFFBQVEsQ0FBQyxhQUFhLEdBQUc7TUFHakIsR0FBRzs7OztBQUZULDRCQUFJLElBQUksQ0FBQyxvREFBb0QsQ0FBQyxDQUFDOzs7eUNBRTdDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7OztBQUFwQyxXQUFHOzRDQUNBLEdBQUcsQ0FBQyxJQUFJLEVBQUU7Ozs7OztBQUVqQiw0QkFBSSxhQUFhLDZEQUFrRCxDQUFDOzs7Ozs7O0NBRXZFLENBQUM7O0FBRUYsUUFBUSxDQUFD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QWU7QUFDdkMsaUNBQXVCLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyx1QkFBdUI7QUFDMUQsaUJBQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCO1NBQ25FLENBQUM7Ozs7Ozs7Q0FDSCxDQUFDOzs7O0FBSUYsUUFBUSxDQUFDLE1BQU0sR0FBRyxvQkFBZ0IsR0FBRzs7Ozs7eUNBQzdCLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQzs7Ozs7OztDQUNuRCxDQUFDOzs7QUFHRixRQUFRLENBQUMsUUFBUSxHQUFHOzs7Ozt5Q0FDWixJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQzs7Ozs7OztDQUMvQyxDQUFDOztBQUVGLGVBQWMsVUFBVSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNwQyxRQUFRLEdBQVIsUUFBUTtRQUFFLE9BQU8sR0FBUCxPQUFPO3FCQUNYLFVBQVUiLCJmaWxlIjoibGliL2NvbW1hbmRzL2dlbmVyYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGFuZHJvaWRIZWxwZXJzIGZyb20gJy4uL2FuZHJvaWQtaGVscGVycyc7XG5pbXBvcnQgeyBmcyB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcbmltcG9ydCBCIGZyb20gJ2JsdWViaXJkJztcbi8vaW1wb3J0IHsgZXJyb3JzIH0gZnJvbSAnbW9iaWxlLWpzb24td2lyZS1wcm90b2NvbCc7XG5pbXBvcnQgbG9nIGZyb20gJy4uL2xvZ2dlcic7XG5cbmxldCBjb21tYW5kcyA9IHt9LCBoZWxwZXJzID0ge30sIGV4dGVuc2lvbnMgPSB7fTtcblxuY29uc3QgbG9nVHlwZXNTdXBwb3J0ZWQgPSB7XG4gICdsb2djYXQnIDogJ0xvZ3MgZm9yIEFuZHJvaWQgYXBwbGljYXRpb25zIG9uIHJlYWwgZGV2aWNlIGFuZCBlbXVsYXRvcnMgdmlhIEFEQidcbn07XG5cbmNvbW1hbmRzLmtleXMgPSBhc3luYyBmdW5jdGlvbiAoa2V5cykge1xuICAvLyBQcm90b2NvbCBzZW5kcyBhbiBhcnJheTsgcmV0aGluayBhcHByb2FjaFxuICBrZXlzID0gXy5pc0FycmF5KGtleXMpID8ga2V5cy5qb2luKCcnKSA6IGtleXM7XG4gIGxldCBwYXJhbXMgPSB7XG4gICAgdGV4dDoga2V5cyxcbiAgICByZXBsYWNlOiBmYWxzZVxuICB9O1xuICBpZiAodGhpcy5vcHRzLnVuaWNvZGVLZXlib2FyZCkge1xuICAgIHBhcmFtcy51bmljb2RlS2V5Ym9hcmQgPSB0cnVlO1xuICB9XG4gIHJldHVybiBhd2FpdCB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKCdzZXRUZXh0JywgcGFyYW1zKTtcbn07XG5cbmNvbW1hbmRzLmdldERldmljZVRpbWUgPSBhc3luYyBmdW5jdGlvbigpIHtcbiAgbG9nLmluZm8oJ0F0dGVtcHRpbmcgdG8gY2FwdHVyZSBhbmRyb2lkIGRldmljZSBkYXRlIGFuZCB0aW1lJyk7XG4gIHRyeSB7XG4gICAgbGV0IG91dCA9IGF3YWl0IHRoaXMuYWRiLnNoZWxsKFsnZGF0ZSddKTtcbiAgICByZXR1cm4gb3V0LnRyaW0oKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbG9nLmVycm9yQW5kVGhyb3coYENvdWxkIG5vdCBjYXB0dXJlIGRldmljZSBkYXRlIGFuZCB0aW1lOiAke2Vycn1gKTtcbiAgfVxufTtcblxuY29tbWFuZHMuZ2V0UGFnZVNvdXJjZSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oJ3NvdXJjZScpO1xufTtcblxuY29tbWFuZHMuYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oJ3ByZXNzQmFjaycpO1xufTtcblxuY29tbWFuZHMuaGlkZUtleWJvYXJkID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICBsZXQge2lzS2V5Ym9hcmRTaG93biwgY2FuQ2xvc2VLZXlib2FyZH0gPSBhd2FpdCB0aGlzLmFkYi5pc1NvZnRLZXlib2FyZFByZXNlbnQoKTtcbiAgaWYgKCFpc0tleWJvYXJkU2hvd24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJTb2Z0IGtleWJvYXJkIG5vdCBwcmVzZW50LCBjYW5ub3QgaGlkZSBrZXlib2FyZFwiKTtcbiAgfVxuXG4gIGlmIChjYW5DbG9zZUtleWJvYXJkKSB7XG4gICAgcmV0dXJuIHRoaXMuYmFjaygpO1xuICB9IGVsc2Uge1xuICAgIGxvZy5pbmZvKFwiS2V5Ym9hcmQgaGFzIG5vIFVJOyBubyBjbG9zaW5nIG5lY2Vzc2FyeVwiKTtcbiAgfVxufTtcblxuY29tbWFuZHMub3BlblNldHRpbmdzQWN0aXZpdHkgPSBhc3luYyBmdW5jdGlvbiAoc2V0dGluZykge1xuICBsZXQge2FwcFBhY2thZ2UsIGFwcEFjdGl2aXR5fSA9IGF3YWl0IHRoaXMuYWRiLmdldEZvY3VzZWRQYWNrYWdlQW5kQWN0aXZpdHkoKTtcbiAgYXdhaXQgdGhpcy5hZGIuc2hlbGwoWydhbScsICdzdGFydCcsICctYScsIGBhbmRyb2lkLnNldHRpbmdzLiR7c2V0dGluZ31gXSk7XG4gIGF3YWl0IHRoaXMuYWRiLndhaXRGb3JOb3RBY3Rpdml0eShhcHBQYWNrYWdlLCBhcHBBY3Rpdml0eSwgNTAwMCk7XG59O1xuXG5jb21tYW5kcy5nZXRXaW5kb3dTaXplID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5ib290c3RyYXAuc2VuZEFjdGlvbignZ2V0RGV2aWNlU2l6ZScpO1xufTtcblxuY29tbWFuZHMuZ2V0Q3VycmVudEFjdGl2aXR5ID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gKGF3YWl0IHRoaXMuYWRiLmdldEZvY3VzZWRQYWNrYWdlQW5kQWN0aXZpdHkoKSkuYXBwQWN0aXZpdHk7XG59O1xuXG5jb21tYW5kcy5nZXRMb2dUeXBlcyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIF8ua2V5cyhsb2dUeXBlc1N1cHBvcnRlZCk7XG59O1xuXG5jb21tYW5kcy5nZXRMb2cgPSBmdW5jdGlvbiAobG9nVHlwZSkge1xuICBpZiAoIV8uaGFzKGxvZ1R5cGVzU3VwcG9ydGVkLCBsb2dUeXBlKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgbG9nIHR5cGUgJHtsb2dUeXBlfS4gYCArXG4gICAgICAgICAgICAgICAgICAgIGBTdXBwb3J0ZWQgdHlwZXMgYXJlICR7SlNPTi5zdHJpbmdpZnkobG9nVHlwZXNTdXBwb3J0ZWQpfWApO1xuICB9XG5cbiAgaWYgKGxvZ1R5cGUgPT09ICdsb2djYXQnKSB7XG4gICAgcmV0dXJuIHRoaXMuYWRiLmdldExvZ2NhdExvZ3MoKTtcbiAgfVxufTtcblxuY29tbWFuZHMuaXNBcHBJbnN0YWxsZWQgPSBmdW5jdGlvbiAoYXBwUGFja2FnZSkge1xuICByZXR1cm4gdGhpcy5hZGIuaXNBcHBJbnN0YWxsZWQoYXBwUGFja2FnZSk7XG59O1xuXG5jb21tYW5kcy5yZW1vdmVBcHAgPSBmdW5jdGlvbiAoYXBwUGFja2FnZSkge1xuICByZXR1cm4gdGhpcy5hZGIudW5pbnN0YWxsQXBrKGFwcFBhY2thZ2UpO1xufTtcblxuY29tbWFuZHMuaW5zdGFsbEFwcCA9IGFzeW5jIGZ1bmN0aW9uIChhcHBQYXRoKSB7XG4gIGlmICghKGF3YWl0IGZzLmV4aXN0cyhhcHBQYXRoKSkpIHtcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhgQ291bGQgbm90IGZpbmQgYXBwIGFwayBhdCAke2FwcFBhdGh9YCk7XG4gIH1cblxuICBsZXQge2Fwa1BhY2thZ2V9ID0gYXdhaXQgdGhpcy5hZGIucGFja2FnZUFuZExhdW5jaEFjdGl2aXR5RnJvbU1hbmlmZXN0KGFwcFBhdGgpO1xuICByZXR1cm4gYW5kcm9pZEhlbHBlcnMuaW5zdGFsbEFwa1JlbW90ZWx5KHRoaXMuYWRiLCBhcHBQYXRoLCBhcGtQYWNrYWdlLCB0aGlzLm9wdHMuZmFzdFJlc2V0KTtcbn07XG5cbmNvbW1hbmRzLmJhY2tncm91bmQgPSBhc3luYyBmdW5jdGlvbiAoc2Vjb25kcykge1xuICBsZXQge2FwcFBhY2thZ2UsIGFwcEFjdGl2aXR5fSA9IGF3YWl0IHRoaXMuYWRiLmdldEZvY3VzZWRQYWNrYWdlQW5kQWN0aXZpdHkoKTtcbiAgYXdhaXQgdGhpcy5hZGIuZ29Ub0hvbWUoKTtcbiAgYXdhaXQgQi5kZWxheShzZWNvbmRzICogMTAwMCk7XG4gIHJldHVybiB0aGlzLmFkYi5zdGFydEFwcCh7XG4gICAgcGtnOiB0aGlzLm9wdHMuYXBwUGFja2FnZSxcbiAgICBhY3Rpdml0eTogdGhpcy5vcHRzLmFwcEFjdGl2aXR5LFxuICAgIGFjdGlvbjogdGhpcy5vcHRzLmludGVudEFjdGlvbixcbiAgICBjYXRlZ29yeTogdGhpcy5vcHRzLmludGVudENhdGVnb3J5LFxuICAgIGZsYWdzOiB0aGlzLm9wdHMuaW50ZW50RmxhZ3MsXG4gICAgd2FpdFBrZzogYXBwUGFja2FnZSxcbiAgICB3YWl0QWN0aXZpdHk6IGFwcEFjdGl2aXR5LFxuICAgIG9wdGlvbmFsSW50ZW50QXJndW1lbnRzOiB0aGlzLm9wdHMub3B0aW9uYWxJbnRlbnRBcmd1bWVudHMsXG4gICAgc3RvcEFwcDogdGhpcy5vcHRzLnN0b3BBcHBPblJlc2V0IHx8ICF0aGlzLm9wdHMuZG9udFN0b3BBcHBPblJlc2V0LFxuICB9KTtcbn07XG5cbmNvbW1hbmRzLmdldFN0cmluZ3MgPSBhc3luYyBmdW5jdGlvbiAobGFuZ3VhZ2UpIHtcbiAgaWYgKCFsYW5ndWFnZSkge1xuICAgIGxhbmd1YWdlID0gYXdhaXQgdGhpcy5hZGIuZ2V0RGV2aWNlTGFuZ3VhZ2UoKTtcbiAgICBsb2cuaW5mbyhgTm8gbGFuZ3VhZ2Ugc3BlY2lmaWVkLCByZXR1cm5pbmcgc3RyaW5ncyBmb3I6ICR7bGFuZ3VhZ2V9YCk7XG4gIH1cblxuICBpZiAodGhpcy5hcGtTdHJpbmdzW2xhbmd1YWdlXSkge1xuICAgIC8vIFJldHVybiBjYWNoZWQgc3RyaW5nc1xuICAgIHJldHVybiB0aGlzLmFwa1N0cmluZ3NbbGFuZ3VhZ2VdO1xuICB9XG5cbiAgLy8gVE9ETzogVGhpcyBpcyBtdXRhdGluZyB0aGUgY3VycmVudCBsYW5ndWFnZSwgYnV0IGl0J3MgaG93IGFwcGl1bSBjdXJyZW50bHkgd29ya3NcbiAgdGhpcy5hcGtTdHJpbmdzW2xhbmd1YWdlXSA9IGF3YWl0IGFuZHJvaWRIZWxwZXJzLnB1c2hTdHJpbmdzKGxhbmd1YWdlLCB0aGlzLmFkYiwgdGhpcy5vcHRzKTtcbiAgYXdhaXQgdGhpcy5ib290c3RyYXAuc2VuZEFjdGlvbigndXBkYXRlU3RyaW5ncycpO1xuXG4gIHJldHVybiB0aGlzLmFwa1N0cmluZ3NbbGFuZ3VhZ2VdO1xufTtcblxuY29tbWFuZHMubGF1bmNoQXBwID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICBhd2FpdCB0aGlzLmluaXRBVVQoKTtcbiAgYXdhaXQgdGhpcy5zdGFydEFVVCgpO1xufTtcblxuY29tbWFuZHMuc3RhcnRBY3Rpdml0eSA9IGFzeW5jIGZ1bmN0aW9uIChhcHBQYWNrYWdlLCBhcHBBY3Rpdml0eSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwV2FpdFBhY2thZ2UsIGFwcFdhaXRBY3Rpdml0eSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW50ZW50QWN0aW9uLCBpbnRlbnRDYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW50ZW50RmxhZ3MsIG9wdGlvbmFsSW50ZW50QXJndW1lbnRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb250U3RvcEFwcE9uUmVzZXQpIHtcbiAgbG9nLmRlYnVnKGBTdGFydGluZyBwYWNrYWdlICcke2FwcFBhY2thZ2V9JyBhbmQgYWN0aXZpdHkgJyR7YXBwQWN0aXZpdHl9J2ApO1xuICBhd2FpdCB0aGlzLmFkYi5zdGFydEFwcCh7XG4gICAgcGtnOiBhcHBQYWNrYWdlLFxuICAgIGFjdGl2aXR5OiBhcHBBY3Rpdml0eSxcbiAgICB3YWl0UGtnOiBhcHBXYWl0UGFja2FnZSB8fCBhcHBQYWNrYWdlLFxuICAgIHdhaXRBY3Rpdml0eTogYXBwV2FpdEFjdGl2aXR5IHx8IGFwcEFjdGl2aXR5LFxuICAgIGFjdGlvbjogaW50ZW50QWN0aW9uLFxuICAgIGNhdGVnb3J5OiBpbnRlbnRDYXRlZ29yeSxcbiAgICBmbGFnczogaW50ZW50RmxhZ3MsXG4gICAgb3B0aW9uYWxJbnRlbnRBcmd1bWVudHMsXG4gICAgc3RvcEFwcDogIWRvbnRTdG9wQXBwT25SZXNldFxuICB9KTtcbn07XG5cbmNvbW1hbmRzLnJlc2V0ID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5vcHRzLmZ1bGxSZXNldCkge1xuICAgIGxvZy5pbmZvKFwiUnVubmluZyBvbGQgZmFzaGlvbiByZXNldCAocmVpbnN0YWxsKVwiKTtcbiAgICBhd2FpdCB0aGlzLmFkYi5zdG9wQW5kQ2xlYXIodGhpcy5vcHRzLmFwcFBhY2thZ2UpO1xuICAgIGF3YWl0IHRoaXMuYWRiLnVuaW5zdGFsbEFwayh0aGlzLm9wdHMuYXBwUGFja2FnZSk7XG4gICAgYXdhaXQgYW5kcm9pZEhlbHBlcnMuaW5zdGFsbEFwa1JlbW90ZWx5KHRoaXMuYWRiLCB0aGlzLm9wdHMuYXBwLCB0aGlzLm9wdHMuYXBwUGFja2FnZSwgdGhpcy5vcHRzLmZhc3RSZXNldCk7XG4gIH0gZWxzZSB7XG4gICAgbG9nLmluZm8oXCJSdW5uaW5nIGZhc3QgcmVzZXQgKHN0b3AgYW5kIGNsZWFyKVwiKTtcbiAgICBhd2FpdCB0aGlzLmFkYi5zdG9wQW5kQ2xlYXIodGhpcy5vcHRzLmFwcFBhY2thZ2UpO1xuICB9XG5cbiAgcmV0dXJuIGF3YWl0IHRoaXMuc3RhcnRBVVQoKTtcbn07XG5cbmNvbW1hbmRzLnN0YXJ0QVVUID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICBhd2FpdCB0aGlzLmFkYi5zdGFydEFwcCh7XG4gICAgcGtnOiB0aGlzLm9wdHMuYXBwUGFja2FnZSxcbiAgICBhY3Rpdml0eTogdGhpcy5vcHRzLmFwcEFjdGl2aXR5LFxuICAgIGFjdGlvbjogdGhpcy5vcHRzLmludGVudEFjdGlvbixcbiAgICBjYXRlZ29yeTogdGhpcy5vcHRzLmludGVudENhdGVnb3J5LFxuICAgIGZsYWdzOiB0aGlzLm9wdHMuaW50ZW50RmxhZ3MsXG4gICAgd2FpdFBrZzogdGhpcy5vcHRzLmFwcFdhaXRQYWNrYWdlLFxuICAgIHdhaXRBY3Rpdml0eTogdGhpcy5vcHRzLmFwcFdhaXRBY3Rpdml0eSxcbiAgICBvcHRpb25hbEludGVudEFyZ3VtZW50czogdGhpcy5vcHRzLm9wdGlvbmFsSW50ZW50QXJndW1lbnRzLFxuICAgIHN0b3BBcHA6IHRoaXMub3B0cy5zdG9wQXBwT25SZXNldCB8fCAhdGhpcy5vcHRzLmRvbnRTdG9wQXBwT25SZXNldCxcbiAgfSk7XG59O1xuXG4vLyB3ZSBvdmVycmlkZSBzZXRVcmwgdG8gdGFrZSBhbiBhbmRyb2lkIFVSSSB3aGljaCBjYW4gYmUgdXNlZCBmb3IgZGVlcC1saW5raW5nXG4vLyBpbnNpZGUgYW4gYXBwLCBzaW1pbGFyIHRvIHN0YXJ0aW5nIGFuIGludGVudFxuY29tbWFuZHMuc2V0VXJsID0gYXN5bmMgZnVuY3Rpb24gKHVyaSkge1xuICBhd2FpdCB0aGlzLmFkYi5zdGFydFVyaSh1cmksIHRoaXMub3B0cy5hcHBQYWNrYWdlKTtcbn07XG5cbi8vIGNsb3NpbmcgYXBwIHVzaW5nIGZvcmNlIHN0b3BcbmNvbW1hbmRzLmNsb3NlQXBwID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICBhd2FpdCB0aGlzLmFkYi5mb3JjZVN0b3AodGhpcy5vcHRzLmFwcFBhY2thZ2UpO1xufTtcblxuT2JqZWN0LmFzc2lnbihleHRlbnNpb25zLCBjb21tYW5kcywgaGVscGVycyk7XG5leHBvcnQgeyBjb21tYW5kcywgaGVscGVycyB9O1xuZXhwb3J0IGRlZmF1bHQgZXh0ZW5zaW9ucztcbiJdfQ==