'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _ = require('../../..');

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

describe('general', function () {
  describe('startActivity', function () {
    var _this = this;

    before(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver = new _2['default']();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.createSession(defaultCaps));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    after(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.deleteSession());

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('should launch a new package and activity', function callee$2$0() {
      var _ref, appPackage, appActivity, startAppPackage, startAppActivity, _ref2, newAppPackage, newAppActivity;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.adb.getFocusedPackageAndActivity());

          case 2:
            _ref = context$3$0.sent;
            appPackage = _ref.appPackage;
            appActivity = _ref.appActivity;

            appPackage.should.equal('io.appium.android.apis');
            appActivity.should.equal('.ApiDemos');

            startAppPackage = 'io.appium.android.apis';
            startAppActivity = '.view.SplitTouchView';
            context$3$0.next = 11;
            return _regeneratorRuntime.awrap(driver.startActivity(startAppPackage, startAppActivity));

          case 11:
            context$3$0.next = 13;
            return _regeneratorRuntime.awrap(driver.adb.getFocusedPackageAndActivity());

          case 13:
            _ref2 = context$3$0.sent;
            newAppPackage = _ref2.appPackage;
            newAppActivity = _ref2.appActivity;

            newAppPackage.should.equal(startAppPackage);
            newAppActivity.should.equal(startAppActivity);

          case 18:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should be able to launch activity with custom intent parameter category', function callee$2$0() {
      var startAppPackage, startAppActivity, startIntentCategory, _ref3, appActivity;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            startAppPackage = 'io.appium.android.apis';
            startAppActivity = 'io.appium.android.apis.app.HelloWorld';
            startIntentCategory = 'appium.android.intent.category.SAMPLE_CODE';
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.startActivity(startAppPackage, startAppActivity, undefined, undefined, startIntentCategory));

          case 5:
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(driver.adb.getFocusedPackageAndActivity());

          case 7:
            _ref3 = context$3$0.sent;
            appActivity = _ref3.appActivity;

            appActivity.should.include('HelloWorld');

          case 10:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should be able to launch activity with dontStopAppOnReset = true', function callee$2$0() {
      var startAppPackage, startAppActivity, _ref4, appPackage, appActivity;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            startAppPackage = 'io.appium.android.apis';
            startAppActivity = '.os.MorseCode';
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.startActivity(startAppPackage, startAppActivity, startAppPackage, startAppActivity, undefined, undefined, undefined, undefined, true));

          case 4:
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(driver.adb.getFocusedPackageAndActivity());

          case 6:
            _ref4 = context$3$0.sent;
            appPackage = _ref4.appPackage;
            appActivity = _ref4.appActivity;

            appPackage.should.equal(startAppPackage);
            appActivity.should.equal(startAppActivity);

          case 11:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should be able to launch activity with dontStopAppOnReset = false', function callee$2$0() {
      var startAppPackage, startAppActivity, _ref5, appPackage, appActivity;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            startAppPackage = 'io.appium.android.apis';
            startAppActivity = '.os.MorseCode';
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.startActivity(startAppPackage, startAppActivity, startAppPackage, startAppActivity, undefined, undefined, undefined, undefined, false));

          case 4:
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(driver.adb.getFocusedPackageAndActivity());

          case 6:
            _ref5 = context$3$0.sent;
            appPackage = _ref5.appPackage;
            appActivity = _ref5.appActivity;

            appPackage.should.equal(startAppPackage);
            appActivity.should.equal(startAppActivity);

          case 11:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('getStrings', function () {
    var _this2 = this;

    before(function callee$2$0() {
      var contactCaps;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver = new _2['default']();
            contactCaps = _Object$assign({}, defaultCaps, { app: (0, _sampleApps2['default'])('ContactManager') });
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.createSession(contactCaps));

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    after(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.deleteSession());

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });

    it('should return app strings', function callee$2$0() {
      var strings;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.getStrings('en'));

          case 2:
            strings = context$3$0.sent;

            strings.save.should.equal('Save');

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should return app strings for the device language', function callee$2$0() {
      var strings;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.getStrings());

          case 2:
            strings = context$3$0.sent;

            strings.save.should.equal('Save');

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9nZW5lcmFsLWUyZS1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7Z0JBQ25CLFVBQVU7Ozs7MEJBQ2IsYUFBYTs7OztBQUVwQyxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLElBQUksTUFBTSxZQUFBLENBQUM7QUFDWCxJQUFJLFdBQVcsR0FBRztBQUNoQixLQUFHLEVBQUUsNkJBQVcsZ0JBQWdCLENBQUM7QUFDakMsWUFBVSxFQUFFLFNBQVM7QUFDckIsY0FBWSxFQUFFLFNBQVM7Q0FDeEIsQ0FBQzs7QUFFRixRQUFRLENBQUMsU0FBUyxFQUFFLFlBQVk7QUFDOUIsVUFBUSxDQUFDLGVBQWUsRUFBRSxZQUFZOzs7QUFDcEMsVUFBTSxDQUFDOzs7O0FBQ0wsa0JBQU0sR0FBRyxtQkFBbUIsQ0FBQzs7NkNBQ3ZCLE1BQU0sQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDOzs7Ozs7O0tBQ3hDLENBQUMsQ0FBQztBQUNILFNBQUssQ0FBQzs7Ozs7NkNBQ0UsTUFBTSxDQUFDLGFBQWEsRUFBRTs7Ozs7OztLQUM3QixDQUFDLENBQUM7O0FBRUgsTUFBRSxDQUFDLDBDQUEwQyxFQUFFO2dCQUN4QyxVQUFVLEVBQUUsV0FBVyxFQUl4QixlQUFlLEVBQ2YsZ0JBQWdCLFNBSUgsYUFBYSxFQUFlLGNBQWM7Ozs7Ozs2Q0FUckIsTUFBTSxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsRUFBRTs7OztBQUExRSxzQkFBVSxRQUFWLFVBQVU7QUFBRSx1QkFBVyxRQUFYLFdBQVc7O0FBQzVCLHNCQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBQ2xELHVCQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQzs7QUFFbEMsMkJBQWUsR0FBRyx3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QU0sQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDOzs7Ozs7O0tBQ3hDLENBQUMsQ0FBQztBQUNILFNBQUssQ0FBQzs7Ozs7NkNBQ0UsTUFBTSxDQUFDLGFBQWEsRUFBRTs7Ozs7OztLQUM3QixDQUFDLENBQUM7O0FBRUgsTUFBRSxDQUFDLDJCQUEyQixFQUFFO1VBQzFCLE9BQU87Ozs7OzZDQUFTLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDOzs7QUFBdkMsbUJBQU87O0FBQ1gsbUJBQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Ozs7OztLQUNuQyxDQUFDLENBQUM7QUFDSCxNQUFFLENBQUMsbURBQW1ELEVBQUU7VUFDbEQsT0FBTzs7Ozs7NkNBQVMsTUFBTSxDQUFDLFVBQVUsRUFBRTs7O0FBQW5DLG1CQUFPOztBQUNYLG1CQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7Ozs7Ozs7S0FDbkMsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9nZW5lcmFsLWUyZS1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IEFuZHJvaWREcml2ZXIgZnJvbSAnLi4vLi4vLi4nO1xuaW1wb3J0IHNhbXBsZUFwcHMgZnJvbSAnc2FtcGxlLWFwcHMnO1xuXG5jaGFpLnNob3VsZCgpO1xuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuXG5sZXQgZHJpdmVyO1xubGV0IGRlZmF1bHRDYXBzID0ge1xuICBhcHA6IHNhbXBsZUFwcHMoJ0FwaURlbW9zLWRlYnVnJyksXG4gIGRldmljZU5hbWU6ICdBbmRyb2lkJyxcbiAgcGxhdGZvcm1OYW1lOiAnQW5kcm9pZCdcbn07XG5cbmRlc2NyaWJlKCdnZW5lcmFsJywgZnVuY3Rpb24gKCkge1xuICBkZXNjcmliZSgnc3RhcnRBY3Rpdml0eScsIGZ1bmN0aW9uICgpIHtcbiAgICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xuICAgICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcbiAgICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKGRlZmF1bHRDYXBzKTtcbiAgICB9KTtcbiAgICBhZnRlcihhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCBkcml2ZXIuZGVsZXRlU2Vzc2lvbigpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBsYXVuY2ggYSBuZXcgcGFja2FnZSBhbmQgYWN0aXZpdHknLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQge2FwcFBhY2thZ2UsIGFwcEFjdGl2aXR5fSA9IGF3YWl0IGRyaXZlci5hZGIuZ2V0Rm9jdXNlZFBhY2thZ2VBbmRBY3Rpdml0eSgpO1xuICAgICAgYXBwUGFja2FnZS5zaG91bGQuZXF1YWwoJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMnKTtcbiAgICAgIGFwcEFjdGl2aXR5LnNob3VsZC5lcXVhbCgnLkFwaURlbW9zJyk7XG5cbiAgICAgIGxldCBzdGFydEFwcFBhY2thZ2UgPSAnaW8uYXBwaXVtLmFuZHJvaWQuYXBpcyc7XG4gICAgICBsZXQgc3RhcnRBcHBBY3Rpdml0eSA9ICcudmlldy5TcGxpdFRvdWNoVmlldyc7XG5cbiAgICAgIGF3YWl0IGRyaXZlci5zdGFydEFjdGl2aXR5KHN0YXJ0QXBwUGFja2FnZSwgc3RhcnRBcHBBY3Rpdml0eSk7XG5cbiAgICAgIGxldCB7YXBwUGFja2FnZTogbmV3QXBwUGFja2FnZSwgYXBwQWN0aXZpdHk6IG5ld0FwcEFjdGl2aXR5fSA9IGF3YWl0IGRyaXZlci5hZGIuZ2V0Rm9jdXNlZFBhY2thZ2VBbmRBY3Rpdml0eSgpO1xuICAgICAgbmV3QXBwUGFja2FnZS5zaG91bGQuZXF1YWwoc3RhcnRBcHBQYWNrYWdlKTtcbiAgICAgIG5ld0FwcEFjdGl2aXR5LnNob3VsZC5lcXVhbChzdGFydEFwcEFjdGl2aXR5KTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gbGF1bmNoIGFjdGl2aXR5IHdpdGggY3VzdG9tIGludGVudCBwYXJhbWV0ZXIgY2F0ZWdvcnknLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgc3RhcnRBcHBQYWNrYWdlID0gJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMnO1xuICAgICAgbGV0IHN0YXJ0QXBwQWN0aXZpdHkgPSAnaW8uYXBwaXVtLmFuZHJvaWQuYXBpcy5hcHAuSGVsbG9Xb3JsZCc7XG4gICAgICBsZXQgc3RhcnRJbnRlbnRDYXRlZ29yeSA9ICdhcHBpdW0uYW5kcm9pZC5pbnRlbnQuY2F0ZWdvcnkuU0FNUExFX0NPREUnO1xuXG4gICAgICBhd2FpdCBkcml2ZXIuc3RhcnRBY3Rpdml0eShzdGFydEFwcFBhY2thZ2UsIHN0YXJ0QXBwQWN0aXZpdHksIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBzdGFydEludGVudENhdGVnb3J5KTtcblxuICAgICAgbGV0IHthcHBBY3Rpdml0eX0gPSBhd2FpdCBkcml2ZXIuYWRiLmdldEZvY3VzZWRQYWNrYWdlQW5kQWN0aXZpdHkoKTtcbiAgICAgIGFwcEFjdGl2aXR5LnNob3VsZC5pbmNsdWRlKCdIZWxsb1dvcmxkJyk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIGxhdW5jaCBhY3Rpdml0eSB3aXRoIGRvbnRTdG9wQXBwT25SZXNldCA9IHRydWUnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgc3RhcnRBcHBQYWNrYWdlID0gJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMnO1xuICAgICAgbGV0IHN0YXJ0QXBwQWN0aXZpdHkgPSAnLm9zLk1vcnNlQ29kZSc7XG4gICAgICBhd2FpdCBkcml2ZXIuc3RhcnRBY3Rpdml0eShzdGFydEFwcFBhY2thZ2UsIHN0YXJ0QXBwQWN0aXZpdHksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydEFwcFBhY2thZ2UsIHN0YXJ0QXBwQWN0aXZpdHksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQsIHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuZGVmaW5lZCwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ1ZSk7XG4gICAgICBsZXQge2FwcFBhY2thZ2UsIGFwcEFjdGl2aXR5fSA9IGF3YWl0IGRyaXZlci5hZGIuZ2V0Rm9jdXNlZFBhY2thZ2VBbmRBY3Rpdml0eSgpO1xuICAgICAgYXBwUGFja2FnZS5zaG91bGQuZXF1YWwoc3RhcnRBcHBQYWNrYWdlKTtcbiAgICAgIGFwcEFjdGl2aXR5LnNob3VsZC5lcXVhbChzdGFydEFwcEFjdGl2aXR5KTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gbGF1bmNoIGFjdGl2aXR5IHdpdGggZG9udFN0b3BBcHBPblJlc2V0ID0gZmFsc2UnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgc3RhcnRBcHBQYWNrYWdlID0gJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMnO1xuICAgICAgbGV0IHN0YXJ0QXBwQWN0aXZpdHkgPSAnLm9zLk1vcnNlQ29kZSc7XG4gICAgICBhd2FpdCBkcml2ZXIuc3RhcnRBY3Rpdml0eShzdGFydEFwcFBhY2thZ2UsIHN0YXJ0QXBwQWN0aXZpdHksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydEFwcFBhY2thZ2UsIHN0YXJ0QXBwQWN0aXZpdHksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQsIHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuZGVmaW5lZCwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFsc2UpO1xuICAgICAgbGV0IHthcHBQYWNrYWdlLCBhcHBBY3Rpdml0eX0gPSBhd2FpdCBkcml2ZXIuYWRiLmdldEZvY3VzZWRQYWNrYWdlQW5kQWN0aXZpdHkoKTtcbiAgICAgIGFwcFBhY2thZ2Uuc2hvdWxkLmVxdWFsKHN0YXJ0QXBwUGFja2FnZSk7XG4gICAgICBhcHBBY3Rpdml0eS5zaG91bGQuZXF1YWwoc3RhcnRBcHBBY3Rpdml0eSk7XG4gICAgfSk7XG4gIH0pO1xuICBkZXNjcmliZSgnZ2V0U3RyaW5ncycsIGZ1bmN0aW9uICgpIHtcbiAgICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xuICAgICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcbiAgICAgIGxldCBjb250YWN0Q2FwcyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRDYXBzLCB7YXBwOiBzYW1wbGVBcHBzKCdDb250YWN0TWFuYWdlcicpfSk7XG4gICAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihjb250YWN0Q2Fwcyk7XG4gICAgfSk7XG4gICAgYWZ0ZXIoYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgZHJpdmVyLmRlbGV0ZVNlc3Npb24oKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIGFwcCBzdHJpbmdzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IHN0cmluZ3MgPSBhd2FpdCBkcml2ZXIuZ2V0U3RyaW5ncygnZW4nKTtcbiAgICAgIHN0cmluZ3Muc2F2ZS5zaG91bGQuZXF1YWwoJ1NhdmUnKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHJldHVybiBhcHAgc3RyaW5ncyBmb3IgdGhlIGRldmljZSBsYW5ndWFnZScsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBzdHJpbmdzID0gYXdhaXQgZHJpdmVyLmdldFN0cmluZ3MoKTtcbiAgICAgIHN0cmluZ3Muc2F2ZS5zaG91bGQuZXF1YWwoJ1NhdmUnKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdfQ==