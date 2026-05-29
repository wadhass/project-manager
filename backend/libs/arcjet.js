import arcjet, {
  detectBot,
  shield,
  tokenBucket,
  validateEmail,
} from "@arcjet/node";

const arcjetKey = process.env.ARCJET_KEY?.trim();
const arcjetMode = process.env.ARCJET_ENV === "development" ? "DRY_RUN" : "LIVE";
const isArcjetKeyValid =
  arcjetKey && arcjetKey !== "your arcjet site key" && arcjetKey !== "YOUR_ARCJET_SITE_KEY";

let aj;

if (isArcjetKeyValid) {
  aj = arcjet({
    key: arcjetKey,
    characteristics: ["ip.src"],
    rules: [
      shield({ mode: arcjetMode }),
      detectBot({
        mode: arcjetMode,
        allow: ["CATEGORY:SEARCH_ENGINE"],
      }),
      validateEmail({
        mode: arcjetMode,
        deny: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
      }),
      tokenBucket({
        mode: arcjetMode,
        refillRate: 5,
        interval: 10,
        capacity: 10,
      }),
    ],
  });
} else {
  console.warn(
    "[Arcjet] ARCJET_KEY is missing. Arcjet protection is disabled for local development."
  );
  aj = {
    protect: async () => ({ isDenied: () => false }),
  };
}

export default aj;
