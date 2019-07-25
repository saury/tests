class TemperatureAlert {
  constructor(inputData) {
    const initData = this.verifiedData(inputData);
    const data = {
      freeze: 0,
      boil: 100,
      fluctuation: 0.5,
      ...initData
    };
    this.freeze = data.freeze;
    this.boil = data.boil;
    this.fluctuation = data.fluctuation;
    this.status = 'normal';
  }

  verifiedData(initData) {
    const result = {};
    for (const key in initData) {
      const item = initData[key];
      if (isFinite(item)) {
        result[key] = Number(item);
      }
    }
    return result;
  }

  console(input) {
    const inputs = input.split(' ');
    return inputs
      .reduce((acc, input) => {
        acc.push(input);
        this.unBoilAlert(input, acc);
        this.unfreezeAlert(input, acc);
        this.boilAlert(input, acc);
        this.freezeAlert(input, acc);
        return acc;
      }, [])
      .join(' ');
  }

  freezeAlert(input, acc) {
    if (Number(input) <= this.freeze && this.status !== 'freezing') {
      acc.push('freezing');
      this.status = 'freezing';
    }
  }

  boilAlert(input, acc) {
    if (Number(input) >= this.boil && this.status !== 'boiling') {
      acc.push('boiling');
      this.status = 'boiling';
    }
  }

  unfreezeAlert(input, acc) {
    if (
      Number(input) > this.freeze + this.fluctuation &&
      this.status === 'freezing'
    ) {
      acc.push('unfreezing');
      this.status = 'normal';
    }
  }

  unBoilAlert(input, acc) {
    if (
      Number(input) < this.boil - this.fluctuation &&
      this.status === 'boiling'
    ) {
      acc.push('unboiling');
      this.status = 'normal';
    }
  }
}

module.exports = TemperatureAlert;
