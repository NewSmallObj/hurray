import { ResponseSuccess } from '@/app/api/response/success';
import prisma from '@/app/libs/prisma';
import { NextResponse } from 'next/server';
import bcrypt from "bcrypt"
import getSession from '@/app/actions/getSession';
import NextAuth from "next-auth"
// import { signOut } from 'next-auth/react';

export const PUT = async (request: Request) => {
  const body = await request.json();
  const {isLogout,id,disabled} = body;
  
  if(isLogout){
    // clearUserSession()
  }
  
  const user = await prisma.user.update({
    where: {
      id: id
    },
    data: {
      disabled,
    },
  })
  
  return ResponseSuccess(user)
}