import type {NextAuthOptions} from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials';
export const authOptions: NextAuthOptions = {
    //customize authentiaction pages
    pages: {
        signIn:'/login',//redirect users to login when signing in
    },
    session: {
        strategy:'jwt', //use json tokens for session management
    },
    secret:process.env.NEXT_PUBLIC_SECRET,
    //configure auth providers

    providers: [
        //configure google auth provider with env variables
      GoogleProvider ({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET as string,
      }),
      GitHubProvider({
        clientId: process.env.GITHUB_CLIENT_ID as string,
        clientSecret:process.env.GITHUB_CLIENT_SECRET as string,
      }),
      CredentialsProvider({
        name:"sign in",
        credentials: {
          email: {
            label:"Email",
            type:"email",
            placeholder:"example@example.com",

          },
          password:{
            label:"Password",type:"password",
          },
        },
        async authorize(credentials) {
          if(!credentials || ! credentials.email || ! credentials.password)
            return null;
        
          // const dbUser = aiwat find where email equals to that
          //if db and password
          return credentials
        }

      })
      //CREDINTIALS PROVIDER({}), //INCLUDE CREDENTIALS provider(username/password)
    ],

};