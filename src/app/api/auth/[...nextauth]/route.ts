import bcrypt from "bcrypt"
import NextAuth, { AuthOptions,DefaultSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

import prisma from "@/app/libs/prisma"
import { NextResponse } from "next/server"

// 扩展 DefaultSession 用户类型
declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      userId: string | null;
    };
  }
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new NextResponse('用户不存在', { status: 401 });
        }

        const user:any = await prisma.user.findFirst({
          where: {
            username: credentials.username
          }
        });

        if (!user) {
          throw new NextResponse('用户不存在', { status: 401 });
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isCorrectPassword) {
          throw new NextResponse('用户名或密码错误', { status: 401 });
        }

        return user;
      }
    })
  ],
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.userId = user?.id
      }
      return token
    },
    session: async ({ session, token }) => {
      if (token && session.user) {
        session.user.userId = token.userId as string
      }
      if (session.user && !token) {
        session.user.userId = null
      }
      return session
    }
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
