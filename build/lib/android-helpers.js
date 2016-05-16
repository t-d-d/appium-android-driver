'use strict';

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _teen_process = require('teen_process');

var _asyncbox = require('asyncbox');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _appiumSupport = require('appium-support');

var _appiumAndroidIme = require('appium-android-ime');

var _ioAppiumSettings = require('io.appium.settings');

var _appiumUnlock = require('appium-unlock');

var _appiumAndroidBootstrap = require('appium-android-bootstrap');

var _appiumAndroidBootstrap2 = _interopRequireDefault(_appiumAndroidBootstrap);

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

var REMOTE_TEMP_PATH = "/data/local/tmp";
var REMOTE_INSTALL_TIMEOUT = 300000; // milliseconds
var CHROME_BROWSERS = ["Chrome", "Chromium", "Chromebeta", "Browser", "chrome", "chromium", "chromebeta", "browser", "chromium-browser"];

var helpers = {};

helpers.parseJavaVersion = function (stderr) {
  var lines = stderr.split("\n");
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _getIterator(lines), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var line = _step.value;

      if (new RegExp(/(java|openjdk) version/).test(line)) {
        return line.split(" ")[2].replace(/"/g, '');
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return null;
};

helpers.getJavaVersion = function callee$0$0() {
  var _ref, stderr, javaVer;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].debug("Getting Java version");

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)('java', ['-version']));

      case 3:
        _ref = context$1$0.sent;
        stderr = _ref.stderr;
        javaVer = helpers.parseJavaVersion(stderr);

        if (!(javaVer === null)) {
          context$1$0.next = 8;
          break;
        }

        throw new Error("Could not get the Java version. Is Java installed?");

      case 8:
        _logger2['default'].info('Java version is: ' + javaVer);
        return context$1$0.abrupt('return', javaVer);

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.prepareEmulator = function callee$0$0(adb, opts) {
  var avd, avdArgs, language, locale, avdLaunchTimeout, avdReadyTimeout, avdName, runningAVD;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        avd = opts.avd;
        avdArgs = opts.avdArgs;
        language = opts.language;
        locale = opts.locale;
        avdLaunchTimeout = opts.avdLaunchTimeout;
        avdReadyTimeout = opts.avdReadyTimeout;

        if (avd) {
          context$1$0.next = 8;
          break;
        }

        throw new Error("Cannot launch AVD without AVD name");

      case 8:
        avdName = avd.replace('@', '');
        context$1$0.next = 11;
        return _regeneratorRuntime.awrap(adb.getRunningAVD(avdName));

      case 11:
        runningAVD = context$1$0.sent;

        if (!(runningAVD !== null)) {
          context$1$0.next = 15;
          break;
        }

        _logger2['default'].debug("Not launching AVD because it is already running.");
        return context$1$0.abrupt('return');

      case 15:
        context$1$0.next = 17;
        return _regeneratorRuntime.awrap(adb.launchAVD(avd, avdArgs, language, locale, avdLaunchTimeout, avdReadyTimeout));

      case 17:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.ensureDeviceLocale = function callee$0$0(adb, language, country) {
  var haveLanguage, haveCountry, changed, curLanguage, curCountry, curLocale, locale;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        haveLanguage = language && typeof language === "string";
        haveCountry = country && typeof country === "string";

        if (!(!haveLanguage && !haveCountry)) {
          context$1$0.next = 4;
          break;
        }

        return context$1$0.abrupt('return');

      case 4:
        changed = false;
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(adb.getApiLevel());

      case 7:
        context$1$0.t0 = context$1$0.sent;

        if (!(context$1$0.t0 < 23)) {
          context$1$0.next = 25;
          break;
        }

        context$1$0.next = 11;
        return _regeneratorRuntime.awrap(adb.getDeviceLanguage());

      case 11:
        curLanguage = context$1$0.sent;
        context$1$0.next = 14;
        return _regeneratorRuntime.awrap(adb.getDeviceCountry());

      case 14:
        curCountry = context$1$0.sent;

        if (!(haveLanguage && language !== curLanguage)) {
          context$1$0.next = 19;
          break;
        }

        context$1$0.next = 18;
        return _regeneratorRuntime.awrap(adb.setDeviceLanguage(language));

      case 18:
        changed = true;

      case 19:
        if (!(haveCountry && country !== curCountry)) {
          context$1$0.next = 23;
          break;
        }

        context$1$0.next = 22;
        return _regeneratorRuntime.awrap(adb.setDeviceCountry(country));

      case 22:
        changed = true;

      case 23:
        context$1$0.next = 34;
        break;

      case 25:
        context$1$0.next = 27;
        return _regeneratorRuntime.awrap(adb.getDeviceLocale());

      case 27:
        curLocale = context$1$0.sent;
        locale = undefined;

        if (!haveCountry) {
          locale = language.toLowerCase();
        } else if (!haveLanguage) {
          locale = country;
        } else {
          locale = language.toLowerCase() + "-" + country.toUpperCase();
        }

        if (!(locale !== curLocale)) {
          context$1$0.next = 34;
          break;
        }

        context$1$0.next = 33;
        return _regeneratorRuntime.awrap(adb.setDeviceLocale(locale));

      case 33:
        changed = true;

      case 34:
        if (!changed) {
          context$1$0.next = 37;
          break;
        }

        context$1$0.next = 37;
        return _regeneratorRuntime.awrap(adb.reboot());

      case 37:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.getDeviceInfoFromCaps = function callee$0$0() {
  var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var adb, udid, emPort, devices, availDevicesStr, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, device, deviceOS;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(_appiumAdb2['default'].createADB({
          javaVersion: opts.javaVersion,
          adbPort: opts.adbPort
        }));

      case 2:
        adb = context$1$0.sent;
        udid = opts.udid;
        emPort = null;

        if (!opts.avd) {
          context$1$0.next = 12;
          break;
        }

        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(helpers.prepareEmulator(adb, opts));

      case 8:
        udid = adb.curDeviceId;
        emPort = adb.emulatorPort;
        context$1$0.next = 63;
        break;

      case 12:
        // no avd given. lets try whatever's plugged in devices/emulators
        _logger2['default'].info("Retrieving device list");
        context$1$0.next = 15;
        return _regeneratorRuntime.awrap(adb.getDevicesWithRetry());

      case 15:
        devices = context$1$0.sent;

        if (!udid) {
          context$1$0.next = 21;
          break;
        }

        if (!_lodash2['default'].contains(_lodash2['default'].pluck(devices, 'udid'), udid)) {
          _logger2['default'].errorAndThrow('Device ' + udid + ' was not in the list ' + 'of connected devices');
        }
        emPort = adb.getPortFromEmulatorString(udid);
        context$1$0.next = 63;
        break;

      case 21:
        if (!opts.platformVersion) {
          context$1$0.next = 61;
          break;
        }

        // a platform version was given. lets try to find a device with the same os
        _logger2['default'].info('Looking for a device with Android ' + opts.platformVersion);

        // in case we fail to find something, give the user a useful log that has
        // the device udids and os versions so they know what's available
        availDevicesStr = [];
        _iteratorNormalCompletion2 = true;
        _didIteratorError2 = false;
        _iteratorError2 = undefined;
        context$1$0.prev = 27;
        _iterator2 = _getIterator(devices);

      case 29:
        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
          context$1$0.next = 43;
          break;
        }

        device = _step2.value;
        context$1$0.next = 33;
        return _regeneratorRuntime.awrap(adb.setDeviceId(device.udid));

      case 33:
        context$1$0.next = 35;
        return _regeneratorRuntime.awrap(adb.getPlatformVersion());

      case 35:
        deviceOS = context$1$0.sent;

        // build up our info string of available devices as we iterate
        availDevicesStr.push(device.udid + ' (' + deviceOS + ')');

        // we do a begins with check for implied wildcard matching
        // eg: 4 matches 4.1, 4.0, 4.1.3-samsung, etc

        if (!(deviceOS.indexOf(opts.platformVersion) === 0)) {
          context$1$0.next = 40;
          break;
        }

        udid = device.udid;
        return context$1$0.abrupt('break', 43);

      case 40:
        _iteratorNormalCompletion2 = true;
        context$1$0.next = 29;
        break;

      case 43:
        context$1$0.next = 49;
        break;

      case 45:
        context$1$0.prev = 45;
        context$1$0.t0 = context$1$0['catch'](27);
        _didIteratorError2 = true;
        _iteratorError2 = context$1$0.t0;

      case 49:
        context$1$0.prev = 49;
        context$1$0.prev = 50;

        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
          _iterator2['return']();
        }

      case 52:
        context$1$0.prev = 52;

        if (!_didIteratorError2) {
          context$1$0.next = 55;
          break;
        }

        throw _iteratorError2;

      case 55:
        return context$1$0.finish(52);

      case 56:
        return context$1$0.finish(49);

      case 57:

        // we couldn't find anything! quit
        if (!udid) {
          _logger2['default'].errorAndThrow('Unable to find an active device or emulator ' + ('with OS ' + opts.platformVersion + '. The following ') + 'are available: ' + availDevicesStr.join(', '));
        }

        emPort = adb.getPortFromEmulatorString(udid);
        context$1$0.next = 63;
        break;

      case 61:
        // a udid was not given, grab the first device we see
        udid = devices[0].udid;
        emPort = adb.getPortFromEmulatorString(udid);

      case 63:

        _logger2['default'].info('Using device: ' + udid);
        return context$1$0.abrupt('return', { udid: udid, emPort: emPort });

      case 65:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[27, 45, 49, 57], [50,, 52, 56]]);
};

