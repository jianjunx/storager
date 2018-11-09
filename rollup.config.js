import CONFIG from './config/index';


const TARGET = process.env.TARGET;

export default {
  input: 'src/main.js',
  ...CONFIG[TARGET],
};
