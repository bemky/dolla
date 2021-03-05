"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = serializeFormToJSON;

var _serializeForm = _interopRequireDefault(require("./serializeForm"));

var _bury = _interopRequireDefault(require("./bury"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function serializeFormToJSON(form) {
  const formData = (0, _serializeForm.default)(form);
  Object.keys(formData).forEach(key => {
    const keys = key.replace(']', '').split('[');

    if (keys.length > 1) {
      formData[keys.shift()] = (0, _bury.default)({}, ...keys.concat(formData[key]));
      delete formData[key];
    }
  });
  return formData;
}