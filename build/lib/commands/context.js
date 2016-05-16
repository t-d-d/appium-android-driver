'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var _appiumChromedriver = require('appium-chromedriver');

var _appiumChromedriver2 = _interopRequireDefault(_appiumChromedriver);

var _mobileJsonWireProtocol = require('mobile-json-wire-protocol');

var _webviewHelpers = require('../webview-helpers');

var _webviewHelpers2 = _interopRequireDefault(_webviewHelpers);

var commands = {},
    helpers = {},
    extensions = {};

/* -------------------------------
 * Actual MJSONWP command handlers
 * ------------------------------- */
commands.getCurrentContext = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        return context$1$0.abrupt('return', this.curContext);

      case 1:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getContexts = function callee$0$0() {
  var webviews;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        webviews = undefined;

        if (!this.isChromeSession) {
          context$1$0.next = 5;
          break;
        }

        // if we have a Chrome browser session, we only care about the Chrome
        // context and the native context
        webviews = [_webviewHelpers.CHROMIUM_WIN];
        context$1$0.next = 8;
        break;

      case 5:
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(_webviewHelpers2['default'].getWebviews(this.adb, this.opts.androidDeviceSocket));

      case 7:
        webviews = context$1$0.sent;

      case 8:
        this.contexts = _lodash2['default'].union([_webviewHelpers.NATIVE_WIN], webviews);
        _logger2['default'].debug('Available contexts: ' + JSON.stringify(this.contexts));
        return context$1$0.abrupt('return', this.contexts);

      case 11:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.setContext = function callee$0$0(name) {
  var contexts;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (name === null) {
          name = this.defaultContextName();
        } else if (name === _webviewHelpers.WEBVIEW_WIN) {
          // handle setContext "WEBVIEW"
          name = this.defaultWebviewName();
        }
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.getContexts());

      case 3:
        contexts = context$1$0.sent;

        if (_lodash2['default'].contains(contexts, name)) {
          context$1$0.next = 6;
          break;
        }

        throw new _mobileJsonWireProtocol.errors.NoSuchContextError();

      case 6:
        if (!(name === this.curContext)) {
          context$1$0.next = 8;
          break;
        }

        return context$1$0.abrupt('return');

      case 8:
        context$1$0.next = 10;
        return _regeneratorRuntime.awrap(this.switchContext(name));

      case 10:
        this.curContext = name;

      case 11:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.switchContext = function callee$0$0(name) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!this.isChromedriverContext(name)) {
          context$1$0.next = 5;
          break;
        }

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.startChromedriverProxy(name));

      case 3:
        context$1$0.next = 10;
        break;

      case 5:
        if (!this.isChromedriverContext(this.curContext)) {
          context$1$0.next = 9;
          break;
        }

        // if we're moving to a non-chromedriver webview, and our current context
        // _is_ a chromedriver webview, if caps recreateChromeDriverSessions is set
        // to true then kill chromedriver session using stopChromedriverProxies or
        // else simply suspend proxying to the latter
        if (this.opts.recreateChromeDriverSessions) {
          _logger2['default'].debug("recreateChromeDriverSessions set to true; killing existing chromedrivers");
          this.stopChromedriverProxies();
        } else {
          this.suspendChromedriverProxy();
        }
        context$1$0.next = 10;
        break;

      case 9:
        throw new Error('Didn\'t know how to handle switching to context \'' + name + '\'');

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/* ---------------------------------
 * On-object context-related helpers
 * --------------------------------- */

// The reason this is a function and not just a constant is that both android-
// driver and selendroid-driver use this logic, and each one returns
// a different default context name
helpers.defaultContextName = function () {
  return _webviewHelpers.NATIVE_WIN;
};

helpers.defaultWebviewName = function () {
  return _webviewHelpers.WEBVIEW_BASE + this.opts.appPackage;
};

helpers.isWebContext = function () {
  return this.curContext !== null && this.curContext !== _webviewHelpers.NATIVE_WIN;
};

