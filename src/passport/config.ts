import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { PrismaClient, User } from "@prisma/client";
var session = require("express-session");

const prisma = new PrismaClient();

passport.use(
  new LocalStrategy(async (username, password, cb) => {
    const user = await prisma.user.findFirst({
      where: {
        email: username,
        password: password,
      },
    });
    return cb(null, user ? user : false);
  })
);

passport.serializeUser((user: Partial<User>, cb) => {
  return cb(null, user.id);
});

passport.deserializeUser(async (userId: number, cb) => {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
  return cb(null, user);
});

export const initializePassport = () => {
  return passport.initialize();
};
export const initializePassportSession = () => {
  return passport.session();
};
export const sessionConfig = () => {
  return session({
    secret: "acbjkcvbmfdhshrnfhchsnelxfpdowmsabsgchd",
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true }
  });
};
