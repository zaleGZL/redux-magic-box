"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "createStore", {
  enumerable: true,
  get: function get() {
    return _createStore.default;
  }
});
Object.defineProperty(exports, "createDispatcher", {
  enumerable: true,
  get: function get() {
    return _createDispatcher.default;
  }
});
Object.defineProperty(exports, "actionCreator", {
  enumerable: true,
  get: function get() {
    return _createDispatcher.actionCreator;
  }
});

require("regenerator-runtime/runtime");

var _createStore = _interopRequireDefault(require("./createStore"));

var _createDispatcher = _interopRequireWildcard(require("./createDispatcher"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }