# Okta authentication in a Vaadin TS app

This example app shows you how to add Okta authentication to a client-side Vaadin app.

## Setup

- Spring Boot
- Vaadin 17
- TypeScript-based LitElement views
- Okta Auth JS
- Okta Spring Boot

## Pre-requisites

You need a https://developer.okta.com account and set up a Web app and a user for it.

## How it works

### Back end

**`pom.xml`** Vaadin Spring Boot starter with the following added dependencies:

- spring-security-web
- spring-security-config
- spring-security-oauth2-resource-server
- okta-spring-boot-starter

**`SecurityConfiguration.java`** disables double csrf for the app as Vaadin handles it internally.

**`application.properties`** contains the okta issuer URL

**`ListEndpoint.java`** is a Vaadin endpoint that exposes a REST endpoint and generates TS interfaces for accessing it in a type-safe manner.
**Note:** Vaadin endpoints require authentication by default unless you opt-out by adding a `@AnonymousAllowed` annotation to the class or metod.

### Front end

**`auth.ts`** contains the [Okta Auth JS](https://github.com/okta/okta-auth-js) configuration. It exposes an API for:

- checking if a user is authenticated
- signing in/out
- handling login redirects
- providing an access token for HTTP requests

**`routes.ts`** defines the application routes and authentication handling.

- an `authGuard` action is used to check if the user is authenticated. If not, the path is saved and the user is redirected to `/login`
- the `/callback` route has an action that parses the response from the auth server and either redirects to the initially requested route or back to login.

**`connect-client.ts`** defines a middleware that adds the access token to all server requests.

**`login-view.ts`** has a login form and calls the `signIn` API that `auth.ts` exposes.
