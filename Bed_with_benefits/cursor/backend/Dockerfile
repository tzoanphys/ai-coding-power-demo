FROM node:22

WORKDIR /app

COPY package*.json tsconfig.json prisma ./ 

RUN npm install && npx prisma generate

COPY src ./src

ENV NODE_ENV=production
ENV PORT=4000

RUN npm run build

EXPOSE 4000

CMD ["npm", "run", "start"]

