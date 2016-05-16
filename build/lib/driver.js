'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _appiumBaseDriver = require('appium-base-driver');

var _appiumChromedriver = require('appium-chromedriver');

var _appiumChromedriver2 = _interopRequireDefault(_appiumChromedriver);

var _desiredCaps = require('./desired-caps');

var _desiredCaps2 = _interopRequireDefault(_desiredCaps);

var _commandsIndex = require('./commands/index');

var _commandsIndex2 = _interopRequireDefault(_commandsIndex);

var _commandsContext = require('./commands/context');

var _androidHelpers = require('./android-helpers');

var _androidHelpers2 = _interopRequireDefault(_androidHelpers);

var _webviewHelpers = require('./webview-helpers');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _appiumAdb = require('appium-adb');

var _appiumSupport = require('appium-support');

var _asyncbox = require('asyncbox');

var APP_EXTENSION = '.apk';
var DEVICE_PORT = 4724;

// This is a set of methods and paths that we never want to proxy to
// Chromedriver
var NO_PROXY = [['POST', new RegExp('^/session/[^/]+/context')], ['GET', new RegExp('^/session/[^/]+/context')], ['POST', new RegExp('^/session/[^/]+/appium')], ['GET', new RegExp('^/session/[^/]+/appium')], ['POST', new RegExp('^/session/[^/]+/touch/perform')], ['POST', new RegExp('^/session/[^/]+/touch/multi/perform')], ['POST', new RegExp('^/session/[^/]+/orientation')], ['GET', new RegExp('^/session/[^/]+/orientation')]];

