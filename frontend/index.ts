import { Commands, Context, Route, Router } from "@vaadin/router";
import "./views/main/main-view";
import "./views/about/about-view";
import { getUserInfo, oktaSignIn } from "./auth";

const authGuard = async (_: Context, commands: Commands) => {
  if (!(await getUserInfo())) {
    return commands.redirect("/login");
  }
  return undefined;
};

const routes: Route[] = [
  {
    path: "/login",
    component: "login-view",
    action: async () => {
      await import(/* webpackChunkName: "login" */ "./views/login/login-view");
    },
  },

  // First log out on the client-side, when destroy the server-side security context.
  // Server-side logging out is handled by Spring Security: it handles HTTP GET requests to
  // /logout and redirects to /login?logout in response.
  {
    path: "/logout",
    action: async (_: Context, commands: Commands) => {
      oktaSignIn.authClient.signOut();
      location.reload();
      return commands.prevent();
    },
  },
  {
    path: "/",
    component: "main-view",
    action: authGuard,
    children: [
      {
        path: "/",
        component: "about-view",
      },
      {
        path: "list",
        component: "list-view",
        action: async () => {
          await import(
            /* webpackChunkName: "list-view" */ "./views/list/list-view"
          );
        },
      },
    ],
  },
];

export const router = new Router(document.querySelector("#outlet"));
router.setRoutes(routes);