// returns a new adb instance with deviceId set
helpers.createADB = function callee$0$0(javaVersion, udid, emPort, adbPort) {
  var adb;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(_appiumAdb2['default'].createADB({ javaVersion: javaVersion, adbPort: adbPort }));

      case 2:
        adb = context$1$0.sent;

        adb.setDeviceId(udid);
        if (emPort) {
          adb.setEmulatorPort(emPort);
        }

        return context$1$0.abrupt('return', adb);

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.getLaunchInfo = function callee$0$0(adb, opts) {
  var app, appPackage, appActivity, appWaitPackage, appWaitActivity, _ref2, apkPackage, apkActivity;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        app = opts.app;
        appPackage = opts.appPackage;
        appActivity = opts.appActivity;
        appWaitPackage = opts.appWaitPackage;
        appWaitActivity = opts.appWaitActivity;

        if (app) {
          context$1$0.next = 8;
          break;
        }

        _logger2['default'].warn("No app sent in, not parsing package/activity");
        return context$1$0.abrupt('return');

      case 8:
        if (!(appPackage && appActivity)) {
          context$1$0.next = 10;
          break;
        }

        return context$1$0.abrupt('return');

      case 10:

        _logger2['default'].debug("Parsing package and activity from app manifest");
        context$1$0.next = 13;
        return _regeneratorRuntime.awrap(adb.packageAndLaunchActivityFromManifest(app));

      case 13:
        _ref2 = context$1$0.sent;
        apkPackage = _ref2.apkPackage;
        apkActivity = _ref2.apkActivity;

        if (apkPackage && !appPackage) {
          appPackage = apkPackage;
        }
        if (!appWaitPackage) {
          appWaitPackage = appPackage;
        }
        if (apkActivity && !appActivity) {
          appActivity = apkActivity;
        }
        if (!appWaitActivity) {
          appWaitActivity = appActivity;
        }
        _logger2['default'].debug('Parsed package and activity are: ' + apkPackage + '/' + apkActivity);
        return context$1$0.abrupt('return', { appPackage: appPackage, appWaitPackage: appWaitPackage, appActivity: appActivity, appWaitActivity: appWaitActivity });

      case 22:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.getRemoteApkPath = function (localApkMd5) {
  var remotePath = REMOTE_TEMP_PATH + '/' + localApkMd5 + '.apk';
  _logger2['default'].info('Remote apk path is ' + remotePath);
  return remotePath;
};

helpers.resetApp = function callee$0$0(adb, localApkPath, pkg, fastReset) {
  var apkMd5, remotePath;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!fastReset) {
          context$1$0.next = 6;
          break;
        }

        _logger2['default'].debug("Running fast reset (stop and clear)");
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(adb.stopAndClear(pkg));

      case 4:
        context$1$0.next = 17;
        break;

      case 6:
        _logger2['default'].debug("Running old fashion reset (reinstall)");
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.md5(localApkPath));

      case 9:
        apkMd5 = context$1$0.sent;
        remotePath = helpers.getRemoteApkPath(apkMd5, localApkPath);
        context$1$0.next = 13;
        return _regeneratorRuntime.awrap(adb.fileExists(remotePath));

      case 13:
        if (context$1$0.sent) {
          context$1$0.next = 15;
          break;
        }

        throw new Error("Can't run slow reset without a remote apk!");

      case 15:
        context$1$0.next = 17;
        return _regeneratorRuntime.awrap(helpers.reinstallRemoteApk(adb, localApkPath, pkg, remotePath));

      case 17:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.reinstallRemoteApk = function callee$0$0(adb, localApkPath, pkg, remotePath) {
  var tries = arguments.length <= 4 || arguments[4] === undefined ? 2 : arguments[4];
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap((0, _asyncbox.retry)(tries, function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.prev = 0;
                context$2$0.next = 3;
                return _regeneratorRuntime.awrap(adb.uninstallApk(pkg));

              case 3:
                context$2$0.next = 8;
                break;

              case 5:
                context$2$0.prev = 5;
                context$2$0.t0 = context$2$0['catch'](0);

                _logger2['default'].warn("Uninstalling remote APK failed, maybe it wasn't installed");

              case 8:
                context$2$0.prev = 8;
                context$2$0.next = 11;
                return _regeneratorRuntime.awrap(adb.installFromDevicePath(remotePath, { timeout: REMOTE_INSTALL_TIMEOUT }));

              case 11:
                context$2$0.next = 21;
                break;

              case 13:
                context$2$0.prev = 13;
                context$2$0.t1 = context$2$0['catch'](8);

                _logger2['default'].warn("Installing remote APK failed, going to uninstall and try " + "again");
                // if remote install failed, remove ALL the apks and re-push ours
                // to the remote cache
                context$2$0.next = 18;
                return _regeneratorRuntime.awrap(helpers.removeRemoteApks(adb));

              case 18:
                context$2$0.next = 20;
                return _regeneratorRuntime.awrap(adb.push(localApkPath, remotePath));

              case 20:
                throw context$2$0.t1;

              case 21:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this, [[0, 5], [8, 13]]);
        }));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// throw an error to trigger the retry
helpers.installApkRemotely = function callee$0$0(adb, localApkPath, pkg, fastReset) {
  var installTimeout, apkMd5, remotePath, remoteApkExists, installed;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        installTimeout = REMOTE_INSTALL_TIMEOUT;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.md5(localApkPath));

      case 3:
        apkMd5 = context$1$0.sent;
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(helpers.getRemoteApkPath(apkMd5, localApkPath));

      case 6:
        remotePath = context$1$0.sent;
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(adb.fileExists(remotePath));

      case 9:
        remoteApkExists = context$1$0.sent;

        _logger2['default'].debug("Checking if app is installed");
        context$1$0.next = 13;
        return _regeneratorRuntime.awrap(adb.isAppInstalled(pkg));

      case 13:
        installed = context$1$0.sent;

        if (!(installed && remoteApkExists && fastReset)) {
          context$1$0.next = 20;
          break;
        }

        _logger2['default'].info("Apk is already on remote and installed, resetting");
        context$1$0.next = 18;
        return _regeneratorRuntime.awrap(helpers.resetApp(adb, localApkPath, pkg, fastReset));

      case 18:
        context$1$0.next = 34;
        break;

      case 20:
        if (!(!installed || !remoteApkExists && fastReset)) {
          context$1$0.next = 34;
          break;
        }

        if (!installed) {
          _logger2['default'].info("Apk is not yet installed");
        } else {
          _logger2['default'].info("Apk was already installed but not from our remote path");
        }
        _logger2['default'].info((installed ? 'Re' : '') + 'installing apk from remote');
        context$1$0.next = 25;
        return _regeneratorRuntime.awrap(adb.mkdir(REMOTE_TEMP_PATH));

      case 25:
        _logger2['default'].info("Clearing out any existing remote apks with the same hash");
        context$1$0.next = 28;
        return _regeneratorRuntime.awrap(helpers.removeRemoteApks(adb, [apkMd5]));

      case 28:
        if (remoteApkExists) {
          context$1$0.next = 32;
          break;
        }

        // push from local to remote
        _logger2['default'].info('Pushing ' + pkg + ' to device. Will wait up to ' + installTimeout + ' ' + 'milliseconds before aborting');
        context$1$0.next = 32;
        return _regeneratorRuntime.awrap(adb.push(localApkPath, remotePath, { timeout: installTimeout }));

      case 32:
        context$1$0.next = 34;
        return _regeneratorRuntime.awrap(helpers.reinstallRemoteApk(adb, localApkPath, pkg, remotePath));

      case 34:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.removeRemoteApks = function callee$0$0(adb) {
  var exceptMd5s = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

  var apks, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, apk;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].debug("Removing any old apks");
        if (exceptMd5s) {
          _logger2['default'].debug('Except ' + JSON.stringify(exceptMd5s));
        } else {
          exceptMd5s = [];
        }
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(adb.ls(REMOTE_TEMP_PATH + '/*.apk'));

      case 4:
        apks = context$1$0.sent;

        if (!(apks.length < 1)) {
          context$1$0.next = 8;
          break;
        }

        _logger2['default'].debug("No apks to examine");
        return context$1$0.abrupt('return');

      case 8:
        apks = apks.filter(function (apk) {
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = _getIterator(exceptMd5s), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var md5 = _step3.value;

              return apk.indexOf(md5) === -1;
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3['return']) {
                _iterator3['return']();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }
        });
        _iteratorNormalCompletion4 = true;
        _didIteratorError4 = false;
        _iteratorError4 = undefined;
        context$1$0.prev = 12;
        _iterator4 = _getIterator(apks);

      case 14:
        if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
          context$1$0.next = 22;
          break;
        }

        apk = _step4.value;

        _logger2['default'].info('Will remove ' + apk);
        context$1$0.next = 19;
        return _regeneratorRuntime.awrap(adb.shell(['rm', '-f', apk]));

      case 19:
        _iteratorNormalCompletion4 = true;
        context$1$0.next = 14;
        break;

      case 22:
        context$1$0.next = 28;
        break;

      case 24:
        context$1$0.prev = 24;
        context$1$0.t0 = context$1$0['catch'](12);
        _didIteratorError4 = true;
        _iteratorError4 = context$1$0.t0;

      case 28:
        context$1$0.prev = 28;
        context$1$0.prev = 29;

        if (!_iteratorNormalCompletion4 && _iterator4['return']) {
          _iterator4['return']();
        }

      case 31:
        context$1$0.prev = 31;

        if (!_didIteratorError4) {
          context$1$0.next = 34;
          break;
        }

        throw _iteratorError4;

      case 34:
        return context$1$0.finish(31);

      case 35:
        return context$1$0.finish(28);

      case 36:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[12, 24, 28, 36], [29,, 31, 35]]);
};

