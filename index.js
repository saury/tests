class TemperatureConsole {
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
}

module.exports = TemperatureConsole;
