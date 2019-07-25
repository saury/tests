const prompts = require('prompts');
const Thermometer = require('./thermometer');

const onCancel = () => {
  process.exit(0);
};

async function init() {
  return await prompts(
    [
      {
        type: 'text',
        name: 'freeze',
        initial: '0',
        message: 'Set freezing threshold to the thermometer'
      },
      {
        type: 'text',
        name: 'boil',
        initial: '100',
        message: 'Set boiling threshold to the thermometer'
      },
      {
        type: 'text',
        name: 'fluctuation',
        initial: '0.5',
        message: 'Set fluctuation value to the thermometer'
      }
    ],
    { onCancel }
  );
}

async function inputVal(thermometer) {
  const input = await prompts(
    {
      type: 'text',
      name: 'value',
      initial: '4.0 1.0 0.5 0.0 -0.5 0.0 0.5 0.0 -2.0 0.0 0.5 0.6 2.0',
      message: 'Input your value, separate them by using whitespace!'
    },
    { onCancel }
  );
  const result = thermometer.console(input.value);
  console.log(result);
  await inputVal(thermometer);
}

(async () => {
  const initData = await init();
  const thermometer = new Thermometer(initData);
  await inputVal(thermometer);
})();
