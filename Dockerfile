FROM node:16-alpine AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/
COPY public ./public/

# Install app dependencies
RUN npm ci --production

COPY . .

RUN npm run build
RUN npx prisma generate


FROM node:16-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public


EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]