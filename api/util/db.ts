import { Deta } from 'deta';
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const deta = Deta(process.env.DETA_KEY!);
export const db = deta.Base('humans');
