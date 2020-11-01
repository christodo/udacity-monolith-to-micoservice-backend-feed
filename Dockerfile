FROM node:10-alpine

RUN mkdir -p /home/node/app/node_modules && \
mkdir -p /home/node/app/tmp && \
chown -R 1000:1000 /home/node/app && \
chown -R 1000:1000 /home/node/app/tmp

WORKDIR /home/node/app

COPY package*.json ./
RUN npm set cache .npm
RUN npm ci --only=production

RUN adduser -D 1000
USER 1000

COPY --chown=1000:1000 . .

EXPOSE 8080
CMD [ "npm", "start"]
