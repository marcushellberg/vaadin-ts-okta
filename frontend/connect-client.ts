import {
  MiddlewareContext,
  MiddlewareNext,
  ConnectClient,
} from "@vaadin/flow-frontend/Connect";
import { getAccessToken } from "./auth";

const client = new ConnectClient({
  prefix: "connect",
  middlewares: [
    // TODO: what to do when the backend requires an access token, but none is available?
    // TODO: what to do when the backend rejects the provided access token?
    async function addAuthHeaderMiddleware(
      context: MiddlewareContext,
      next: MiddlewareNext
    ) {
      const token = await getAccessToken();
      if (token && token.expiresAt > new Date().getTime() / 1000) {
        context.request.headers.set(
          "Authorization",
          `Bearer ${token.accessToken}`
        );
      }
      return next(context);
    },
  ],
});
export default client;
