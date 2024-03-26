import crypto from "crypto"; // built into bun

import { Context, Next } from '@colstonjs/core';

export const requestID = (ctx: Context, next: Next) => {
  ctx.req.id = ctx.req.id || crypto.randomBytes(18).toString('hex');
  ctx.setHeader('X-Request-ID', ctx.req.id);
  next();
}
