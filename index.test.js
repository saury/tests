const TemperatureConsole = require('./index');

describe('Test For Temperature Console Programme', () => {
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
});
