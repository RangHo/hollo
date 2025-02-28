import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import {
  type Variables,
  scopeRequired,
  tokenRequired,
} from "../../oauth/middleware";

const app = new Hono<{ Variables: Variables }>();

app.get("/subscription", tokenRequired, scopeRequired(["push"]), async (c) => {
  return c.json({ error: "Not implemented yet" }, 501);
});

app.post(
  "/subscription",
  tokenRequired,
  scopeRequired(["push"]),
  zValidator(
    "form",
    z.object({
      "subscription[endpoint]": z.string(),
      "subscription[keys][p256dh]": z.string(),
      "subscription[keys][auth]": z.string(),
      "data[alerts][mention]": z.enum(["true", "false"]).optional(),
      "data[alerts][status]": z.enum(["true", "false"]).optional(),
      "data[alerts][reblog]": z.enum(["true", "false"]).optional(),
      "data[alerts][follow]": z.enum(["true", "false"]).optional(),
      "data[alerts][follow_request]": z.enum(["true", "false"]).optional(),
      "data[alerts][favourite]": z.enum(["true", "false"]).optional(),
      "data[alerts][poll]": z.enum(["true", "false"]).optional(),
      "data[alerts][update]": z.enum(["true", "false"]).optional(),
      "data[alerts][admin.sign_up]": z.enum(["true", "false"]).optional(),
      "data[alerts][admin.report]": z.enum(["true", "false"]).optional(),
      "data[policy]": z
        .enum(["all", "followed", "follower", "none"])
        .optional(),
    }),
  ),
  async (c) => {
    return c.json({ error: "Not implemented yet" }, 501);
  },
);

app.put(
  "/subscription",
  tokenRequired,
  scopeRequired(["push"]),
  zValidator(
    "form",
    z.object({
      "data[alerts][mention]": z.enum(["true", "false"]).optional(),
      "data[alerts][status]": z.enum(["true", "false"]).optional(),
      "data[alerts][reblog]": z.enum(["true", "false"]).optional(),
      "data[alerts][follow]": z.enum(["true", "false"]).optional(),
      "data[alerts][follow_request]": z.enum(["true", "false"]).optional(),
      "data[alerts][favourite]": z.enum(["true", "false"]).optional(),
      "data[alerts][poll]": z.enum(["true", "false"]).optional(),
      "data[alerts][update]": z.enum(["true", "false"]).optional(),
      "data[alerts][admin.sign_up]": z.enum(["true", "false"]).optional(),
      "data[alerts][admin.report]": z.enum(["true", "false"]).optional(),
      policy: z.enum(["all", "followed", "follower", "none"]).optional(),
    }),
  ),
  async (c) => {
    return c.json({ error: "Not implemented yet" }, 501);
  },
);

app.delete(
  "/subscription",
  tokenRequired,
  scopeRequired(["push"]),
  async (c) => {
    return c.json({ error: "Not implemented yet" }, 501);
  },
);

export default app;
