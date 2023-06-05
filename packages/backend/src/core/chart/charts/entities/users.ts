import Chart from '../../core.js';

import { chartsSchemas } from 'misskey-js/built/schemas/charts.js';
export const name = 'users';
export const schema = chartsSchemas[name];

export const entity = Chart.schemaToEntity(name, schema);