var AndroidDriver = (function (_BaseDriver) {
  _inherits(AndroidDriver, _BaseDriver);

  function AndroidDriver() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var shouldValidateCaps = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    _classCallCheck(this, AndroidDriver);

    _get(Object.getPrototypeOf(AndroidDriver.prototype), 'constructor', this).call(this, opts, shouldValidateCaps);
    this.locatorStrategies = ['xpath', 'id', 'class name', 'accessibility id', '-android uiautomator'];
    this.desiredCapConstraints = _desiredCaps2['default'];
    this.sessionChromedrivers = {};
    this.jwpProxyActive = false;
    this.jwpProxyAvoid = _lodash2['default'].clone(NO_PROXY);
    this.settings = new _appiumBaseDriver.DeviceSettings({ ignoreUnimportantViews: false }, this.onSettingsUpdate.bind(this));
    this.chromedriver = null;
    this.apkStrings = {};
    this.acceptSslCerts = !!opts.acceptSslCerts;
    this.bootstrapPort = opts.bootstrapPort || DEVICE_PORT;
  }

  _createClass(AndroidDriver, [{
    key: 'createSession',
    value: function createSession(caps) {
      var sessionId, _ref, _ref2, serverDetails, defaultOpts, _helpers$getChromePkg, pkg, activity, _ref3,

      // get device udid for this session
      udid, emPort;

      return _regeneratorRuntime.async(function createSession$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.prev = 0;
            sessionId = undefined;
            context$2$0.next = 4;
            return _regeneratorRuntime.awrap(_get(Object.getPrototypeOf(AndroidDriver.prototype), 'createSession', this).call(this, caps));

          case 4:
            _ref = context$2$0.sent;
            _ref2 = _slicedToArray(_ref, 1);
            sessionId = _ref2[0];
            serverDetails = { platform: 'LINUX',
              webStorageEnabled: false,
              takesScreenshot: true,
              javascriptEnabled: true,
              databaseEnabled: false,
              networkConnectionEnabled: true,
              locationContextEnabled: false,
              warnings: {},
              desired: this.caps };

            this.caps = _Object$assign(serverDetails, this.caps);

            // assigning defaults
            context$2$0.next = 11;
            return _regeneratorRuntime.awrap(_appiumSupport.tempDir.staticDir());

          case 11:
            context$2$0.t0 = context$2$0.sent;
            context$2$0.t1 = _appiumAdb.DEFAULT_ADB_PORT;
            defaultOpts = {
              action: "android.intent.action.MAIN",
              category: "android.intent.category.LAUNCHER",
              flags: "0x10200000",
              disableAndroidWatchers: false,
              tmpDir: context$2$0.t0,
              fullReset: false,
              autoLaunch: true,
              adbPort: context$2$0.t1
            };

            _lodash2['default'].defaults(this.opts, defaultOpts);

            if (this.opts.javaVersion) {
              context$2$0.next = 19;
              break;
            }

            context$2$0.next = 18;
            return _regeneratorRuntime.awrap(_androidHelpers2['default'].getJavaVersion());

          case 18:
            this.opts.javaVersion = context$2$0.sent;

          case 19:

            // not user visible via caps
            if (this.opts.noReset === true) this.opts.fullReset = false;
            if (this.opts.fullReset === true) this.opts.noReset = false;
            this.opts.fastReset = !this.opts.fullReset && !this.opts.noReset;
            this.opts.skipUninstall = this.opts.fastReset || this.opts.noReset;

            this.curContext = this.defaultContextName();

            if (this.isChromeSession) {
              _logger2['default'].info("We're going to run a Chrome-based session");
              _helpers$getChromePkg = _androidHelpers2['default'].getChromePkg(this.opts.browserName);
              pkg = _helpers$getChromePkg.pkg;
              activity = _helpers$getChromePkg.activity;

              this.opts.appPackage = pkg;
              this.opts.appActivity = activity;
              _logger2['default'].info('Chrome-type package and activity are ' + pkg + ' and ' + activity);
            }

            if (this.opts.nativeWebScreenshot) {
              this.jwpProxyAvoid.push(['GET', new RegExp('^/session/[^/]+/screenshot')]);
            }context$2$0.next = 28;
            return _regeneratorRuntime.awrap(_androidHelpers2['default'].getDeviceInfoFromCaps(this.opts));

          case 28:
            _ref3 = context$2$0.sent;
            udid = _ref3.udid;
            emPort = _ref3.emPort;

            this.opts.udid = udid;
            this.opts.emPort = emPort;

            // set up an instance of ADB
            context$2$0.next = 35;
            return _regeneratorRuntime.awrap(_androidHelpers2['default'].createADB(this.opts.javaVersion, this.opts.udid, this.opts.emPort, this.opts.adbPort));

          case 35:
            this.adb = context$2$0.sent;

            if (this.helpers.isPackageOrBundle(this.opts.app)) {
              // user provided package instead of app for 'app' capability, massage options
              this.opts.appPackage = this.opts.app;
              this.opts.app = null;
            }

            if (!this.opts.app) {
              context$2$0.next = 45;
              break;
            }

            context$2$0.next = 40;
            return _regeneratorRuntime.awrap(this.helpers.configureApp(this.opts.app, APP_EXTENSION));

          case 40:
            this.opts.app = context$2$0.sent;
            context$2$0.next = 43;
            return _regeneratorRuntime.awrap(this.checkAppPresent());

          case 43:
            context$2$0.next = 49;
            break;

          case 45:
            if (!this.appOnDevice) {
              context$2$0.next = 49;
              break;
            }

            // the app isn't an actual app file but rather something we want to
            // assume is on the device and just launch via the appPackage
            _logger2['default'].info('App file was not listed, instead we\'re going to run ' + (this.opts.appPackage + ' directly on the device'));
            context$2$0.next = 49;
            return _regeneratorRuntime.awrap(this.checkPackagePresent());

          case 49:
            context$2$0.next = 51;
            return _regeneratorRuntime.awrap(this.startAndroidSession(this.opts));

          case 51:
            return context$2$0.abrupt('return', [sessionId, this.caps]);

          case 54:
            context$2$0.prev = 54;
            context$2$0.t2 = context$2$0['catch'](0);
            context$2$0.next = 58;
            return _regeneratorRuntime.awrap(this.deleteSession());

          case 58:
            throw context$2$0.t2;

          case 59:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[0, 54]]);
    }
  }, {
    key: 'onSettingsUpdate',
    value: function onSettingsUpdate(key, value) {
      return _regeneratorRuntime.async(function onSettingsUpdate$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            if (!(key === "ignoreUnimportantViews")) {
              context$2$0.next = 3;
              break;
            }

            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(this.setCompressedLayoutHierarchy(value));

          case 3:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'startAndroidSession',
    value: function startAndroidSession() {
      return _regeneratorRuntime.async(function startAndroidSession$(context$2$0) {
        var _this = this;

        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            _logger2['default'].info('Starting Android session');
            // set up the device to run on (real or emulator, etc)
            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(_androidHelpers2['default'].initDevice(this.adb, this.opts));

          case 3:
            this.defaultIME = context$2$0.sent;

            // set actual device name & platform version
            this.caps.deviceName = this.adb.curDeviceId;
            context$2$0.next = 7;
            return _regeneratorRuntime.awrap(this.adb.getPlatformVersion());

          case 7:
            this.caps.platformVersion = context$2$0.sent;
            context$2$0.next = 10;
            return _regeneratorRuntime.awrap(_androidHelpers2['default'].unlock(this.adb));

          case 10:
            if (!(!this.appOnDevice && this.opts.autoLaunch)) {
              context$2$0.next = 13;
              break;
            }

            context$2$0.next = 13;
            return _regeneratorRuntime.awrap(this.initAUT());

          case 13:
            // start UiAutomator
            this.bootstrap = new _androidHelpers2['default'].bootstrap(this.adb, this.bootstrapPort, this.opts.websocket);
            context$2$0.next = 16;
            return _regeneratorRuntime.awrap(this.bootstrap.start(this.opts.appPackage, this.opts.disableAndroidWatchers));

          case 16:
            // handling unexpected shutdown
            this.bootstrap.onUnexpectedShutdown['catch'](function callee$2$0(err) {
              return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
                while (1) switch (context$3$0.prev = context$3$0.next) {
                  case 0:
                    if (this.bootstrap.ignoreUnexpectedShutdown) {
                      context$3$0.next = 3;
                      break;
                    }

                    context$3$0.next = 3;
                    return _regeneratorRuntime.awrap(this.startUnexpectedShutdown(err));

                  case 3:
                  case 'end':
                    return context$3$0.stop();
                }
              }, null, _this);
            });

            // Set CompressedLayoutHierarchy on the device based on current settings object
            // this has to happen _after_ bootstrap is initialized

            if (!this.opts.ignoreUnimportantViews) {
              context$2$0.next = 20;
              break;
            }

            context$2$0.next = 20;
            return _regeneratorRuntime.awrap(this.settings.update({ ignoreUnimportantViews: this.opts.ignoreUnimportantViews }));

          case 20:
            if (!this.isChromeSession) {
              context$2$0.next = 25;
              break;
            }

            context$2$0.next = 23;
            return _regeneratorRuntime.awrap(this.startChromeSession());

          case 23:
            context$2$0.next = 28;
            break;

          case 25:
            if (!this.opts.autoLaunch) {
              context$2$0.next = 28;
              break;
            }

            context$2$0.next = 28;
            return _regeneratorRuntime.awrap(this.startAUT());

          case 28:
            context$2$0.next = 30;
            return _regeneratorRuntime.awrap(this.initAutoWebview());

          case 30:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'initAutoWebview',
    value: function initAutoWebview() {
      return _regeneratorRuntime.async(function initAutoWebview$(context$2$0) {
        var _this3 = this;

        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            if (!this.opts.autoWebview) {
              context$2$0.next = 3;
              break;
            }

            context$2$0.next = 3;
            return _regeneratorRuntime.awrap((function callee$2$0() {
              var viewName, timeout;
              return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
                var _this2 = this;

                while (1) switch (context$3$0.prev = context$3$0.next) {
                  case 0:
                    viewName = this.defaultWebviewName();
                    timeout = this.opts.autoWebviewTimeout || 2000;

                    _logger2['default'].info('Setting auto webview to context \'' + viewName + '\' with timeout ' + timeout + 'ms');

                    // try every 500ms until timeout is over
                    context$3$0.next = 5;
                    return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(timeout / 500, 500, function callee$3$0() {
                      return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                        while (1) switch (context$4$0.prev = context$4$0.next) {
                          case 0:
                            context$4$0.next = 2;
                            return _regeneratorRuntime.awrap(this.setContext(viewName));

                          case 2:
                          case 'end':
                            return context$4$0.stop();
                        }
                      }, null, _this2);
                    }));

                  case 5:
                  case 'end':
                    return context$3$0.stop();
                }
              }, null, _this3);
            })());

          case 3:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'initAUT',
    value: function initAUT() {
      var launchInfo;
      return _regeneratorRuntime.async(function initAUT$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(_androidHelpers2['default'].getLaunchInfo(this.adb, this.opts));

          case 2:
            launchInfo = context$2$0.sent;

            _Object$assign(this.opts, launchInfo);
            _Object$assign(this.caps, launchInfo);

            if (this.opts.skipUninstall) {
              context$2$0.next = 8;
              break;
            }

            context$2$0.next = 8;
            return _regeneratorRuntime.awrap(this.adb.uninstallApk(this.opts.appPackage));

          case 8:
            if (this.opts.app) {
              context$2$0.next = 11;
              break;
            }

            _logger2['default'].debug('No app capability. Assuming it is already on the device');
            return context$2$0.abrupt('return');

          case 11:
            context$2$0.next = 13;
            return _regeneratorRuntime.awrap(_androidHelpers2['default'].installApkRemotely(this.adb, this.opts.app, this.opts.appPackage, this.opts.fastReset));

          case 13:
            context$2$0.next = 15;
            return _regeneratorRuntime.awrap(_androidHelpers2['default'].pushStrings(this.opts.language, this.adb, this.opts));

          case 15:
            this.apkStrings[this.opts.language] = context$2$0.sent;

          case 16:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'startChromeSession',
    value: function startChromeSession() {
      var opts, knownPackages;
      return _regeneratorRuntime.async(function startChromeSession$(context$2$0) {
        var _this4 = this;

        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            _logger2['default'].info("Starting a chrome-based browser session");
            opts = _lodash2['default'].cloneDeep(this.opts);

            opts.chromeUseRunningApp = false;

            knownPackages = ["org.chromium.chrome.shell", "com.android.chrome", "com.chrome.beta", "org.chromium.chrome"];

            if (!_lodash2['default'].contains(knownPackages, this.opts.appPackage)) {
              opts.chromeAndroidActivity = this.opts.appActivity;
            }
            context$2$0.next = 7;
            return _regeneratorRuntime.awrap((0, _commandsContext.setupNewChromedriver)(opts, this.adb.curDeviceId, this.adb.getAdbServerPort()));

          case 7:
            this.chromedriver = context$2$0.sent;

            this.chromedriver.on(_appiumChromedriver2['default'].EVENT_CHANGED, function (msg) {
              if (msg.state === _appiumChromedriver2['default'].STATE_STOPPED) {
                _this4.onChromedriverStop(_webviewHelpers.CHROMIUM_WIN);
              }
            });

            // Now that we have a Chrome session, we ensure that the context is
            // appropriately set and that this chromedriver is added to the list
            // of session chromedrivers so we can switch back and forth
            this.curContext = _webviewHelpers.CHROMIUM_WIN;
            this.sessionChromedrivers[_webviewHelpers.CHROMIUM_WIN] = this.chromedriver;
            this.proxyReqRes = this.chromedriver.proxyReq.bind(this.chromedriver);
            this.jwpProxyActive = true;

          case 13:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'checkAppPresent',
    value: function checkAppPresent() {
      return _regeneratorRuntime.async(function checkAppPresent$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            _logger2['default'].debug("Checking whether app is actually present");
            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(this.opts.app));

          case 3:
            if (context$2$0.sent) {
              context$2$0.next = 5;
              break;
            }

            _logger2['default'].errorAndThrow('Could not find app apk at ' + this.opts.app);

          case 5:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'checkPackagePresent',
    value: function checkPackagePresent() {
      return _regeneratorRuntime.async(function checkPackagePresent$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            _logger2['default'].debug("Checking whether package is present on the device");
            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(this.adb.shell(['pm', 'list', 'packages', this.opts.appPackage]));

          case 3:
            if (context$2$0.sent) {
              context$2$0.next = 5;
              break;
            }

            _logger2['default'].errorAndThrow('Could not find package ' + this.opts.appPackage + ' on the device');

          case 5:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }

    // Set CompressedLayoutHierarchy on the device
  }, {
    key: 'setCompressedLayoutHierarchy',
    value: function setCompressedLayoutHierarchy(compress) {
      return _regeneratorRuntime.async(function setCompressedLayoutHierarchy$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(this.bootstrap.sendAction("compressedLayoutHierarchy", { compressLayout: compress }));

          case 2:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'deleteSession',
    value: function deleteSession() {
      return _regeneratorRuntime.async(function deleteSession$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            _logger2['default'].debug("Shutting down Android driver");
            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(_get(Object.getPrototypeOf(AndroidDriver.prototype), 'deleteSession', this).call(this));

          case 3:
            if (!this.bootstrap) {
              context$2$0.next = 25;
              break;
            }

            context$2$0.next = 6;
            return _regeneratorRuntime.awrap(this.stopChromedriverProxies());

          case 6:
            if (!(this.opts.unicodeKeyboard && this.opts.resetKeyboard && this.defaultIME)) {
              context$2$0.next = 10;
              break;
            }

            _logger2['default'].debug('Resetting IME to ' + this.defaultIME);
            context$2$0.next = 10;
            return _regeneratorRuntime.awrap(this.adb.setIME(this.defaultIME));

          case 10:
            if (this.isChromeSession) {
              context$2$0.next = 13;
              break;
            }

            context$2$0.next = 13;
            return _regeneratorRuntime.awrap(this.adb.forceStop(this.opts.appPackage));

          case 13:
            context$2$0.next = 15;
            return _regeneratorRuntime.awrap(this.adb.goToHome());

          case 15:
            if (!(this.opts.fullReset && !this.opts.skipUninstall && !this.appOnDevice)) {
              context$2$0.next = 18;
              break;
            }

            context$2$0.next = 18;
            return _regeneratorRuntime.awrap(this.adb.uninstallApk(this.opts.appPackage));

          case 18:
            context$2$0.next = 20;
            return _regeneratorRuntime.awrap(this.adb.stopLogcat());

          case 20:
            context$2$0.next = 22;
            return _regeneratorRuntime.awrap(this.bootstrap.shutdown());

          case 22:
            this.bootstrap = null;
            context$2$0.next = 26;
            break;

          case 25:
            _logger2['default'].warn("Cannot shut down Android driver; it has already shut down");

          case 26:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'validateDesiredCaps',
    value: function validateDesiredCaps(caps) {
      // check with the base class, and return if it fails
      var res = _get(Object.getPrototypeOf(AndroidDriver.prototype), 'validateDesiredCaps', this).call(this, caps);
      if (!res) return res;

      // make sure that the capabilities have one of `app`, `appPackage` or `browser`
      if ((!caps.browserName || !_androidHelpers2['default'].isChromeBrowser(caps.browserName)) && !caps.app && !caps.appPackage) {
        var msg = 'The desired capabilities must include either an app, package or browser';
        _logger2['default'].errorAndThrow(msg);
      }
      // warn if the capabilities have both `app` and `browser, although this
      // is common with selenium grid
      if (caps.browserName && caps.app) {
        var msg = 'The desired capabilities should generally not include both an app and a browser';
        _logger2['default'].warn(msg);
      }
    }
  }, {
    key: 'proxyActive',
    value: function proxyActive(sessionId) {
      _get(Object.getPrototypeOf(AndroidDriver.prototype), 'proxyActive', this).call(this, sessionId);

      return this.jwpProxyActive;
    }
  }, {
    key: 'getProxyAvoidList',
    value: function getProxyAvoidList(sessionId) {
      _get(Object.getPrototypeOf(AndroidDriver.prototype), 'getProxyAvoidList', this).call(this, sessionId);

      return this.jwpProxyAvoid;
    }
  }, {
    key: 'canProxy',
    value: function canProxy(sessionId) {
      _get(Object.getPrototypeOf(AndroidDriver.prototype), 'canProxy', this).call(this, sessionId);

      // this will change depending on ChromeDriver status
      return _lodash2['default'].isFunction(this.proxyReqRes);
    }
  }, {
    key: 'appOnDevice',
    get: function get() {
      return this.helpers.isPackageOrBundle(this.opts.app) || !this.opts.app && this.helpers.isPackageOrBundle(this.opts.appPackage);
    }
  }, {
    key: 'isChromeSession',
    get: function get() {
      return _androidHelpers2['default'].isChromeBrowser(this.opts.browserName);
    }
  }]);

  return AndroidDriver;
})(_appiumBaseDriver.BaseDriver);

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {

  for (var _iterator = _getIterator(_lodash2['default'].pairs(_commandsIndex2['default'])), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var _step$value = _slicedToArray(_step.value, 2);

    var cmd = _step$value[0];
    var fn = _step$value[1];

    AndroidDriver.prototype[cmd] = fn;
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

exports['default'] = AndroidDriver;
module.exports = exports['default'];

// the whole createSession flow is surrounded in a try-catch statement
// if creating a session fails at any point, we teardown everything we
// set up before throwing the error.

// find and copy, or download and unzip an app url or path

// Let's try to unlock before installing the app
// unlock the device

// If the user sets autoLaunch to false, they are responsible for initAUT() and startAUT()

// set up app under test

// start a chromedriver session and proxy to it

// start app

// populate appPackage, appActivity, appWaitPackage, appWaitActivity
// in the opts and caps (so it gets back to the user on session creation)

// install app
//# sourceMappingURL=data:application/json;base64,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LENBQUMsR0FBRyxFQUFFLENBQUM7R0FDbkM7Ozs7Ozs7Ozs7Ozs7Ozs7cUJBRWMsYUFBYSIsImZpbGUiOiJsaWIvZHJpdmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZURyaXZlciwgRGV2aWNlU2V0dGluZ3MgfSBmcm9tICdhcHBpdW0tYmFzZS1kcml2ZXInO1xuaW1wb3J0IENocm9tZWRyaXZlciBmcm9tICdhcHBpdW0tY2hyb21lZHJpdmVyJztcbmltcG9ydCBkZXNpcmVkQ29uc3RyYWludHMgZnJvbSAnLi9kZXNpcmVkLWNhcHMnO1xuaW1wb3J0IGNvbW1hbmRzIGZyb20gJy4vY29tbWFuZHMvaW5kZXgnO1xuaW1wb3J0IHsgc2V0dXBOZXdDaHJvbWVkcml2ZXIgfSBmcm9tICcuL2NvbW1hbmRzL2NvbnRleHQnO1xuaW1wb3J0IGhlbHBlcnMgZnJvbSAnLi9hbmRyb2lkLWhlbHBlcnMnO1xuaW1wb3J0IHsgQ0hST01JVU1fV0lOIH0gZnJvbSAnLi93ZWJ2aWV3LWhlbHBlcnMnO1xuaW1wb3J0IGxvZyBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgREVGQVVMVF9BREJfUE9SVCB9IGZyb20gJ2FwcGl1bS1hZGInO1xuaW1wb3J0IHsgZnMsIHRlbXBEaXIgfSBmcm9tICdhcHBpdW0tc3VwcG9ydCc7XG5pbXBvcnQgeyByZXRyeUludGVydmFsIH0gZnJvbSAnYXN5bmNib3gnO1xuXG5cbmNvbnN0IEFQUF9FWFRFTlNJT04gPSAnLmFwayc7XG5jb25zdCBERVZJQ0VfUE9SVCA9IDQ3MjQ7XG5cbi8vIFRoaXMgaXMgYSBzZXQgb2YgbWV0aG9kcyBhbmQgcGF0aHMgdGhhdCB3ZSBuZXZlciB3YW50IHRvIHByb3h5IHRvXG4vLyBDaHJvbWVkcml2ZXJcbmNvbnN0IE5PX1BST1hZID0gW1xuICBbJ1BPU1QnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvY29udGV4dCcpXSxcbiAgWydHRVQnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvY29udGV4dCcpXSxcbiAgWydQT1NUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL2FwcGl1bScpXSxcbiAgWydHRVQnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvYXBwaXVtJyldLFxuICBbJ1BPU1QnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvdG91Y2gvcGVyZm9ybScpXSxcbiAgWydQT1NUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL3RvdWNoL211bHRpL3BlcmZvcm0nKV0sXG4gIFsnUE9TVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9vcmllbnRhdGlvbicpXSxcbiAgWydHRVQnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvb3JpZW50YXRpb24nKV0sXG5dO1xuXG5jbGFzcyBBbmRyb2lkRHJpdmVyIGV4dGVuZHMgQmFzZURyaXZlciB7XG4gIGNvbnN0cnVjdG9yIChvcHRzID0ge30sIHNob3VsZFZhbGlkYXRlQ2FwcyA9IHRydWUpIHtcbiAgICBzdXBlcihvcHRzLCBzaG91bGRWYWxpZGF0ZUNhcHMpO1xuICAgIHRoaXMubG9jYXRvclN0cmF0ZWdpZXMgPSBbXG4gICAgICAneHBhdGgnLFxuICAgICAgJ2lkJyxcbiAgICAgICdjbGFzcyBuYW1lJyxcbiAgICAgICdhY2Nlc3NpYmlsaXR5IGlkJyxcbiAgICAgICctYW5kcm9pZCB1aWF1dG9tYXRvcidcbiAgICBdO1xuICAgIHRoaXMuZGVzaXJlZENhcENvbnN0cmFpbnRzID0gZGVzaXJlZENvbnN0cmFpbnRzO1xuICAgIHRoaXMuc2Vzc2lvbkNocm9tZWRyaXZlcnMgPSB7fTtcbiAgICB0aGlzLmp3cFByb3h5QWN0aXZlID0gZmFsc2U7XG4gICAgdGhpcy5qd3BQcm94eUF2b2lkID0gXy5jbG9uZShOT19QUk9YWSk7XG4gICAgdGhpcy5zZXR0aW5ncyA9IG5ldyBEZXZpY2VTZXR0aW5ncyh7aWdub3JlVW5pbXBvcnRhbnRWaWV3czogZmFsc2V9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblNldHRpbmdzVXBkYXRlLmJpbmQodGhpcykpO1xuICAgIHRoaXMuY2hyb21lZHJpdmVyID0gbnVsbDtcbiAgICB0aGlzLmFwa1N0cmluZ3MgPSB7fTtcbiAgICB0aGlzLmFjY2VwdFNzbENlcnRzID0gISFvcHRzLmFjY2VwdFNzbENlcnRzO1xuICAgIHRoaXMuYm9vdHN0cmFwUG9ydCA9IG9wdHMuYm9vdHN0cmFwUG9ydCB8fCBERVZJQ0VfUE9SVDtcbiAgfVxuXG4gIGFzeW5jIGNyZWF0ZVNlc3Npb24gKGNhcHMpIHtcbiAgICAvLyB0aGUgd2hvbGUgY3JlYXRlU2Vzc2lvbiBmbG93IGlzIHN1cnJvdW5kZWQgaW4gYSB0cnktY2F0Y2ggc3RhdGVtZW50XG4gICAgLy8gaWYgY3JlYXRpbmcgYSBzZXNzaW9uIGZhaWxzIGF0IGFueSBwb2ludCwgd2UgdGVhcmRvd24gZXZlcnl0aGluZyB3ZVxuICAgIC8vIHNldCB1cCBiZWZvcmUgdGhyb3dpbmcgdGhlIGVycm9yLlxuICAgIHRyeSB7XG4gICAgICBsZXQgc2Vzc2lvbklkO1xuICAgICAgW3Nlc3Npb25JZF0gPSBhd2FpdCBzdXBlci5jcmVhdGVTZXNzaW9uKGNhcHMpO1xuXG4gICAgICBsZXQgc2VydmVyRGV0YWlscyA9IHtwbGF0Zm9ybTogJ0xJTlVYJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlYlN0b3JhZ2VFbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRha2VzU2NyZWVuc2hvdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGphdmFzY3JpcHRFbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YWJhc2VFbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldHdvcmtDb25uZWN0aW9uRW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uQ29udGV4dEVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgd2FybmluZ3M6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzaXJlZDogdGhpcy5jYXBzfTtcblxuICAgICAgdGhpcy5jYXBzID0gT2JqZWN0LmFzc2lnbihzZXJ2ZXJEZXRhaWxzLCB0aGlzLmNhcHMpO1xuXG4gICAgICAvLyBhc3NpZ25pbmcgZGVmYXVsdHNcbiAgICAgIGxldCBkZWZhdWx0T3B0cyA9IHtcbiAgICAgICAgYWN0aW9uOiBcImFuZHJvaWQuaW50ZW50LmFjdGlvbi5NQUlOXCIsXG4gICAgICAgIGNhdGVnb3J5OiBcImFuZHJvaWQuaW50ZW50LmNhdGVnb3J5LkxBVU5DSEVSXCIsXG4gICAgICAgIGZsYWdzOiBcIjB4MTAyMDAwMDBcIixcbiAgICAgICAgZGlzYWJsZUFuZHJvaWRXYXRjaGVyczogZmFsc2UsXG4gICAgICAgIHRtcERpcjogYXdhaXQgdGVtcERpci5zdGF0aWNEaXIoKSxcbiAgICAgICAgZnVsbFJlc2V0OiBmYWxzZSxcbiAgICAgICAgYXV0b0xhdW5jaDogdHJ1ZSxcbiAgICAgICAgYWRiUG9ydDogREVGQVVMVF9BREJfUE9SVFxuICAgICAgfTtcbiAgICAgIF8uZGVmYXVsdHModGhpcy5vcHRzLCBkZWZhdWx0T3B0cyk7XG4gICAgICBpZiAoIXRoaXMub3B0cy5qYXZhVmVyc2lvbikge1xuICAgICAgICB0aGlzLm9wdHMuamF2YVZlcnNpb24gPSBhd2FpdCBoZWxwZXJzLmdldEphdmFWZXJzaW9uKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIG5vdCB1c2VyIHZpc2libGUgdmlhIGNhcHNcbiAgICAgIGlmICh0aGlzLm9wdHMubm9SZXNldCA9PT0gdHJ1ZSkgdGhpcy5vcHRzLmZ1bGxSZXNldCA9IGZhbHNlO1xuICAgICAgaWYgKHRoaXMub3B0cy5mdWxsUmVzZXQgPT09IHRydWUpIHRoaXMub3B0cy5ub1Jlc2V0ID0gZmFsc2U7XG4gICAgICB0aGlzLm9wdHMuZmFzdFJlc2V0ID0gIXRoaXMub3B0cy5mdWxsUmVzZXQgJiYgIXRoaXMub3B0cy5ub1Jlc2V0O1xuICAgICAgdGhpcy5vcHRzLnNraXBVbmluc3RhbGwgPSB0aGlzLm9wdHMuZmFzdFJlc2V0IHx8IHRoaXMub3B0cy5ub1Jlc2V0O1xuXG4gICAgICB0aGlzLmN1ckNvbnRleHQgPSB0aGlzLmRlZmF1bHRDb250ZXh0TmFtZSgpO1xuXG4gICAgICBpZiAodGhpcy5pc0Nocm9tZVNlc3Npb24pIHtcbiAgICAgICAgbG9nLmluZm8oXCJXZSdyZSBnb2luZyB0byBydW4gYSBDaHJvbWUtYmFzZWQgc2Vzc2lvblwiKTtcbiAgICAgICAgbGV0IHtwa2csIGFjdGl2aXR5fSA9IGhlbHBlcnMuZ2V0Q2hyb21lUGtnKHRoaXMub3B0cy5icm93c2VyTmFtZSk7XG4gICAgICAgIHRoaXMub3B0cy5hcHBQYWNrYWdlID0gcGtnO1xuICAgICAgICB0aGlzLm9wdHMuYXBwQWN0aXZpdHkgPSBhY3Rpdml0eTtcbiAgICAgICAgbG9nLmluZm8oYENocm9tZS10eXBlIHBhY2thZ2UgYW5kIGFjdGl2aXR5IGFyZSAke3BrZ30gYW5kICR7YWN0aXZpdHl9YCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLm9wdHMubmF0aXZlV2ViU2NyZWVuc2hvdCkge1xuICAgICAgICB0aGlzLmp3cFByb3h5QXZvaWQucHVzaChbJ0dFVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9zY3JlZW5zaG90JyldKTtcbiAgICAgIH1cblxuICAgICAgLy8gZ2V0IGRldmljZSB1ZGlkIGZvciB0aGlzIHNlc3Npb25cbiAgICAgIGxldCB7dWRpZCwgZW1Qb3J0fSA9IGF3YWl0IGhlbHBlcnMuZ2V0RGV2aWNlSW5mb0Zyb21DYXBzKHRoaXMub3B0cyk7XG4gICAgICB0aGlzLm9wdHMudWRpZCA9IHVkaWQ7XG4gICAgICB0aGlzLm9wdHMuZW1Qb3J0ID0gZW1Qb3J0O1xuXG4gICAgICAvLyBzZXQgdXAgYW4gaW5zdGFuY2Ugb2YgQURCXG4gICAgICB0aGlzLmFkYiA9IGF3YWl0IGhlbHBlcnMuY3JlYXRlQURCKHRoaXMub3B0cy5qYXZhVmVyc2lvbiwgdGhpcy5vcHRzLnVkaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3B0cy5lbVBvcnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3B0cy5hZGJQb3J0KTtcblxuICAgICAgaWYgKHRoaXMuaGVscGVycy5pc1BhY2thZ2VPckJ1bmRsZSh0aGlzLm9wdHMuYXBwKSl7XG4gICAgICAgIC8vIHVzZXIgcHJvdmlkZWQgcGFja2FnZSBpbnN0ZWFkIG9mIGFwcCBmb3IgJ2FwcCcgY2FwYWJpbGl0eSwgbWFzc2FnZSBvcHRpb25zXG4gICAgICAgIHRoaXMub3B0cy5hcHBQYWNrYWdlID0gdGhpcy5vcHRzLmFwcDtcbiAgICAgICAgdGhpcy5vcHRzLmFwcCA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLm9wdHMuYXBwKSB7XG4gICAgICAgIC8vIGZpbmQgYW5kIGNvcHksIG9yIGRvd25sb2FkIGFuZCB1bnppcCBhbiBhcHAgdXJsIG9yIHBhdGhcbiAgICAgICAgdGhpcy5vcHRzLmFwcCA9IGF3YWl0IHRoaXMuaGVscGVycy5jb25maWd1cmVBcHAodGhpcy5vcHRzLmFwcCwgQVBQX0VYVEVOU0lPTik7XG4gICAgICAgIGF3YWl0IHRoaXMuY2hlY2tBcHBQcmVzZW50KCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuYXBwT25EZXZpY2UpIHtcbiAgICAgICAgLy8gdGhlIGFwcCBpc24ndCBhbiBhY3R1YWwgYXBwIGZpbGUgYnV0IHJhdGhlciBzb21ldGhpbmcgd2Ugd2FudCB0b1xuICAgICAgICAvLyBhc3N1bWUgaXMgb24gdGhlIGRldmljZSBhbmQganVzdCBsYXVuY2ggdmlhIHRoZSBhcHBQYWNrYWdlXG4gICAgICAgIGxvZy5pbmZvKGBBcHAgZmlsZSB3YXMgbm90IGxpc3RlZCwgaW5zdGVhZCB3ZSdyZSBnb2luZyB0byBydW4gYCArXG4gICAgICAgICAgICAgICAgIGAke3RoaXMub3B0cy5hcHBQYWNrYWdlfSBkaXJlY3RseSBvbiB0aGUgZGV2aWNlYCk7XG4gICAgICAgIGF3YWl0IHRoaXMuY2hlY2tQYWNrYWdlUHJlc2VudCgpO1xuICAgICAgfVxuXG4gICAgICBhd2FpdCB0aGlzLnN0YXJ0QW5kcm9pZFNlc3Npb24odGhpcy5vcHRzKTtcbiAgICAgIHJldHVybiBbc2Vzc2lvbklkLCB0aGlzLmNhcHNdO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGF3YWl0IHRoaXMuZGVsZXRlU2Vzc2lvbigpO1xuICAgICAgdGhyb3cgZTtcbiAgICB9XG4gIH1cblxuICBnZXQgYXBwT25EZXZpY2UgKCkge1xuICAgIHJldHVybiB0aGlzLmhlbHBlcnMuaXNQYWNrYWdlT3JCdW5kbGUodGhpcy5vcHRzLmFwcCkgfHwgKCF0aGlzLm9wdHMuYXBwICYmXG4gICAgICAgICAgIHRoaXMuaGVscGVycy5pc1BhY2thZ2VPckJ1bmRsZSh0aGlzLm9wdHMuYXBwUGFja2FnZSkpO1xuICB9XG5cbiAgZ2V0IGlzQ2hyb21lU2Vzc2lvbiAoKSB7XG4gICAgcmV0dXJuIGhlbHBlcnMuaXNDaHJvbWVCcm93c2VyKHRoaXMub3B0cy5icm93c2VyTmFtZSk7XG4gIH1cblxuICBhc3luYyBvblNldHRpbmdzVXBkYXRlIChrZXksIHZhbHVlKSB7XG4gICAgaWYgKGtleSA9PT0gXCJpZ25vcmVVbmltcG9ydGFudFZpZXdzXCIpIHtcbiAgICAgIGF3YWl0IHRoaXMuc2V0Q29tcHJlc3NlZExheW91dEhpZXJhcmNoeSh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgc3RhcnRBbmRyb2lkU2Vzc2lvbiAoKSB7XG4gICAgbG9nLmluZm8oYFN0YXJ0aW5nIEFuZHJvaWQgc2Vzc2lvbmApO1xuICAgIC8vIHNldCB1cCB0aGUgZGV2aWNlIHRvIHJ1biBvbiAocmVhbCBvciBlbXVsYXRvciwgZXRjKVxuICAgIHRoaXMuZGVmYXVsdElNRSA9IGF3YWl0IGhlbHBlcnMuaW5pdERldmljZSh0aGlzLmFkYiwgdGhpcy5vcHRzKTtcblxuICAgIC8vIHNldCBhY3R1YWwgZGV2aWNlIG5hbWUgJiBwbGF0Zm9ybSB2ZXJzaW9uXG4gICAgdGhpcy5jYXBzLmRldmljZU5hbWUgPSB0aGlzLmFkYi5jdXJEZXZpY2VJZDtcbiAgICB0aGlzLmNhcHMucGxhdGZvcm1WZXJzaW9uID0gYXdhaXQgdGhpcy5hZGIuZ2V0UGxhdGZvcm1WZXJzaW9uKCk7XG5cbiAgICAvLyBMZXQncyB0cnkgdG8gdW5sb2NrIGJlZm9yZSBpbnN0YWxsaW5nIHRoZSBhcHBcbiAgICAvLyB1bmxvY2sgdGhlIGRldmljZVxuICAgIGF3YWl0IGhlbHBlcnMudW5sb2NrKHRoaXMuYWRiKTtcbiAgICAvLyBJZiB0aGUgdXNlciBzZXRzIGF1dG9MYXVuY2ggdG8gZmFsc2UsIHRoZXkgYXJlIHJlc3BvbnNpYmxlIGZvciBpbml0QVVUKCkgYW5kIHN0YXJ0QVVUKClcbiAgICBpZiAoIXRoaXMuYXBwT25EZXZpY2UgJiYgdGhpcy5vcHRzLmF1dG9MYXVuY2gpIHtcbiAgICAgIC8vIHNldCB1cCBhcHAgdW5kZXIgdGVzdFxuICAgICAgYXdhaXQgdGhpcy5pbml0QVVUKCk7XG4gICAgfVxuICAgIC8vIHN0YXJ0IFVpQXV0b21hdG9yXG4gICAgdGhpcy5ib290c3RyYXAgPSBuZXcgaGVscGVycy5ib290c3RyYXAodGhpcy5hZGIsIHRoaXMuYm9vdHN0cmFwUG9ydCwgdGhpcy5vcHRzLndlYnNvY2tldCk7XG4gICAgYXdhaXQgdGhpcy5ib290c3RyYXAuc3RhcnQodGhpcy5vcHRzLmFwcFBhY2thZ2UsIHRoaXMub3B0cy5kaXNhYmxlQW5kcm9pZFdhdGNoZXJzKTtcbiAgICAvLyBoYW5kbGluZyB1bmV4cGVjdGVkIHNodXRkb3duXG4gICAgdGhpcy5ib290c3RyYXAub25VbmV4cGVjdGVkU2h1dGRvd24uY2F0Y2goYXN5bmMgKGVycikgPT4ge1xuICAgICAgaWYgKCF0aGlzLmJvb3RzdHJhcC5pZ25vcmVVbmV4cGVjdGVkU2h1dGRvd24pIHtcbiAgICAgICAgYXdhaXQgdGhpcy5zdGFydFVuZXhwZWN0ZWRTaHV0ZG93bihlcnIpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gU2V0IENvbXByZXNzZWRMYXlvdXRIaWVyYXJjaHkgb24gdGhlIGRldmljZSBiYXNlZCBvbiBjdXJyZW50IHNldHRpbmdzIG9iamVjdFxuICAgIC8vIHRoaXMgaGFzIHRvIGhhcHBlbiBfYWZ0ZXJfIGJvb3RzdHJhcCBpcyBpbml0aWFsaXplZFxuICAgIGlmICh0aGlzLm9wdHMuaWdub3JlVW5pbXBvcnRhbnRWaWV3cykge1xuICAgICAgYXdhaXQgdGhpcy5zZXR0aW5ncy51cGRhdGUoe2lnbm9yZVVuaW1wb3J0YW50Vmlld3M6IHRoaXMub3B0cy5pZ25vcmVVbmltcG9ydGFudFZpZXdzfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNDaHJvbWVTZXNzaW9uKSB7XG4gICAgICAvLyBzdGFydCBhIGNocm9tZWRyaXZlciBzZXNzaW9uIGFuZCBwcm94eSB0byBpdFxuICAgICAgYXdhaXQgdGhpcy5zdGFydENocm9tZVNlc3Npb24oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMub3B0cy5hdXRvTGF1bmNoKSB7XG4gICAgICAgIC8vIHN0YXJ0IGFwcFxuICAgICAgICBhd2FpdCB0aGlzLnN0YXJ0QVVUKCk7XG4gICAgICB9XG4gICAgfVxuICAgIGF3YWl0IHRoaXMuaW5pdEF1dG9XZWJ2aWV3KCk7XG4gIH1cblxuICBhc3luYyBpbml0QXV0b1dlYnZpZXcgKCkge1xuICAgIGlmICh0aGlzLm9wdHMuYXV0b1dlYnZpZXcpIHtcbiAgICAgIGxldCB2aWV3TmFtZSA9IHRoaXMuZGVmYXVsdFdlYnZpZXdOYW1lKCk7XG4gICAgICBsZXQgdGltZW91dCA9ICh0aGlzLm9wdHMuYXV0b1dlYnZpZXdUaW1lb3V0KSB8fCAyMDAwO1xuXG4gICAgICBsb2cuaW5mbyhgU2V0dGluZyBhdXRvIHdlYnZpZXcgdG8gY29udGV4dCAnJHt2aWV3TmFtZX0nIHdpdGggdGltZW91dCAke3RpbWVvdXR9bXNgKTtcblxuICAgICAgLy8gdHJ5IGV2ZXJ5IDUwMG1zIHVudGlsIHRpbWVvdXQgaXMgb3ZlclxuICAgICAgYXdhaXQgcmV0cnlJbnRlcnZhbCh0aW1lb3V0IC8gNTAwLCA1MDAsIGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5zZXRDb250ZXh0KHZpZXdOYW1lKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG5cbiAgYXN5bmMgaW5pdEFVVCAoKSB7XG4gICAgLy8gcG9wdWxhdGUgYXBwUGFja2FnZSwgYXBwQWN0aXZpdHksIGFwcFdhaXRQYWNrYWdlLCBhcHBXYWl0QWN0aXZpdHlcbiAgICAvLyBpbiB0aGUgb3B0cyBhbmQgY2FwcyAoc28gaXQgZ2V0cyBiYWNrIHRvIHRoZSB1c2VyIG9uIHNlc3Npb24gY3JlYXRpb24pXG4gICAgbGV0IGxhdW5jaEluZm8gPSBhd2FpdCBoZWxwZXJzLmdldExhdW5jaEluZm8odGhpcy5hZGIsIHRoaXMub3B0cyk7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLm9wdHMsIGxhdW5jaEluZm8pO1xuICAgIE9iamVjdC5hc3NpZ24odGhpcy5jYXBzLCBsYXVuY2hJbmZvKTtcbiAgICBpZiAoIXRoaXMub3B0cy5za2lwVW5pbnN0YWxsKSB7XG4gICAgICBhd2FpdCB0aGlzLmFkYi51bmluc3RhbGxBcGsodGhpcy5vcHRzLmFwcFBhY2thZ2UpO1xuICAgIH1cbiAgICAvLyBpbnN0YWxsIGFwcFxuICAgIGlmICghdGhpcy5vcHRzLmFwcCkge1xuICAgICAgbG9nLmRlYnVnKCdObyBhcHAgY2FwYWJpbGl0eS4gQXNzdW1pbmcgaXQgaXMgYWxyZWFkeSBvbiB0aGUgZGV2aWNlJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGF3YWl0IGhlbHBlcnMuaW5zdGFsbEFwa1JlbW90ZWx5KHRoaXMuYWRiLCB0aGlzLm9wdHMuYXBwLCB0aGlzLm9wdHMuYXBwUGFja2FnZSwgdGhpcy5vcHRzLmZhc3RSZXNldCk7XG4gICAgdGhpcy5hcGtTdHJpbmdzW3RoaXMub3B0cy5sYW5ndWFnZV0gPSBhd2FpdCBoZWxwZXJzLnB1c2hTdHJpbmdzKFxuICAgICAgICB0aGlzLm9wdHMubGFuZ3VhZ2UsIHRoaXMuYWRiLCB0aGlzLm9wdHMpO1xuICB9XG5cbiAgYXN5bmMgc3RhcnRDaHJvbWVTZXNzaW9uICgpIHtcbiAgICBsb2cuaW5mbyhcIlN0YXJ0aW5nIGEgY2hyb21lLWJhc2VkIGJyb3dzZXIgc2Vzc2lvblwiKTtcbiAgICBsZXQgb3B0cyA9IF8uY2xvbmVEZWVwKHRoaXMub3B0cyk7XG4gICAgb3B0cy5jaHJvbWVVc2VSdW5uaW5nQXBwID0gZmFsc2U7XG5cbiAgICBjb25zdCBrbm93blBhY2thZ2VzID0gW1wib3JnLmNocm9taXVtLmNocm9tZS5zaGVsbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb20uYW5kcm9pZC5jaHJvbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tLmNocm9tZS5iZXRhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBcIm9yZy5jaHJvbWl1bS5jaHJvbWVcIl07XG5cbiAgICBpZiAoIV8uY29udGFpbnMoa25vd25QYWNrYWdlcywgdGhpcy5vcHRzLmFwcFBhY2thZ2UpKSB7XG4gICAgICBvcHRzLmNocm9tZUFuZHJvaWRBY3Rpdml0eSA9IHRoaXMub3B0cy5hcHBBY3Rpdml0eTtcbiAgICB9XG4gICAgdGhpcy5jaHJvbWVkcml2ZXIgPSBhd2FpdCBzZXR1cE5ld0Nocm9tZWRyaXZlcihvcHRzLCB0aGlzLmFkYi5jdXJEZXZpY2VJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRiLmdldEFkYlNlcnZlclBvcnQoKSk7XG4gICAgdGhpcy5jaHJvbWVkcml2ZXIub24oQ2hyb21lZHJpdmVyLkVWRU5UX0NIQU5HRUQsIChtc2cpID0+IHtcbiAgICAgIGlmIChtc2cuc3RhdGUgPT09IENocm9tZWRyaXZlci5TVEFURV9TVE9QUEVEKSB7XG4gICAgICAgIHRoaXMub25DaHJvbWVkcml2ZXJTdG9wKENIUk9NSVVNX1dJTik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBOb3cgdGhhdCB3ZSBoYXZlIGEgQ2hyb21lIHNlc3Npb24sIHdlIGVuc3VyZSB0aGF0IHRoZSBjb250ZXh0IGlzXG4gICAgLy8gYXBwcm9wcmlhdGVseSBzZXQgYW5kIHRoYXQgdGhpcyBjaHJvbWVkcml2ZXIgaXMgYWRkZWQgdG8gdGhlIGxpc3RcbiAgICAvLyBvZiBzZXNzaW9uIGNocm9tZWRyaXZlcnMgc28gd2UgY2FuIHN3aXRjaCBiYWNrIGFuZCBmb3J0aFxuICAgIHRoaXMuY3VyQ29udGV4dCA9IENIUk9NSVVNX1dJTjtcbiAgICB0aGlzLnNlc3Npb25DaHJvbWVkcml2ZXJzW0NIUk9NSVVNX1dJTl0gPSB0aGlzLmNocm9tZWRyaXZlcjtcbiAgICB0aGlzLnByb3h5UmVxUmVzID0gdGhpcy5jaHJvbWVkcml2ZXIucHJveHlSZXEuYmluZCh0aGlzLmNocm9tZWRyaXZlcik7XG4gICAgdGhpcy5qd3BQcm94eUFjdGl2ZSA9IHRydWU7XG4gIH1cblxuICBhc3luYyBjaGVja0FwcFByZXNlbnQgKCkge1xuICAgIGxvZy5kZWJ1ZyhcIkNoZWNraW5nIHdoZXRoZXIgYXBwIGlzIGFjdHVhbGx5IHByZXNlbnRcIik7XG4gICAgaWYgKCEoYXdhaXQgZnMuZXhpc3RzKHRoaXMub3B0cy5hcHApKSkge1xuICAgICAgbG9nLmVycm9yQW5kVGhyb3coYENvdWxkIG5vdCBmaW5kIGFwcCBhcGsgYXQgJHt0aGlzLm9wdHMuYXBwfWApO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGNoZWNrUGFja2FnZVByZXNlbnQgKCkge1xuICAgIGxvZy5kZWJ1ZyhcIkNoZWNraW5nIHdoZXRoZXIgcGFja2FnZSBpcyBwcmVzZW50IG9uIHRoZSBkZXZpY2VcIik7XG4gICAgaWYgKCEoYXdhaXQgdGhpcy5hZGIuc2hlbGwoWydwbScsICdsaXN0JywgJ3BhY2thZ2VzJywgdGhpcy5vcHRzLmFwcFBhY2thZ2VdKSkpIHtcbiAgICAgIGxvZy5lcnJvckFuZFRocm93KGBDb3VsZCBub3QgZmluZCBwYWNrYWdlICR7dGhpcy5vcHRzLmFwcFBhY2thZ2V9IG9uIHRoZSBkZXZpY2VgKTtcbiAgICB9XG4gIH1cblxuICAvLyBTZXQgQ29tcHJlc3NlZExheW91dEhpZXJhcmNoeSBvbiB0aGUgZGV2aWNlXG4gIGFzeW5jIHNldENvbXByZXNzZWRMYXlvdXRIaWVyYXJjaHkgKGNvbXByZXNzKSB7XG4gICAgYXdhaXQgdGhpcy5ib290c3RyYXAuc2VuZEFjdGlvbihcImNvbXByZXNzZWRMYXlvdXRIaWVyYXJjaHlcIiwge2NvbXByZXNzTGF5b3V0OiBjb21wcmVzc30pO1xuICB9XG5cbiAgYXN5bmMgZGVsZXRlU2Vzc2lvbiAoKSB7XG4gICAgbG9nLmRlYnVnKFwiU2h1dHRpbmcgZG93biBBbmRyb2lkIGRyaXZlclwiKTtcbiAgICBhd2FpdCBzdXBlci5kZWxldGVTZXNzaW9uKCk7XG4gICAgaWYgKHRoaXMuYm9vdHN0cmFwKSB7XG4gICAgICBhd2FpdCB0aGlzLnN0b3BDaHJvbWVkcml2ZXJQcm94aWVzKCk7XG4gICAgICBpZiAodGhpcy5vcHRzLnVuaWNvZGVLZXlib2FyZCAmJiB0aGlzLm9wdHMucmVzZXRLZXlib2FyZCAmJiB0aGlzLmRlZmF1bHRJTUUpIHtcbiAgICAgICAgbG9nLmRlYnVnKGBSZXNldHRpbmcgSU1FIHRvICR7dGhpcy5kZWZhdWx0SU1FfWApO1xuICAgICAgICBhd2FpdCB0aGlzLmFkYi5zZXRJTUUodGhpcy5kZWZhdWx0SU1FKTtcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5pc0Nocm9tZVNlc3Npb24pIHtcbiAgICAgICAgYXdhaXQgdGhpcy5hZGIuZm9yY2VTdG9wKHRoaXMub3B0cy5hcHBQYWNrYWdlKTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IHRoaXMuYWRiLmdvVG9Ib21lKCk7XG4gICAgICBpZiAodGhpcy5vcHRzLmZ1bGxSZXNldCAmJiAhdGhpcy5vcHRzLnNraXBVbmluc3RhbGwgJiYgIXRoaXMuYXBwT25EZXZpY2UpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5hZGIudW5pbnN0YWxsQXBrKHRoaXMub3B0cy5hcHBQYWNrYWdlKTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IHRoaXMuYWRiLnN0b3BMb2djYXQoKTtcbiAgICAgIGF3YWl0IHRoaXMuYm9vdHN0cmFwLnNodXRkb3duKCk7XG4gICAgICB0aGlzLmJvb3RzdHJhcCA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZy53YXJuKFwiQ2Fubm90IHNodXQgZG93biBBbmRyb2lkIGRyaXZlcjsgaXQgaGFzIGFscmVhZHkgc2h1dCBkb3duXCIpO1xuICAgIH1cbiAgfVxuXG4gIHZhbGlkYXRlRGVzaXJlZENhcHMgKGNhcHMpIHtcbiAgICAvLyBjaGVjayB3aXRoIHRoZSBiYXNlIGNsYXNzLCBhbmQgcmV0dXJuIGlmIGl0IGZhaWxzXG4gICAgbGV0IHJlcyA9IHN1cGVyLnZhbGlkYXRlRGVzaXJlZENhcHMoY2Fwcyk7XG4gICAgaWYgKCFyZXMpIHJldHVybiByZXM7XG5cbiAgICAvLyBtYWtlIHN1cmUgdGhhdCB0aGUgY2FwYWJpbGl0aWVzIGhhdmUgb25lIG9mIGBhcHBgLCBgYXBwUGFja2FnZWAgb3IgYGJyb3dzZXJgXG4gICAgaWYgKCghY2Fwcy5icm93c2VyTmFtZSB8fCAhaGVscGVycy5pc0Nocm9tZUJyb3dzZXIoY2Fwcy5icm93c2VyTmFtZSkpICYmXG4gICAgICAhY2Fwcy5hcHAgJiYgIWNhcHMuYXBwUGFja2FnZSkge1xuICAgICAgbGV0IG1zZyA9ICdUaGUgZGVzaXJlZCBjYXBhYmlsaXRpZXMgbXVzdCBpbmNsdWRlIGVpdGhlciBhbiBhcHAsIHBhY2thZ2Ugb3IgYnJvd3Nlcic7XG4gICAgICBsb2cuZXJyb3JBbmRUaHJvdyhtc2cpO1xuICAgIH1cbiAgICAvLyB3YXJuIGlmIHRoZSBjYXBhYmlsaXRpZXMgaGF2ZSBib3RoIGBhcHBgIGFuZCBgYnJvd3NlciwgYWx0aG91Z2ggdGhpc1xuICAgIC8vIGlzIGNvbW1vbiB3aXRoIHNlbGVuaXVtIGdyaWRcbiAgICBpZiAoY2Fwcy5icm93c2VyTmFtZSAmJiBjYXBzLmFwcCkge1xuICAgICAgbGV0IG1zZyA9ICdUaGUgZGVzaXJlZCBjYXBhYmlsaXRpZXMgc2hvdWxkIGdlbmVyYWxseSBub3QgaW5jbHVkZSBib3RoIGFuIGFwcCBhbmQgYSBicm93c2VyJztcbiAgICAgIGxvZy53YXJuKG1zZyk7XG4gICAgfVxuICB9XG5cbiAgcHJveHlBY3RpdmUgKHNlc3Npb25JZCkge1xuICAgIHN1cGVyLnByb3h5QWN0aXZlKHNlc3Npb25JZCk7XG5cbiAgICByZXR1cm4gdGhpcy5qd3BQcm94eUFjdGl2ZTtcbiAgfVxuXG4gIGdldFByb3h5QXZvaWRMaXN0IChzZXNzaW9uSWQpIHtcbiAgICBzdXBlci5nZXRQcm94eUF2b2lkTGlzdChzZXNzaW9uSWQpO1xuXG4gICAgcmV0dXJuIHRoaXMuandwUHJveHlBdm9pZDtcbiAgfVxuXG4gIGNhblByb3h5IChzZXNzaW9uSWQpIHtcbiAgICBzdXBlci5jYW5Qcm94eShzZXNzaW9uSWQpO1xuXG4gICAgLy8gdGhpcyB3aWxsIGNoYW5nZSBkZXBlbmRpbmcgb24gQ2hyb21lRHJpdmVyIHN0YXR1c1xuICAgIHJldHVybiBfLmlzRnVuY3Rpb24odGhpcy5wcm94eVJlcVJlcyk7XG4gIH1cbn1cblxuZm9yIChsZXQgW2NtZCwgZm5dIG9mIF8ucGFpcnMoY29tbWFuZHMpKSB7XG4gIEFuZHJvaWREcml2ZXIucHJvdG90eXBlW2NtZF0gPSBmbjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgQW5kcm9pZERyaXZlcjtcbiJdfQ==