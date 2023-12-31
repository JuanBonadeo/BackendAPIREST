import dotenv from 'dotenv'

dotenv.config()

export default {
  port: process.env.PORT,
  environment: process.env.ENVIRONMENT,
  mongoUrl: process.env.MONGO_URL,
  adminName: process.env.ADMIN_NAME,
  adminPassword: process.env.ADMIN_PASSWORD,
  githubClientId: process.env.GH_CLIENT_ID,
  githubClientSecret: process.env.GH_CLIENT_SECRET,
  jwtSecret: process.env.JWT_SECRET,
  jwtResetSecret: process.env.JWT_RESET_SECRET,
  gpass: process.env.GMAIL_PASS
}
