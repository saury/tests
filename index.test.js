const TemperatureConsole = require('./index');

describe('Test For Temperature Console Programme', () => {
  function alertResult(input) {
    const tempConsole = new TemperatureConsole();
    const result = tempConsole.alert(input);
    return result;
  }

  it('should have default startup val', () => {
    const tempConsole = new TemperatureConsole();
    expect(tempConsole.freeze).toBe(0);
    expect(tempConsole.boil).toBe(100);
    expect(tempConsole.fluctuation).toBe(0.5);
  });
  it('should have a properly working constructor', () => {
    const tempConsole = new TemperatureConsole({
      freeze: 1,
      boil: 99,
      fluctuation: 2
    });
    expect(tempConsole.freeze).toBe(1);
    expect(tempConsole.boil).toBe(99);
    expect(tempConsole.fluctuation).toBe(2);
  });
  it('should set to default if startup val input is not an object', () => {
    const tempConsole = new TemperatureConsole('test');
    expect(tempConsole.freeze).toBe(0);
    expect(tempConsole.boil).toBe(100);
    expect(tempConsole.fluctuation).toBe(0.5);
  });
  it('should set to default if startup val input is not valid', () => {
    const tempConsole = new TemperatureConsole({
      freeze: 'not valid',
      boil: Infinity,
      fluctuation: '0.8'
    });
    expect(tempConsole.freeze).toBe(0);
    expect(tempConsole.boil).toBe(100);
    expect(tempConsole.fluctuation).toBe(0.8);
  });
  it('should echo the within-range input value after calling alert fn', () => {
    expect(alertResult('4.0')).toBe('4.0');
  });
  it('should echo the within-range input value repeatably by calling alert fn', () => {
    expect(alertResult('4.0 3.0 1.0 99.0')).toBe('4.0 3.0 1.0 99.0');
  });
  it('should echo freezing alert if input val <= freeze threshold', () => {
    expect(alertResult('-0.0')).toBe('-0.0 freezing');
  });
  it('should echo unfreezing alert if input val > freeze threshold + fluctuation val after triggering a freezing status', () => {
    expect(
      alertResult('4.0 1.0 0.5 0.0 -0.5 0.0 0.5 0.0 -2.0 0.0 0.5 0.6 2.0')
    ).toBe(
      '4.0 1.0 0.5 0.0 freezing -0.5 0.0 0.5 0.0 -2.0 0.0 0.5 0.6 unfreezing 2.0'
    );
  });
  it('should echo boling alert if input val >= boiling threshold', () => {
    expect(alertResult('5.0 -0.5 0.5 -0.2 100 101')).toBe(
      '5.0 -0.5 freezing 0.5 -0.2 100 unfreezing boiling 101'
    );
  });
  it('should echo unboiling alert if input val < boiling threshold - fluctuation val after triggering a boiling status', () => {
    expect(alertResult('100 101 99.5 -1 1')).toBe(
      '100 boiling 101 99.5 -1 unboiling freezing 1 unfreezing'
    );
  });
});
