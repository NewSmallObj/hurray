import { ResponseSuccess } from '@/app/api/response/success';
import prisma from '@/app/libs/prisma';
import { NextResponse } from 'next/server';
import bcrypt from "bcrypt"
import getSession from '@/app/actions/getSession';
import NextAuth from "next-auth"
// import { signOut } from 'next-auth/react';

export const DELETE = async (request: Request) => {
  const body = await request.json();
  const {id} = body;
  
  const user = await prisma.user.update({
    where: {
      id: id
    },
    data: {
      deleted: true,
    },
  })
  
  return ResponseSuccess(user)
}