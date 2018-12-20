"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createReducers;

var _redux = require("redux");

var _immer = _interopRequireDefault(require("immer"));

var _utils = require("./utils");

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 创建 reducer
 * @param {Array} models model 列表
 */
function createReducers() {
  var models = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  // 已经定义的 namespace
  var existentNamespace = {}; // 根 reducers

  var rootReducers = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function _loop() {
      var model = _step.value;
      var namespace = model.namespace,
          _model$reducers = model.reducers,
          reducers = _model$reducers === void 0 ? {} : _model$reducers,
          _model$state = model.state,
          modelInitState = _model$state === void 0 ? null : _model$state; // 该 model 的 reducers

      var modelReducers = {}; // 检测 namespace 是否有定义

      if (!namespace) {
        throw new Error('namespace 未定义或为空字符串.');
      } // 检测 namespace 是否重复定义(必须全局唯一)


      if (existentNamespace[namespace]) {
        throw new Error("namespace: ".concat(namespace, " \u91CD\u590D\u5B9A\u4E49."));
      } // 检查 reducers 类型


      if (!(0, _utils.isType)(reducers, 'Object')) {
        throw new Error("reducers \u6570\u636E\u7C7B\u578B\u5FC5\u987B\u4E3A\u5BF9\u8C61.");
      } // 获取定义的 reducer


      Object.keys(reducers).forEach(function (name) {
        var reducerName = "".concat(namespace).concat(_constants.NAMESPACE_SEP).concat(name);
        modelReducers[reducerName] = reducers[name];
      }); // 生成该 model 的 根 reducer

      var modelRootReducer = function modelRootReducer() {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : modelInitState;
        var action = arguments.length > 1 ? arguments[1] : undefined;
        return (0, _immer.default)(state, function (draft) {
          var caseReducer = modelReducers[action.type];

          if (caseReducer) {
            return caseReducer(draft, action);
          }

          return draft;
        });
      };

      rootReducers[namespace] = modelRootReducer;
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

  return (0, _redux.combineReducers)(rootReducers);
}