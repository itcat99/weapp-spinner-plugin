var Spinner = require('../../spinner/spinner');

var app = getApp();

Page({
  data: {
    spinners: [{
      index: "0",
      min: 0,
      max: 20,
      val: 10
    }, {
      index: "01",
      min: 100,
      max: 200,
      val: 111
    }, {
      index: "02",
      min: -10,
      max: 10,
      val: 1
    }],
    viewInfo: []
  },
  onLoad: function () {
    new Spinner({
      onChange: this.spinnerChange
    });
  },
  spinnerChange: function (data) {
    let viewInfo = this.data.viewInfo;
    let length = viewInfo.length;

    viewInfo[length] = data;
    viewInfo.reverse();

    this.setData({
      viewInfo: viewInfo
    });
  }
})