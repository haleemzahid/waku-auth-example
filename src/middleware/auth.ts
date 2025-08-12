import type { Middleware } from "waku/config";
import { auth } from "../auth";
import { getHonoContext } from "waku/unstable_hono";
import { isValidSession } from "../shared/utils";

const authMiddleware: Middleware = () => {
  return async (ctx, next) => {
    try {
      // Get the Hono context which has the actual request
      const c = getHonoContext();
      console.log("Auth middleware running");
      
      // Get session using the raw request from Hono context
      const sessionResult = await auth.api.getSession({
        headers: c.req.raw.headers,
      });
      
      // Use type guard to ensure session is valid
      const session = isValidSession(sessionResult) ? sessionResult : null;
      
      console.log("Session in middleware:", session ? "Valid session found" : "No valid session");
      ctx.data.session = session;
    } catch (error) {
      console.error("Error in auth middleware:", error);
      ctx.data.session = null;
    }
    
    await next();
  };
};

export default authMiddleware;
