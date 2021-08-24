FROM  node:6

ADD . /app
WORKDIR /app

EXPOSE 3000
RUN rm -rf node_modules/
RUN npm i
CMD ["npm","run","dev:site"]
