'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _appiumExpress = require('appium-express');

var _appiumExpress2 = _interopRequireDefault(_appiumExpress);

var _mobileJsonWireProtocol = require('mobile-json-wire-protocol');

var _driver = require('./driver');

var _driver2 = _interopRequireDefault(_driver);

function startServer(port, host) {
  var d, router, server;
  return _regeneratorRuntime.async(function startServer$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        d = new _driver2['default']();
        router = (0, _mobileJsonWireProtocol.routeConfiguringFunction)(d);
        server = (0, _appiumExpress2['default'])(router, port, host);

        _logger2['default'].info('AndroidDriver server listening on http://' + host + ':' + port);
        return context$1$0.abrupt('return', server);

      case 5:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

exports.startServer = startServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9zZXJ2ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztzQkFBZ0IsVUFBVTs7Ozs2QkFDWSxnQkFBZ0I7Ozs7c0NBQ2IsMkJBQTJCOztzQkFDMUMsVUFBVTs7OztBQUVwQyxTQUFlLFdBQVcsQ0FBRSxJQUFJLEVBQUUsSUFBSTtNQUNoQyxDQUFDLEVBQ0QsTUFBTSxFQUNOLE1BQU07Ozs7QUFGTixTQUFDLEdBQUcseUJBQW1CO0FBQ3ZCLGNBQU0sR0FBRyxzREFBeUIsQ0FBQyxDQUFDO0FBQ3BDLGNBQU0sR0FBRyxnQ0FBVyxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQzs7QUFDM0MsNEJBQUksSUFBSSwrQ0FBNkMsSUFBSSxTQUFJLElBQUksQ0FBRyxDQUFDOzRDQUM5RCxNQUFNOzs7Ozs7O0NBQ2Q7O1FBRVEsV0FBVyxHQUFYLFdBQVciLCJmaWxlIjoibGliL3NlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBsb2cgZnJvbSAnLi9sb2dnZXInO1xuaW1wb3J0IHsgZGVmYXVsdCBhcyBiYXNlU2VydmVyIH0gZnJvbSAnYXBwaXVtLWV4cHJlc3MnO1xuaW1wb3J0IHsgcm91dGVDb25maWd1cmluZ0Z1bmN0aW9uIH0gZnJvbSAnbW9iaWxlLWpzb24td2lyZS1wcm90b2NvbCc7XG5pbXBvcnQgQW5kcm9pZERyaXZlciBmcm9tICcuL2RyaXZlcic7XG5cbmFzeW5jIGZ1bmN0aW9uIHN0YXJ0U2VydmVyIChwb3J0LCBob3N0KSB7XG4gIGxldCBkID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcbiAgbGV0IHJvdXRlciA9IHJvdXRlQ29uZmlndXJpbmdGdW5jdGlvbihkKTtcbiAgbGV0IHNlcnZlciA9IGJhc2VTZXJ2ZXIocm91dGVyLCBwb3J0LCBob3N0KTtcbiAgbG9nLmluZm8oYEFuZHJvaWREcml2ZXIgc2VydmVyIGxpc3RlbmluZyBvbiBodHRwOi8vJHtob3N0fToke3BvcnR9YCk7XG4gIHJldHVybiBzZXJ2ZXI7XG59XG5cbmV4cG9ydCB7IHN0YXJ0U2VydmVyIH07XG4iXX0=