'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this = this;

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

var _ = require('../../..');

var _2 = _interopRequireDefault(_);

var driver = undefined;
var sandbox = _sinon2['default'].sandbox.create();
_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('Network', function () {
  describe('getNetworkConnection', function () {
    beforeEach(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver = new _2['default']();
            driver.adb = new _appiumAdb2['default']();

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    afterEach(function () {
      sandbox.restore();
    });
    it('should determine nothing enabled', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver.adb, 'isAirplaneModeOn');
            sandbox.stub(driver.adb, 'isWifiOn');
            sandbox.stub(driver.adb, 'isDataOn');
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.getNetworkConnection().should.eventually.equal(0));

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should determine airplane mode is on', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver.adb, 'isAirplaneModeOn').returns(true);
            sandbox.stub(driver.adb, 'isWifiOn');
            sandbox.stub(driver.adb, 'isDataOn');
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.getNetworkConnection().should.eventually.equal(1));

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should determine wifi is on', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver.adb, 'isAirplaneModeOn');
            sandbox.stub(driver.adb, 'isWifiOn').returns(true);
            sandbox.stub(driver.adb, 'isDataOn');
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.getNetworkConnection().should.eventually.equal(2));

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should determine data is on', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver.adb, 'isAirplaneModeOn');
            sandbox.stub(driver.adb, 'isWifiOn');
            sandbox.stub(driver.adb, 'isDataOn').returns(true);
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.getNetworkConnection().should.eventually.equal(4));

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should determine wifi and data are on', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver.adb, 'isAirplaneModeOn');
            sandbox.stub(driver.adb, 'isWifiOn').returns(true);
            sandbox.stub(driver.adb, 'isDataOn').returns(true);
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.getNetworkConnection().should.eventually.equal(6));

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('SetNetworkConnection', function () {
    beforeEach(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        var _this2 = this;

        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver = new _2['default']();
            driver.adb = new _appiumAdb2['default']();
            sandbox.stub(driver, 'getNetworkConnection');
            sandbox.stub(driver, 'wrapBootstrapDisconnect', function callee$3$0(fn) {
              return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                while (1) switch (context$4$0.prev = context$4$0.next) {
                  case 0:
                    context$4$0.next = 2;
                    return _regeneratorRuntime.awrap(fn());

                  case 2:
                  case 'end':
                    return context$4$0.stop();
                }
              }, null, _this2);
            });
            sandbox.stub(driver.adb, 'setAirplaneMode');
            sandbox.stub(driver.adb, 'broadcastAirplaneMode');
            sandbox.stub(driver.adb, 'setWifiAndData');

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    afterEach(function () {
      sandbox.restore();
    });
    it('should turn off wifi and data', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.setNetworkConnection(0));

          case 2:
            driver.adb.setAirplaneMode.calledWithExactly(0).should.be['true'];
            driver.adb.broadcastAirplaneMode.calledWithExactly(0).should.be['true'];
            driver.adb.setWifiAndData.calledWithExactly({ wifi: 0, data: 0 }).should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should turn on and broadcast airplane mode', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.setNetworkConnection(1));

          case 2:
            driver.adb.setAirplaneMode.calledWithExactly(1).should.be['true'];
            driver.adb.broadcastAirplaneMode.calledWithExactly(1).should.be['true'];
            driver.adb.setWifiAndData.called.should.be['false'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should turn on wifi', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.setNetworkConnection(2));

          case 2:
            driver.adb.setAirplaneMode.calledWithExactly(0).should.be['true'];
            driver.adb.broadcastAirplaneMode.calledWithExactly(0).should.be['true'];
            driver.adb.setWifiAndData.calledWithExactly({ wifi: 1, data: 0 }).should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should turn on data', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.setNetworkConnection(4));

          case 2:
            driver.adb.setAirplaneMode.calledWithExactly(0).should.be['true'];
            driver.adb.broadcastAirplaneMode.calledWithExactly(0).should.be['true'];
            driver.adb.setWifiAndData.calledWithExactly({ wifi: 0, data: 1 }).should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should turn on data and wifi', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.setNetworkConnection(6));

          case 2:
            driver.adb.setAirplaneMode.calledWithExactly(0).should.be['true'];
            driver.adb.broadcastAirplaneMode.calledWithExactly(0).should.be['true'];
            driver.adb.setWifiAndData.calledWithExactly({ wifi: 1, data: 1 }).should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('ToggleLocationSettings', function () {
    beforeEach(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver = new _2['default']();
            driver.adb = new _appiumAdb2['default']();
            sandbox.stub(driver, 'toggleSetting');

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    afterEach(function () {
      sandbox.restore();
    });
    it('should throw an error for API<16', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver.adb, 'getApiLevel').returns(15);
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.toggleLocationServices().should.eventually.be.rejectedWith(/implemented/));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should generate the correct sequence of keys for API 16', function callee$2$0() {
      var sequence;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sequence = [19, 19, 20];

            sandbox.stub(driver.adb, 'getApiLevel').returns(16);
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.toggleLocationServices());

          case 4:
            driver.toggleSetting.calledWith('LOCATION_SOURCE_SETTINGS', sequence).should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should generate the correct sequence of keys for API >= 19', function callee$2$0() {
      var sequence;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sequence = [22, 22, 19];

            sandbox.stub(driver.adb, 'getApiLevel').returns(19);
            sandbox.stub(driver.adb, 'keyevent');
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.toggleLocationServices());

          case 5:
            driver.adb.keyevent.calledWithExactly(19).should.be['true'];
            driver.toggleSetting.calledWith('LOCATION_SOURCE_SETTINGS', sequence).should.be['true'];

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC9jb21tYW5kcy9uZXR3b3JrLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7OztxQkFDM0IsT0FBTzs7Ozt5QkFDVCxZQUFZOzs7O2dCQUNGLFVBQVU7Ozs7QUFFcEMsSUFBSSxNQUFNLFlBQUEsQ0FBQztBQUNYLElBQUksT0FBTyxHQUFHLG1CQUFNLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNyQyxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLFFBQVEsQ0FBQyxTQUFTLEVBQUUsWUFBTTtBQUN4QixVQUFRLENBQUMsc0JBQXNCLEVBQUUsWUFBTTtBQUNyQyxjQUFVLENBQUM7Ozs7QUFDVCxrQkFBTSxHQUFHLG1CQUFtQixDQUFDO0FBQzdCLGtCQUFNLENBQUMsR0FBRyxHQUFHLDRCQUFTLENBQUM7Ozs7Ozs7S0FDeEIsQ0FBQyxDQUFDO0FBQ0gsYUFBUyxDQUFDLFlBQU07QUFDZCxhQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7S0FDbkIsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLGtDQUFrQyxFQUFFOzs7O0FBQ3JDLG1CQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztBQUM3QyxtQkFBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ3JDLG1CQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7OzZDQUMvQixNQUFNLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7S0FDL0QsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLHNDQUFzQyxFQUFFOzs7O0FBQ3pDLG1CQUFPLENBQUMs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LGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQzs7NkNBQzlDLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRTs7O0FBQ3JDLGtCQUFNLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQywwQkFBMEIsRUFBRSxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxRQUFLLENBQUM7Ozs7Ozs7S0FDdEYsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLDREQUE0RCxFQUFFO1VBQzNELFFBQVE7Ozs7QUFBUixvQkFBUSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7O0FBQzNCLG1CQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3BELG1CQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7OzZDQUMvQixNQUFNLENBQUMsc0JBQXNCLEVBQUU7OztBQUNyQyxrQkFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsUUFBSyxDQUFDO0FBQ3pELGtCQUFNLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQywwQkFBMEIsRUFBRSxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxRQUFLLENBQUM7Ozs7Ozs7S0FDdEYsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvdW5pdC9jb21tYW5kcy9uZXR3b3JrLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgc2lub24gZnJvbSAnc2lub24nO1xuaW1wb3J0IEFEQiBmcm9tICdhcHBpdW0tYWRiJztcbmltcG9ydCBBbmRyb2lkRHJpdmVyIGZyb20gJy4uLy4uLy4uJztcblxubGV0IGRyaXZlcjtcbmxldCBzYW5kYm94ID0gc2lub24uc2FuZGJveC5jcmVhdGUoKTtcbmNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmRlc2NyaWJlKCdOZXR3b3JrJywgKCkgPT4ge1xuICBkZXNjcmliZSgnZ2V0TmV0d29ya0Nvbm5lY3Rpb24nLCAoKSA9PiB7XG4gICAgYmVmb3JlRWFjaChhc3luYyAoKSA9PiB7XG4gICAgICBkcml2ZXIgPSBuZXcgQW5kcm9pZERyaXZlcigpO1xuICAgICAgZHJpdmVyLmFkYiA9IG5ldyBBREIoKTtcbiAgICB9KTtcbiAgICBhZnRlckVhY2goKCkgPT4ge1xuICAgICAgc2FuZGJveC5yZXN0b3JlKCk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBkZXRlcm1pbmUgbm90aGluZyBlbmFibGVkJywgYXN5bmMgKCkgPT4ge1xuICAgICAgc2FuZGJveC5zdHViKGRyaXZlci5hZGIsICdpc0FpcnBsYW5lTW9kZU9uJyk7XG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmFkYiwgJ2lzV2lmaU9uJyk7XG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmFkYiwgJ2lzRGF0YU9uJyk7XG4gICAgICBhd2FpdCBkcml2ZXIuZ2V0TmV0d29ya0Nvbm5lY3Rpb24oKS5zaG91bGQuZXZlbnR1YWxseS5lcXVhbCgwKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGRldGVybWluZSBhaXJwbGFuZSBtb2RlIGlzIG9uJywgYXN5bmMgKCkgPT4ge1xuICAgICAgc2FuZGJveC5zdHViKGRyaXZlci5hZGIsICdpc0FpcnBsYW5lTW9kZU9uJykucmV0dXJucyh0cnVlKTtcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIuYWRiLCAnaXNXaWZpT24nKTtcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIuYWRiLCAnaXNEYXRhT24nKTtcbiAgICAgIGF3YWl0IGRyaXZlci5nZXROZXR3b3JrQ29ubmVjdGlvbigpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKDEpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgZGV0ZXJtaW5lIHdpZmkgaXMgb24nLCBhc3luYyAoKSA9PiB7XG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmFkYiwgJ2lzQWlycGxhbmVNb2RlT24nKTtcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIuYWRiLCAnaXNXaWZpT24nKS5yZXR1cm5zKHRydWUpO1xuICAgICAgc2FuZGJveC5zdHViKGRyaXZlci5hZGIsICdpc0RhdGFPbicpO1xuICAgICAgYXdhaXQgZHJpdmVyLmdldE5ldHdvcmtDb25uZWN0aW9uKCkuc2hvdWxkLmV2ZW50dWFsbHkuZXF1YWwoMik7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBkZXRlcm1pbmUgZGF0YSBpcyBvbicsIGFzeW5jICgpID0+IHtcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIuYWRiLCAnaXNBaXJwbGFuZU1vZGVPbicpO1xuICAgICAgc2FuZGJveC5zdHViKGRyaXZlci5hZGIsICdpc1dpZmlPbicpO1xuICAgICAgc2FuZGJveC5zdHViKGRyaXZlci5hZGIsICdpc0RhdGFPbicpLnJldHVybnModHJ1ZSk7XG4gICAgICBhd2FpdCBkcml2ZXIuZ2V0TmV0d29ya0Nvbm5lY3Rpb24oKS5zaG91bGQuZXZlbnR1YWxseS5lcXVhbCg0KTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGRldGVybWluZSB3aWZpIGFuZCBkYXRhIGFyZSBvbicsIGFzeW5jICgpID0+IHtcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIuYWRiLCAnaXNBaXJwbGFuZU1vZGVPbicpO1xuICAgICAgc2FuZGJveC5zdHViKGRyaXZlci5hZGIsICdpc1dpZmlPbicpLnJldHVybnModHJ1ZSk7XG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmFkYiwgJ2lzRGF0YU9uJykucmV0dXJucyh0cnVlKTtcbiAgICAgIGF3YWl0IGRyaXZlci5nZXROZXR3b3JrQ29ubmVjdGlvbigpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKDYpO1xuICAgIH0pO1xuICB9KTtcbiAgZGVzY3JpYmUoJ1NldE5ldHdvcmtDb25uZWN0aW9uJywgKCkgPT4ge1xuICAgIGJlZm9yZUVhY2goYXN5bmMgKCkgPT4ge1xuICAgICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcbiAgICAgIGRyaXZlci5hZGIgPSBuZXcgQURCKCk7XG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnZ2V0TmV0d29ya0Nvbm5lY3Rpb24nKTtcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICd3cmFwQm9vdHN0cmFwRGlzY29ubmVjdCcsIGFzeW5jIChmbikgPT4ge1xuICAgICAgICBhd2FpdCBmbigpO1xuICAgICAgfSk7XG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmFkYiwgJ3NldEFpcnBsYW5lTW9kZScpO1xuICAgICAgc2FuZGJveC5zdHViKGRyaXZlci5hZGIsICdicm9hZGNhc3RBaXJwbGFuZU1vZGUnKTtcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIuYWRiLCAnc2V0V2lmaUFuZERhdGEnKTtcbiAgICB9KTtcbiAgICBhZnRlckVhY2goKCkgPT4ge1xuICAgICAgc2FuZGJveC5yZXN0b3JlKCk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCB0dXJuIG9mZiB3aWZpIGFuZCBkYXRhJywgYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgZHJpdmVyLnNldE5ldHdvcmtDb25uZWN0aW9uKDApO1xuICAgICAgZHJpdmVyLmFkYi5zZXRBaXJwbGFuZU1vZGUuY2FsbGVkV2l0aEV4YWN0bHkoMCkuc2hvdWxkLmJlLnRydWU7XG4gICAgICBkcml2ZXIuYWRiLmJyb2FkY2FzdEFpcnBsYW5lTW9kZS5jYWxsZWRXaXRoRXhhY3RseSgwKS5zaG91bGQuYmUudHJ1ZTtcbiAgICAgIGRyaXZlci5hZGIuc2V0V2lmaUFuZERhdGEuY2FsbGVkV2l0aEV4YWN0bHkoe3dpZmk6MCwgZGF0YTowfSkuc2hvdWxkLmJlLnRydWU7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCB0dXJuIG9uIGFuZCBicm9hZGNhc3QgYWlycGxhbmUgbW9kZScsIGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IGRyaXZlci5zZXROZXR3b3JrQ29ubmVjdGlvbigxKTtcbiAgICAgIGRyaXZlci5hZGIuc2V0QWlycGxhbmVNb2RlLmNhbGxlZFdpdGhFeGFjdGx5KDEpLnNob3VsZC5iZS50cnVlO1xuICAgICAgZHJpdmVyLmFkYi5icm9hZGNhc3RBaXJwbGFuZU1vZGUuY2FsbGVkV2l0aEV4YWN0bHkoMSkuc2hvdWxkLmJlLnRydWU7XG4gICAgICBkcml2ZXIuYWRiLnNldFdpZmlBbmREYXRhLmNhbGxlZC5zaG91bGQuYmUuZmFsc2U7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCB0dXJuIG9uIHdpZmknLCBhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCBkcml2ZXIuc2V0TmV0d29ya0Nvbm5lY3Rpb24oMik7XG4gICAgICBkcml2ZXIuYWRiLnNldEFpcnBsYW5lTW9kZS5jYWxsZWRXaXRoRXhhY3RseSgwKS5zaG91bGQuYmUudHJ1ZTtcbiAgICAgIGRyaXZlci5hZGIuYnJvYWRjYXN0QWlycGxhbmVNb2RlLmNhbGxlZFdpdGhFeGFjdGx5KDApLnNob3VsZC5iZS50cnVlO1xuICAgICAgZHJpdmVyLmFkYi5zZXRXaWZpQW5kRGF0YS5jYWxsZWRXaXRoRXhhY3RseSh7d2lmaToxLCBkYXRhOjB9KS5zaG91bGQuYmUudHJ1ZTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHR1cm4gb24gZGF0YScsIGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IGRyaXZlci5zZXROZXR3b3JrQ29ubmVjdGlvbig0KTtcbiAgICAgIGRyaXZlci5hZGIuc2V0QWlycGxhbmVNb2RlLmNhbGxlZFdpdGhFeGFjdGx5KDApLnNob3VsZC5iZS50cnVlO1xuICAgICAgZHJpdmVyLmFkYi5icm9hZGNhc3RBaXJwbGFuZU1vZGUuY2FsbGVkV2l0aEV4YWN0bHkoMCkuc2hvdWxkLmJlLnRydWU7XG4gICAgICBkcml2ZXIuYWRiLnNldFdpZmlBbmREYXRhLmNhbGxlZFdpdGhFeGFjdGx5KHt3aWZpOjAsIGRhdGE6MX0pLnNob3VsZC5iZS50cnVlO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgdHVybiBvbiBkYXRhIGFuZCB3aWZpJywgYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgZHJpdmVyLnNldE5ldHdvcmtDb25uZWN0aW9uKDYpO1xuICAgICAgZHJpdmVyLmFkYi5zZXRBaXJwbGFuZU1vZGUuY2FsbGVkV2l0aEV4YWN0bHkoMCkuc2hvdWxkLmJlLnRydWU7XG4gICAgICBkcml2ZXIuYWRiLmJyb2FkY2FzdEFpcnBsYW5lTW9kZS5jYWxsZWRXaXRoRXhhY3RseSgwKS5zaG91bGQuYmUudHJ1ZTtcbiAgICAgIGRyaXZlci5hZGIuc2V0V2lmaUFuZERhdGEuY2FsbGVkV2l0aEV4YWN0bHkoe3dpZmk6MSwgZGF0YToxfSkuc2hvdWxkLmJlLnRydWU7XG4gICAgfSk7XG4gIH0pO1xuICBkZXNjcmliZSgnVG9nZ2xlTG9jYXRpb25TZXR0aW5ncycsICgpID0+IHtcbiAgICBiZWZvcmVFYWNoKGFzeW5jICgpID0+IHtcbiAgICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XG4gICAgICBkcml2ZXIuYWRiID0gbmV3IEFEQigpO1xuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ3RvZ2dsZVNldHRpbmcnKTtcbiAgICB9KTtcbiAgICBhZnRlckVhY2goKCkgPT4ge1xuICAgICAgc2FuZGJveC5yZXN0b3JlKCk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCB0aHJvdyBhbiBlcnJvciBmb3IgQVBJPDE2JywgYXN5bmMgKCkgPT4ge1xuICAgICAgc2FuZGJveC5zdHViKGRyaXZlci5hZGIsICdnZXRBcGlMZXZlbCcpLnJldHVybnMoMTUpO1xuICAgICAgYXdhaXQgZHJpdmVyLnRvZ2dsZUxvY2F0aW9uU2VydmljZXMoKS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoL2ltcGxlbWVudGVkLyk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBnZW5lcmF0ZSB0aGUgY29ycmVjdCBzZXF1ZW5jZSBvZiBrZXlzIGZvciBBUEkgMTYnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgc2VxdWVuY2UgPSBbMTksIDE5LCAyMF07XG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmFkYiwgJ2dldEFwaUxldmVsJykucmV0dXJucygxNik7XG4gICAgICBhd2FpdCBkcml2ZXIudG9nZ2xlTG9jYXRpb25TZXJ2aWNlcygpO1xuICAgICAgZHJpdmVyLnRvZ2dsZVNldHRpbmcuY2FsbGVkV2l0aCgnTE9DQVRJT05fU09VUkNFX1NFVFRJTkdTJywgc2VxdWVuY2UpLnNob3VsZC5iZS50cnVlO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgZ2VuZXJhdGUgdGhlIGNvcnJlY3Qgc2VxdWVuY2Ugb2Yga2V5cyBmb3IgQVBJID49IDE5JywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IHNlcXVlbmNlID0gWzIyLCAyMiwgMTldO1xuICAgICAgc2FuZGJveC5zdHViKGRyaXZlci5hZGIsICdnZXRBcGlMZXZlbCcpLnJldHVybnMoMTkpO1xuICAgICAgc2FuZGJveC5zdHViKGRyaXZlci5hZGIsICdrZXlldmVudCcpO1xuICAgICAgYXdhaXQgZHJpdmVyLnRvZ2dsZUxvY2F0aW9uU2VydmljZXMoKTtcbiAgICAgIGRyaXZlci5hZGIua2V5ZXZlbnQuY2FsbGVkV2l0aEV4YWN0bHkoMTkpLnNob3VsZC5iZS50cnVlO1xuICAgICAgZHJpdmVyLnRvZ2dsZVNldHRpbmcuY2FsbGVkV2l0aCgnTE9DQVRJT05fU09VUkNFX1NFVFRJTkdTJywgc2VxdWVuY2UpLnNob3VsZC5iZS50cnVlO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl19