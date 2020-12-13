import { Deta } from 'deta';
const deta = Deta(process.env.DETA_KEY!);
export const db = deta.Base('humans');
export const auth = deta.Base('auth');
