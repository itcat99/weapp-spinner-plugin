const _default = {
  val: 0,
  max: 999,
  min: 0,
  onChange(data) {
    return false;
  }
}

class Spinner {
  constructor(options = {}) {
    let pages = getCurrentPages();
    this.page = pages[pages.length - 1];

    this.options = Object.assign({}, _default, options);

    this.data = this.page.data.spinners;
    this.init();
  }

  init() {
    this.format();
    this.bind();
  }

  bind() {
    this.page[`spinnerMinus`] = this.minus();
    this.page[`spinnerPlus`] = this.plus();
    this.page[`spinnerInput`] = this.input();
  }

  format() {
    this.data.forEach(v => {
      
      for (let key in v) {
        v[key] = parseInt(v[key], 10);
      }

      v.min = v.min === undefined ? 0 : v.min;
      v.max = v.max === undefined ? 10 : v.max;
      v.val = v.val === undefined ? 0 : v.val;
    });

    this.update();
  }

  input() {
    const that = this;

    return function (e) {
      let val = parseInt(e.detail.value);
      let index = that.getIndex(e);
      let data = that.data[index];

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
    }
  }

  minus() {
    const that = this;
    return function (e) {
      let index = that.getIndex(e);
      let data = that.data[index];

      if (data.val > data.min) {
        data.val--;

        that.data[index] = data;
        that.update(index);
      }
    }
  }

  plus() {
    const that = this;

    return function (e) {
      let index = that.getIndex(e);
      let data = that.data[index];

      if (data.val < data.max) {
        data.val++;

        that.data[index] = data;
        that.update(index);
      }
    }
  }

  update(index = undefined) {
    this.page.setData({
      spinners: this.data
    });

    if (index !== undefined) {
      return this.options.onChange(this.data[index]);
    }
  }

  getIndex(e) {
    return e.target.dataset.index;
  }

}

module.exports = Spinner;