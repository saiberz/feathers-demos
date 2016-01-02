FROM node:4.2

WORKDIR /home/feathers
COPY package.json package.json
COPY app/ app/
RUN npm install
CMD ["node", "app/src/app.js"]