helpers.initUnicodeKeyboard = function callee$0$0(adb) {
  var defaultIME, appiumIME;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].debug('Enabling Unicode keyboard support');
        _logger2['default'].debug("Pushing unicode ime to device...");
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(adb.install(_appiumAndroidIme.path, false));

      case 4:
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(adb.defaultIME());

      case 6:
        defaultIME = context$1$0.sent;

        _logger2['default'].debug('Unsetting previous IME ' + defaultIME);
        appiumIME = 'io.appium.android.ime/.UnicodeIME';

        _logger2['default'].debug('Setting IME to \'' + appiumIME + '\'');
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(adb.enableIME(appiumIME));

      case 12:
        context$1$0.next = 14;
        return _regeneratorRuntime.awrap(adb.setIME(appiumIME));

      case 14:
        return context$1$0.abrupt('return', defaultIME);

      case 15:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.pushSettingsApp = function callee$0$0(adb) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].debug("Pushing settings apk to device...");
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(adb.install(_ioAppiumSettings.path, false));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.pushUnlock = function callee$0$0(adb) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].debug("Pushing unlock helper app to device...");
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(adb.install(_appiumUnlock.path, false));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// pushStrings method extracts string.xml and converts it to string.json and pushes
// it to /data/local/tmp/string.json on for use of bootstrap
// if app is not present to extract string.xml it deletes remote strings.json
// if app does not have strings.xml we push an empty json object to remote
helpers.pushStrings = function callee$0$0(language, adb, opts) {
  var remotePath, stringsJson, stringsTmpDir, _ref3, apkStrings, localPath, remoteFile;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        remotePath = '/data/local/tmp';
        stringsJson = 'strings.json';
        stringsTmpDir = _path2['default'].resolve(opts.tmpDir, opts.appPackage);
        context$1$0.prev = 3;

        _logger2['default'].debug('Extracting strings from apk', opts.app, language, stringsTmpDir);
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(adb.extractStringsFromApk(opts.app, language, stringsTmpDir));

      case 7:
        _ref3 = context$1$0.sent;
        apkStrings = _ref3.apkStrings;
        localPath = _ref3.localPath;
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(adb.push(localPath, remotePath));

      case 12:
        return context$1$0.abrupt('return', apkStrings);

      case 15:
        context$1$0.prev = 15;
        context$1$0.t0 = context$1$0['catch'](3);
        context$1$0.next = 19;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(opts.app));

      case 19:
        if (context$1$0.sent) {
          context$1$0.next = 24;
          break;
        }

        context$1$0.next = 22;
        return _regeneratorRuntime.awrap(adb.rimraf(remotePath + '/' + stringsJson));

      case 22:
        context$1$0.next = 28;
        break;

      case 24:
        _logger2['default'].warn("Could not get strings, continuing anyway");
        remoteFile = remotePath + '/' + stringsJson;
        context$1$0.next = 28;
        return _regeneratorRuntime.awrap(adb.shell('echo', ['\'{}\' > ' + remoteFile]));

      case 28:
        return context$1$0.abrupt('return', {});

      case 29:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[3, 15]]);
};

helpers.unlock = function callee$0$0(adb) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this2 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(adb.isScreenLocked());

      case 2:
        if (context$1$0.sent) {
          context$1$0.next = 5;
          break;
        }

        _logger2['default'].info("Screen already unlocked, doing nothing");
        return context$1$0.abrupt('return');

      case 5:
        _logger2['default'].info("Unlocking screen");

        context$1$0.next = 8;
        return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(10, 1000, function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                _logger2['default'].debug("Screen is locked, trying to unlock");
                context$2$0.next = 3;
                return _regeneratorRuntime.awrap(adb.startApp({
                  pkg: "io.appium.unlock",
                  activity: ".Unlock",
                  action: "android.intent.action.MAIN",
                  category: "android.intent.category.LAUNCHER",
                  flags: "0x10200000"
                }));

              case 3:
                context$2$0.next = 5;
                return _regeneratorRuntime.awrap((0, _asyncbox.sleep)(1000));

              case 5:
                context$2$0.next = 7;
                return _regeneratorRuntime.awrap(adb.isScreenLocked());

              case 7:
                if (context$2$0.sent) {
                  context$2$0.next = 11;
                  break;
                }

                _logger2['default'].debug("Screen unlocked successfully");
                context$2$0.next = 12;
                break;

              case 11:
                throw new Error("Screen did not unlock successfully, retrying");

              case 12:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this2);
        }));

      case 8:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.initDevice = function callee$0$0(adb, opts) {
  var defaultIME;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(adb.waitForDevice());

      case 2:
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(helpers.ensureDeviceLocale(adb, opts.language, opts.locale));

      case 4:
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(adb.startLogcat());

      case 6:
        defaultIME = undefined;

        if (!opts.unicodeKeyboard) {
          context$1$0.next = 11;
          break;
        }

        context$1$0.next = 10;
        return _regeneratorRuntime.awrap(helpers.initUnicodeKeyboard(adb));

      case 10:
        defaultIME = context$1$0.sent;

      case 11:
        context$1$0.next = 13;
        return _regeneratorRuntime.awrap(helpers.pushSettingsApp(adb));

      case 13:
        context$1$0.next = 15;
        return _regeneratorRuntime.awrap(helpers.pushUnlock(adb));

      case 15:
        return context$1$0.abrupt('return', defaultIME);

      case 16:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.removeNullProperties = function (obj) {
  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = _getIterator(_lodash2['default'].keys(obj)), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var key = _step5.value;

      if (_lodash2['default'].isNull(obj[key]) || _lodash2['default'].isUndefined(obj[key])) {
        delete obj[key];
      }
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5['return']) {
        _iterator5['return']();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }
};

helpers.truncateDecimals = function (number, digits) {
  var multiplier = Math.pow(10, digits),
      adjustedNum = number * multiplier,
      truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

  return truncatedNum / multiplier;
};

helpers.isChromeBrowser = function (browser) {
  return _lodash2['default'].contains(CHROME_BROWSERS, browser);
};

helpers.getChromePkg = function (browser) {
  var pkg = undefined,
      activity = undefined;

  browser = browser.toLowerCase();
  if (browser === "chromium") {
    pkg = "org.chromium.chrome.shell";
    activity = ".ChromeShellActivity";
  } else if (browser === "chromebeta") {
    pkg = "com.chrome.beta";
    activity = "com.google.android.apps.chrome.Main";
  } else if (browser === "browser") {
    pkg = "com.android.browser";
    activity = "com.android.browser.BrowserActivity";
  } else if (browser === "chromium-browser") {
    pkg = "org.chromium.chrome";
    activity = "com.google.android.apps.chrome.Main";
  } else {
    pkg = "com.android.chrome";
    activity = "com.google.android.apps.chrome.Main";
  }
  return { pkg: pkg, activity: activity };
};

helpers.bootstrap = _appiumAndroidBootstrap2['default'];

exports['default'] = helpers;
exports.CHROME_BROWSERS = CHROME_BROWSERS;
//API >= 23

// we can create a throwaway ADB instance here, so there is no dependency
// on instantiating on earlier (at this point, we have no udid)
// we can only use this ADB object for commands that would not be confused
// if multiple devices are connected

// a specific avd name was given. try to initialize with that

// udid was given, lets try to init with that device

// first try started devices/emulators

// direct adb calls to the specific device

// first do an uninstall of the package to make sure it's not there

// Next, install from the remote path. This can be flakey. If it doesn't
// work, clear out any cached apks, re-push from local, and try again

// get the default IME so we can return back to it later if we want