// Turn on proxying to an existing Chromedriver session or a new one
helpers.startChromedriverProxy = function callee$0$0(context) {
  var cd, opts;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].debug('Connecting to chrome-backed webview context \'' + context + '\'');

        if (!(this.chromedriver !== null)) {
          context$1$0.next = 3;
          break;
        }

        throw new Error("We already have a chromedriver instance running");

      case 3:
        cd = undefined;

        if (!this.sessionChromedrivers[context]) {
          context$1$0.next = 11;
          break;
        }

        // in the case where we've already set up a chromedriver for a context,
        // we want to reconnect to it, not create a whole new one
        _logger2['default'].debug('Found existing Chromedriver for context \'' + context + '\'. Using it.');
        cd = this.sessionChromedrivers[context];
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(setupExistingChromedriver(cd));

      case 9:
        context$1$0.next = 18;
        break;

      case 11:
        opts = _lodash2['default'].cloneDeep(this.opts);

        opts.chromeUseRunningApp = true;
        context$1$0.next = 15;
        return _regeneratorRuntime.awrap(setupNewChromedriver(opts, this.adb.curDeviceId, this.adb.getAdbServerPort()));

      case 15:
        cd = context$1$0.sent;

        // bind our stop/exit handler, passing in context so we know which
        // one stopped unexpectedly
        cd.on(_appiumChromedriver2['default'].EVENT_CHANGED, function (msg) {
          if (msg.state === _appiumChromedriver2['default'].STATE_STOPPED) {
            _this.onChromedriverStop(context);
          }
        });
        // save the chromedriver object under the context
        this.sessionChromedrivers[context] = cd;

      case 18:
        // hook up the local variables so we can proxy this biz
        this.chromedriver = cd;
        this.proxyReqRes = this.chromedriver.proxyReq.bind(this.chromedriver);
        this.jwpProxyActive = true;

      case 21:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// Stop proxying to any Chromedriver
helpers.suspendChromedriverProxy = function () {
  this.chromedriver = null;
  this.proxyReqRes = null;
  this.jwpProxyActive = false;
};

// Handle an out-of-band Chromedriver stop event
helpers.onChromedriverStop = function callee$0$0(context) {
  var err;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].warn('Chromedriver for context ' + context + ' stopped unexpectedly');

        if (!(context === this.curContext)) {
          context$1$0.next = 7;
          break;
        }

        err = new Error("Chromedriver quit unexpectedly during session");
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.startUnexpectedShutdown(err));

      case 5:
        context$1$0.next = 9;
        break;

      case 7:
        // if a Chromedriver in the non-active context barfs, we don't really
        // care, we'll just make a new one next time we need the context.
        _logger2['default'].warn("Chromedriver quit unexpectedly, but it wasn't the active " + "context, ignoring");
        delete this.sessionChromedrivers[context];

      case 9:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// Intentionally stop all the chromedrivers currently active, and ignore
// their exit events
helpers.stopChromedriverProxies = function callee$0$0() {
  var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, context, cd;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        this.suspendChromedriverProxy(); // make sure we turn off the proxy flag
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 4;
        _iterator = _getIterator(_lodash2['default'].keys(this.sessionChromedrivers));

      case 6:
        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
          context$1$0.next = 23;
          break;
        }

        context = _step.value;
        cd = this.sessionChromedrivers[context];

        _logger2['default'].debug('Stopping chromedriver for context ' + context);
        // stop listening for the stopped state event
        cd.removeAllListeners(_appiumChromedriver2['default'].EVENT_CHANGED);
        context$1$0.prev = 11;
        context$1$0.next = 14;
        return _regeneratorRuntime.awrap(cd.stop());

      case 14:
        context$1$0.next = 19;
        break;

      case 16:
        context$1$0.prev = 16;
        context$1$0.t0 = context$1$0['catch'](11);

        _logger2['default'].warn('Error stopping Chromedriver: ' + context$1$0.t0.message);

      case 19:
        delete this.sessionChromedrivers[context];

      case 20:
        _iteratorNormalCompletion = true;
        context$1$0.next = 6;
        break;

      case 23:
        context$1$0.next = 29;
        break;

      case 25:
        context$1$0.prev = 25;
        context$1$0.t1 = context$1$0['catch'](4);
        _didIteratorError = true;
        _iteratorError = context$1$0.t1;

      case 29:
        context$1$0.prev = 29;
        context$1$0.prev = 30;

        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }

      case 32:
        context$1$0.prev = 32;

        if (!_didIteratorError) {
          context$1$0.next = 35;
          break;
        }

        throw _iteratorError;

      case 35:
        return context$1$0.finish(32);

      case 36:
        return context$1$0.finish(29);

      case 37:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[4, 25, 29, 37], [11, 16], [30,, 32, 36]]);
};

helpers.isChromedriverContext = function (viewName) {
  return viewName.indexOf(_webviewHelpers.WEBVIEW_WIN) !== -1 || viewName === _webviewHelpers.CHROMIUM_WIN;
};

/* --------------------------
 * Internal library functions
 * -------------------------- */

