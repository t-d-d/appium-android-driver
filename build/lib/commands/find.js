'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _mobileJsonWireProtocol = require('mobile-json-wire-protocol');

var commands = {},
    helpers = {},
    extensions = {};

// stategy: locator strategy
// selector: the actual selector for finding an element
// mult: multiple elements or just one?
// context: finding an element from the root context? or starting from another element
helpers.findElOrEls = function callee$0$0(strategy, selector, mult) {
  var context = arguments.length <= 3 || arguments[3] === undefined ? '' : arguments[3];
  var params, element, doFind;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        // throws error if not valid, uses this.locatorStrategies
        this.validateLocatorStrategy(strategy);

        if (selector) {
          context$1$0.next = 3;
          break;
        }

        throw new Error("Must provide a selector when finding elements");

      case 3:
        params = {
          strategy: strategy,
          selector: selector,
          context: context,
          multiple: mult
        };
        element = undefined;

        doFind = function doFind() {
          return _regeneratorRuntime.async(function doFind$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.prev = 0;
                context$2$0.next = 3;
                return _regeneratorRuntime.awrap(this.bootstrap.sendAction('find', params));

              case 3:
                element = context$2$0.sent;
                context$2$0.next = 11;
                break;

              case 6:
                context$2$0.prev = 6;
                context$2$0.t0 = context$2$0['catch'](0);

                if (!(context$2$0.t0.message && context$2$0.t0.message.match(/An element could not be located/))) {
                  context$2$0.next = 10;
                  break;
                }

                return context$2$0.abrupt('return', false);

              case 10:
                throw context$2$0.t0;

              case 11:
                if (!mult) {
                  context$2$0.next = 15;
                  break;
                }

                return context$2$0.abrupt('return', element && element.length !== 0);

              case 15:
                return context$2$0.abrupt('return', !_lodash2['default'].isNull(element));

              case 16:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this, [[0, 6]]);
        };

        context$1$0.prev = 6;
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(this.implicitWaitForCondition(doFind));

      case 9:
        context$1$0.next = 18;
        break;

      case 11:
        context$1$0.prev = 11;
        context$1$0.t0 = context$1$0['catch'](6);

        if (!(context$1$0.t0.message && context$1$0.t0.message.match(/Condition unmet/))) {
          context$1$0.next = 17;
          break;
        }

        // only get here if we are looking for multiple elements
        // condition was not met setting res to empty array
        element = [];
        context$1$0.next = 18;
        break;

      case 17:
        throw context$1$0.t0;

      case 18:
        if (!mult) {
          context$1$0.next = 22;
          break;
        }

        return context$1$0.abrupt('return', element);

      case 22:
        if (!(!element || _lodash2['default'].size(element) === 0)) {
          context$1$0.next = 24;
          break;
        }

        throw new _mobileJsonWireProtocol.errors.NoSuchElementError();

      case 24:
        return context$1$0.abrupt('return', element);

      case 25:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[6, 11]]);
};

_Object$assign(extensions, commands, helpers);
exports.commands = commands;
exports.helpers = helpers;
exports['default'] = extensions;

// we are fine with this, just indicate a retry

