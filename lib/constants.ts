// Website configuration
export const WEBSITE_DOMAIN =
  process.env.NODE_ENV === "production"
    ? "yourwebsite.com" // Replace with your actual domain for production
    : "localhost:3000" // Development domain with port

export const WEBSITE_NAME = "NFC Card" // Replace with your website name

// Protocol (http for localhost, https for production)
export const WEBSITE_PROTOCOL = process.env.NODE_ENV === "production" ? "https" : "http"

// Full website URL
export const WEBSITE_URL = `${WEBSITE_PROTOCOL}://${WEBSITE_DOMAIN}`
