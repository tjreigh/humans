import { Deta } from 'deta';
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const deta = Deta('b0dcgc1n_h4o5BBoSgPUg2QCNCiQUrVfukEW9N1NQ');
export const db = deta.Base('humans');
