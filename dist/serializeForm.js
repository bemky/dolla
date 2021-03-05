"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = serializeForm;

function serializeForm(form) {
  var formData = {};

  for (var pair of new FormData(form).entries()) {
    formData[pair[0]] = pair[1];
  }

  return formData;
}