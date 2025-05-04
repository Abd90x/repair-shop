import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";
import * as Sentry from "@sentry/nextjs";
import type { NeonDbError } from "@neondatabase/serverless";

export const actionClient = createSafeActionClient({
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    });
  },
  handleServerError(error, utils) {
    const { clientInput, metadata } = utils;

    if (error.constructor.name === "NeonDbError") {
      const { code, detail } = error as NeonDbError;

      if (code === "23505") {
        return `Duplicated entry ${detail}`;
      }
    }

    Sentry.captureException(error, (scope) => {
      scope.clear();
      scope.setContext("serverError", {
        message: error.message,
      });
      scope.setContext("metadata", { actionName: metadata?.actionName });
      scope.setContext("clientInput", { clientInput });
      return scope;
    });

    if (error.constructor.name === "NeonDbError") {
      return "Database Error: Your data not save. Suport team will contact you soon.";
    }

    return error.message;
  },
});
