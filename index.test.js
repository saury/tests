const TemperatureAlert = require('./index');

describe('Test For Temperature Alert Programme', () => {
  function constructorHelper(data) {
    const tempAlert = new TemperatureAlert(data);
    return tempAlert;
  }
  function consoleHelper(input) {
    const tempAlert = new TemperatureAlert();
    const result = tempAlert.console(input);
    return result;
  }
  it('should have default startup val', () => {
    const tempAlert = constructorHelper();
    expect(tempAlert.freeze).toBe(0);
    expect(tempAlert.boil).toBe(100);
    expect(tempAlert.fluctuation).toBe(0.5);
  });
  it('should have a properly working constructor', () => {
    const tempAlert = constructorHelper({
      freeze: 1,
      boil: 99,
      fluctuation: 2
    });
    expect(tempAlert.freeze).toBe(1);
    expect(tempAlert.boil).toBe(99);
    expect(tempAlert.fluctuation).toBe(2);
  });
  it('should set to default if startup val input is not an object', () => {
    const tempAlert = constructorHelper('test');
    expect(tempAlert.freeze).toBe(0);
    expect(tempAlert.boil).toBe(100);
    expect(tempAlert.fluctuation).toBe(0.5);
  });
  it('should set to default if startup val input is not valid', () => {
    const tempAlert = constructorHelper({
      freeze: 'not valid',
      boil: Infinity,
      fluctuation: '0.8'
    });
    expect(tempAlert.freeze).toBe(0);
    expect(tempAlert.boil).toBe(100);
    expect(tempAlert.fluctuation).toBe(0.8);
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