// delete remote string.json if present
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9hbmRyb2lkLWhlbHBlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O3NCQUFjLFFBQVE7Ozs7b0JBQ0wsTUFBTTs7Ozs0QkFDRixjQUFjOzt3QkFDUyxVQUFVOztzQkFDbkMsVUFBVTs7Ozs2QkFDVixnQkFBZ0I7O2dDQUNJLG9CQUFvQjs7Z0NBQ25CLG9CQUFvQjs7NEJBQ3RCLGVBQWU7O3NDQUMvQiwwQkFBMEI7Ozs7eUJBQ2hDLFlBQVk7Ozs7QUFFNUIsSUFBTSxnQkFBZ0IsR0FBRyxpQkFBaUIsQ0FBQztBQUMzQyxJQUFNLHNCQUFzQixHQUFHLE1BQU0sQ0FBQztBQUN0QyxJQUFNLGVBQWUsR0FBRyxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFDN0MsUUFBUSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUM3QyxrQkFBa0IsQ0FBQyxDQUFDOztBQUU3QyxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7O0FBRWpCLE9BQU8sQ0FBQyxnQkFBZ0IsR0FBRyxVQUFVLE1BQU0sRUFBRTtBQUMzQyxNQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDOzs7Ozs7QUFDL0Isc0NBQWlCLEtBQUssNEdBQUU7VUFBZixJQUFJOztBQUNYLFVBQUksSUFBSSxNQUFNLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDbkQsZUFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7T0FDN0M7S0FDRjs7Ozs7Ozs7Ozs7Ozs7OztBQUNELFNBQU8sSUFBSSxDQUFDO0NBQ2IsQ0FBQzs7QUFFRixPQUFPLENBQUMsY0FBYyxHQUFHO1lBR2xCLE1BQU0sRUFDUCxPQUFPOzs7OztBQUhYLDRCQUFPLEtBQUssQ0FBQyxzQkFB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aGVscGVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IGV4ZWMgfSBmcm9tICd0ZWVuX3Byb2Nlc3MnO1xuaW1wb3J0IHsgcmV0cnksIHJldHJ5SW50ZXJ2YWwsIHNsZWVwIH0gZnJvbSAnYXN5bmNib3gnO1xuaW1wb3J0IGxvZ2dlciBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQgeyBmcyB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcbmltcG9ydCB7IHBhdGggYXMgdW5pY29kZUlNRVBhdGggfSBmcm9tICdhcHBpdW0tYW5kcm9pZC1pbWUnO1xuaW1wb3J0IHsgcGF0aCBhcyBzZXR0aW5nc0Fwa1BhdGggfSBmcm9tICdpby5hcHBpdW0uc2V0dGluZ3MnO1xuaW1wb3J0IHsgcGF0aCBhcyB1bmxvY2tBcGtQYXRoIH0gZnJvbSAnYXBwaXVtLXVubG9jayc7XG5pbXBvcnQgQm9vdHN0cmFwIGZyb20gJ2FwcGl1bS1hbmRyb2lkLWJvb3RzdHJhcCc7XG5pbXBvcnQgQURCIGZyb20gJ2FwcGl1bS1hZGInO1xuXG5jb25zdCBSRU1PVEVfVEVNUF9QQVRIID0gXCIvZGF0YS9sb2NhbC90bXBcIjtcbmNvbnN0IFJFTU9URV9JTlNUQUxMX1RJTUVPVVQgPSAzMDAwMDA7IC8vIG1pbGxpc2Vjb25kc1xuY29uc3QgQ0hST01FX0JST1dTRVJTID0gW1wiQ2hyb21lXCIsIFwiQ2hyb21pdW1cIiwgXCJDaHJvbWViZXRhXCIsIFwiQnJvd3NlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hyb21lXCIsIFwiY2hyb21pdW1cIiwgXCJjaHJvbWViZXRhXCIsIFwiYnJvd3NlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hyb21pdW0tYnJvd3NlclwiXTtcblxubGV0IGhlbHBlcnMgPSB7fTtcblxuaGVscGVycy5wYXJzZUphdmFWZXJzaW9uID0gZnVuY3Rpb24gKHN0ZGVycikge1xuICBsZXQgbGluZXMgPSBzdGRlcnIuc3BsaXQoXCJcXG5cIik7XG4gIGZvciAobGV0IGxpbmUgb2YgbGluZXMpIHtcbiAgICBpZiAobmV3IFJlZ0V4cCgvKGphdmF8b3BlbmpkaykgdmVyc2lvbi8pLnRlc3QobGluZSkpIHtcbiAgICAgIHJldHVybiBsaW5lLnNwbGl0KFwiIFwiKVsyXS5yZXBsYWNlKC9cIi9nLCAnJyk7XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxuaGVscGVycy5nZXRKYXZhVmVyc2lvbiA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgbG9nZ2VyLmRlYnVnKFwiR2V0dGluZyBKYXZhIHZlcnNpb25cIik7XG5cbiAgbGV0IHtzdGRlcnJ9ID0gYXdhaXQgZXhlYygnamF2YScsIFsnLXZlcnNpb24nXSk7XG4gIGxldCBqYXZhVmVyID0gaGVscGVycy5wYXJzZUphdmFWZXJzaW9uKHN0ZGVycik7XG4gIGlmIChqYXZhVmVyID09PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGdldCB0aGUgSmF2YSB2ZXJzaW9uLiBJcyBKYXZhIGluc3RhbGxlZD9cIik7XG4gIH1cbiAgbG9nZ2VyLmluZm8oYEphdmEgdmVyc2lvbiBpczogJHtqYXZhVmVyfWApO1xuICByZXR1cm4gamF2YVZlcjtcbn07XG5cbmhlbHBlcnMucHJlcGFyZUVtdWxhdG9yID0gYXN5bmMgZnVuY3Rpb24gKGFkYiwgb3B0cykge1xuICBsZXQge2F2ZCwgYXZkQXJncywgbGFuZ3VhZ2UsIGxvY2FsZSwgYXZkTGF1bmNoVGltZW91dCxcbiAgICAgICBhdmRSZWFkeVRpbWVvdXR9ID0gb3B0cztcbiAgaWYgKCFhdmQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgbGF1bmNoIEFWRCB3aXRob3V0IEFWRCBuYW1lXCIpO1xuICB9XG4gIGxldCBhdmROYW1lID0gYXZkLnJlcGxhY2UoJ0AnLCAnJyk7XG4gIGxldCBydW5uaW5nQVZEID0gYXdhaXQgYWRiLmdldFJ1bm5pbmdBVkQoYXZkTmFtZSk7XG4gIGlmIChydW5uaW5nQVZEICE9PSBudWxsKSB7XG4gICAgbG9nZ2VyLmRlYnVnKFwiTm90IGxhdW5jaGluZyBBVkQgYmVjYXVzZSBpdCBpcyBhbHJlYWR5IHJ1bm5pbmcuXCIpO1xuICAgIHJldHVybjtcbiAgfVxuICBhd2FpdCBhZGIubGF1bmNoQVZEKGF2ZCwgYXZkQXJncywgbGFuZ3VhZ2UsIGxvY2FsZSwgYXZkTGF1bmNoVGltZW91dCxcbiAgICAgICAgICAgICAgICAgICAgICBhdmRSZWFkeVRpbWVvdXQpO1xufTtcblxuaGVscGVycy5lbnN1cmVEZXZpY2VMb2NhbGUgPSBhc3luYyBmdW5jdGlvbiAoYWRiLCBsYW5ndWFnZSwgY291bnRyeSkge1xuICBsZXQgaGF2ZUxhbmd1YWdlID0gbGFuZ3VhZ2UgJiYgdHlwZW9mIGxhbmd1YWdlID09PSBcInN0cmluZ1wiO1xuICBsZXQgaGF2ZUNvdW50cnkgPSBjb3VudHJ5ICYmIHR5cGVvZiBjb3VudHJ5ID09PSBcInN0cmluZ1wiO1xuICBpZiAoIWhhdmVMYW5ndWFnZSAmJiAhaGF2ZUNvdW50cnkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgbGV0IGNoYW5nZWQgPSBmYWxzZTtcbiAgaWYgKGF3YWl0IGFkYi5nZXRBcGlMZXZlbCgpIDwgMjMpXG4gIHtcbiAgICBsZXQgY3VyTGFuZ3VhZ2UgPSBhd2FpdCBhZGIuZ2V0RGV2aWNlTGFuZ3VhZ2UoKTtcbiAgICBsZXQgY3VyQ291bnRyeSA9IGF3YWl0IGFkYi5nZXREZXZpY2VDb3VudHJ5KCk7XG4gICAgaWYgKGhhdmVMYW5ndWFnZSAmJiBsYW5ndWFnZSAhPT0gY3VyTGFuZ3VhZ2UpIHtcbiAgICAgIGF3YWl0IGFkYi5zZXREZXZpY2VMYW5ndWFnZShsYW5ndWFnZSk7XG4gICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGhhdmVDb3VudHJ5ICYmIGNvdW50cnkgIT09IGN1ckNvdW50cnkpIHtcbiAgICAgIGF3YWl0IGFkYi5zZXREZXZpY2VDb3VudHJ5KGNvdW50cnkpO1xuICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgfVxuICB9IGVsc2UgeyAvL0FQSSA+PSAyM1xuICAgIGxldCBjdXJMb2NhbGUgPSBhd2FpdCBhZGIuZ2V0RGV2aWNlTG9jYWxlKCk7XG4gICAgbGV0IGxvY2FsZTtcbiAgICBpZiAoIWhhdmVDb3VudHJ5KSB7XG4gICAgICBsb2NhbGUgPSBsYW5ndWFnZS50b0xvd2VyQ2FzZSgpO1xuICAgIH0gZWxzZSBpZiAoIWhhdmVMYW5ndWFnZSkge1xuICAgICAgbG9jYWxlID0gY291bnRyeTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9jYWxlID0gbGFuZ3VhZ2UudG9Mb3dlckNhc2UoKSArIFwiLVwiICsgY291bnRyeS50b1VwcGVyQ2FzZSgpO1xuICAgIH1cbiAgICBpZiAobG9jYWxlICE9PSBjdXJMb2NhbGUpIHtcbiAgICAgIGF3YWl0IGFkYi5zZXREZXZpY2VMb2NhbGUobG9jYWxlKTtcbiAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuICBpZiAoY2hhbmdlZCkge1xuICAgIGF3YWl0IGFkYi5yZWJvb3QoKTtcbiAgfVxufTtcblxuaGVscGVycy5nZXREZXZpY2VJbmZvRnJvbUNhcHMgPSBhc3luYyBmdW5jdGlvbiAob3B0cyA9IHt9KSB7XG4gIC8vIHdlIGNhbiBjcmVhdGUgYSB0aHJvd2F3YXkgQURCIGluc3RhbmNlIGhlcmUsIHNvIHRoZXJlIGlzIG5vIGRlcGVuZGVuY3lcbiAgLy8gb24gaW5zdGFudGlhdGluZyBvbiBlYXJsaWVyIChhdCB0aGlzIHBvaW50LCB3ZSBoYXZlIG5vIHVkaWQpXG4gIC8vIHdlIGNhbiBvbmx5IHVzZSB0aGlzIEFEQiBvYmplY3QgZm9yIGNvbW1hbmRzIHRoYXQgd291bGQgbm90IGJlIGNvbmZ1c2VkXG4gIC8vIGlmIG11bHRpcGxlIGRldmljZXMgYXJlIGNvbm5lY3RlZFxuICBsZXQgYWRiID0gYXdhaXQgQURCLmNyZWF0ZUFEQih7XG4gICAgamF2YVZlcnNpb246IG9wdHMuamF2YVZlcnNpb24sXG4gICAgYWRiUG9ydDogb3B0cy5hZGJQb3J0XG4gIH0pO1xuICBsZXQgdWRpZCA9IG9wdHMudWRpZDtcbiAgbGV0IGVtUG9ydCA9IG51bGw7XG5cbiAgLy8gYSBzcGVjaWZpYyBhdmQgbmFtZSB3YXMgZ2l2ZW4uIHRyeSB0byBpbml0aWFsaXplIHdpdGggdGhhdFxuICBpZiAob3B0cy5hdmQpIHtcbiAgICBhd2FpdCBoZWxwZXJzLnByZXBhcmVFbXVsYXRvcihhZGIsIG9wdHMpO1xuICAgIHVkaWQgPSBhZGIuY3VyRGV2aWNlSWQ7XG4gICAgZW1Qb3J0ID0gYWRiLmVtdWxhdG9yUG9ydDtcbiAgfSBlbHNlIHtcbiAgICAvLyBubyBhdmQgZ2l2ZW4uIGxldHMgdHJ5IHdoYXRldmVyJ3MgcGx1Z2dlZCBpbiBkZXZpY2VzL2VtdWxhdG9yc1xuICAgIGxvZ2dlci5pbmZvKFwiUmV0cmlldmluZyBkZXZpY2UgbGlzdFwiKTtcbiAgICBsZXQgZGV2aWNlcyA9IGF3YWl0IGFkYi5nZXREZXZpY2VzV2l0aFJldHJ5KCk7XG5cbiAgICAvLyB1ZGlkIHdhcyBnaXZlbiwgbGV0cyB0cnkgdG8gaW5pdCB3aXRoIHRoYXQgZGV2aWNlXG4gICAgaWYgKHVkaWQpIHtcbiAgICAgIGlmICghXy5jb250YWlucyhfLnBsdWNrKGRldmljZXMsICd1ZGlkJyksIHVkaWQpKSB7XG4gICAgICAgIGxvZ2dlci5lcnJvckFuZFRocm93KGBEZXZpY2UgJHt1ZGlkfSB3YXMgbm90IGluIHRoZSBsaXN0IGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgb2YgY29ubmVjdGVkIGRldmljZXNgKTtcbiAgICAgIH1cbiAgICAgIGVtUG9ydCA9IGFkYi5nZXRQb3J0RnJvbUVtdWxhdG9yU3RyaW5nKHVkaWQpO1xuICAgIH0gZWxzZSBpZiAoISFvcHRzLnBsYXRmb3JtVmVyc2lvbikge1xuICAgICAgLy8gYSBwbGF0Zm9ybSB2ZXJzaW9uIHdhcyBnaXZlbi4gbGV0cyB0cnkgdG8gZmluZCBhIGRldmljZSB3aXRoIHRoZSBzYW1lIG9zXG4gICAgICBsb2dnZXIuaW5mbyhgTG9va2luZyBmb3IgYSBkZXZpY2Ugd2l0aCBBbmRyb2lkICR7b3B0cy5wbGF0Zm9ybVZlcnNpb259YCk7XG5cbiAgICAgIC8vIGluIGNhc2Ugd2UgZmFpbCB0byBmaW5kIHNvbWV0aGluZywgZ2l2ZSB0aGUgdXNlciBhIHVzZWZ1bCBsb2cgdGhhdCBoYXNcbiAgICAgIC8vIHRoZSBkZXZpY2UgdWRpZHMgYW5kIG9zIHZlcnNpb25zIHNvIHRoZXkga25vdyB3aGF0J3MgYXZhaWxhYmxlXG4gICAgICBsZXQgYXZhaWxEZXZpY2VzU3RyID0gW107XG5cbiAgICAgIC8vIGZpcnN0IHRyeSBzdGFydGVkIGRldmljZXMvZW11bGF0b3JzXG4gICAgICBmb3IgKGxldCBkZXZpY2Ugb2YgZGV2aWNlcykge1xuICAgICAgICAvLyBkaXJlY3QgYWRiIGNhbGxzIHRvIHRoZSBzcGVjaWZpYyBkZXZpY2VcbiAgICAgICAgYXdhaXQgYWRiLnNldERldmljZUlkKGRldmljZS51ZGlkKTtcbiAgICAgICAgbGV0IGRldmljZU9TID0gYXdhaXQgYWRiLmdldFBsYXRmb3JtVmVyc2lvbigpO1xuXG4gICAgICAgIC8vIGJ1aWxkIHVwIG91ciBpbmZvIHN0cmluZyBvZiBhdmFpbGFibGUgZGV2aWNlcyBhcyB3ZSBpdGVyYXRlXG4gICAgICAgIGF2YWlsRGV2aWNlc1N0ci5wdXNoKGAke2RldmljZS51ZGlkfSAoJHtkZXZpY2VPU30pYCk7XG5cbiAgICAgICAgLy8gd2UgZG8gYSBiZWdpbnMgd2l0aCBjaGVjayBmb3IgaW1wbGllZCB3aWxkY2FyZCBtYXRjaGluZ1xuICAgICAgICAvLyBlZzogNCBtYXRjaGVzIDQuMSwgNC4wLCA0LjEuMy1zYW1zdW5nLCBldGNcbiAgICAgICAgaWYgKGRldmljZU9TLmluZGV4T2Yob3B0cy5wbGF0Zm9ybVZlcnNpb24pID09PSAwKSB7XG4gICAgICAgICAgdWRpZCA9IGRldmljZS51ZGlkO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHdlIGNvdWxkbid0IGZpbmQgYW55dGhpbmchIHF1aXRcbiAgICAgIGlmICghdWRpZCkge1xuICAgICAgICBsb2dnZXIuZXJyb3JBbmRUaHJvdyhgVW5hYmxlIHRvIGZpbmQgYW4gYWN0aXZlIGRldmljZSBvciBlbXVsYXRvciBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYHdpdGggT1MgJHtvcHRzLnBsYXRmb3JtVmVyc2lvbn0uIFRoZSBmb2xsb3dpbmcgYCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBhcmUgYXZhaWxhYmxlOiBgICsgYXZhaWxEZXZpY2VzU3RyLmpvaW4oJywgJykpO1xuICAgICAgfVxuXG4gICAgICBlbVBvcnQgPSBhZGIuZ2V0UG9ydEZyb21FbXVsYXRvclN0cmluZyh1ZGlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gYSB1ZGlkIHdhcyBub3QgZ2l2ZW4sIGdyYWIgdGhlIGZpcnN0IGRldmljZSB3ZSBzZWVcbiAgICAgIHVkaWQgPSBkZXZpY2VzWzBdLnVkaWQ7XG4gICAgICBlbVBvcnQgPSBhZGIuZ2V0UG9ydEZyb21FbXVsYXRvclN0cmluZyh1ZGlkKTtcbiAgICB9XG4gIH1cblxuICBsb2dnZXIuaW5mbyhgVXNpbmcgZGV2aWNlOiAke3VkaWR9YCk7XG4gIHJldHVybiB7dWRpZCwgZW1Qb3J0fTtcbn07XG5cbi8vIHJldHVybnMgYSBuZXcgYWRiIGluc3RhbmNlIHdpdGggZGV2aWNlSWQgc2V0XG5oZWxwZXJzLmNyZWF0ZUFEQiA9IGFzeW5jIGZ1bmN0aW9uIChqYXZhVmVyc2lvbiwgdWRpZCwgZW1Qb3J0LCBhZGJQb3J0KSB7XG4gIGxldCBhZGIgPSBhd2FpdCBBREIuY3JlYXRlQURCKHtqYXZhVmVyc2lvbiwgYWRiUG9ydH0pO1xuXG4gIGFkYi5zZXREZXZpY2VJZCh1ZGlkKTtcbiAgaWYgKGVtUG9ydCkge1xuICAgIGFkYi5zZXRFbXVsYXRvclBvcnQoZW1Qb3J0KTtcbiAgfVxuXG4gIHJldHVybiBhZGI7XG59O1xuXG5oZWxwZXJzLmdldExhdW5jaEluZm8gPSBhc3luYyBmdW5jdGlvbiAoYWRiLCBvcHRzKSB7XG4gIGxldCB7YXBwLCBhcHBQYWNrYWdlLCBhcHBBY3Rpdml0eSwgYXBwV2FpdFBhY2thZ2UsIGFwcFdhaXRBY3Rpdml0eX0gPSBvcHRzO1xuICBpZiAoIWFwcCkge1xuICAgIGxvZ2dlci53YXJuKFwiTm8gYXBwIHNlbnQgaW4sIG5vdCBwYXJzaW5nIHBhY2thZ2UvYWN0aXZpdHlcIik7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChhcHBQYWNrYWdlICYmIGFwcEFjdGl2aXR5KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbG9nZ2VyLmRlYnVnKFwiUGFyc2luZyBwYWNrYWdlIGFuZCBhY3Rpdml0eSBmcm9tIGFwcCBtYW5pZmVzdFwiKTtcbiAgbGV0IHthcGtQYWNrYWdlLCBhcGtBY3Rpdml0eX0gPVxuICAgIGF3YWl0IGFkYi5wYWNrYWdlQW5kTGF1bmNoQWN0aXZpdHlGcm9tTWFuaWZlc3QoYXBwKTtcbiAgaWYgKGFwa1BhY2thZ2UgJiYgIWFwcFBhY2thZ2UpIHtcbiAgICBhcHBQYWNrYWdlID0gYXBrUGFja2FnZTtcbiAgfVxuICBpZiAoIWFwcFdhaXRQYWNrYWdlKSB7XG4gICAgYXBwV2FpdFBhY2thZ2UgPSBhcHBQYWNrYWdlO1xuICB9XG4gIGlmIChhcGtBY3Rpdml0eSAmJiAhYXBwQWN0aXZpdHkpIHtcbiAgICBhcHBBY3Rpdml0eSA9IGFwa0FjdGl2aXR5O1xuICB9XG4gIGlmICghYXBwV2FpdEFjdGl2aXR5KSB7XG4gICAgYXBwV2FpdEFjdGl2aXR5ID0gYXBwQWN0aXZpdHk7XG4gIH1cbiAgbG9nZ2VyLmRlYnVnKGBQYXJzZWQgcGFja2FnZSBhbmQgYWN0aXZpdHkgYXJlOiAke2Fwa1BhY2thZ2V9LyR7YXBrQWN0aXZpdHl9YCk7XG4gIHJldHVybiB7YXBwUGFja2FnZSwgYXBwV2FpdFBhY2thZ2UsIGFwcEFjdGl2aXR5LCBhcHBXYWl0QWN0aXZpdHl9O1xufTtcblxuaGVscGVycy5nZXRSZW1vdGVBcGtQYXRoID0gZnVuY3Rpb24gKGxvY2FsQXBrTWQ1KSB7XG4gIGxldCByZW1vdGVQYXRoID0gYCR7UkVNT1RFX1RFTVBfUEFUSH0vJHtsb2NhbEFwa01kNX0uYXBrYDtcbiAgbG9nZ2VyLmluZm8oYFJlbW90ZSBhcGsgcGF0aCBpcyAke3JlbW90ZVBhdGh9YCk7XG4gIHJldHVybiByZW1vdGVQYXRoO1xufTtcblxuaGVscGVycy5yZXNldEFwcCA9IGFzeW5jIGZ1bmN0aW9uIChhZGIsIGxvY2FsQXBrUGF0aCwgcGtnLCBmYXN0UmVzZXQpIHtcbiAgaWYgKGZhc3RSZXNldCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhcIlJ1bm5pbmcgZmFzdCByZXNldCAoc3RvcCBhbmQgY2xlYXIpXCIpO1xuICAgIGF3YWl0IGFkYi5zdG9wQW5kQ2xlYXIocGtnKTtcbiAgfSBlbHNlIHtcbiAgICBsb2dnZXIuZGVidWcoXCJSdW5uaW5nIG9sZCBmYXNoaW9uIHJlc2V0IChyZWluc3RhbGwpXCIpO1xuICAgIGxldCBhcGtNZDUgPSBhd2FpdCBmcy5tZDUobG9jYWxBcGtQYXRoKTtcbiAgICBsZXQgcmVtb3RlUGF0aCA9IGhlbHBlcnMuZ2V0UmVtb3RlQXBrUGF0aChhcGtNZDUsIGxvY2FsQXBrUGF0aCk7XG4gICAgaWYgKCFhd2FpdCBhZGIuZmlsZUV4aXN0cyhyZW1vdGVQYXRoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3QgcnVuIHNsb3cgcmVzZXQgd2l0aG91dCBhIHJlbW90ZSBhcGshXCIpO1xuICAgIH1cbiAgICBhd2FpdCBoZWxwZXJzLnJlaW5zdGFsbFJlbW90ZUFwayhhZGIsIGxvY2FsQXBrUGF0aCwgcGtnLCByZW1vdGVQYXRoKTtcbiAgfVxufTtcblxuaGVscGVycy5yZWluc3RhbGxSZW1vdGVBcGsgPSBhc3luYyBmdW5jdGlvbiAoYWRiLCBsb2NhbEFwa1BhdGgsIHBrZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbW90ZVBhdGgsIHRyaWVzID0gMikge1xuICBhd2FpdCByZXRyeSh0cmllcywgYXN5bmMgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAvLyBmaXJzdCBkbyBhbiB1bmluc3RhbGwgb2YgdGhlIHBhY2thZ2UgdG8gbWFrZSBzdXJlIGl0J3Mgbm90IHRoZXJlXG4gICAgICBhd2FpdCBhZGIudW5pbnN0YWxsQXBrKHBrZyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgbG9nZ2VyLndhcm4oXCJVbmluc3RhbGxpbmcgcmVtb3RlIEFQSyBmYWlsZWQsIG1heWJlIGl0IHdhc24ndCBpbnN0YWxsZWRcIik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBhd2FpdCBhZGIuaW5zdGFsbEZyb21EZXZpY2VQYXRoKHJlbW90ZVBhdGgsIHt0aW1lb3V0OiBSRU1PVEVfSU5TVEFMTF9USU1FT1VUfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgbG9nZ2VyLndhcm4oXCJJbnN0YWxsaW5nIHJlbW90ZSBBUEsgZmFpbGVkLCBnb2luZyB0byB1bmluc3RhbGwgYW5kIHRyeSBcIiArXG4gICAgICAgICAgICAgICAgICBcImFnYWluXCIpO1xuICAgICAgLy8gaWYgcmVtb3RlIGluc3RhbGwgZmFpbGVkLCByZW1vdmUgQUxMIHRoZSBhcGtzIGFuZCByZS1wdXNoIG91cnNcbiAgICAgIC8vIHRvIHRoZSByZW1vdGUgY2FjaGVcbiAgICAgIGF3YWl0IGhlbHBlcnMucmVtb3ZlUmVtb3RlQXBrcyhhZGIpO1xuICAgICAgYXdhaXQgYWRiLnB1c2gobG9jYWxBcGtQYXRoLCByZW1vdGVQYXRoKTtcbiAgICAgIHRocm93IGU7IC8vIHRocm93IGFuIGVycm9yIHRvIHRyaWdnZXIgdGhlIHJldHJ5XG4gICAgfVxuICB9KTtcbn07XG5cbmhlbHBlcnMuaW5zdGFsbEFwa1JlbW90ZWx5ID0gYXN5bmMgZnVuY3Rpb24gKGFkYiwgbG9jYWxBcGtQYXRoLCBwa2csIGZhc3RSZXNldCkge1xuICBsZXQgaW5zdGFsbFRpbWVvdXQgPSBSRU1PVEVfSU5TVEFMTF9USU1FT1VUO1xuXG4gIGxldCBhcGtNZDUgPSBhd2FpdCBmcy5tZDUobG9jYWxBcGtQYXRoKTtcbiAgbGV0IHJlbW90ZVBhdGggPSBhd2FpdCBoZWxwZXJzLmdldFJlbW90ZUFwa1BhdGgoYXBrTWQ1LCBsb2NhbEFwa1BhdGgpO1xuICBsZXQgcmVtb3RlQXBrRXhpc3RzID0gYXdhaXQgYWRiLmZpbGVFeGlzdHMocmVtb3RlUGF0aCk7XG4gIGxvZ2dlci5kZWJ1ZyhcIkNoZWNraW5nIGlmIGFwcCBpcyBpbnN0YWxsZWRcIik7XG4gIGxldCBpbnN0YWxsZWQgPSBhd2FpdCBhZGIuaXNBcHBJbnN0YWxsZWQocGtnKTtcblxuICBpZiAoaW5zdGFsbGVkICYmIHJlbW90ZUFwa0V4aXN0cyAmJiBmYXN0UmVzZXQpIHtcbiAgICBsb2dnZXIuaW5mbyhcIkFwayBpcyBhbHJlYWR5IG9uIHJlbW90ZSBhbmQgaW5zdGFsbGVkLCByZXNldHRpbmdcIik7XG4gICAgYXdhaXQgaGVscGVycy5yZXNldEFwcChhZGIsIGxvY2FsQXBrUGF0aCwgcGtnLCBmYXN0UmVzZXQpO1xuICB9IGVsc2UgaWYgKCFpbnN0YWxsZWQgfHwgKCFyZW1vdGVBcGtFeGlzdHMgJiYgZmFzdFJlc2V0KSkge1xuICAgIGlmICghaW5zdGFsbGVkKSB7XG4gICAgICBsb2dnZXIuaW5mbyhcIkFwayBpcyBub3QgeWV0IGluc3RhbGxlZFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nZ2VyLmluZm8oXCJBcGsgd2FzIGFscmVhZHkgaW5zdGFsbGVkIGJ1dCBub3QgZnJvbSBvdXIgcmVtb3RlIHBhdGhcIik7XG4gICAgfVxuICAgIGxvZ2dlci5pbmZvKGAke2luc3RhbGxlZCA/ICdSZScgOiAnJ31pbnN0YWxsaW5nIGFwayBmcm9tIHJlbW90ZWApO1xuICAgIGF3YWl0IGFkYi5ta2RpcihSRU1PVEVfVEVNUF9QQVRIKTtcbiAgICBsb2dnZXIuaW5mbyhcIkNsZWFyaW5nIG91dCBhbnkgZXhpc3RpbmcgcmVtb3RlIGFwa3Mgd2l0aCB0aGUgc2FtZSBoYXNoXCIpO1xuICAgIGF3YWl0IGhlbHBlcnMucmVtb3ZlUmVtb3RlQXBrcyhhZGIsIFthcGtNZDVdKTtcbiAgICBpZiAoIXJlbW90ZUFwa0V4aXN0cykge1xuICAgICAgLy8gcHVzaCBmcm9tIGxvY2FsIHRvIHJlbW90ZVxuICAgICAgbG9nZ2VyLmluZm8oYFB1c2hpbmcgJHtwa2d9IHRvIGRldmljZS4gV2lsbCB3YWl0IHVwIHRvICR7aW5zdGFsbFRpbWVvdXR9IGAgK1xuICAgICAgICAgICAgICAgICAgYG1pbGxpc2Vjb25kcyBiZWZvcmUgYWJvcnRpbmdgKTtcbiAgICAgIGF3YWl0IGFkYi5wdXNoKGxvY2FsQXBrUGF0aCwgcmVtb3RlUGF0aCwge3RpbWVvdXQ6IGluc3RhbGxUaW1lb3V0fSk7XG4gICAgfVxuXG4gICAgLy8gTmV4dCwgaW5zdGFsbCBmcm9tIHRoZSByZW1vdGUgcGF0aC4gVGhpcyBjYW4gYmUgZmxha2V5LiBJZiBpdCBkb2Vzbid0XG4gICAgLy8gd29yaywgY2xlYXIgb3V0IGFueSBjYWNoZWQgYXBrcywgcmUtcHVzaCBmcm9tIGxvY2FsLCBhbmQgdHJ5IGFnYWluXG4gICAgYXdhaXQgaGVscGVycy5yZWluc3RhbGxSZW1vdGVBcGsoYWRiLCBsb2NhbEFwa1BhdGgsIHBrZywgcmVtb3RlUGF0aCk7XG4gIH1cbn07XG5cbmhlbHBlcnMucmVtb3ZlUmVtb3RlQXBrcyA9IGFzeW5jIGZ1bmN0aW9uIChhZGIsIGV4Y2VwdE1kNXMgPSBudWxsKSB7XG4gIGxvZ2dlci5kZWJ1ZyhcIlJlbW92aW5nIGFueSBvbGQgYXBrc1wiKTtcbiAgaWYgKGV4Y2VwdE1kNXMpIHtcbiAgICBsb2dnZXIuZGVidWcoYEV4Y2VwdCAke0pTT04uc3RyaW5naWZ5KGV4Y2VwdE1kNXMpfWApO1xuICB9IGVsc2Uge1xuICAgIGV4Y2VwdE1kNXMgPSBbXTtcbiAgfVxuICBsZXQgYXBrcyA9IGF3YWl0IGFkYi5scyhgJHtSRU1PVEVfVEVNUF9QQVRIfS8qLmFwa2ApO1xuICBpZiAoYXBrcy5sZW5ndGggPCAxKSB7XG4gICAgbG9nZ2VyLmRlYnVnKFwiTm8gYXBrcyB0byBleGFtaW5lXCIpO1xuICAgIHJldHVybjtcbiAgfVxuICBhcGtzID0gYXBrcy5maWx0ZXIoKGFwaykgPT4ge1xuICAgIGZvciAobGV0IG1kNSBvZiBleGNlcHRNZDVzKSB7XG4gICAgICByZXR1cm4gYXBrLmluZGV4T2YobWQ1KSA9PT0gLTE7XG4gICAgfVxuICB9KTtcbiAgZm9yIChsZXQgYXBrIG9mIGFwa3MpIHtcbiAgICBsb2dnZXIuaW5mbyhgV2lsbCByZW1vdmUgJHthcGt9YCk7XG4gICAgYXdhaXQgYWRiLnNoZWxsKFsncm0nLCAnLWYnLCBhcGtdKTtcbiAgfVxufTtcblxuaGVscGVycy5pbml0VW5pY29kZUtleWJvYXJkID0gYXN5bmMgZnVuY3Rpb24gKGFkYikge1xuICBsb2dnZXIuZGVidWcoJ0VuYWJsaW5nIFVuaWNvZGUga2V5Ym9hcmQgc3VwcG9ydCcpO1xuICBsb2dnZXIuZGVidWcoXCJQdXNoaW5nIHVuaWNvZGUgaW1lIHRvIGRldmljZS4uLlwiKTtcbiAgYXdhaXQgYWRiLmluc3RhbGwodW5pY29kZUlNRVBhdGgsIGZhbHNlKTtcblxuICAvLyBnZXQgdGhlIGRlZmF1bHQgSU1FIHNvIHdlIGNhbiByZXR1cm4gYmFjayB0byBpdCBsYXRlciBpZiB3ZSB3YW50XG4gIGxldCBkZWZhdWx0SU1FID0gYXdhaXQgYWRiLmRlZmF1bHRJTUUoKTtcblxuICBsb2dnZXIuZGVidWcoYFVuc2V0dGluZyBwcmV2aW91cyBJTUUgJHtkZWZhdWx0SU1FfWApO1xuICBjb25zdCBhcHBpdW1JTUUgPSAnaW8uYXBwaXVtLmFuZHJvaWQuaW1lLy5Vbmljb2RlSU1FJztcbiAgbG9nZ2VyLmRlYnVnKGBTZXR0aW5nIElNRSB0byAnJHthcHBpdW1JTUV9J2ApO1xuICBhd2FpdCBhZGIuZW5hYmxlSU1FKGFwcGl1bUlNRSk7XG4gIGF3YWl0IGFkYi5zZXRJTUUoYXBwaXVtSU1FKTtcbiAgcmV0dXJuIGRlZmF1bHRJTUU7XG59O1xuXG5oZWxwZXJzLnB1c2hTZXR0aW5nc0FwcCA9IGFzeW5jIGZ1bmN0aW9uIChhZGIpIHtcbiAgbG9nZ2VyLmRlYnVnKFwiUHVzaGluZyBzZXR0aW5ncyBhcGsgdG8gZGV2aWNlLi4uXCIpO1xuICBhd2FpdCBhZGIuaW5zdGFsbChzZXR0aW5nc0Fwa1BhdGgsIGZhbHNlKTtcbn07XG5cbmhlbHBlcnMucHVzaFVubG9jayA9IGFzeW5jIGZ1bmN0aW9uIChhZGIpIHtcbiAgbG9nZ2VyLmRlYnVnKFwiUHVzaGluZyB1bmxvY2sgaGVscGVyIGFwcCB0byBkZXZpY2UuLi5cIik7XG4gIGF3YWl0IGFkYi5pbnN0YWxsKHVubG9ja0Fwa1BhdGgsIGZhbHNlKTtcbn07XG5cbi8vIHB1c2hTdHJpbmdzIG1ldGhvZCBleHRyYWN0cyBzdHJpbmcueG1sIGFuZCBjb252ZXJ0cyBpdCB0byBzdHJpbmcuanNvbiBhbmQgcHVzaGVzXG4vLyBpdCB0byAvZGF0YS9sb2NhbC90bXAvc3RyaW5nLmpzb24gb24gZm9yIHVzZSBvZiBib290c3RyYXBcbi8vIGlmIGFwcCBpcyBub3QgcHJlc2VudCB0byBleHRyYWN0IHN0cmluZy54bWwgaXQgZGVsZXRlcyByZW1vdGUgc3RyaW5ncy5qc29uXG4vLyBpZiBhcHAgZG9lcyBub3QgaGF2ZSBzdHJpbmdzLnhtbCB3ZSBwdXNoIGFuIGVtcHR5IGpzb24gb2JqZWN0IHRvIHJlbW90ZVxuaGVscGVycy5wdXNoU3RyaW5ncyA9IGFzeW5jIGZ1bmN0aW9uIChsYW5ndWFnZSwgYWRiLCBvcHRzKSB7XG4gIGxldCByZW1vdGVQYXRoID0gJy9kYXRhL2xvY2FsL3RtcCc7XG4gIGxldCBzdHJpbmdzSnNvbiA9ICdzdHJpbmdzLmpzb24nO1xuICBsZXQgc3RyaW5nc1RtcERpciA9IHBhdGgucmVzb2x2ZShvcHRzLnRtcERpciwgb3B0cy5hcHBQYWNrYWdlKTtcbiAgdHJ5IHtcbiAgICBsb2dnZXIuZGVidWcoJ0V4dHJhY3Rpbmcgc3RyaW5ncyBmcm9tIGFwaycsIG9wdHMuYXBwLCBsYW5ndWFnZSwgc3RyaW5nc1RtcERpcik7XG4gICAgbGV0IHthcGtTdHJpbmdzLCBsb2NhbFBhdGh9ID0gYXdhaXQgYWRiLmV4dHJhY3RTdHJpbmdzRnJvbUFwayhcbiAgICAgICAgICBvcHRzLmFwcCwgbGFuZ3VhZ2UsIHN0cmluZ3NUbXBEaXIpO1xuICAgIGF3YWl0IGFkYi5wdXNoKGxvY2FsUGF0aCwgcmVtb3RlUGF0aCk7XG4gICAgcmV0dXJuIGFwa1N0cmluZ3M7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGlmICghKGF3YWl0IGZzLmV4aXN0cyhvcHRzLmFwcCkpKSB7XG4gICAgICAvLyBkZWxldGUgcmVtb3RlIHN0cmluZy5qc29uIGlmIHByZXNlbnRcbiAgICAgIGF3YWl0IGFkYi5yaW1yYWYoYCR7cmVtb3RlUGF0aH0vJHtzdHJpbmdzSnNvbn1gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nZ2VyLndhcm4oXCJDb3VsZCBub3QgZ2V0IHN0cmluZ3MsIGNvbnRpbnVpbmcgYW55d2F5XCIpO1xuICAgICAgbGV0IHJlbW90ZUZpbGUgPSBgJHtyZW1vdGVQYXRofS8ke3N0cmluZ3NKc29ufWA7XG4gICAgICBhd2FpdCBhZGIuc2hlbGwoJ2VjaG8nLCBbYCd7fScgPiAke3JlbW90ZUZpbGV9YF0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4ge307XG59O1xuXG5oZWxwZXJzLnVubG9jayA9IGFzeW5jIGZ1bmN0aW9uIChhZGIpIHtcbiAgaWYgKCEoYXdhaXQgYWRiLmlzU2NyZWVuTG9ja2VkKCkpKSB7XG4gICAgbG9nZ2VyLmluZm8oXCJTY3JlZW4gYWxyZWFkeSB1bmxvY2tlZCwgZG9pbmcgbm90aGluZ1wiKTtcbiAgICByZXR1cm47XG4gIH1cbiAgbG9nZ2VyLmluZm8oXCJVbmxvY2tpbmcgc2NyZWVuXCIpO1xuXG4gIGF3YWl0IHJldHJ5SW50ZXJ2YWwoMTAsIDEwMDAsIGFzeW5jICgpID0+IHtcbiAgICBsb2dnZXIuZGVidWcoXCJTY3JlZW4gaXMgbG9ja2VkLCB0cnlpbmcgdG8gdW5sb2NrXCIpO1xuICAgIGF3YWl0IGFkYi5zdGFydEFwcCh7XG4gICAgICBwa2c6IFwiaW8uYXBwaXVtLnVubG9ja1wiLFxuICAgICAgYWN0aXZpdHk6IFwiLlVubG9ja1wiLFxuICAgICAgYWN0aW9uOiBcImFuZHJvaWQuaW50ZW50LmFjdGlvbi5NQUlOXCIsXG4gICAgICBjYXRlZ29yeTogXCJhbmRyb2lkLmludGVudC5jYXRlZ29yeS5MQVVOQ0hFUlwiLFxuICAgICAgZmxhZ3M6IFwiMHgxMDIwMDAwMFwiXG4gICAgfSk7XG4gICAgYXdhaXQgc2xlZXAoMTAwMCk7XG4gICAgaWYgKCFhd2FpdCBhZGIuaXNTY3JlZW5Mb2NrZWQoKSkge1xuICAgICAgbG9nZ2VyLmRlYnVnKFwiU2NyZWVuIHVubG9ja2VkIHN1Y2Nlc3NmdWxseVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2NyZWVuIGRpZCBub3QgdW5sb2NrIHN1Y2Nlc3NmdWxseSwgcmV0cnlpbmdcIik7XG4gICAgfVxuICB9KTtcbn07XG5cbmhlbHBlcnMuaW5pdERldmljZSA9IGFzeW5jIGZ1bmN0aW9uIChhZGIsIG9wdHMpIHtcbiAgYXdhaXQgYWRiLndhaXRGb3JEZXZpY2UoKTtcblxuICBhd2FpdCBoZWxwZXJzLmVuc3VyZURldmljZUxvY2FsZShhZGIsIG9wdHMubGFuZ3VhZ2UsIG9wdHMubG9jYWxlKTtcbiAgYXdhaXQgYWRiLnN0YXJ0TG9nY2F0KCk7XG4gIGxldCBkZWZhdWx0SU1FO1xuICBpZiAob3B0cy51bmljb2RlS2V5Ym9hcmQpIHtcbiAgICBkZWZhdWx0SU1FID0gYXdhaXQgaGVscGVycy5pbml0VW5pY29kZUtleWJvYXJkKGFkYik7XG4gIH1cbiAgYXdhaXQgaGVscGVycy5wdXNoU2V0dGluZ3NBcHAoYWRiKTtcbiAgYXdhaXQgaGVscGVycy5wdXNoVW5sb2NrKGFkYik7XG4gIHJldHVybiBkZWZhdWx0SU1FO1xufTtcblxuaGVscGVycy5yZW1vdmVOdWxsUHJvcGVydGllcyA9IGZ1bmN0aW9uIChvYmopIHtcbiAgZm9yIChsZXQga2V5IG9mIF8ua2V5cyhvYmopKSB7XG4gICAgaWYgKF8uaXNOdWxsKG9ialtrZXldKSB8fCBfLmlzVW5kZWZpbmVkKG9ialtrZXldKSkge1xuICAgICAgZGVsZXRlIG9ialtrZXldO1xuICAgIH1cbiAgfVxufTtcblxuaGVscGVycy50cnVuY2F0ZURlY2ltYWxzID0gZnVuY3Rpb24gKG51bWJlciwgZGlnaXRzKSB7XG4gIGxldCBtdWx0aXBsaWVyID0gTWF0aC5wb3coMTAsIGRpZ2l0cyksXG4gICAgICBhZGp1c3RlZE51bSA9IG51bWJlciAqIG11bHRpcGxpZXIsXG4gICAgICB0cnVuY2F0ZWROdW0gPSBNYXRoW2FkanVzdGVkTnVtIDwgMCA/ICdjZWlsJyA6ICdmbG9vciddKGFkanVzdGVkTnVtKTtcblxuICByZXR1cm4gdHJ1bmNhdGVkTnVtIC8gbXVsdGlwbGllcjtcbn07XG5cbmhlbHBlcnMuaXNDaHJvbWVCcm93c2VyID0gZnVuY3Rpb24gKGJyb3dzZXIpIHtcbiAgcmV0dXJuIF8uY29udGFpbnMoQ0hST01FX0JST1dTRVJTLCBicm93c2VyKTtcbn07XG5cbmhlbHBlcnMuZ2V0Q2hyb21lUGtnID0gZnVuY3Rpb24gKGJyb3dzZXIpIHtcbiAgbGV0IHBrZywgYWN0aXZpdHk7XG5cbiAgYnJvd3NlciA9IGJyb3dzZXIudG9Mb3dlckNhc2UoKTtcbiAgaWYgKGJyb3dzZXIgPT09IFwiY2hyb21pdW1cIikge1xuICAgIHBrZyA9IFwib3JnLmNocm9taXVtLmNocm9tZS5zaGVsbFwiO1xuICAgIGFjdGl2aXR5ID0gXCIuQ2hyb21lU2hlbGxBY3Rpdml0eVwiO1xuICB9IGVsc2UgaWYgKGJyb3dzZXIgPT09IFwiY2hyb21lYmV0YVwiKSB7XG4gICAgcGtnID0gXCJjb20uY2hyb21lLmJldGFcIjtcbiAgICBhY3Rpdml0eSA9IFwiY29tLmdvb2dsZS5hbmRyb2lkLmFwcHMuY2hyb21lLk1haW5cIjtcbiAgfSBlbHNlIGlmIChicm93c2VyID09PSBcImJyb3dzZXJcIikge1xuICAgIHBrZyA9IFwiY29tLmFuZHJvaWQuYnJvd3NlclwiO1xuICAgIGFjdGl2aXR5ID0gXCJjb20uYW5kcm9pZC5icm93c2VyLkJyb3dzZXJBY3Rpdml0eVwiO1xuICB9IGVsc2UgaWYgKGJyb3dzZXIgPT09IFwiY2hyb21pdW0tYnJvd3NlclwiKSB7XG4gICAgcGtnID0gXCJvcmcuY2hyb21pdW0uY2hyb21lXCI7XG4gICAgYWN0aXZpdHkgPSBcImNvbS5nb29nbGUuYW5kcm9pZC5hcHBzLmNocm9tZS5NYWluXCI7XG4gIH0gZWxzZSB7XG4gICAgcGtnID0gXCJjb20uYW5kcm9pZC5jaHJvbWVcIjtcbiAgICBhY3Rpdml0eSA9IFwiY29tLmdvb2dsZS5hbmRyb2lkLmFwcHMuY2hyb21lLk1haW5cIjtcbiAgfVxuICByZXR1cm4ge3BrZywgYWN0aXZpdHl9O1xufTtcblxuaGVscGVycy5ib290c3RyYXAgPSBCb290c3RyYXA7XG5cbmV4cG9ydCBkZWZhdWx0IGhlbHBlcnM7XG5leHBvcnQgeyBDSFJPTUVfQlJPV1NFUlMgfTtcbiJdfQ==