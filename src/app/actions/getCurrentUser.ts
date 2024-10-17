import prisma from "@/app/libs/prisma";
import getSession from "./getSession";

const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.userId) {
      return null;
    }

    const currentUser = await prisma.user.findFirst({
      where: {
        id: session.user.userId as string
      }
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error: any) {
    return null;
  }
};

export default getCurrentUser;
