import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from "@utils/database";
import User from "@models/users";


const handler = NextAuth({
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      })
    ],
    callbacks: {
      async session({ session }) {
        // store the user id from MongoDB to session
        const sessionUser = await User.findOne({ email: session.user.email }).then(console.log("Successfully made check."));
        session.user.id = sessionUser._id.toString();
  
        return session;
        
      },
      async signIn({ account, profile, user, credentials }) {
        try {
          await connectToDB();
          console.log("Connected to DB now checking for user in DB");
          // check if user already exists
          const  userExists = await User.findOne({ email: profile.email }).then(console.log("Check Complete"));
  
          // if not, create a new document and save user in MongoDB
          if (!userExists) {
            await User.create({
              email: profile.email,
              username: profile.name.replace(/ /g, "").toLowerCase(),
              image: profile.picture,
            });
          }
  
          return true
        } catch (error) {
          console.log("Error checking if user exists: ", error.message);
          return false
        }
      },
    }
  })
  

export {handler as GET, handler as POST};