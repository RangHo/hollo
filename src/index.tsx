import "./logging";
import { join, relative } from "node:path";
import { federation } from "@fedify/fedify/x/hono";
import { serveStatic } from "@hono/node-server/serve-static";
import { captureException } from "@sentry/core";
import { Hono } from "hono";

import api from "./api";
import fedi from "./federation";
import image from "./image";
import oauth, { oauthAuthorizationServer } from "./oauth";
import pages from "./pages";
import { DRIVE_DISK, FS_STORAGE_PATH } from "./storage";

const app = new Hono();

app.onError((err, _) => {
  captureException(err);
  throw err;
});

if (DRIVE_DISK === "fs") {
  app.use(
    "/assets/*",
    serveStatic({
      root: relative(process.cwd(), FS_STORAGE_PATH!),
      rewriteRequestPath: (path) => path.substring("/assets".length),
    }),
  );
}

app.use(
  "/public/*",
  serveStatic({
    root: relative(process.cwd(), join(import.meta.dirname, "public")),
    rewriteRequestPath: (path) => path.substring("/public".length),
  }),
);

app.use(federation(fedi, (_) => undefined));
app.route("/", pages);
app.route("/oauth", oauth);
app.get("/.well-known/oauth-authorization-server", oauthAuthorizationServer);
app.route("/api", api);
app.route("/image", image);
app.get("/nodeinfo/2.0", (c) => c.redirect("/nodeinfo/2.1"));

export default app;