function setupExistingChromedriver(chromedriver) {
  return _regeneratorRuntime.async(function setupExistingChromedriver$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(chromedriver.hasWorkingWebview());

      case 2:
        if (context$1$0.sent) {
          context$1$0.next = 6;
          break;
        }

        _logger2['default'].debug("ChromeDriver is not associated with a window. " + "Re-initializing the session.");
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(chromedriver.restart());

      case 6:
        return context$1$0.abrupt('return', chromedriver);

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function setupNewChromedriver(opts, curDeviceId, adbPort) {
  var chromeArgs, chromedriver, caps;
  return _regeneratorRuntime.async(function setupNewChromedriver$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        chromeArgs = {
          port: opts.chromeDriverPort,
          executable: opts.chromedriverExecutable,
          adbPort: adbPort
        };
        chromedriver = new _appiumChromedriver2['default'](chromeArgs);
        caps = {
          chromeOptions: {
            androidPackage: opts.appPackage
          }
        };

        if (opts.chromeUseRunningApp) {
          caps.chromeOptions.androidUseRunningApp = opts.chromeUseRunningApp;
        }
        if (opts.chromeAndroidActivity) {
          caps.chromeOptions.androidActivity = opts.chromeAndroidActivity;
        }
        if (opts.enablePerformanceLogging) {
          caps.loggingPrefs = { performance: 'ALL' };
        }
        caps = _webviewHelpers2['default'].decorateChromeOptions(caps, opts, curDeviceId);
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(chromedriver.start(caps));

      case 9:
        return context$1$0.abrupt('return', chromedriver);

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

_Object$assign(extensions, commands, helpers);
exports.commands = commands;
exports.helpers = helpers;
exports.setupNewChromedriver = setupNewChromedriver;
exports['default'] = extensions;

// otherwise we use ADB to figure out which webviews are available

// if the context we want doesn't exist, fail

// if we're already in the context we want, do nothing

// We have some options when it comes to webviews. If we want a
// Chromedriver webview, we can only control one at a time.

// start proxying commands directly to chromedriver

// we exited unexpectedly while automating the current context and so want
// to shut down the session and respond with an error

// check the status by sending a simple window-based command to ChromeDriver
// if there is an error, we want to recreate the ChromeDriver session
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9jb250ZXh0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O3NCQUFjLFFBQVE7Ozs7c0JBQ0gsV0FBVzs7OztrQ0FDTCxxQkFBcUI7Ozs7c0NBQ3ZCLDJCQUEyQjs7OEJBRWtCLG9CQUFvQjs7OztBQUV4RixJQUFJLFFBQVEsR0FBRyxFQUFFO0lBQUUsT0FBTyxHQUFHLEVBQUU7SUFBRSxVQUFVLEdBQUcsRUFBRSxDQUFDOzs7OztBQU1qRCxRQUFRLENBQUMsaUJBQWlCLEdBQUc7Ozs7NENBQ3BCLElBQUksQ0FBQyxVQUFVOzs7Ozs7O0NBQ3ZCLENBQUM7O0FBRUYsUUFBUSxDQUFDLFdBQVcsR0FBRztNQUNqQixRQUFROzs7O0FBQVIsZ0JBQVE7O2FBQ1IsSUFBSSxDQUFDLGVBQWU7Ozs7Ozs7QUFHdEIsZ0JBQVEsR0FBRyw4QkFBYyxDQUFDOzs7Ozs7eUNBR1QsNEJBQWUsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQ2xELElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUM7OztBQURoQyxnQkFBUTs7O0FBR1YsWUFBSSxDQUFDLFFBQVEsR0FBRyxvQkFBRSxLQUFLLENBQUMsNEJBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNoRCw0QkFBTyxLQUFLLDBCQUF3QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBRyxDQUFDOzRDQUM5RCxJQUFJLENBQUMsUUFBUTs7Ozs7OztDQUNyQixDQUFDOztBQUVGLFFBQVEsQ0FBQyxVQUFVLEdBQUcsb0JBQWdCLElBQUk7TUFPcEMsUUFBUTs7OztBQU5aLFlBQUksSUFBSSxLQUFLLElBQUksRUFBRTtBQUNqQixjQUFJLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7U0FDbEMsTUFBTSxJQUFJLElBQUksZ0NBQWdCLEVBQUU7O0FBRS9CLGNBQUksR0FBRyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUNsQzs7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Y0FBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDO1NBQ2pFO0FBQ0QsWUFBSSxJQUFJLENBQUMsd0JBQXdCLEVBQUU7QUFDakMsY0FBSSxDQUFDLFlBQVksR0FBRyxFQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUMsQ0FBQztTQUMxQztBQUNELFlBQUksR0FBRyw0QkFBZSxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDOzt5Q0FDL0QsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7Ozs0Q0FDdkIsWUFBWTs7Ozs7OztDQUNwQjs7QUFFRCxlQUFjLFVBQVUsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDcEMsUUFBUSxHQUFSLFFBQVE7UUFBRSxPQUFPLEdBQVAsT0FBTztRQUFFLG9CQUFvQixHQUFwQixvQkFBb0I7cUJBQ2pDLFVBQVUiLCJmaWxlIjoibGliL2NvbW1hbmRzL2NvbnRleHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGxvZ2dlciBmcm9tICcuLi9sb2dnZXInO1xuaW1wb3J0IENocm9tZWRyaXZlciBmcm9tICdhcHBpdW0tY2hyb21lZHJpdmVyJztcbmltcG9ydCB7IGVycm9ycyB9IGZyb20gJ21vYmlsZS1qc29uLXdpcmUtcHJvdG9jb2wnO1xuaW1wb3J0IHsgZGVmYXVsdCBhcyB3ZWJ2aWV3SGVscGVycyxcbiAgICAgICAgIE5BVElWRV9XSU4sIFdFQlZJRVdfQkFTRSwgV0VCVklFV19XSU4sIENIUk9NSVVNX1dJTiB9IGZyb20gJy4uL3dlYnZpZXctaGVscGVycyc7XG5cbmxldCBjb21tYW5kcyA9IHt9LCBoZWxwZXJzID0ge30sIGV4dGVuc2lvbnMgPSB7fTtcblxuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBBY3R1YWwgTUpTT05XUCBjb21tYW5kIGhhbmRsZXJzXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5jb21tYW5kcy5nZXRDdXJyZW50Q29udGV4dCA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuY3VyQ29udGV4dDtcbn07XG5cbmNvbW1hbmRzLmdldENvbnRleHRzID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICBsZXQgd2Vidmlld3M7XG4gIGlmICh0aGlzLmlzQ2hyb21lU2Vzc2lvbikge1xuICAgIC8vIGlmIHdlIGhhdmUgYSBDaHJvbWUgYnJvd3NlciBzZXNzaW9uLCB3ZSBvbmx5IGNhcmUgYWJvdXQgdGhlIENocm9tZVxuICAgIC8vIGNvbnRleHQgYW5kIHRoZSBuYXRpdmUgY29udGV4dFxuICAgIHdlYnZpZXdzID0gW0NIUk9NSVVNX1dJTl07XG4gIH0gZWxzZSB7XG4gICAgLy8gb3RoZXJ3aXNlIHdlIHVzZSBBREIgdG8gZmlndXJlIG91dCB3aGljaCB3ZWJ2aWV3cyBhcmUgYXZhaWxhYmxlXG4gICAgd2Vidmlld3MgPSBhd2FpdCB3ZWJ2aWV3SGVscGVycy5nZXRXZWJ2aWV3cyh0aGlzLmFkYixcbiAgICAgIHRoaXMub3B0cy5hbmRyb2lkRGV2aWNlU29ja2V0KTtcbiAgfVxuICB0aGlzLmNvbnRleHRzID0gXy51bmlvbihbTkFUSVZFX1dJTl0sIHdlYnZpZXdzKTtcbiAgbG9nZ2VyLmRlYnVnKGBBdmFpbGFibGUgY29udGV4dHM6ICR7SlNPTi5zdHJpbmdpZnkodGhpcy5jb250ZXh0cyl9YCk7XG4gIHJldHVybiB0aGlzLmNvbnRleHRzO1xufTtcblxuY29tbWFuZHMuc2V0Q29udGV4dCA9IGFzeW5jIGZ1bmN0aW9uIChuYW1lKSB7XG4gIGlmIChuYW1lID09PSBudWxsKSB7XG4gICAgbmFtZSA9IHRoaXMuZGVmYXVsdENvbnRleHROYW1lKCk7XG4gIH0gZWxzZSBpZiAobmFtZSA9PT0gV0VCVklFV19XSU4pIHtcbiAgICAvLyBoYW5kbGUgc2V0Q29udGV4dCBcIldFQlZJRVdcIlxuICAgIG5hbWUgPSB0aGlzLmRlZmF1bHRXZWJ2aWV3TmFtZSgpO1xuICB9XG4gIGxldCBjb250ZXh0cyA9IGF3YWl0IHRoaXMuZ2V0Q29udGV4dHMoKTtcbiAgLy8gaWYgdGhlIGNvbnRleHQgd2Ugd2FudCBkb2Vzbid0IGV4aXN0LCBmYWlsXG4gIGlmICghXy5jb250YWlucyhjb250ZXh0cywgbmFtZSkpIHtcbiAgICB0aHJvdyBuZXcgZXJyb3JzLk5vU3VjaENvbnRleHRFcnJvcigpO1xuICB9XG4gIC8vIGlmIHdlJ3JlIGFscmVhZHkgaW4gdGhlIGNvbnRleHQgd2Ugd2FudCwgZG8gbm90aGluZ1xuICBpZiAobmFtZSA9PT0gdGhpcy5jdXJDb250ZXh0KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgYXdhaXQgdGhpcy5zd2l0Y2hDb250ZXh0KG5hbWUpO1xuICB0aGlzLmN1ckNvbnRleHQgPSBuYW1lO1xufTtcblxuaGVscGVycy5zd2l0Y2hDb250ZXh0ID0gYXN5bmMgZnVuY3Rpb24gKG5hbWUpIHtcbiAgLy8gV2UgaGF2ZSBzb21lIG9wdGlvbnMgd2hlbiBpdCBjb21lcyB0byB3ZWJ2aWV3cy4gSWYgd2Ugd2FudCBhXG4gIC8vIENocm9tZWRyaXZlciB3ZWJ2aWV3LCB3ZSBjYW4gb25seSBjb250cm9sIG9uZSBhdCBhIHRpbWUuXG4gIGlmICh0aGlzLmlzQ2hyb21lZHJpdmVyQ29udGV4dChuYW1lKSkge1xuICAgIC8vIHN0YXJ0IHByb3h5aW5nIGNvbW1hbmRzIGRpcmVjdGx5IHRvIGNocm9tZWRyaXZlclxuICAgIGF3YWl0IHRoaXMuc3RhcnRDaHJvbWVkcml2ZXJQcm94eShuYW1lKTtcbiAgfSBlbHNlIGlmICh0aGlzLmlzQ2hyb21lZHJpdmVyQ29udGV4dCh0aGlzLmN1ckNvbnRleHQpKSB7XG4gICAgLy8gaWYgd2UncmUgbW92aW5nIHRvIGEgbm9uLWNocm9tZWRyaXZlciB3ZWJ2aWV3LCBhbmQgb3VyIGN1cnJlbnQgY29udGV4dFxuICAgIC8vIF9pc18gYSBjaHJvbWVkcml2ZXIgd2VidmlldywgaWYgY2FwcyByZWNyZWF0ZUNocm9tZURyaXZlclNlc3Npb25zIGlzIHNldFxuICAgIC8vIHRvIHRydWUgdGhlbiBraWxsIGNocm9tZWRyaXZlciBzZXNzaW9uIHVzaW5nIHN0b3BDaHJvbWVkcml2ZXJQcm94aWVzIG9yXG4gICAgLy8gZWxzZSBzaW1wbHkgc3VzcGVuZCBwcm94eWluZyB0byB0aGUgbGF0dGVyXG4gICAgaWYgKHRoaXMub3B0cy5yZWNyZWF0ZUNocm9tZURyaXZlclNlc3Npb25zKSB7XG4gICAgICBsb2dnZXIuZGVidWcoXCJyZWNyZWF0ZUNocm9tZURyaXZlclNlc3Npb25zIHNldCB0byB0cnVlOyBraWxsaW5nIGV4aXN0aW5nIGNocm9tZWRyaXZlcnNcIik7XG4gICAgICB0aGlzLnN0b3BDaHJvbWVkcml2ZXJQcm94aWVzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3VzcGVuZENocm9tZWRyaXZlclByb3h5KCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihgRGlkbid0IGtub3cgaG93IHRvIGhhbmRsZSBzd2l0Y2hpbmcgdG8gY29udGV4dCAnJHtuYW1lfSdgKTtcbiAgfVxufTtcblxuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIE9uLW9iamVjdCBjb250ZXh0LXJlbGF0ZWQgaGVscGVyc1xuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbi8vIFRoZSByZWFzb24gdGhpcyBpcyBhIGZ1bmN0aW9uIGFuZCBub3QganVzdCBhIGNvbnN0YW50IGlzIHRoYXQgYm90aCBhbmRyb2lkLVxuLy8gZHJpdmVyIGFuZCBzZWxlbmRyb2lkLWRyaXZlciB1c2UgdGhpcyBsb2dpYywgYW5kIGVhY2ggb25lIHJldHVybnNcbi8vIGEgZGlmZmVyZW50IGRlZmF1bHQgY29udGV4dCBuYW1lXG5oZWxwZXJzLmRlZmF1bHRDb250ZXh0TmFtZSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE5BVElWRV9XSU47XG59O1xuXG5oZWxwZXJzLmRlZmF1bHRXZWJ2aWV3TmFtZSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIFdFQlZJRVdfQkFTRSArIHRoaXMub3B0cy5hcHBQYWNrYWdlO1xufTtcblxuaGVscGVycy5pc1dlYkNvbnRleHQgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLmN1ckNvbnRleHQgIT09IG51bGwgJiYgdGhpcy5jdXJDb250ZXh0ICE9PSBOQVRJVkVfV0lOO1xufTtcblxuLy8gVHVybiBvbiBwcm94eWluZyB0byBhbiBleGlzdGluZyBDaHJvbWVkcml2ZXIgc2Vzc2lvbiBvciBhIG5ldyBvbmVcbmhlbHBlcnMuc3RhcnRDaHJvbWVkcml2ZXJQcm94eSA9IGFzeW5jIGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gIGxvZ2dlci5kZWJ1ZyhgQ29ubmVjdGluZyB0byBjaHJvbWUtYmFja2VkIHdlYnZpZXcgY29udGV4dCAnJHtjb250ZXh0fSdgKTtcbiAgaWYgKHRoaXMuY2hyb21lZHJpdmVyICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiV2UgYWxyZWFkeSBoYXZlIGEgY2hyb21lZHJpdmVyIGluc3RhbmNlIHJ1bm5pbmdcIik7XG4gIH1cblxuICBsZXQgY2Q7XG4gIGlmICh0aGlzLnNlc3Npb25DaHJvbWVkcml2ZXJzW2NvbnRleHRdKSB7XG4gICAgLy8gaW4gdGhlIGNhc2Ugd2hlcmUgd2UndmUgYWxyZWFkeSBzZXQgdXAgYSBjaHJvbWVkcml2ZXIgZm9yIGEgY29udGV4dCxcbiAgICAvLyB3ZSB3YW50IHRvIHJlY29ubmVjdCB0byBpdCwgbm90IGNyZWF0ZSBhIHdob2xlIG5ldyBvbmVcbiAgICBsb2dnZXIuZGVidWcoYEZvdW5kIGV4aXN0aW5nIENocm9tZWRyaXZlciBmb3IgY29udGV4dCAnJHtjb250ZXh0fScuIFVzaW5nIGl0LmApO1xuICAgIGNkID0gdGhpcy5zZXNzaW9uQ2hyb21lZHJpdmVyc1tjb250ZXh0XTtcbiAgICBhd2FpdCBzZXR1cEV4aXN0aW5nQ2hyb21lZHJpdmVyKGNkKTtcbiAgfSBlbHNlIHtcbiAgICBsZXQgb3B0cyA9IF8uY2xvbmVEZWVwKHRoaXMub3B0cyk7XG4gICAgb3B0cy5jaHJvbWVVc2VSdW5uaW5nQXBwID0gdHJ1ZTtcbiAgICBjZCA9IGF3YWl0IHNldHVwTmV3Q2hyb21lZHJpdmVyKG9wdHMsIHRoaXMuYWRiLmN1ckRldmljZUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGIuZ2V0QWRiU2VydmVyUG9ydCgpKTtcbiAgICAvLyBiaW5kIG91ciBzdG9wL2V4aXQgaGFuZGxlciwgcGFzc2luZyBpbiBjb250ZXh0IHNvIHdlIGtub3cgd2hpY2hcbiAgICAvLyBvbmUgc3RvcHBlZCB1bmV4cGVjdGVkbHlcbiAgICBjZC5vbihDaHJvbWVkcml2ZXIuRVZFTlRfQ0hBTkdFRCwgKG1zZykgPT4ge1xuICAgICAgaWYgKG1zZy5zdGF0ZSA9PT0gQ2hyb21lZHJpdmVyLlNUQVRFX1NUT1BQRUQpIHtcbiAgICAgICAgdGhpcy5vbkNocm9tZWRyaXZlclN0b3AoY29udGV4dCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgLy8gc2F2ZSB0aGUgY2hyb21lZHJpdmVyIG9iamVjdCB1bmRlciB0aGUgY29udGV4dFxuICAgIHRoaXMuc2Vzc2lvbkNocm9tZWRyaXZlcnNbY29udGV4dF0gPSBjZDtcbiAgfVxuICAvLyBob29rIHVwIHRoZSBsb2NhbCB2YXJpYWJsZXMgc28gd2UgY2FuIHByb3h5IHRoaXMgYml6XG4gIHRoaXMuY2hyb21lZHJpdmVyID0gY2Q7XG4gIHRoaXMucHJveHlSZXFSZXMgPSB0aGlzLmNocm9tZWRyaXZlci5wcm94eVJlcS5iaW5kKHRoaXMuY2hyb21lZHJpdmVyKTtcbiAgdGhpcy5qd3BQcm94eUFjdGl2ZSA9IHRydWU7XG59O1xuXG4vLyBTdG9wIHByb3h5aW5nIHRvIGFueSBDaHJvbWVkcml2ZXJcbmhlbHBlcnMuc3VzcGVuZENocm9tZWRyaXZlclByb3h5ID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmNocm9tZWRyaXZlciA9IG51bGw7XG4gIHRoaXMucHJveHlSZXFSZXMgPSBudWxsO1xuICB0aGlzLmp3cFByb3h5QWN0aXZlID0gZmFsc2U7XG59O1xuXG4vLyBIYW5kbGUgYW4gb3V0LW9mLWJhbmQgQ2hyb21lZHJpdmVyIHN0b3AgZXZlbnRcbmhlbHBlcnMub25DaHJvbWVkcml2ZXJTdG9wID0gYXN5bmMgZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgbG9nZ2VyLndhcm4oYENocm9tZWRyaXZlciBmb3IgY29udGV4dCAke2NvbnRleHR9IHN0b3BwZWQgdW5leHBlY3RlZGx5YCk7XG4gIGlmIChjb250ZXh0ID09PSB0aGlzLmN1ckNvbnRleHQpIHtcbiAgICAvLyB3ZSBleGl0ZWQgdW5leHBlY3RlZGx5IHdoaWxlIGF1dG9tYXRpbmcgdGhlIGN1cnJlbnQgY29udGV4dCBhbmQgc28gd2FudFxuICAgIC8vIHRvIHNodXQgZG93biB0aGUgc2Vzc2lvbiBhbmQgcmVzcG9uZCB3aXRoIGFuIGVycm9yXG4gICAgbGV0IGVyciA9IG5ldyBFcnJvcihcIkNocm9tZWRyaXZlciBxdWl0IHVuZXhwZWN0ZWRseSBkdXJpbmcgc2Vzc2lvblwiKTtcbiAgICBhd2FpdCB0aGlzLnN0YXJ0VW5leHBlY3RlZFNodXRkb3duKGVycik7XG4gIH0gZWxzZSB7XG4gICAgLy8gaWYgYSBDaHJvbWVkcml2ZXIgaW4gdGhlIG5vbi1hY3RpdmUgY29udGV4dCBiYXJmcywgd2UgZG9uJ3QgcmVhbGx5XG4gICAgLy8gY2FyZSwgd2UnbGwganVzdCBtYWtlIGEgbmV3IG9uZSBuZXh0IHRpbWUgd2UgbmVlZCB0aGUgY29udGV4dC5cbiAgICBsb2dnZXIud2FybihcIkNocm9tZWRyaXZlciBxdWl0IHVuZXhwZWN0ZWRseSwgYnV0IGl0IHdhc24ndCB0aGUgYWN0aXZlIFwiICtcbiAgICAgICAgICAgICAgICBcImNvbnRleHQsIGlnbm9yaW5nXCIpO1xuICAgIGRlbGV0ZSB0aGlzLnNlc3Npb25DaHJvbWVkcml2ZXJzW2NvbnRleHRdO1xuICB9XG59O1xuXG4vLyBJbnRlbnRpb25hbGx5IHN0b3AgYWxsIHRoZSBjaHJvbWVkcml2ZXJzIGN1cnJlbnRseSBhY3RpdmUsIGFuZCBpZ25vcmVcbi8vIHRoZWlyIGV4aXQgZXZlbnRzXG5oZWxwZXJzLnN0b3BDaHJvbWVkcml2ZXJQcm94aWVzID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICB0aGlzLnN1c3BlbmRDaHJvbWVkcml2ZXJQcm94eSgpOyAvLyBtYWtlIHN1cmUgd2UgdHVybiBvZmYgdGhlIHByb3h5IGZsYWdcbiAgZm9yIChsZXQgY29udGV4dCBvZiBfLmtleXModGhpcy5zZXNzaW9uQ2hyb21lZHJpdmVycykpIHtcbiAgICBsZXQgY2QgPSB0aGlzLnNlc3Npb25DaHJvbWVkcml2ZXJzW2NvbnRleHRdO1xuICAgIGxvZ2dlci5kZWJ1ZyhgU3RvcHBpbmcgY2hyb21lZHJpdmVyIGZvciBjb250ZXh0ICR7Y29udGV4dH1gKTtcbiAgICAvLyBzdG9wIGxpc3RlbmluZyBmb3IgdGhlIHN0b3BwZWQgc3RhdGUgZXZlbnRcbiAgICBjZC5yZW1vdmVBbGxMaXN0ZW5lcnMoQ2hyb21lZHJpdmVyLkVWRU5UX0NIQU5HRUQpO1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBjZC5zdG9wKCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBsb2dnZXIud2FybihgRXJyb3Igc3RvcHBpbmcgQ2hyb21lZHJpdmVyOiAke2Vyci5tZXNzYWdlfWApO1xuICAgIH1cbiAgICBkZWxldGUgdGhpcy5zZXNzaW9uQ2hyb21lZHJpdmVyc1tjb250ZXh0XTtcbiAgfVxufTtcblxuaGVscGVycy5pc0Nocm9tZWRyaXZlckNvbnRleHQgPSBmdW5jdGlvbiAodmlld05hbWUpIHtcbiAgcmV0dXJuIHZpZXdOYW1lLmluZGV4T2YoV0VCVklFV19XSU4pICE9PSAtMSB8fCB2aWV3TmFtZSA9PT0gQ0hST01JVU1fV0lOO1xufTtcblxuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogSW50ZXJuYWwgbGlicmFyeSBmdW5jdGlvbnNcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbmFzeW5jIGZ1bmN0aW9uIHNldHVwRXhpc3RpbmdDaHJvbWVkcml2ZXIgKGNocm9tZWRyaXZlcikge1xuICAvLyBjaGVjayB0aGUgc3RhdHVzIGJ5IHNlbmRpbmcgYSBzaW1wbGUgd2luZG93LWJhc2VkIGNvbW1hbmQgdG8gQ2hyb21lRHJpdmVyXG4gIC8vIGlmIHRoZXJlIGlzIGFuIGVycm9yLCB3ZSB3YW50IHRvIHJlY3JlYXRlIHRoZSBDaHJvbWVEcml2ZXIgc2Vzc2lvblxuICBpZiAoIWF3YWl0IGNocm9tZWRyaXZlci5oYXNXb3JraW5nV2VidmlldygpKSB7XG4gICAgbG9nZ2VyLmRlYnVnKFwiQ2hyb21lRHJpdmVyIGlzIG5vdCBhc3NvY2lhdGVkIHdpdGggYSB3aW5kb3cuIFwiICtcbiAgICAgICAgICAgICAgICAgXCJSZS1pbml0aWFsaXppbmcgdGhlIHNlc3Npb24uXCIpO1xuICAgIGF3YWl0IGNocm9tZWRyaXZlci5yZXN0YXJ0KCk7XG4gIH1cbiAgcmV0dXJuIGNocm9tZWRyaXZlcjtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc2V0dXBOZXdDaHJvbWVkcml2ZXIgKG9wdHMsIGN1ckRldmljZUlkLCBhZGJQb3J0KSB7XG4gIGxldCBjaHJvbWVBcmdzID0ge1xuICAgIHBvcnQ6IG9wdHMuY2hyb21lRHJpdmVyUG9ydCxcbiAgICBleGVjdXRhYmxlOiBvcHRzLmNocm9tZWRyaXZlckV4ZWN1dGFibGUsXG4gICAgYWRiUG9ydFxuICB9O1xuICBsZXQgY2hyb21lZHJpdmVyID0gbmV3IENocm9tZWRyaXZlcihjaHJvbWVBcmdzKTtcbiAgbGV0IGNhcHMgPSB7XG4gICAgY2hyb21lT3B0aW9uczoge1xuICAgICAgYW5kcm9pZFBhY2thZ2U6IG9wdHMuYXBwUGFja2FnZVxuICAgIH1cbiAgfTtcbiAgaWYgKG9wdHMuY2hyb21lVXNlUnVubmluZ0FwcCkge1xuICAgIGNhcHMuY2hyb21lT3B0aW9ucy5hbmRyb2lkVXNlUnVubmluZ0FwcCA9IG9wdHMuY2hyb21lVXNlUnVubmluZ0FwcDtcbiAgfVxuICBpZiAob3B0cy5jaHJvbWVBbmRyb2lkQWN0aXZpdHkpIHtcbiAgICBjYXBzLmNocm9tZU9wdGlvbnMuYW5kcm9pZEFjdGl2aXR5ID0gb3B0cy5jaHJvbWVBbmRyb2lkQWN0aXZpdHk7XG4gIH1cbiAgaWYgKG9wdHMuZW5hYmxlUGVyZm9ybWFuY2VMb2dnaW5nKSB7XG4gICAgY2Fwcy5sb2dnaW5nUHJlZnMgPSB7cGVyZm9ybWFuY2U6ICdBTEwnfTtcbiAgfVxuICBjYXBzID0gd2Vidmlld0hlbHBlcnMuZGVjb3JhdGVDaHJvbWVPcHRpb25zKGNhcHMsIG9wdHMsIGN1ckRldmljZUlkKTtcbiAgYXdhaXQgY2hyb21lZHJpdmVyLnN0YXJ0KGNhcHMpO1xuICByZXR1cm4gY2hyb21lZHJpdmVyO1xufVxuXG5PYmplY3QuYXNzaWduKGV4dGVuc2lvbnMsIGNvbW1hbmRzLCBoZWxwZXJzKTtcbmV4cG9ydCB7IGNvbW1hbmRzLCBoZWxwZXJzLCBzZXR1cE5ld0Nocm9tZWRyaXZlciB9O1xuZXhwb3J0IGRlZmF1bHQgZXh0ZW5zaW9ucztcbiJdfQ==