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

  alerts(input) {
    const result = [];
    switch (true) {
      case Number(input) < this.boil - this.fluctuation &&
        this.status === 'boiling':
        result.push('unboiling');
        this.status = 'normal';
        result.push(...this.alerts(input));
        break;
      case Number(input) > this.freeze + this.fluctuation &&
        this.status === 'freezing':
        result.push('unfreezing');
        this.status = 'normal';
        result.push(...this.alerts(input));
        break;
      case Number(input) <= this.freeze && this.status !== 'freezing':
        result.push('freezing');
        this.status = 'freezing';
        break;
      case Number(input) >= this.boil && this.status !== 'boiling':
        result.push('boiling');
        this.status = 'boiling';
        break;
      default:
        break;
    }
    return result;
  }

  console(input) {
    const inputs = input.split(' ');
    return inputs
      .reduce((acc, input) => [...acc, input, ...this.alerts(input)], [])
      .join(' ');
  }
}

module.exports = TemperatureAlert;
