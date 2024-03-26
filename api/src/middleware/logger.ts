import { Context, Next } from '@colstonjs/core';

export const logger = (ctx: Context, next: Next) => {
  const { pathname } = new URL(ctx.req.originalUrl);
  console.info("- - " + [new Date()], "- - " + ctx.req.method + " " + pathname + " HTTP 1.1" + " - ");
  next();
}
