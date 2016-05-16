'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _ = require('../..');

var _2 = _interopRequireDefault(_);

var _sampleApps = require('sample-apps');

var _sampleApps2 = _interopRequireDefault(_sampleApps);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var driver = undefined;
var defaultCaps = {
  app: (0, _sampleApps2['default'])('ApiDemos-debug'),
  deviceName: 'Android',
  platformName: 'Android'
};

describe('createSession', function () {
  var _this = this;

  before(function () {
    driver = new _2['default']();
  });
  afterEach(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.deleteSession());

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should start android session focusing on default pkg and act', function callee$1$0() {
    var _ref, appPackage, appActivity;

    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.createSession(defaultCaps));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(driver.adb.getFocusedPackageAndActivity());

        case 4:
          _ref = context$2$0.sent;
          appPackage = _ref.appPackage;
          appActivity = _ref.appActivity;

          appPackage.should.equal('io.appium.android.apis');
          appActivity.should.equal('.ApiDemos');

        case 9:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should start android session focusing on custom pkg and act', function callee$1$0() {
    var caps, _ref2, appPackage, appActivity;

    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          caps = _Object$assign({}, defaultCaps);

          caps.appPackage = 'io.appium.android.apis';
          caps.appActivity = '.view.SplitTouchView';
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.createSession(caps));

        case 5:
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(driver.adb.getFocusedPackageAndActivity());

        case 7:
          _ref2 = context$2$0.sent;
          appPackage = _ref2.appPackage;
          appActivity = _ref2.appActivity;

          appPackage.should.equal(caps.appPackage);
          appActivity.should.equal(caps.appActivity);

        case 12:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should error out for not apk extention', function callee$1$0() {
    var caps;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          caps = _Object$assign({}, defaultCaps);

          caps.app = 'foo';
          caps.appPackage = 'io.appium.android.apis';
          caps.appActivity = '.view.SplitTouchView';
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.createSession(caps).should.eventually.be.rejectedWith(/apk/));

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should error out if neither an app or a browser is defined', function callee$1$0() {
    var caps;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          caps = _Object$assign({}, defaultCaps);

          caps.app = '';
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(driver.createSession(caps).should.eventually.be.rejectedWith(/include/));

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should error out for invalid app path', function callee$1$0() {
    var caps;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          caps = _Object$assign({}, defaultCaps);

          caps.app = 'foo.apk';
          caps.appPackage = 'io.appium.android.apis';
          caps.appActivity = '.view.SplitTouchView';
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.createSession(caps).should.eventually.be.rejectedWith(/Could not find/));

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should be able to start session without launching or installing app', function callee$1$0() {
    var caps, _ref3, appPackage, appActivity;

    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          caps = _Object$assign({}, defaultCaps);

          caps.appPackage = 'io.appium.android.apis';
          caps.appActivity = '.view.SplitTouchView';
          caps.autoLaunch = false;
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.createSession(caps));

        case 6:
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(driver.adb.getFocusedPackageAndActivity());

        case 8:
          _ref3 = context$2$0.sent;
          appPackage = _ref3.appPackage;
          appActivity = _ref3.appActivity;

          appPackage.should.not.equal(caps.appPackage);
          appActivity.should.not.equal(caps.appActivity);

        case 13:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should be able to launch activity with custom intent parameter category', function callee$1$0() {
    var caps, _ref4, appActivity;

    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          caps = _Object$assign({}, defaultCaps);

          caps.appPackage = 'io.appium.android.apis';
          caps.appActivity = 'io.appium.android.apis.app.HelloWorld';
          caps.intentCategory = 'appium.android.intent.category.SAMPLE_CODE';
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.createSession(caps));

        case 6:
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(driver.adb.getFocusedPackageAndActivity());

        case 8:
          _ref4 = context$2$0.sent;
          appActivity = _ref4.appActivity;

          appActivity.should.include('HelloWorld');

        case 11:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should be able to load an app via package', function callee$1$0() {
    var caps, _ref5, appPackage;

    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          caps = _Object$assign({}, defaultCaps);

          caps.app = '';
          caps.appPackage = 'io.appium.android.apis';
          caps.appActivity = '.ApiDemos';
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.createSession(caps));

        case 6:
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(driver.adb.getFocusedPackageAndActivity());

        case 8:
          _ref5 = context$2$0.sent;
          appPackage = _ref5.appPackage;

          appPackage.should.include('io.appium.android.apis');

        case 11:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should error out if package is not on the device', function callee$1$0() {
    var caps;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          caps = _Object$assign({}, defaultCaps);

          caps.app = '';
          caps.appPackage = 'sipa.diordna.muippa.oi';
          caps.appActivity = '.ApiDemos';
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.createSession(caps).should.eventually.be.rejectedWith(/Could not find/));

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should get updated capabilities', function callee$1$0() {
    var caps, serverCaps;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          caps = _Object$assign({}, defaultCaps);

          caps.appPackage = 'io.appium.android.apis';
          caps.appActivity = '.view.SplitTouchView';
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.createSession(caps));

        case 5:
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(driver.getSession());

        case 7:
          serverCaps = context$2$0.sent;

          serverCaps.takesScreenshot.should.exist;

        case 9:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});

