"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createSagas;

var _effects = _interopRequireDefault(require("./effects"));

var _utils = require("./utils");

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 默认 watcher 创建器
 * @param {Function} effect effect 函数
 */
var defaultWatcherCreator = function defaultWatcherCreator(effect) {
  return (
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _effects.default.call(effect, _effects.default);

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    })
  );
};
/**
 * 指定 type 的 watcher 创建器
 * @param {Function} effect effect 函数
 */


var specialTypeWatcherCreator = function specialTypeWatcherCreator(effect) {
  return (
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(action) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _effects.default.call(effect, action, _effects.default);

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    })
  );
};
/**
 * effect watcher 生成器
 * @param {String} namespace model 的命名前缀
 * @param {String} effectName effect 的名称
 * @param {Object} effect effect 函数
 * @param {Object} config watcher 的配置
 * @param {String} config.type watcher 的类型
 * @param {Number} config.throttleTime watcher 类型为 'throttle' 的节流时间
 */


var effectWatcherCreator = function effectWatcherCreator(namespace, effectName, effect) {
  var config = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var pattern = "".concat(namespace).concat(_constants.NAMESPACE_SEP).concat(effectName);
  var throttleTime = config.throttleTime,
      type = config.type;

  switch (type) {
    case 'watcher':
      {
        return defaultWatcherCreator(effect);
      }

    case 'takeLatest':
      {
        return (
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee3() {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.next = 2;
                    return _effects.default.takeLatest(pattern, specialTypeWatcherCreator(effect));

                  case 2:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3, this);
          })
        );
      }

    case 'throttle':
      {
        return (
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee4() {
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.next = 2;
                    return _effects.default.throttle(throttleTime, pattern, specialTypeWatcherCreator(effect));

                  case 2:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4, this);
          })
        );
      }

    case 'takeEvery':
    default:
      {
        return (
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee5() {
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    _context5.next = 2;
                    return _effects.default.takeEvery(pattern, specialTypeWatcherCreator(effect));

                  case 2:
                  case "end":
                    return _context5.stop();
                }
              }
            }, _callee5, this);
          })
        );
      }
  }
};
/**
 * 创建 saga
 * @param {Array} models model 列表
 */


function createSagas() {
  var models = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  // 已经定义的 namespace
  var existentNamespace = {}; // 所有的 saga watchers

  var sagaWatchers = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function _loop() {
      var model = _step.value;
      var namespace = model.namespace,
          _model$effects = model.effects,
          effects = _model$effects === void 0 ? {} : _model$effects; // 检测 namespace 是否有定义

      if (!namespace) {
        throw new Error('namespace 未定义或为空字符串.');
      } // 检测 namespace 是否重复定义(必须全局唯一)


      if (existentNamespace[namespace]) {
        throw new Error("namespace: ".concat(namespace, " \u91CD\u590D\u5B9A\u4E49."));
      } // 检查 effects 类型


      if (!(0, _utils.isType)(effects, 'Object')) {
        throw new Error("effects \u6570\u636E\u7C7B\u578B\u5FC5\u987B\u4E3A\u5BF9\u8C61.");
      } // 设置该 namespace 已存在


      existentNamespace[namespace] = true; // 获取定义的 effect

      Object.keys(effects).forEach(function (effectName) {
        var effect = effects[effectName];
        var effectFunc =
        /*#__PURE__*/
        regeneratorRuntime.mark(function effectFunc() {
          return regeneratorRuntime.wrap(function effectFunc$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                case "end":
                  return _context8.stop();
              }
            }
          }, effectFunc, this);
        }); // effect 函数

        var type = ''; // effect watch 类型

        var throttleTime = 0; // type 为 throttle 的 time 参数

        if ((0, _utils.isType)(effect, 'GeneratorFunction')) {
          effectFunc = effect;
          type = 'takeEvery';
        } else if ((0, _utils.isType)(effect, 'Array') && (0, _utils.isType)(effect[0], 'GeneratorFunction') && (0, _utils.isType)(effect[1], 'Object')) {
          effectFunc = effect[0];
          type = effect[1].type || 'takeEvery';
          throttleTime = effect[1].throttleTime || 0;
        } else {
          throw new Error('effect 的格式为 *(action, effects) => void 或 [*(action, effects) => void, { type }]');
        }

        sagaWatchers.push( // 生成 saga watcher
        effectWatcherCreator(namespace, effectName, effectFunc, {
          type: type,
          throttleTime: throttleTime
        }));
      });
    };

    for (var _iterator = models[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      _loop();
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return (
    /*#__PURE__*/
    regeneratorRuntime.mark(function rootSaga() {
      return regeneratorRuntime.wrap(function rootSaga$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return _effects.default.all(sagaWatchers.map(function (saga) {
                return _effects.default.spawn(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee6() {
                  return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                      switch (_context6.prev = _context6.next) {
                        case 0:
                          if (!true) {
                            _context6.next = 11;
                            break;
                          }

                          _context6.prev = 1;
                          _context6.next = 4;
                          return _effects.default.call(saga);

                        case 4:
                          _context6.next = 9;
                          break;

                        case 6:
                          _context6.prev = 6;
                          _context6.t0 = _context6["catch"](1);
                          console.log(_context6.t0);

                        case 9:
                          _context6.next = 0;
                          break;

                        case 11:
                        case "end":
                          return _context6.stop();
                      }
                    }
                  }, _callee6, this, [[1, 6]]);
                }));
              }));

            case 2:
            case "end":
              return _context7.stop();
          }
        }
      }, rootSaga, this);
    })
  );
}