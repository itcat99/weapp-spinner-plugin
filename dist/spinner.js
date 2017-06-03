"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _default = {
  val: 0,
  max: 999,
  min: 0,
  onChange: function onChange(data) {
    return false;
  }
};

var Spinner = function () {
  function Spinner() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Spinner);

    var pages = getCurrentPages();
    this.page = pages[pages.length - 1];

    this.options = Object.assign({}, _default, options);

    this.data = this.page.data.spinners;
    this.init();
  }

  _createClass(Spinner, [{
    key: "init",
    value: function init() {
      this.judge();
      this.bind();
    }
  }, {
    key: "bind",
    value: function bind() {
      this.page["spinnerMinus"] = this.minus();
      this.page["spinnerPlus"] = this.plus();
      this.page["spinnerInput"] = this.input();
    }
  }, {
    key: "judge",
    value: function judge() {
      this.data.forEach(function (v, i) {
        v.min = v.min === undefined ? 0 : v.min;
        v.max = v.max === undefined ? 999 : v.max;
        v.val = v.val === undefined ? 0 : v.val;
      });

      this.update();
    }
  }, {
    key: "input",
    value: function input() {
      var that = this;

      return function (e) {
        var val = parseInt(e.detail.value);
        var index = that.getIndex(e);
        var data = that.data[index];

        if (val) {
          if (val > data.max) {
            data.val = data.max;
          } else if (val < data.min) {
            data.val = data.min;
          } else {
            data.val = val;
          }

          that.data[index] = data;

          that.update(index);
        }
      };
    }
  }, {
    key: "minus",
    value: function minus() {
      var that = this;
      return function (e) {
        var index = that.getIndex(e);
        var data = that.data[index];

        if (data.val > data.min) {
          data.val--;

          that.data[index] = data;
          that.update(index);
        }
      };
    }
  }, {
    key: "plus",
    value: function plus() {
      var that = this;

      return function (e) {
        var index = that.getIndex(e);
        var data = that.data[index];

        if (data.val < data.max) {
          data.val++;

          that.data[index] = data;
          that.update(index);
        }
      };
    }
  }, {
    key: "update",
    value: function update() {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

      this.page.setData({
        spinners: this.data
      });

      if (index !== undefined) {
        return this.options.onChange(this.data[index]);
      }
    }
  }, {
    key: "getIndex",
    value: function getIndex(e) {
      return e.target.dataset.index;
    }
  }]);

  return Spinner;
}();

module.exports = Spinner;