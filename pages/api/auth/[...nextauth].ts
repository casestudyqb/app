import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import prisma from '../../../lib/prisma'


const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
  site: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  // pages: {
  //   signIn: '/auth/signin',
  //   signOut: '/auth/signout',
  //   error: '/auth/error', // Error code passed in query string as ?error=
  //   verifyRequest: '/auth/verify-request', // (used for check email message)
  //   newUser: null // If set, new users will be directed here on first sign in
  // },
  providers: [
      Providers.Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      })
    // Providers.Email({
    //   server: {
    //     host: process.env.SMTP_HOST,
    //     port: Number(process.env.SMTP_PORT),
    //     auth: {
    //       user: process.env.SMTP_USER,
    //       pass: process.env.SMTP_PASSWORD,
    //     },
    //   },
    //   from: process.env.SMTP_FROM,
    // }),
    // Providers.Credentials({
    //   // The name to display on the sign in form (e.g. 'Sign in with...')
    //   name: 'Credentials',
    //   // The credentials is used to generate a suitable form on the sign in page.
    //   // You can specify whatever fields you are expecting to be submitted.
    //   // e.g. domain, username, password, 2FA token, etc.
    //   credentials: {
    //     username: { label: "Username", type: "text", placeholder: "" },
    //     password: {  label: "Password", type: "password" }
    //   },
    //   async authorize(credentials) {
    //     // Add logic here to look up the user from the credentials supplied
    //     const user = { id: 1, name: 'J Smith', email: 'adrianpn@gmail.com' }
  
    //     if (user) {
    //       // Any object returned will be saved in `user` property of the JWT
    //       return user
    //     } else {
    //       // If you return null or false then the credentials will be rejected
    //       return null
    //       // You can also Reject this callback with an Error or with a URL:
    //       // throw new Error('error message') // Redirect to error page
    //       // throw '/path/to/redirect'        // Redirect to a URL
    //     }
    //   }
    // })
  ],
  adapter: Adapters.Prisma.Adapter({ prisma })
  // secret: process.env.SECRET,
};
