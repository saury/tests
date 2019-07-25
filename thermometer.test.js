const Thermometer = require('./thermometer');

describe('Test For Thermometer Class', () => {
  function constructorHelper(data) {
    return new Thermometer(data);
  }
  function consoleHelper(input) {
    const thermometer = new Thermometer();
    const result = thermometer.console(input);
    return result;
  }
  it('should have default startup val', () => {
    const thermometer = constructorHelper();
    expect(thermometer.freeze).toBe(0);
    expect(thermometer.boil).toBe(100);
    expect(thermometer.fluctuation).toBe(0.5);
  });
  it('should have a properly working constructor', () => {
    const thermometer = constructorHelper({
      freeze: 1,
      boil: 99,
      fluctuation: 2
    });
    expect(thermometer.freeze).toBe(1);
    expect(thermometer.boil).toBe(99);
    expect(thermometer.fluctuation).toBe(2);
  });
  it('should set to default if startup val input is not an object', () => {
    const thermometer = constructorHelper('test');
    expect(thermometer.freeze).toBe(0);
    expect(thermometer.boil).toBe(100);
    expect(thermometer.fluctuation).toBe(0.5);
  });
  it('should set to default if startup val input is not valid', () => {
    const thermometer = constructorHelper({
      freeze: 'not valid',
      boil: Infinity,
      fluctuation: '0.8'
    });
    expect(thermometer.freeze).toBe(0);
    expect(thermometer.boil).toBe(100);
    expect(thermometer.fluctuation).toBe(0.8);
  });
  it('should console the within-range input value after calling alert fn', () => {
    expect(consoleHelper('4.0')).toBe('4.0');
  });
  it('should console the within-range input value repeatably by calling alert fn', () => {
    expect(consoleHelper('4.0 3.0 1.0 99.0')).toBe('4.0 3.0 1.0 99.0');
  });
  it('should console freezing alert if input val <= freeze threshold', () => {
    expect(consoleHelper('-0.0')).toBe('-0.0 freezing');
  });
  it('should console unfreezing alert if input val > freeze threshold + fluctuation val after triggering a freezing status', () => {
    expect(
      consoleHelper('4.0 1.0 0.5 0.0 -0.5 0.0 0.5 0.0 -2.0 0.0 0.5 0.6 2.0')
    ).toBe(
      '4.0 1.0 0.5 0.0 freezing -0.5 0.0 0.5 0.0 -2.0 0.0 0.5 0.6 unfreezing 2.0'
    );
  });
  it('should console boling alert if input val >= boiling threshold', () => {
    expect(consoleHelper('5.0 -0.5 0.5 -0.2 100 101')).toBe(
      '5.0 -0.5 freezing 0.5 -0.2 100 unfreezing boiling 101'
    );
  });
  it('should console unboiling alert if input val < boiling threshold - fluctuation val after triggering a boiling status', () => {
    expect(consoleHelper('100 101 99.5 -1 1')).toBe(
      '100 boiling 101 99.5 -1 unboiling freezing 1 unfreezing'
    );
  });
});
