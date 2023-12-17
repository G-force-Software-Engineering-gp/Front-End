import { createJestConfig } from '@craco/craco';
import cracoConfig from './craco.config';

// const cracoConfig = require('./craco.config.js');
const jestConfig = createJestConfig(cracoConfig);

export default jestConfig;