describe('close', function () {
  var _this2 = this;

  before(function () {
    driver = new _2['default']();
  });
  afterEach(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.deleteSession());

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this2);
  });
  it('should close application', function callee$1$0() {
    var _ref6, appPackage;

    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.createSession(defaultCaps));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(driver.closeApp());

        case 4:
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.adb.getFocusedPackageAndActivity());

        case 6:
          _ref6 = context$2$0.sent;
          appPackage = _ref6.appPackage;

          if (appPackage) {
            appPackage.should.not.equal("io.appium.android.apis");
          }

        case 9:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this2);
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9kcml2ZXItZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7OztnQkFDbkIsT0FBTzs7OzswQkFDVixhQUFhOzs7O0FBRXBDLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsSUFBSSxNQUFNLFlBQUEsQ0FBQztBQUNYLElBQUksV0FBVyxHQUFHO0FBQ2hCLEtBQUcsRUFBRSw2QkFBVyxnQkFBZ0IsQ0FBQztBQUNqQyxZQUFVLEVBQUUsU0FBUztBQUNyQixjQUFZLEVBQUUsU0FBUztDQUN4QixDQUFDOztBQUVGLFFBQVEsQ0FBQyxlQUFlLEVBQUUsWUFBWTs7O0FBQ3BDLFFBQU0sQ0FBQyxZQUFNO0FBQ1gsVUFBTSxHQUFHLG1CQUFtQixDQUFDO0dBQzlCLENBQUMsQ0FBQztBQUNILFdBQVMsQ0FBQzs7Ozs7MkNBQ0YsTUFBTSxDQUFDLGFBQWEsRUFBRTs7Ozs7OztHQUM3QixDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsOERBQThELEVBQUU7Y0FFNUQsVUFBVSxFQUFFLFdBQVc7Ozs7OzsyQ0FEdEIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7Ozs7MkNBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsRUFBRTs7OztBQUExRSxvQkFBVSxRQUFWLFVBQVU7QUFBRSxxQkFBVyxRQUFYLFdBQVc7O0FBQzVCLG9CQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBQ2xELHFCQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQzs7Ozs7OztHQUN2QyxDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsNkRBQTZELEVBQUU7UUFDNUQsSUFBSSxTQUlILFVBQVUsRUFBRSxXQUFXOzs7OztBQUp4QixjQUFJLEdBQUcsZUFBYyxFQUFF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ImZpbGUiOiJ0ZXN0L2Z1bmN0aW9uYWwvZHJpdmVyLWUyZS1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IEFuZHJvaWREcml2ZXIgZnJvbSAnLi4vLi4nO1xuaW1wb3J0IHNhbXBsZUFwcHMgZnJvbSAnc2FtcGxlLWFwcHMnO1xuXG5jaGFpLnNob3VsZCgpO1xuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuXG5sZXQgZHJpdmVyO1xubGV0IGRlZmF1bHRDYXBzID0ge1xuICBhcHA6IHNhbXBsZUFwcHMoJ0FwaURlbW9zLWRlYnVnJyksXG4gIGRldmljZU5hbWU6ICdBbmRyb2lkJyxcbiAgcGxhdGZvcm1OYW1lOiAnQW5kcm9pZCdcbn07XG5cbmRlc2NyaWJlKCdjcmVhdGVTZXNzaW9uJywgZnVuY3Rpb24gKCkge1xuICBiZWZvcmUoKCkgPT4ge1xuICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XG4gIH0pO1xuICBhZnRlckVhY2goYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IGRyaXZlci5kZWxldGVTZXNzaW9uKCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIHN0YXJ0IGFuZHJvaWQgc2Vzc2lvbiBmb2N1c2luZyBvbiBkZWZhdWx0IHBrZyBhbmQgYWN0JywgYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKGRlZmF1bHRDYXBzKTtcbiAgICBsZXQge2FwcFBhY2thZ2UsIGFwcEFjdGl2aXR5fSA9IGF3YWl0IGRyaXZlci5hZGIuZ2V0Rm9jdXNlZFBhY2thZ2VBbmRBY3Rpdml0eSgpO1xuICAgIGFwcFBhY2thZ2Uuc2hvdWxkLmVxdWFsKCdpby5hcHBpdW0uYW5kcm9pZC5hcGlzJyk7XG4gICAgYXBwQWN0aXZpdHkuc2hvdWxkLmVxdWFsKCcuQXBpRGVtb3MnKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgc3RhcnQgYW5kcm9pZCBzZXNzaW9uIGZvY3VzaW5nIG9uIGN1c3RvbSBwa2cgYW5kIGFjdCcsIGFzeW5jICgpID0+IHtcbiAgICBsZXQgY2FwcyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRDYXBzKTtcbiAgICBjYXBzLmFwcFBhY2thZ2UgPSAnaW8uYXBwaXVtLmFuZHJvaWQuYXBpcyc7XG4gICAgY2Fwcy5hcHBBY3Rpdml0eSA9ICcudmlldy5TcGxpdFRvdWNoVmlldyc7XG4gICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oY2Fwcyk7XG4gICAgbGV0IHthcHBQYWNrYWdlLCBhcHBBY3Rpdml0eX0gPSBhd2FpdCBkcml2ZXIuYWRiLmdldEZvY3VzZWRQYWNrYWdlQW5kQWN0aXZpdHkoKTtcbiAgICBhcHBQYWNrYWdlLnNob3VsZC5lcXVhbChjYXBzLmFwcFBhY2thZ2UpO1xuICAgIGFwcEFjdGl2aXR5LnNob3VsZC5lcXVhbChjYXBzLmFwcEFjdGl2aXR5KTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZXJyb3Igb3V0IGZvciBub3QgYXBrIGV4dGVudGlvbicsIGFzeW5jICgpID0+IHtcbiAgICBsZXQgY2FwcyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRDYXBzKTtcbiAgICBjYXBzLmFwcCA9ICdmb28nO1xuICAgIGNhcHMuYXBwUGFja2FnZSA9ICdpby5hcHBpdW0uYW5kcm9pZC5hcGlzJztcbiAgICBjYXBzLmFwcEFjdGl2aXR5ID0gJy52aWV3LlNwbGl0VG91Y2hWaWV3JztcbiAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihjYXBzKS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoL2Fway8pO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBlcnJvciBvdXQgaWYgbmVpdGhlciBhbiBhcHAgb3IgYSBicm93c2VyIGlzIGRlZmluZWQnLCBhc3luYyAoKSA9PiB7XG4gICAgbGV0IGNhcHMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0Q2Fwcyk7XG4gICAgY2Fwcy5hcHAgPSAnJztcbiAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihjYXBzKS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoL2luY2x1ZGUvKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZXJyb3Igb3V0IGZvciBpbnZhbGlkIGFwcCBwYXRoJywgYXN5bmMgKCkgPT4ge1xuICAgIGxldCBjYXBzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdENhcHMpO1xuICAgIGNhcHMuYXBwID0gJ2Zvby5hcGsnO1xuICAgIGNhcHMuYXBwUGFja2FnZSA9ICdpby5hcHBpdW0uYW5kcm9pZC5hcGlzJztcbiAgICBjYXBzLmFwcEFjdGl2aXR5ID0gJy52aWV3LlNwbGl0VG91Y2hWaWV3JztcbiAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihjYXBzKS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoL0NvdWxkIG5vdCBmaW5kLyk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gc3RhcnQgc2Vzc2lvbiB3aXRob3V0IGxhdW5jaGluZyBvciBpbnN0YWxsaW5nIGFwcCcsIGFzeW5jICgpID0+IHtcbiAgICBsZXQgY2FwcyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRDYXBzKTtcbiAgICBjYXBzLmFwcFBhY2thZ2UgPSAnaW8uYXBwaXVtLmFuZHJvaWQuYXBpcyc7XG4gICAgY2Fwcy5hcHBBY3Rpdml0eSA9ICcudmlldy5TcGxpdFRvdWNoVmlldyc7XG4gICAgY2Fwcy5hdXRvTGF1bmNoID0gZmFsc2U7XG4gICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oY2Fwcyk7XG4gICAgbGV0IHthcHBQYWNrYWdlLCBhcHBBY3Rpdml0eX0gPSBhd2FpdCBkcml2ZXIuYWRiLmdldEZvY3VzZWRQYWNrYWdlQW5kQWN0aXZpdHkoKTtcbiAgICBhcHBQYWNrYWdlLnNob3VsZC5ub3QuZXF1YWwoY2Fwcy5hcHBQYWNrYWdlKTtcbiAgICBhcHBBY3Rpdml0eS5zaG91bGQubm90LmVxdWFsKGNhcHMuYXBwQWN0aXZpdHkpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIGxhdW5jaCBhY3Rpdml0eSB3aXRoIGN1c3RvbSBpbnRlbnQgcGFyYW1ldGVyIGNhdGVnb3J5JywgYXN5bmMgKCkgPT4ge1xuICAgIGxldCBjYXBzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdENhcHMpO1xuICAgIGNhcHMuYXBwUGFja2FnZSA9ICdpby5hcHBpdW0uYW5kcm9pZC5hcGlzJztcbiAgICBjYXBzLmFwcEFjdGl2aXR5ID0gJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMuYXBwLkhlbGxvV29ybGQnO1xuICAgIGNhcHMuaW50ZW50Q2F0ZWdvcnkgPSAnYXBwaXVtLmFuZHJvaWQuaW50ZW50LmNhdGVnb3J5LlNBTVBMRV9DT0RFJztcbiAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihjYXBzKTtcbiAgICBsZXQge2FwcEFjdGl2aXR5fSA9IGF3YWl0IGRyaXZlci5hZGIuZ2V0Rm9jdXNlZFBhY2thZ2VBbmRBY3Rpdml0eSgpO1xuICAgIGFwcEFjdGl2aXR5LnNob3VsZC5pbmNsdWRlKCdIZWxsb1dvcmxkJyk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gbG9hZCBhbiBhcHAgdmlhIHBhY2thZ2UnLCBhc3luYyAoKSA9PiB7XG4gICAgbGV0IGNhcHMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0Q2Fwcyk7XG4gICAgY2Fwcy5hcHAgPSAnJztcbiAgICBjYXBzLmFwcFBhY2thZ2UgPSAnaW8uYXBwaXVtLmFuZHJvaWQuYXBpcyc7XG4gICAgY2Fwcy5hcHBBY3Rpdml0eSA9ICcuQXBpRGVtb3MnO1xuICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKGNhcHMpO1xuICAgIGxldCB7YXBwUGFja2FnZX0gPSBhd2FpdCBkcml2ZXIuYWRiLmdldEZvY3VzZWRQYWNrYWdlQW5kQWN0aXZpdHkoKTtcbiAgICBhcHBQYWNrYWdlLnNob3VsZC5pbmNsdWRlKCdpby5hcHBpdW0uYW5kcm9pZC5hcGlzJyk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGVycm9yIG91dCBpZiBwYWNrYWdlIGlzIG5vdCBvbiB0aGUgZGV2aWNlJywgYXN5bmMgKCkgPT4ge1xuICAgIGxldCBjYXBzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdENhcHMpO1xuICAgIGNhcHMuYXBwID0gJyc7XG4gICAgY2Fwcy5hcHBQYWNrYWdlID0gJ3NpcGEuZGlvcmRuYS5tdWlwcGEub2knO1xuICAgIGNhcHMuYXBwQWN0aXZpdHkgPSAnLkFwaURlbW9zJztcbiAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihjYXBzKS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoL0NvdWxkIG5vdCBmaW5kLyk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGdldCB1cGRhdGVkIGNhcGFiaWxpdGllcycsIGFzeW5jICgpID0+IHtcbiAgICBsZXQgY2FwcyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRDYXBzKTtcbiAgICBjYXBzLmFwcFBhY2thZ2UgPSAnaW8uYXBwaXVtLmFuZHJvaWQuYXBpcyc7XG4gICAgY2Fwcy5hcHBBY3Rpdml0eSA9ICcudmlldy5TcGxpdFRvdWNoVmlldyc7XG4gICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oY2Fwcyk7XG4gICAgbGV0IHNlcnZlckNhcHMgPSBhd2FpdCBkcml2ZXIuZ2V0U2Vzc2lvbigpO1xuICAgIHNlcnZlckNhcHMudGFrZXNTY3JlZW5zaG90LnNob3VsZC5leGlzdDtcbiAgfSk7XG59KTtcblxuZGVzY3JpYmUoJ2Nsb3NlJywgZnVuY3Rpb24gKCkge1xuICBiZWZvcmUoKCkgPT4ge1xuICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XG4gIH0pO1xuICBhZnRlckVhY2goYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IGRyaXZlci5kZWxldGVTZXNzaW9uKCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGNsb3NlIGFwcGxpY2F0aW9uJywgYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKGRlZmF1bHRDYXBzKTtcbiAgICBhd2FpdCBkcml2ZXIuY2xvc2VBcHAoKTtcbiAgICBsZXQge2FwcFBhY2thZ2V9ID0gYXdhaXQgZHJpdmVyLmFkYi5nZXRGb2N1c2VkUGFja2FnZUFuZEFjdGl2aXR5KCk7XG4gICAgaWYgKGFwcFBhY2thZ2UpIHtcbiAgICAgIGFwcFBhY2thZ2Uuc2hvdWxkLm5vdC5lcXVhbChcImlvLmFwcGl1bS5hbmRyb2lkLmFwaXNcIik7XG4gICAgfVxuICB9KTtcbn0pO1xuIl19