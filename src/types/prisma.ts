import { Prisma } from "@prisma/client";

export type Chat<T extends Prisma.ChatFindManyArgs> = Prisma.ChatGetPayload<T>;

export type Message<T extends Prisma.MessageFindManyArgs> =
  Prisma.MessageGetPayload<T>;

export type User<T extends Prisma.UserFindManyArgs> = Prisma.UserGetPayload<T>;
