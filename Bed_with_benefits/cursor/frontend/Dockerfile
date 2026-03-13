FROM node:22

WORKDIR /app

COPY package*.json tsconfig.json vite.config.ts tailwind.config.js postcss.config.js index.html ./
COPY src ./src

RUN npm install

ENV NODE_ENV=development
ENV VITE_PORT=5173

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]