// we want to return false if we want to potentially try again
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9maW5kLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztzQkFBYyxRQUFROzs7O3NDQUNDLDJCQUEyQjs7QUFHbEQsSUFBSSxRQUFRLEdBQUcsRUFBRTtJQUFFLE9BQU8sR0FBRyxFQUFFO0lBQUUsVUFBVSxHQUFHLEVBQUUsQ0FBQzs7Ozs7O0FBTWpELE9BQU8sQ0FBQyxXQUFXLEdBQUcsb0JBQWdCLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSTtNQUFFLE9BQU8seURBQUcsRUFBRTtNQVF0RSxNQUFNLEVBT04sT0FBTyxFQUNQLE1BQU07Ozs7Ozs7QUFkVixZQUFJLENBQUMsdUJBQXVCLENBQUMsUUFBUSxDQUFDLENBQUM7O1lBRWxDLFFBQVE7Ozs7O2NBQ0wsSUFBSSxLQUFLLENBQUMsK0NBQStDLENBQUM7OztBQUc5RCxjQUFNLEdBQUc7QUFDWCxrQkFBUSxFQUFSLFFBQVE7QUFDUixrQkFBUSxFQUFSLFFBQVE7QUFDUixpQkFBTyxFQUFQLE9BQU87QUFDUCxrQkFBUSxFQUFFLElBQUk7U0FDZjtBQUVHLGVBQU87O0FBQ1AsY0FBTSxHQUFHLFNBQVQsTUFBTTs7Ozs7O2lEQUVVLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7OztBQUF6RCx1QkFBTzs7Ozs7Ozs7c0JBRUgsZUFBSSxPQUFPLElBQUksZUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUE7Ozs7O29EQUU5RCxLQUFLOzs7Ozs7cUJBTVosSUFBSTs7Ozs7b0RBQ0MsT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQzs7O29EQUUvQixDQUFDLG9CQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUM7Ozs7Ozs7U0FFNUI7Ozs7eUNBR08sSUFBSSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sQ0FBQzs7Ozs7Ozs7OztjQUV2QyxlQUFJLE9BQU8sSUFBSSxlQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQTs7Ozs7OztBQUdyRCxlQUFPLEdBQUcsRUFBRSxDQUFDOzs7Ozs7OzthQU1iLElBQUk7Ozs7OzRDQUNDLE9BQU87OztjQUVWLENBQUMsT0FBTyxJQUFJLG9CQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7Ozs7O2NBQzdCLElBQUksK0JBQU8sa0JBQWtCLEVBQUU7Ozs0Q0FFaEMsT0FBTzs7Ozs7OztDQUVqQixDQUFDOztBQUVGLGVBQWMsVUFBVSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNwQyxRQUFRLEdBQVIsUUFBUTtRQUFFLE9BQU8sR0FBUCxPQUFPO3FCQUNYLFVBQVUiLCJmaWxlIjoibGliL2NvbW1hbmRzL2ZpbmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgZXJyb3JzIH0gZnJvbSAnbW9iaWxlLWpzb24td2lyZS1wcm90b2NvbCc7XG5cblxubGV0IGNvbW1hbmRzID0ge30sIGhlbHBlcnMgPSB7fSwgZXh0ZW5zaW9ucyA9IHt9O1xuXG4vLyBzdGF0ZWd5OiBsb2NhdG9yIHN0cmF0ZWd5XG4vLyBzZWxlY3RvcjogdGhlIGFjdHVhbCBzZWxlY3RvciBmb3IgZmluZGluZyBhbiBlbGVtZW50XG4vLyBtdWx0OiBtdWx0aXBsZSBlbGVtZW50cyBvciBqdXN0IG9uZT9cbi8vIGNvbnRleHQ6IGZpbmRpbmcgYW4gZWxlbWVudCBmcm9tIHRoZSByb290IGNvbnRleHQ/IG9yIHN0YXJ0aW5nIGZyb20gYW5vdGhlciBlbGVtZW50XG5oZWxwZXJzLmZpbmRFbE9yRWxzID0gYXN5bmMgZnVuY3Rpb24gKHN0cmF0ZWd5LCBzZWxlY3RvciwgbXVsdCwgY29udGV4dCA9ICcnKSB7XG4gIC8vIHRocm93cyBlcnJvciBpZiBub3QgdmFsaWQsIHVzZXMgdGhpcy5sb2NhdG9yU3RyYXRlZ2llc1xuICB0aGlzLnZhbGlkYXRlTG9jYXRvclN0cmF0ZWd5KHN0cmF0ZWd5KTtcblxuICBpZiAoIXNlbGVjdG9yKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTXVzdCBwcm92aWRlIGEgc2VsZWN0b3Igd2hlbiBmaW5kaW5nIGVsZW1lbnRzXCIpO1xuICB9XG5cbiAgbGV0IHBhcmFtcyA9IHtcbiAgICBzdHJhdGVneSxcbiAgICBzZWxlY3RvcixcbiAgICBjb250ZXh0LFxuICAgIG11bHRpcGxlOiBtdWx0XG4gIH07XG5cbiAgbGV0IGVsZW1lbnQ7XG4gIGxldCBkb0ZpbmQgPSBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGVsZW1lbnQgPSBhd2FpdCB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKCdmaW5kJywgcGFyYW1zKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGlmIChlcnIubWVzc2FnZSAmJiBlcnIubWVzc2FnZS5tYXRjaCgvQW4gZWxlbWVudCBjb3VsZCBub3QgYmUgbG9jYXRlZC8pKSB7XG4gICAgICAgIC8vIHdlIGFyZSBmaW5lIHdpdGggdGhpcywganVzdCBpbmRpY2F0ZSBhIHJldHJ5XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHRocm93IGVycjtcbiAgICB9XG5cbiAgICAvLyB3ZSB3YW50IHRvIHJldHVybiBmYWxzZSBpZiB3ZSB3YW50IHRvIHBvdGVudGlhbGx5IHRyeSBhZ2FpblxuICAgIGlmIChtdWx0KSB7XG4gICAgICByZXR1cm4gZWxlbWVudCAmJiBlbGVtZW50Lmxlbmd0aCAhPT0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICFfLmlzTnVsbChlbGVtZW50KTtcbiAgICB9XG4gIH07XG5cbiAgdHJ5IHtcbiAgICBhd2FpdCB0aGlzLmltcGxpY2l0V2FpdEZvckNvbmRpdGlvbihkb0ZpbmQpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBpZiAoZXJyLm1lc3NhZ2UgJiYgZXJyLm1lc3NhZ2UubWF0Y2goL0NvbmRpdGlvbiB1bm1ldC8pKXtcbiAgICAgIC8vIG9ubHkgZ2V0IGhlcmUgaWYgd2UgYXJlIGxvb2tpbmcgZm9yIG11bHRpcGxlIGVsZW1lbnRzXG4gICAgICAvLyBjb25kaXRpb24gd2FzIG5vdCBtZXQgc2V0dGluZyByZXMgdG8gZW1wdHkgYXJyYXlcbiAgICAgIGVsZW1lbnQgPSBbXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgfVxuXG4gIGlmIChtdWx0KSB7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH0gZWxzZSB7XG4gICAgaWYgKCFlbGVtZW50IHx8IF8uc2l6ZShlbGVtZW50KSA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IGVycm9ycy5Ob1N1Y2hFbGVtZW50RXJyb3IoKTtcbiAgICB9XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cbn07XG5cbk9iamVjdC5hc3NpZ24oZXh0ZW5zaW9ucywgY29tbWFuZHMsIGhlbHBlcnMpO1xuZXhwb3J0IHsgY29tbWFuZHMsIGhlbHBlcnMgfTtcbmV4cG9ydCBkZWZhdWx0IGV4dGVuc2lvbnM7XG4iXX0=