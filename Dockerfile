FROM node:7.10

ARG NPM_TOKEN  
COPY package.json /usr/src/app/
COPY .npmrc /usr/src/app/

WORKDIR /usr/src/app

RUN npm install --production
COPY . /usr/src/app
RUN rm -f /usr/src/app/.npmrc

EXPOSE 7090
CMD [ "npm", "start" ]
