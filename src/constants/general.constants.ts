export const config = {
  AUTH0_DOMAIN: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
  AUTH0_CLIENT_ID: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
  AUTH0_REDIRECT_URI:
    process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URI ||
    (typeof document !== "undefined" && document.location.origin) ||
    undefined,
  MOJITO_API_URL: process.env.NEXT_PUBLIC_MOJITO_API_URL,
  SYNC_REGISTRATION_URL: process.env.NEXT_PUBLIC_SYNC_REGISTRATION_URL,
  CUSTOMER_AUDIENCE: process.env.NEXT_PUBLIC_CUSTOMER_AUDIENCE,
  CUSTOMER_SCOPE: process.env.NEXT_PUBLIC_CUSTOMER_SCOPE,
  ORGANIZATION_ID:
    process.env.NEXT_PUBLIC_API_ORGANIZATION_ID ||
    "8fb128bd-f55d-4bcc-8b6c-0beb684e4d4e",
  MARKETPLACE_ID:
    process.env.NEXT_PUBLIC_MARKETPLACE_ID ||
    "c5ac4f84-b78b-4cb7-a24f-7f0c38da0eb2",
  ETH_VALUE_MULTIPLIER:
  parseInt(process.env.NEXT_PUBLIC_ETH_VALUE_MULTIPLIER!),
};
