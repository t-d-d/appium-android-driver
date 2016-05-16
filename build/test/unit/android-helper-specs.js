'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

var _this = this;

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _libAndroidHelpers = require('../../lib/android-helpers');

var _libAndroidHelpers2 = _interopRequireDefault(_libAndroidHelpers);

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

var _appiumTestSupport = require('appium-test-support');

var _teen_process = require('teen_process');

var teen_process = _interopRequireWildcard(_teen_process);

var _appiumSupport = require('appium-support');

var _ioAppiumSettings = require('io.appium.settings');

var _appiumUnlock = require('appium-unlock');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var should = _chai2['default'].should();
var REMOTE_TEMP_PATH = "/data/local/tmp";
_chai2['default'].use(_chaiAsPromised2['default']);

describe('Android Helpers', function () {
  var adb = new _appiumAdb2['default']();

  describe('parseJavaVersion', function () {
    it('should correctly parse java version', function () {
      _libAndroidHelpers2['default'].parseJavaVersion('java version "1.8.0_40"\n        Java(TM) SE Runtime Environment (build 1.8.0_40-b27)').should.be.equal("1.8.0_40");
    });
    it('should return null if it cannot parse java verstion', function () {
      should.not.exist(_libAndroidHelpers2['default'].parseJavaVersion('foo bar'));
    });
    it('should parse OpenJDK versioning', function () {
      _libAndroidHelpers2['default'].parseJavaVersion('openjdk version 1.8').should.be.equal('1.8');
    });
  });

  describe('getJavaVersion', (0, _appiumTestSupport.withMocks)({ teen_process: teen_process }, function (mocks) {
    it('should correctly get java version', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.teen_process.expects('exec').withExactArgs('java', ['-version']).returns({ stderr: 'java version "1.8.0_40"' });
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].getJavaVersion());

          case 3:
            context$3$0.sent.should.equal('1.8.0_40');

            mocks.teen_process.verify();

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should return null if it cannot parse java verstion', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.teen_process.expects('exec').withExactArgs('java', ['-version']).returns({ stderr: 'foo bar' });
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].getJavaVersion().should.eventually.be.rejectedWith('Java'));

          case 3:
            mocks.teen_process.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('prepareEmulator', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    var opts = { avd: "foo@bar", avdArgs: "", language: "en", locale: "us" };
    it('should not launch avd if one is already running', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('getRunningAVD').withExactArgs('foobar').returns("foo");
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].prepareEmulator(adb, opts));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should launch avd if one is already running', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('getRunningAVD').withExactArgs('foobar').returns(null);
            mocks.adb.expects('launchAVD').withExactArgs('foo@bar', '', 'en', 'us', undefined, undefined).returns("");
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].prepareEmulator(adb, opts));

          case 4:
            mocks.adb.verify();

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('ensureDeviceLocale', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should return if language and country are not passed', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('getDeviceLanguage').never();
            mocks.adb.expects('getDeviceCountry').never();
            mocks.adb.expects('getDeviceLocale').never();
            mocks.adb.expects('setDeviceLanguage').never();
            mocks.adb.expects('setDeviceCountry').never();
            mocks.adb.expects('setDeviceLocale').never();
            mocks.adb.expects('reboot').never();
            context$3$0.next = 9;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].ensureDeviceLocale(adb));

          case 9:
            mocks.adb.verify();

          case 10:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should not set language and country if it does not change when API < 23', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('getApiLevel').returns("18");
            mocks.adb.expects('getDeviceLanguage').returns('en');
            mocks.adb.expects('getDeviceCountry').returns('us');
            mocks.adb.expects('getDeviceLocale').never();
            mocks.adb.expects('setDeviceLanguage').never();
            mocks.adb.expects('setDeviceCountry').never();
            mocks.adb.expects('setDeviceLocale').never();
            mocks.adb.expects('reboot').never();
            context$3$0.next = 10;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].ensureDeviceLocale(adb, 'en', 'us'));

          case 10:
            mocks.adb.verify();

          case 11:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should set language and country if they are different when API < 23', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('getApiLevel').returns("18");
            mocks.adb.expects('getDeviceLanguage').returns('fr');
            mocks.adb.expects('getDeviceCountry').returns('FR');
            mocks.adb.expects('getDeviceLocale').never();
            mocks.adb.expects('setDeviceLanguage').withExactArgs('en').returns("");
            mocks.adb.expects('setDeviceCountry').withExactArgs('us').returns("");
            mocks.adb.expects('setDeviceLocale').never();
            mocks.adb.expects('reboot').returns(null);
            context$3$0.next = 10;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].ensureDeviceLocale(adb, 'en', 'us'));

          case 10:
            mocks.adb.verify();

          case 11:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should not set locale if it does not change when API = 23', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('getApiLevel').returns("23");
            mocks.adb.expects('getDeviceLanguage').never();
            mocks.adb.expects('getDeviceCountry').never();
            mocks.adb.expects('getDeviceLocale').returns('en-US');
            mocks.adb.expects('setDeviceLanguage').never();
            mocks.adb.expects('setDeviceCountry').never();
            mocks.adb.expects('setDeviceLocale').never();
            mocks.adb.expects('reboot').never();
            context$3$0.next = 10;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].ensureDeviceLocale(adb, 'en', 'us'));

          case 10:
            mocks.adb.verify();

          case 11:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should set locale if it is different when API = 23', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('getApiLevel').returns("23");
            mocks.adb.expects('getDeviceLanguage').never();
            mocks.adb.expects('getDeviceCountry').never();
            mocks.adb.expects('getDeviceLocale').returns('fr-FR');
            mocks.adb.expects('setDeviceLanguage').never();
            mocks.adb.expects('setDeviceCountry').never();
            mocks.adb.expects('setDeviceLocale').withExactArgs('en-US').returns("");
            mocks.adb.expects('reboot').returns(null);
            context$3$0.next = 10;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].ensureDeviceLocale(adb, 'en', 'us'));

          case 10:
            mocks.adb.verify();

          case 11:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));

  describe('getDeviceInfoFromCaps', function () {
    // list of device/emu udids to their os versions
    // using list instead of map to preserve order
    var devices = [{ udid: 'emulator-1234', os: '4.9.2' }, { udid: 'rotalume-1339', os: '5.1.5' }, { udid: 'rotalume-1338', os: '5.0.1' }, { udid: 'rotalume-1337', os: '5.0.1' }, { udid: 'roamulet-9000', os: '6.0' }, { udid: 'roamulet-0', os: '2.3' }, { udid: '0123456789', os: 'wellhellothere' }];
    var curDeviceId = '';

    before(function () {
      _sinon2['default'].stub(_appiumAdb2['default'], 'createADB', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          var _this2 = this;

          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              return context$4$0.abrupt('return', {
                getDevicesWithRetry: function getDevicesWithRetry() {
                  return _regeneratorRuntime.async(function getDevicesWithRetry$(context$5$0) {
                    while (1) switch (context$5$0.prev = context$5$0.next) {
                      case 0:
                        return context$5$0.abrupt('return', _lodash2['default'].map(devices, function (device) {
                          return { udid: device.udid };
                        }));

                      case 1:
                      case 'end':
                        return context$5$0.stop();
                    }
                  }, null, _this2);
                },
                getPortFromEmulatorString: function getPortFromEmulatorString() {
                  return 1234;
                },
                getRunningAVD: function getRunningAVD() {
                  return { 'udid': 'emulator-1234', 'port': 1234 };
                },
                setDeviceId: function setDeviceId(udid) {
                  curDeviceId = udid;
                },
                getPlatformVersion: function getPlatformVersion() {
                  return _lodash2['default'].filter(devices, { udid: curDeviceId })[0].os;
                },
                curDeviceId: 'emulator-1234',
                emulatorPort: 1234
              });

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    });

    after(function () {
      _appiumAdb2['default'].createADB.restore();
    });

    it('should throw error when udid not in list', function callee$2$0() {
      var caps;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            caps = {
              udid: 'foomulator'
            };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].getDeviceInfoFromCaps(caps).should.be.rejectedWith('foomulator'));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should get deviceId and emPort when udid is present', function callee$2$0() {
      var caps, _ref, udid, emPort;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            caps = {
              udid: 'emulator-1234'
            };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].getDeviceInfoFromCaps(caps));

          case 3:
            _ref = context$3$0.sent;
            udid = _ref.udid;
            emPort = _ref.emPort;

            udid.should.equal('emulator-1234');
            emPort.should.equal(1234);

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should get first deviceId and emPort if avd, platformVersion, and udid aren\'t given', function callee$2$0() {
      var _ref2, udid, emPort;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].getDeviceInfoFromCaps());

          case 2:
            _ref2 = context$3$0.sent;
            udid = _ref2.udid;
            emPort = _ref2.emPort;

            udid.should.equal('emulator-1234');
            emPort.should.equal(1234);

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should get deviceId and emPort when avd is present', function callee$2$0() {
      var caps, _ref3, udid, emPort;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            caps = {
              avd: 'AVD_NAME'
            };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].getDeviceInfoFromCaps(caps));

          case 3:
            _ref3 = context$3$0.sent;
            udid = _ref3.udid;
            emPort = _ref3.emPort;

            udid.should.equal('emulator-1234');
            emPort.should.equal(1234);

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should fail if the given platformVersion is not found', function callee$2$0() {
      var caps;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            caps = {
              platformVersion: '1234567890'
            };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].getDeviceInfoFromCaps(caps).should.be.rejectedWith('Unable to find an active device or emulator with OS 1234567890'));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should get deviceId and emPort if platformVersion is found and unique', function callee$2$0() {
      var caps, _ref4, udid, emPort;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            caps = {
              platformVersion: '6.0'
            };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].getDeviceInfoFromCaps(caps));

          case 3:
            _ref4 = context$3$0.sent;
            udid = _ref4.udid;
            emPort = _ref4.emPort;

            udid.should.equal('roamulet-9000');
            emPort.should.equal(1234);

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should get the first deviceId and emPort if platformVersion is found multiple times', function callee$2$0() {
      var caps, _ref5, udid, emPort;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            caps = {
              platformVersion: '5.0.1'
            };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].getDeviceInfoFromCaps(caps));

          case 3:
            _ref5 = context$3$0.sent;
            udid = _ref5.udid;
            emPort = _ref5.emPort;

            udid.should.equal('rotalume-1338');
            emPort.should.equal(1234);

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should get the first deviceId and emPort if platformVersion is found multiple times and is a partial match', function callee$2$0() {
      var caps, _ref6, udid, emPort;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            caps = {
              platformVersion: '5.0'
            };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].getDeviceInfoFromCaps(caps));

          case 3:
            _ref6 = context$3$0.sent;
            udid = _ref6.udid;
            emPort = _ref6.emPort;

            udid.should.equal('rotalume-1338');
            emPort.should.equal(1234);

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should get deviceId and emPort by udid if udid and platformVersion are given', function callee$2$0() {
      var caps, _ref7, udid, emPort;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            caps = {
              udid: '0123456789',
              platformVersion: '2.3'
            };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].getDeviceInfoFromCaps(caps));

          case 3:
            _ref7 = context$3$0.sent;
            udid = _ref7.udid;
            emPort = _ref7.emPort;

            udid.should.equal('0123456789');
            emPort.should.equal(1234);

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });

  describe('getLaunchInfoFromManifest', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should return when no app present', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('packageAndLaunchActivityFromManifest').never();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].getLaunchInfo(adb, {}));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should return when appPackage & appActivity are already present', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('packageAndLaunchActivityFromManifest').never();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].getLaunchInfo(adb, { app: "foo", appPackage: "bar",
              appActivity: "act" }));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should return package and launch activity from manifest', function callee$2$0() {
      var result;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('packageAndLaunchActivityFromManifest').withExactArgs('foo').returns({ apkPackage: 'pkg', apkActivity: 'ack' });
            result = { appPackage: 'pkg', appWaitPackage: 'pkg',
              appActivity: 'ack', appWaitActivity: 'ack' };
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].getLaunchInfo(adb, { app: "foo" }));

          case 4:
            context$3$0.t0 = result;
            context$3$0.sent.should.deep.equal(context$3$0.t0);

            mocks.adb.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('getRemoteApkPath', function () {
    it('should return remote path', function () {
      _libAndroidHelpers2['default'].getRemoteApkPath('foo').should.equal(REMOTE_TEMP_PATH + '/foo.apk');
    });
  });
  describe('resetApp', (0, _appiumTestSupport.withMocks)({ adb: adb, fs: _appiumSupport.fs, helpers: _libAndroidHelpers2['default'] }, function (mocks) {
    var localApkPath = 'local';
    var pkg = 'pkg';
    it('should throw error if remote file does not exist', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.fs.expects('md5').withExactArgs(localApkPath).returns('apkmd5');
            mocks.adb.expects('fileExists').returns(false);
            mocks.helpers.expects('reinstallRemoteApk').never();
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].resetApp(adb, localApkPath, pkg, false).should.eventually.be.rejectedWith('slow'));

          case 5:
            mocks.adb.verify();
            mocks.fs.verify();
            mocks.helpers.verify();

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should throw error if remote file does not exist', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.fs.expects('md5').withExactArgs(localApkPath).returns('apkmd5');
            mocks.adb.expects('fileExists').returns(true);
            mocks.helpers.expects('reinstallRemoteApk').once().returns('');
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].resetApp(adb, localApkPath, pkg, false));

          case 5:
            mocks.adb.verify();
            mocks.fs.verify();
            mocks.helpers.verify();

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));

  describe.skip('reinstallRemoteApk', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    var localApkPath = 'local';
    var pkg = 'pkg';
    var remotePath = 'remote';
    it('should throw error if remote file does not exist', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('uninstallApk').withExactArgs(pkg).returns('');
            // install remote is not defines do we mean installApkRemotely?
            mocks.adb.expects('installRemote').withExactArgs(remotePath).returns('');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].reinstallRemoteApk(adb, localApkPath, pkg, remotePath));

          case 4:
            mocks.adb.verify();

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('installApkRemotely', (0, _appiumTestSupport.withMocks)({ adb: adb, fs: _appiumSupport.fs, helpers: _libAndroidHelpers2['default'] }, function (mocks) {
    var localApkPath = 'local';
    var pkg = 'pkg';
    it('should reset app if already installed', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.fs.expects('md5').withExactArgs(localApkPath).returns('apkmd5');
            mocks.helpers.expects('getRemoteApkPath').returns(false);
            mocks.adb.expects('fileExists').returns(true);
            mocks.adb.expects('isAppInstalled').returns(true);
            mocks.helpers.expects('resetApp').once().returns("");
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].installApkRemotely(adb, localApkPath, pkg, true));

          case 7:
            mocks.adb.verify();
            mocks.fs.verify();
            mocks.helpers.verify();

          case 10:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it.skip('should push and reinstall apk when apk is not installed', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.fs.expects('md5').withExactArgs(localApkPath).returns('apkmd5');
            mocks.helpers.expects('getRemoteApkPath').returns(true);
            mocks.adb.expects('fileExists').returns(true);
            mocks.adb.expects('isAppInstalled').returns(true);
            mocks.helpers.expects('resetApp').once().returns("");
            mocks.helpers.expects('reinstallRemoteApk').once().returns("");
            mocks.helpers.expects('removeTempApks').once().returns(true);
            mocks.adb.expects('mkdir').once().returns("");
            context$3$0.next = 10;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].installApkRemotely(adb, localApkPath, pkg, true));

          case 10:
            mocks.adb.verify();
            mocks.fs.verify();
            mocks.helpers.verify();

          case 13:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('removeRemoteApks', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should return when no apks present', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('ls').returns([]);
            mocks.adb.expects('shell').never();
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].removeRemoteApks(adb));

          case 4:
            mocks.adb.verify();

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should return when only exceptMd5s are present', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('ls').returns(['foo']);
            mocks.adb.expects('shell').never();
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].removeRemoteApks(adb, ['foo']));

          case 4:
            mocks.adb.verify();

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should remove all remote apks', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('ls').returns(['foo']);
            mocks.adb.expects('shell').once().returns('');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].removeRemoteApks(adb, ['bar']));

          case 4:
            mocks.adb.verify();

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('initUnicodeKeyboard', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should install and enable unicodeIME', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('install').once().returns('');
            mocks.adb.expects('defaultIME').once().returns('defaultIME');
            mocks.adb.expects('enableIME').once().returns('');
            mocks.adb.expects('setIME').once().returns('');
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].initUnicodeKeyboard(adb));

          case 6:
            mocks.adb.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('pushSettingsApp', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should install settingsApp', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('install').withExactArgs(_ioAppiumSettings.path, false).once().returns('');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].pushSettingsApp(adb));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('pushUnlock', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should install unlockApp', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('install').withExactArgs(_appiumUnlock.path, false).once().returns('');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].pushUnlock(adb));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('unlock', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should return if screen is already unlocked', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('isScreenLocked').withExactArgs().once().returns(false);
            mocks.adb.expects('startApp').never();
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].unlock(adb));

          case 4:
            mocks.adb.verify();

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should start unlock app', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('isScreenLocked').onCall(0).returns(true);
            mocks.adb.expects('isScreenLocked').returns(false);
            mocks.adb.expects('startApp').once().returns('');
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].unlock(adb));

          case 5:
            mocks.adb.verify();

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('removeNullProperties', function () {
    it('should ignore null properties', function callee$2$0() {
      var test;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            test = { foo: null, bar: true };

            _libAndroidHelpers2['default'].removeNullProperties(test);
            _lodash2['default'].keys(test).length.should.equal(1);

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should ignore undefined properties', function callee$2$0() {
      var test;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            test = { foo: undefined, bar: true };

            _libAndroidHelpers2['default'].removeNullProperties(test);
            _lodash2['default'].keys(test).length.should.equal(1);

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should not ignore falsy properties like 0 and false', function callee$2$0() {
      var test;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            test = { foo: false, bar: true, zero: 0 };

            _libAndroidHelpers2['default'].removeNullProperties(test);
            _lodash2['default'].keys(test).length.should.equal(3);

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC9hbmRyb2lkLWhlbHBlci1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7OztxQkFDM0IsT0FBTzs7OztpQ0FDTCwyQkFBMkI7Ozs7eUJBQy9CLFlBQVk7Ozs7aUNBQ0YscUJBQXFCOzs0QkFDakIsY0FBYzs7SUFBaEMsWUFBWTs7NkJBQ0wsZ0JBQWdCOztnQ0FDSyxvQkFBb0I7OzRCQUN0QixlQUFlOztzQkFDdkMsUUFBUTs7OztBQUV0QixJQUFNLE1BQU0sR0FBRyxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUM3QixJQUFNLGdCQUFnQixHQUFHLGlCQUFpQixDQUFDO0FBQzNDLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxZQUFNO0FBQ2hDLE1BQUksR0FBRyxHQUFHLDRCQUFTLENBQUM7O0FBRXBCLFVBQVEsQ0FBQyxrQkFBa0IsRUFBRSxZQUFNO0FBQ2pDLE1BQUUsQ0FBQyxxQ0FBcUMsRUFBRSxZQUFNO0FBQzlDLHFDQUFRLGdCQUFnQix5RkFDZ0MsQ0FBQyxNQUFNLENBQzVELEVBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDekIsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLHFEQUFxRCxFQUFFLFlBQU07QUFDOUQsWUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsK0JBQVEsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztLQUN2RCxDQUFDLENBQUM7QUFDSCxNQUFFLENBQUMsaUNBQWlDLEVBQUUsWUFBWTtBQUNoRCxxQ0FBUSxnQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3hFLENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQzs7QUFFSCxVQUFRLENBQUMsZ0JBQWdCLEVBQUUsa0NB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QUNqQywyQ0FBUSxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNuQyxnQ0FBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7S0FDckMsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLG9DQUFvQyxFQUFFO1VBQ25DLElBQUk7Ozs7QUFBSixnQkFBSSxHQUFHLEVBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFDOztBQUN0QywyQ0FBUSxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNuQyxnQ0FBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7S0FDckMsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLHFEQUFxRCxFQUFFO1VBQ3BELElBQUk7Ozs7QUFBSixnQkFBSSxHQUFHLEVBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUM7O0FBQzNDLDJDQUFRLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25DLGdDQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7OztLQUNyQyxDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC91bml0L2FuZHJvaWQtaGVscGVyLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgc2lub24gZnJvbSAnc2lub24nO1xuaW1wb3J0IGhlbHBlcnMgZnJvbSAnLi4vLi4vbGliL2FuZHJvaWQtaGVscGVycyc7XG5pbXBvcnQgQURCIGZyb20gJ2FwcGl1bS1hZGInO1xuaW1wb3J0IHsgd2l0aE1vY2tzIH0gZnJvbSAnYXBwaXVtLXRlc3Qtc3VwcG9ydCc7XG5pbXBvcnQgKiBhcyB0ZWVuX3Byb2Nlc3MgZnJvbSAndGVlbl9wcm9jZXNzJztcbmltcG9ydCB7IGZzIH0gZnJvbSAnYXBwaXVtLXN1cHBvcnQnO1xuaW1wb3J0IHsgcGF0aCBhcyBzZXR0aW5nc0Fwa1BhdGggfSBmcm9tICdpby5hcHBpdW0uc2V0dGluZ3MnO1xuaW1wb3J0IHsgcGF0aCBhcyB1bmxvY2tBcGtQYXRoIH0gZnJvbSAnYXBwaXVtLXVubG9jayc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuXG5jb25zdCBzaG91bGQgPSBjaGFpLnNob3VsZCgpO1xuY29uc3QgUkVNT1RFX1RFTVBfUEFUSCA9IFwiL2RhdGEvbG9jYWwvdG1wXCI7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmRlc2NyaWJlKCdBbmRyb2lkIEhlbHBlcnMnLCAoKSA9PiB7XG4gIGxldCBhZGIgPSBuZXcgQURCKCk7XG5cbiAgZGVzY3JpYmUoJ3BhcnNlSmF2YVZlcnNpb24nLCAoKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCBjb3JyZWN0bHkgcGFyc2UgamF2YSB2ZXJzaW9uJywgKCkgPT4ge1xuICAgICAgaGVscGVycy5wYXJzZUphdmFWZXJzaW9uKGBqYXZhIHZlcnNpb24gXCIxLjguMF80MFwiXG4gICAgICAgIEphdmEoVE0pIFNFIFJ1bnRpbWUgRW52aXJvbm1lbnQgKGJ1aWxkIDEuOC4wXzQwLWIyNylgKS5zaG91bGRcbiAgICAgICAgLmJlLmVxdWFsKFwiMS44LjBfNDBcIik7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gbnVsbCBpZiBpdCBjYW5ub3QgcGFyc2UgamF2YSB2ZXJzdGlvbicsICgpID0+IHtcbiAgICAgIHNob3VsZC5ub3QuZXhpc3QoaGVscGVycy5wYXJzZUphdmFWZXJzaW9uKCdmb28gYmFyJykpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgcGFyc2UgT3BlbkpESyB2ZXJzaW9uaW5nJywgZnVuY3Rpb24gKCkge1xuICAgICAgaGVscGVycy5wYXJzZUphdmFWZXJzaW9uKCdvcGVuamRrIHZlcnNpb24gMS44Jykuc2hvdWxkLmJlLmVxdWFsKCcxLjgnKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2dldEphdmFWZXJzaW9uJywgd2l0aE1vY2tzKHt0ZWVuX3Byb2Nlc3N9LCAobW9ja3MpID0+IHtcbiAgICBpdCgnc2hvdWxkIGNvcnJlY3RseSBnZXQgamF2YSB2ZXJzaW9uJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbW9ja3MudGVlbl9wcm9jZXNzLmV4cGVjdHMoJ2V4ZWMnKS53aXRoRXhhY3RBcmdzKCdqYXZhJywgWyctdmVyc2lvbiddKVxuICAgICAgICAucmV0dXJucyh7c3RkZXJyOiAnamF2YSB2ZXJzaW9uIFwiMS44LjBfNDBcIid9KTtcbiAgICAgIChhd2FpdCBoZWxwZXJzLmdldEphdmFWZXJzaW9uKCkpLnNob3VsZC5lcXVhbCgnMS44LjBfNDAnKTtcbiAgICAgIG1vY2tzLnRlZW5fcHJvY2Vzcy52ZXJpZnkoKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHJldHVybiBudWxsIGlmIGl0IGNhbm5vdCBwYXJzZSBqYXZhIHZlcnN0aW9uJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbW9ja3MudGVlbl9wcm9jZXNzLmV4cGVjdHMoJ2V4ZWMnKS53aXRoRXhhY3RBcmdzKCdqYXZhJywgWyctdmVyc2lvbiddKVxuICAgICAgICAucmV0dXJucyh7c3RkZXJyOiAnZm9vIGJhcid9KTtcbiAgICAgIGF3YWl0IGhlbHBlcnMuZ2V0SmF2YVZlcnNpb24oKS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoJ0phdmEnKTtcbiAgICAgIG1vY2tzLnRlZW5fcHJvY2Vzcy52ZXJpZnkoKTtcbiAgICB9KTtcbiAgfSkpO1xuICBkZXNjcmliZSgncHJlcGFyZUVtdWxhdG9yJywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcbiAgICBjb25zdCBvcHRzID0ge2F2ZDogXCJmb29AYmFyXCIsIGF2ZEFyZ3M6IFwiXCIsIGxhbmd1YWdlOiBcImVuXCIsIGxvY2FsZTogXCJ1c1wifTtcbiAgICBpdCgnc2hvdWxkIG5vdCBsYXVuY2ggYXZkIGlmIG9uZSBpcyBhbHJlYWR5IHJ1bm5pbmcnLCBhc3luYyAoKSA9PiB7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZ2V0UnVubmluZ0FWRCcpLndpdGhFeGFjdEFyZ3MoJ2Zvb2JhcicpXG4gICAgICAgIC5yZXR1cm5zKFwiZm9vXCIpO1xuICAgICAgYXdhaXQgaGVscGVycy5wcmVwYXJlRW11bGF0b3IoYWRiLCBvcHRzKTtcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGxhdW5jaCBhdmQgaWYgb25lIGlzIGFscmVhZHkgcnVubmluZycsIGFzeW5jICgpID0+IHtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXRSdW5uaW5nQVZEJykud2l0aEV4YWN0QXJncygnZm9vYmFyJylcbiAgICAgICAgLnJldHVybnMobnVsbCk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnbGF1bmNoQVZEJykud2l0aEV4YWN0QXJncygnZm9vQGJhcicsICcnLCAnZW4nLCAndXMnLFxuICAgICAgICB1bmRlZmluZWQsIHVuZGVmaW5lZClcbiAgICAgICAgLnJldHVybnMoXCJcIik7XG4gICAgICBhd2FpdCBoZWxwZXJzLnByZXBhcmVFbXVsYXRvcihhZGIsIG9wdHMpO1xuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgIH0pO1xuICB9KSk7XG4gIGRlc2NyaWJlKCdlbnN1cmVEZXZpY2VMb2NhbGUnLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xuICAgIGl0KCdzaG91bGQgcmV0dXJuIGlmIGxhbmd1YWdlIGFuZCBjb3VudHJ5IGFyZSBub3QgcGFzc2VkJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2dldERldmljZUxhbmd1YWdlJykubmV2ZXIoKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXREZXZpY2VDb3VudHJ5JykubmV2ZXIoKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXREZXZpY2VMb2NhbGUnKS5uZXZlcigpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NldERldmljZUxhbmd1YWdlJykubmV2ZXIoKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzZXREZXZpY2VDb3VudHJ5JykubmV2ZXIoKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzZXREZXZpY2VMb2NhbGUnKS5uZXZlcigpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3JlYm9vdCcpLm5ldmVyKCk7XG4gICAgICBhd2FpdCBoZWxwZXJzLmVuc3VyZURldmljZUxvY2FsZShhZGIpO1xuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgbm90IHNldCBsYW5ndWFnZSBhbmQgY291bnRyeSBpZiBpdCBkb2VzIG5vdCBjaGFuZ2Ugd2hlbiBBUEkgPCAyMycsIGFzeW5jICgpID0+IHtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXRBcGlMZXZlbCcpLnJldHVybnMoXCIxOFwiKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXREZXZpY2VMYW5ndWFnZScpLnJldHVybnMoJ2VuJyk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZ2V0RGV2aWNlQ291bnRyeScpLnJldHVybnMoJ3VzJyk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZ2V0RGV2aWNlTG9jYWxlJykubmV2ZXIoKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzZXREZXZpY2VMYW5ndWFnZScpLm5ldmVyKCk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2V0RGV2aWNlQ291bnRyeScpLm5ldmVyKCk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2V0RGV2aWNlTG9jYWxlJykubmV2ZXIoKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdyZWJvb3QnKS5uZXZlcigpO1xuICAgICAgYXdhaXQgaGVscGVycy5lbnN1cmVEZXZpY2VMb2NhbGUoYWRiLCAnZW4nLCAndXMnKTtcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHNldCBsYW5ndWFnZSBhbmQgY291bnRyeSBpZiB0aGV5IGFyZSBkaWZmZXJlbnQgd2hlbiBBUEkgPCAyMycsIGFzeW5jICgpID0+IHtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXRBcGlMZXZlbCcpLnJldHVybnMoXCIxOFwiKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXREZXZpY2VMYW5ndWFnZScpLnJldHVybnMoJ2ZyJyk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZ2V0RGV2aWNlQ291bnRyeScpLnJldHVybnMoJ0ZSJyk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZ2V0RGV2aWNlTG9jYWxlJykubmV2ZXIoKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzZXREZXZpY2VMYW5ndWFnZScpLndpdGhFeGFjdEFyZ3MoJ2VuJylcbiAgICAgICAgLnJldHVybnMoXCJcIik7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2V0RGV2aWNlQ291bnRyeScpLndpdGhFeGFjdEFyZ3MoJ3VzJylcbiAgICAgICAgLnJldHVybnMoXCJcIik7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2V0RGV2aWNlTG9jYWxlJykubmV2ZXIoKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdyZWJvb3QnKS5yZXR1cm5zKG51bGwpO1xuICAgICAgYXdhaXQgaGVscGVycy5lbnN1cmVEZXZpY2VMb2NhbGUoYWRiLCAnZW4nLCAndXMnKTtcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIG5vdCBzZXQgbG9jYWxlIGlmIGl0IGRvZXMgbm90IGNoYW5nZSB3aGVuIEFQSSA9IDIzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2dldEFwaUxldmVsJykucmV0dXJucyhcIjIzXCIpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2dldERldmljZUxhbmd1YWdlJykubmV2ZXIoKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXREZXZpY2VDb3VudHJ5JykubmV2ZXIoKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXREZXZpY2VMb2NhbGUnKS5yZXR1cm5zKCdlbi1VUycpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NldERldmljZUxhbmd1YWdlJykubmV2ZXIoKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzZXREZXZpY2VDb3VudHJ5JykubmV2ZXIoKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzZXREZXZpY2VMb2NhbGUnKS5uZXZlcigpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3JlYm9vdCcpLm5ldmVyKCk7XG4gICAgICBhd2FpdCBoZWxwZXJzLmVuc3VyZURldmljZUxvY2FsZShhZGIsICdlbicsICd1cycpO1xuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgc2V0IGxvY2FsZSBpZiBpdCBpcyBkaWZmZXJlbnQgd2hlbiBBUEkgPSAyMycsIGFzeW5jICgpID0+IHtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXRBcGlMZXZlbCcpLnJldHVybnMoXCIyM1wiKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXREZXZpY2VMYW5ndWFnZScpLm5ldmVyKCk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZ2V0RGV2aWNlQ291bnRyeScpLm5ldmVyKCk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZ2V0RGV2aWNlTG9jYWxlJykucmV0dXJucygnZnItRlInKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzZXREZXZpY2VMYW5ndWFnZScpLm5ldmVyKCk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2V0RGV2aWNlQ291bnRyeScpLm5ldmVyKCk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2V0RGV2aWNlTG9jYWxlJykud2l0aEV4YWN0QXJncygnZW4tVVMnKVxuICAgICAgICAucmV0dXJucyhcIlwiKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdyZWJvb3QnKS5yZXR1cm5zKG51bGwpO1xuICAgICAgYXdhaXQgaGVscGVycy5lbnN1cmVEZXZpY2VMb2NhbGUoYWRiLCAnZW4nLCAndXMnKTtcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICB9KTtcbiAgfSkpO1xuXG4gIGRlc2NyaWJlKCdnZXREZXZpY2VJbmZvRnJvbUNhcHMnLCAoKSA9PiB7XG4gICAgLy8gbGlzdCBvZiBkZXZpY2UvZW11IHVkaWRzIHRvIHRoZWlyIG9zIHZlcnNpb25zXG4gICAgLy8gdXNpbmcgbGlzdCBpbnN0ZWFkIG9mIG1hcCB0byBwcmVzZXJ2ZSBvcmRlclxuICAgIGxldCBkZXZpY2VzID0gW1xuICAgICAge3VkaWQ6ICdlbXVsYXRvci0xMjM0Jywgb3M6ICc0LjkuMid9LFxuICAgICAge3VkaWQ6ICdyb3RhbHVtZS0xMzM5Jywgb3M6ICc1LjEuNSd9LFxuICAgICAge3VkaWQ6ICdyb3RhbHVtZS0xMzM4Jywgb3M6ICc1LjAuMSd9LFxuICAgICAge3VkaWQ6ICdyb3RhbHVtZS0xMzM3Jywgb3M6ICc1LjAuMSd9LFxuICAgICAge3VkaWQ6ICdyb2FtdWxldC05MDAwJywgb3M6ICc2LjAnfSxcbiAgICAgIHt1ZGlkOiAncm9hbXVsZXQtMCcsIG9zOiAnMi4zJ30sXG4gICAgICB7dWRpZDogJzAxMjM0NTY3ODknLCBvczogJ3dlbGxoZWxsb3RoZXJlJ31cbiAgICBdO1xuICAgIGxldCBjdXJEZXZpY2VJZCA9ICcnO1xuXG4gICAgYmVmb3JlKCgpID0+IHtcbiAgICAgIHNpbm9uLnN0dWIoQURCLCAnY3JlYXRlQURCJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGdldERldmljZXNXaXRoUmV0cnk6IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBfLm1hcChkZXZpY2VzLCAoZGV2aWNlKSA9PiB7IHJldHVybiB7dWRpZDogZGV2aWNlLnVkaWR9OyB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGdldFBvcnRGcm9tRW11bGF0b3JTdHJpbmc6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAxMjM0O1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZ2V0UnVubmluZ0FWRDogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHsndWRpZCc6ICdlbXVsYXRvci0xMjM0JywgJ3BvcnQnOiAxMjM0fTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNldERldmljZUlkOiAodWRpZCkgPT4ge1xuICAgICAgICAgICAgY3VyRGV2aWNlSWQgPSB1ZGlkO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZ2V0UGxhdGZvcm1WZXJzaW9uOiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gXy5maWx0ZXIoZGV2aWNlcywge3VkaWQ6IGN1ckRldmljZUlkfSlbMF0ub3M7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBjdXJEZXZpY2VJZDogJ2VtdWxhdG9yLTEyMzQnLFxuICAgICAgICAgIGVtdWxhdG9yUG9ydDogMTIzNFxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBhZnRlcigoKSA9PiB7XG4gICAgICBBREIuY3JlYXRlQURCLnJlc3RvcmUoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgdGhyb3cgZXJyb3Igd2hlbiB1ZGlkIG5vdCBpbiBsaXN0JywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IGNhcHMgPSB7XG4gICAgICAgIHVkaWQ6ICdmb29tdWxhdG9yJ1xuICAgICAgfTtcblxuICAgICAgYXdhaXQgaGVscGVycy5nZXREZXZpY2VJbmZvRnJvbUNhcHMoY2Fwcykuc2hvdWxkLmJlLnJlamVjdGVkV2l0aCgnZm9vbXVsYXRvcicpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgZ2V0IGRldmljZUlkIGFuZCBlbVBvcnQgd2hlbiB1ZGlkIGlzIHByZXNlbnQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgY2FwcyA9IHtcbiAgICAgICAgdWRpZDogJ2VtdWxhdG9yLTEyMzQnXG4gICAgICB9O1xuXG4gICAgICBsZXQge3VkaWQsIGVtUG9ydH0gPSBhd2FpdCBoZWxwZXJzLmdldERldmljZUluZm9Gcm9tQ2FwcyhjYXBzKTtcbiAgICAgIHVkaWQuc2hvdWxkLmVxdWFsKCdlbXVsYXRvci0xMjM0Jyk7XG4gICAgICBlbVBvcnQuc2hvdWxkLmVxdWFsKDEyMzQpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgZ2V0IGZpcnN0IGRldmljZUlkIGFuZCBlbVBvcnQgaWYgYXZkLCBwbGF0Zm9ybVZlcnNpb24sIGFuZCB1ZGlkIGFyZW5cXCd0IGdpdmVuJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IHt1ZGlkLCBlbVBvcnR9ID0gYXdhaXQgaGVscGVycy5nZXREZXZpY2VJbmZvRnJvbUNhcHMoKTtcbiAgICAgIHVkaWQuc2hvdWxkLmVxdWFsKCdlbXVsYXRvci0xMjM0Jyk7XG4gICAgICBlbVBvcnQuc2hvdWxkLmVxdWFsKDEyMzQpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgZ2V0IGRldmljZUlkIGFuZCBlbVBvcnQgd2hlbiBhdmQgaXMgcHJlc2VudCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBjYXBzID0ge1xuICAgICAgICBhdmQ6ICdBVkRfTkFNRSdcbiAgICAgIH07XG4gICAgICBsZXQge3VkaWQsIGVtUG9ydH0gPSBhd2FpdCBoZWxwZXJzLmdldERldmljZUluZm9Gcm9tQ2FwcyhjYXBzKTtcbiAgICAgIHVkaWQuc2hvdWxkLmVxdWFsKCdlbXVsYXRvci0xMjM0Jyk7XG4gICAgICBlbVBvcnQuc2hvdWxkLmVxdWFsKDEyMzQpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgZmFpbCBpZiB0aGUgZ2l2ZW4gcGxhdGZvcm1WZXJzaW9uIGlzIG5vdCBmb3VuZCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBjYXBzID0ge1xuICAgICAgICBwbGF0Zm9ybVZlcnNpb246ICcxMjM0NTY3ODkwJ1xuICAgICAgfTtcbiAgICAgIGF3YWl0IGhlbHBlcnMuZ2V0RGV2aWNlSW5mb0Zyb21DYXBzKGNhcHMpXG4gICAgICAgIC5zaG91bGQuYmUucmVqZWN0ZWRXaXRoKCdVbmFibGUgdG8gZmluZCBhbiBhY3RpdmUgZGV2aWNlIG9yIGVtdWxhdG9yIHdpdGggT1MgMTIzNDU2Nzg5MCcpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgZ2V0IGRldmljZUlkIGFuZCBlbVBvcnQgaWYgcGxhdGZvcm1WZXJzaW9uIGlzIGZvdW5kIGFuZCB1bmlxdWUnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgY2FwcyA9IHtcbiAgICAgICAgcGxhdGZvcm1WZXJzaW9uOiAnNi4wJ1xuICAgICAgfTtcbiAgICAgIGxldCB7dWRpZCwgZW1Qb3J0fSA9IGF3YWl0IGhlbHBlcnMuZ2V0RGV2aWNlSW5mb0Zyb21DYXBzKGNhcHMpO1xuICAgICAgdWRpZC5zaG91bGQuZXF1YWwoJ3JvYW11bGV0LTkwMDAnKTtcbiAgICAgIGVtUG9ydC5zaG91bGQuZXF1YWwoMTIzNCk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBnZXQgdGhlIGZpcnN0IGRldmljZUlkIGFuZCBlbVBvcnQgaWYgcGxhdGZvcm1WZXJzaW9uIGlzIGZvdW5kIG11bHRpcGxlIHRpbWVzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IGNhcHMgPSB7XG4gICAgICAgIHBsYXRmb3JtVmVyc2lvbjogJzUuMC4xJ1xuICAgICAgfTtcbiAgICAgIGxldCB7dWRpZCwgZW1Qb3J0fSA9IGF3YWl0IGhlbHBlcnMuZ2V0RGV2aWNlSW5mb0Zyb21DYXBzKGNhcHMpO1xuICAgICAgdWRpZC5zaG91bGQuZXF1YWwoJ3JvdGFsdW1lLTEzMzgnKTtcbiAgICAgIGVtUG9ydC5zaG91bGQuZXF1YWwoMTIzNCk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBnZXQgdGhlIGZpcnN0IGRldmljZUlkIGFuZCBlbVBvcnQgaWYgcGxhdGZvcm1WZXJzaW9uIGlzIGZvdW5kIG11bHRpcGxlIHRpbWVzIGFuZCBpcyBhIHBhcnRpYWwgbWF0Y2gnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgY2FwcyA9IHtcbiAgICAgICAgcGxhdGZvcm1WZXJzaW9uOiAnNS4wJ1xuICAgICAgfTtcbiAgICAgIGxldCB7dWRpZCwgZW1Qb3J0fSA9IGF3YWl0IGhlbHBlcnMuZ2V0RGV2aWNlSW5mb0Zyb21DYXBzKGNhcHMpO1xuICAgICAgdWRpZC5zaG91bGQuZXF1YWwoJ3JvdGFsdW1lLTEzMzgnKTtcbiAgICAgIGVtUG9ydC5zaG91bGQuZXF1YWwoMTIzNCk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBnZXQgZGV2aWNlSWQgYW5kIGVtUG9ydCBieSB1ZGlkIGlmIHVkaWQgYW5kIHBsYXRmb3JtVmVyc2lvbiBhcmUgZ2l2ZW4nLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgY2FwcyA9IHtcbiAgICAgICAgdWRpZDogJzAxMjM0NTY3ODknLFxuICAgICAgICBwbGF0Zm9ybVZlcnNpb246ICcyLjMnXG4gICAgICB9O1xuICAgICAgbGV0IHt1ZGlkLCBlbVBvcnR9ID0gYXdhaXQgaGVscGVycy5nZXREZXZpY2VJbmZvRnJvbUNhcHMoY2Fwcyk7XG4gICAgICB1ZGlkLnNob3VsZC5lcXVhbCgnMDEyMzQ1Njc4OScpO1xuICAgICAgZW1Qb3J0LnNob3VsZC5lcXVhbCgxMjM0KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2dldExhdW5jaEluZm9Gcm9tTWFuaWZlc3QnLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xuICAgIGl0KCdzaG91bGQgcmV0dXJuIHdoZW4gbm8gYXBwIHByZXNlbnQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygncGFja2FnZUFuZExhdW5jaEFjdGl2aXR5RnJvbU1hbmlmZXN0JykubmV2ZXIoKTtcbiAgICAgIGF3YWl0IGhlbHBlcnMuZ2V0TGF1bmNoSW5mbyhhZGIsIHt9KTtcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHJldHVybiB3aGVuIGFwcFBhY2thZ2UgJiBhcHBBY3Rpdml0eSBhcmUgYWxyZWFkeSBwcmVzZW50JywgYXN5bmMgKCkgPT4ge1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3BhY2thZ2VBbmRMYXVuY2hBY3Rpdml0eUZyb21NYW5pZmVzdCcpLm5ldmVyKCk7XG4gICAgICBhd2FpdCBoZWxwZXJzLmdldExhdW5jaEluZm8oYWRiLCB7YXBwOiBcImZvb1wiLCBhcHBQYWNrYWdlOiBcImJhclwiLFxuICAgICAgICBhcHBBY3Rpdml0eTogXCJhY3RcIn0pO1xuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgcmV0dXJuIHBhY2thZ2UgYW5kIGxhdW5jaCBhY3Rpdml0eSBmcm9tIG1hbmlmZXN0JywgYXN5bmMgKCkgPT4ge1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3BhY2thZ2VBbmRMYXVuY2hBY3Rpdml0eUZyb21NYW5pZmVzdCcpLndpdGhFeGFjdEFyZ3MoJ2ZvbycpXG4gICAgICAgIC5yZXR1cm5zKHthcGtQYWNrYWdlOiAncGtnJywgYXBrQWN0aXZpdHk6ICdhY2snfSk7XG4gICAgICBjb25zdCByZXN1bHQgPSB7IGFwcFBhY2thZ2U6ICdwa2cnLCBhcHBXYWl0UGFja2FnZTogJ3BrZycsXG4gICAgICAgICAgICAgICAgICAgICAgIGFwcEFjdGl2aXR5OiAnYWNrJywgYXBwV2FpdEFjdGl2aXR5OiAnYWNrJyB9O1xuICAgICAgKGF3YWl0IGhlbHBlcnMuZ2V0TGF1bmNoSW5mbyhhZGIsIHthcHA6IFwiZm9vXCJ9KSkuc2hvdWxkLmRlZXBcbiAgICAgICAgLmVxdWFsKHJlc3VsdCk7XG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgfSk7XG4gIH0pKTtcbiAgZGVzY3JpYmUoJ2dldFJlbW90ZUFwa1BhdGgnLCAoKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gcmVtb3RlIHBhdGgnLCAoKSA9PiB7XG4gICAgICBoZWxwZXJzLmdldFJlbW90ZUFwa1BhdGgoJ2ZvbycpLnNob3VsZC5lcXVhbChgJHtSRU1PVEVfVEVNUF9QQVRIfS9mb28uYXBrYCk7XG4gICAgfSk7XG4gIH0pO1xuICBkZXNjcmliZSgncmVzZXRBcHAnLCB3aXRoTW9ja3Moe2FkYiwgZnMsIGhlbHBlcnN9LCAobW9ja3MpID0+IHtcbiAgICBjb25zdCBsb2NhbEFwa1BhdGggPSAnbG9jYWwnO1xuICAgIGNvbnN0IHBrZyA9ICdwa2cnO1xuICAgIGl0KCdzaG91bGQgdGhyb3cgZXJyb3IgaWYgcmVtb3RlIGZpbGUgZG9lcyBub3QgZXhpc3QnLCBhc3luYyAoKSA9PiB7XG4gICAgICBtb2Nrcy5mcy5leHBlY3RzKCdtZDUnKS53aXRoRXhhY3RBcmdzKGxvY2FsQXBrUGF0aCkucmV0dXJucygnYXBrbWQ1Jyk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZmlsZUV4aXN0cycpLnJldHVybnMoZmFsc2UpO1xuICAgICAgbW9ja3MuaGVscGVycy5leHBlY3RzKCdyZWluc3RhbGxSZW1vdGVBcGsnKS5uZXZlcigpO1xuICAgICAgYXdhaXQgaGVscGVycy5yZXNldEFwcChhZGIsIGxvY2FsQXBrUGF0aCwgcGtnLCBmYWxzZSkuc2hvdWxkLmV2ZW50dWFsbHlcbiAgICAgICAgLmJlLnJlamVjdGVkV2l0aCgnc2xvdycpO1xuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgICAgbW9ja3MuZnMudmVyaWZ5KCk7XG4gICAgICBtb2Nrcy5oZWxwZXJzLnZlcmlmeSgpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgdGhyb3cgZXJyb3IgaWYgcmVtb3RlIGZpbGUgZG9lcyBub3QgZXhpc3QnLCBhc3luYyAoKSA9PiB7XG4gICAgICBtb2Nrcy5mcy5leHBlY3RzKCdtZDUnKS53aXRoRXhhY3RBcmdzKGxvY2FsQXBrUGF0aCkucmV0dXJucygnYXBrbWQ1Jyk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZmlsZUV4aXN0cycpLnJldHVybnModHJ1ZSk7XG4gICAgICBtb2Nrcy5oZWxwZXJzLmV4cGVjdHMoJ3JlaW5zdGFsbFJlbW90ZUFwaycpLm9uY2UoKS5yZXR1cm5zKCcnKTtcbiAgICAgIGF3YWl0IGhlbHBlcnMucmVzZXRBcHAoYWRiLCBsb2NhbEFwa1BhdGgsIHBrZywgZmFsc2UpO1xuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgICAgbW9ja3MuZnMudmVyaWZ5KCk7XG4gICAgICBtb2Nrcy5oZWxwZXJzLnZlcmlmeSgpO1xuICAgIH0pO1xuICB9KSk7XG5cbiAgZGVzY3JpYmUuc2tpcCgncmVpbnN0YWxsUmVtb3RlQXBrJywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcbiAgICBjb25zdCBsb2NhbEFwa1BhdGggPSAnbG9jYWwnO1xuICAgIGNvbnN0IHBrZyA9ICdwa2cnO1xuICAgIGNvbnN0IHJlbW90ZVBhdGggPSAncmVtb3RlJztcbiAgICBpdCgnc2hvdWxkIHRocm93IGVycm9yIGlmIHJlbW90ZSBmaWxlIGRvZXMgbm90IGV4aXN0JywgYXN5bmMgKCkgPT4ge1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3VuaW5zdGFsbEFwaycpLndpdGhFeGFjdEFyZ3MocGtnKS5yZXR1cm5zKCcnKTtcbiAgICAgIC8vIGluc3RhbGwgcmVtb3RlIGlzIG5vdCBkZWZpbmVzIGRvIHdlIG1lYW4gaW5zdGFsbEFwa1JlbW90ZWx5P1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2luc3RhbGxSZW1vdGUnKS53aXRoRXhhY3RBcmdzKHJlbW90ZVBhdGgpXG4gICAgICAgIC5yZXR1cm5zKCcnKTtcbiAgICAgIGF3YWl0IGhlbHBlcnMucmVpbnN0YWxsUmVtb3RlQXBrKGFkYiwgbG9jYWxBcGtQYXRoLCBwa2csIHJlbW90ZVBhdGgpO1xuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgIH0pO1xuICB9KSk7XG4gIGRlc2NyaWJlKCdpbnN0YWxsQXBrUmVtb3RlbHknLCB3aXRoTW9ja3Moe2FkYiwgZnMsIGhlbHBlcnN9LCAobW9ja3MpID0+IHtcbiAgICBjb25zdCBsb2NhbEFwa1BhdGggPSAnbG9jYWwnO1xuICAgIGNvbnN0IHBrZyA9ICdwa2cnO1xuICAgIGl0KCdzaG91bGQgcmVzZXQgYXBwIGlmIGFscmVhZHkgaW5zdGFsbGVkJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbW9ja3MuZnMuZXhwZWN0cygnbWQ1Jykud2l0aEV4YWN0QXJncyhsb2NhbEFwa1BhdGgpLnJldHVybnMoJ2Fwa21kNScpO1xuICAgICAgbW9ja3MuaGVscGVycy5leHBlY3RzKCdnZXRSZW1vdGVBcGtQYXRoJykucmV0dXJucyhmYWxzZSk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZmlsZUV4aXN0cycpLnJldHVybnModHJ1ZSk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnaXNBcHBJbnN0YWxsZWQnKS5yZXR1cm5zKHRydWUpO1xuICAgICAgbW9ja3MuaGVscGVycy5leHBlY3RzKCdyZXNldEFwcCcpLm9uY2UoKS5yZXR1cm5zKFwiXCIpO1xuICAgICAgYXdhaXQgaGVscGVycy5pbnN0YWxsQXBrUmVtb3RlbHkoYWRiLCBsb2NhbEFwa1BhdGgsIHBrZywgdHJ1ZSk7XG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgICBtb2Nrcy5mcy52ZXJpZnkoKTtcbiAgICAgIG1vY2tzLmhlbHBlcnMudmVyaWZ5KCk7XG4gICAgfSk7XG4gICAgaXQuc2tpcCgnc2hvdWxkIHB1c2ggYW5kIHJlaW5zdGFsbCBhcGsgd2hlbiBhcGsgaXMgbm90IGluc3RhbGxlZCcsIGFzeW5jICgpID0+IHtcbiAgICAgIG1vY2tzLmZzLmV4cGVjdHMoJ21kNScpLndpdGhFeGFjdEFyZ3MobG9jYWxBcGtQYXRoKS5yZXR1cm5zKCdhcGttZDUnKTtcbiAgICAgIG1vY2tzLmhlbHBlcnMuZXhwZWN0cygnZ2V0UmVtb3RlQXBrUGF0aCcpLnJldHVybnModHJ1ZSk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZmlsZUV4aXN0cycpLnJldHVybnModHJ1ZSk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnaXNBcHBJbnN0YWxsZWQnKS5yZXR1cm5zKHRydWUpO1xuICAgICAgbW9ja3MuaGVscGVycy5leHBlY3RzKCdyZXNldEFwcCcpLm9uY2UoKS5yZXR1cm5zKFwiXCIpO1xuICAgICAgbW9ja3MuaGVscGVycy5leHBlY3RzKCdyZWluc3RhbGxSZW1vdGVBcGsnKS5vbmNlKCkucmV0dXJucyhcIlwiKTtcbiAgICAgIG1vY2tzLmhlbHBlcnMuZXhwZWN0cygncmVtb3ZlVGVtcEFwa3MnKS5vbmNlKCkucmV0dXJucyh0cnVlKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdta2RpcicpLm9uY2UoKS5yZXR1cm5zKFwiXCIpO1xuICAgICAgYXdhaXQgaGVscGVycy5pbnN0YWxsQXBrUmVtb3RlbHkoYWRiLCBsb2NhbEFwa1BhdGgsIHBrZywgdHJ1ZSk7XG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgICBtb2Nrcy5mcy52ZXJpZnkoKTtcbiAgICAgIG1vY2tzLmhlbHBlcnMudmVyaWZ5KCk7XG4gICAgfSk7XG4gIH0pKTtcbiAgZGVzY3JpYmUoJ3JlbW92ZVJlbW90ZUFwa3MnLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xuICAgIGl0KCdzaG91bGQgcmV0dXJuIHdoZW4gbm8gYXBrcyBwcmVzZW50JywgYXN5bmMgKCkgPT4ge1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2xzJykucmV0dXJucyhbXSk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2hlbGwnKS5uZXZlcigpO1xuICAgICAgYXdhaXQgaGVscGVycy5yZW1vdmVSZW1vdGVBcGtzKGFkYik7XG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gd2hlbiBvbmx5IGV4Y2VwdE1kNXMgYXJlIHByZXNlbnQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnbHMnKS5yZXR1cm5zKFsnZm9vJ10pO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NoZWxsJykubmV2ZXIoKTtcbiAgICAgIGF3YWl0IGhlbHBlcnMucmVtb3ZlUmVtb3RlQXBrcyhhZGIsIFsnZm9vJ10pO1xuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgcmVtb3ZlIGFsbCByZW1vdGUgYXBrcycsIGFzeW5jICgpID0+IHtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdscycpLnJldHVybnMoWydmb28nXSk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2hlbGwnKS5vbmNlKCkucmV0dXJucygnJyk7XG4gICAgICBhd2FpdCBoZWxwZXJzLnJlbW92ZVJlbW90ZUFwa3MoYWRiLCBbJ2JhciddKTtcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICB9KTtcbiAgfSkpO1xuICBkZXNjcmliZSgnaW5pdFVuaWNvZGVLZXlib2FyZCcsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCBpbnN0YWxsIGFuZCBlbmFibGUgdW5pY29kZUlNRScsIGFzeW5jICgpID0+IHtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdpbnN0YWxsJykub25jZSgpLnJldHVybnMoJycpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2RlZmF1bHRJTUUnKS5vbmNlKCkucmV0dXJucygnZGVmYXVsdElNRScpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2VuYWJsZUlNRScpLm9uY2UoKS5yZXR1cm5zKCcnKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzZXRJTUUnKS5vbmNlKCkucmV0dXJucygnJyk7XG4gICAgICBhd2FpdCBoZWxwZXJzLmluaXRVbmljb2RlS2V5Ym9hcmQoYWRiKTtcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICB9KTtcbiAgfSkpO1xuICBkZXNjcmliZSgncHVzaFNldHRpbmdzQXBwJywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcbiAgICBpdCgnc2hvdWxkIGluc3RhbGwgc2V0dGluZ3NBcHAnLCBhc3luYyAoKSA9PiB7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnaW5zdGFsbCcpLndpdGhFeGFjdEFyZ3Moc2V0dGluZ3NBcGtQYXRoLCBmYWxzZSkub25jZSgpXG4gICAgICAgIC5yZXR1cm5zKCcnKTtcbiAgICAgIGF3YWl0IGhlbHBlcnMucHVzaFNldHRpbmdzQXBwKGFkYik7XG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgfSk7XG4gIH0pKTtcbiAgZGVzY3JpYmUoJ3B1c2hVbmxvY2snLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xuICAgIGl0KCdzaG91bGQgaW5zdGFsbCB1bmxvY2tBcHAnLCBhc3luYyAoKSA9PiB7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnaW5zdGFsbCcpLndpdGhFeGFjdEFyZ3ModW5sb2NrQXBrUGF0aCwgZmFsc2UpLm9uY2UoKVxuICAgICAgICAucmV0dXJucygnJyk7XG4gICAgICBhd2FpdCBoZWxwZXJzLnB1c2hVbmxvY2soYWRiKTtcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICB9KTtcbiAgfSkpO1xuICBkZXNjcmliZSgndW5sb2NrJywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcbiAgICBpdCgnc2hvdWxkIHJldHVybiBpZiBzY3JlZW4gaXMgYWxyZWFkeSB1bmxvY2tlZCcsIGFzeW5jICgpID0+IHtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdpc1NjcmVlbkxvY2tlZCcpLndpdGhFeGFjdEFyZ3MoKS5vbmNlKClcbiAgICAgICAgLnJldHVybnMoZmFsc2UpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3N0YXJ0QXBwJykubmV2ZXIoKTtcbiAgICAgIGF3YWl0IGhlbHBlcnMudW5sb2NrKGFkYik7XG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBzdGFydCB1bmxvY2sgYXBwJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2lzU2NyZWVuTG9ja2VkJykub25DYWxsKDApLnJldHVybnModHJ1ZSk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnaXNTY3JlZW5Mb2NrZWQnKS5yZXR1cm5zKGZhbHNlKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzdGFydEFwcCcpLm9uY2UoKS5yZXR1cm5zKCcnKTtcbiAgICAgIGF3YWl0IGhlbHBlcnMudW5sb2NrKGFkYik7XG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgfSk7XG4gIH0pKTtcbiAgZGVzY3JpYmUoJ3JlbW92ZU51bGxQcm9wZXJ0aWVzJywgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgaWdub3JlIG51bGwgcHJvcGVydGllcycsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCB0ZXN0ID0ge2ZvbzogbnVsbCwgYmFyOiB0cnVlfTtcbiAgICAgIGhlbHBlcnMucmVtb3ZlTnVsbFByb3BlcnRpZXModGVzdCk7XG4gICAgICBfLmtleXModGVzdCkubGVuZ3RoLnNob3VsZC5lcXVhbCgxKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGlnbm9yZSB1bmRlZmluZWQgcHJvcGVydGllcycsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCB0ZXN0ID0ge2ZvbzogdW5kZWZpbmVkLCBiYXI6IHRydWV9O1xuICAgICAgaGVscGVycy5yZW1vdmVOdWxsUHJvcGVydGllcyh0ZXN0KTtcbiAgICAgIF8ua2V5cyh0ZXN0KS5sZW5ndGguc2hvdWxkLmVxdWFsKDEpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgbm90IGlnbm9yZSBmYWxzeSBwcm9wZXJ0aWVzIGxpa2UgMCBhbmQgZmFsc2UnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgdGVzdCA9IHtmb286IGZhbHNlLCBiYXI6IHRydWUsIHplcm86IDB9O1xuICAgICAgaGVscGVycy5yZW1vdmVOdWxsUHJvcGVydGllcyh0ZXN0KTtcbiAgICAgIF8ua2V5cyh0ZXN0KS5sZW5ndGguc2hvdWxkLmVxdWFsKDMpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl19