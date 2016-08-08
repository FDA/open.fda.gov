FROM  node:4.4

ADD . /app
WORKDIR /app

EXPOSE 3000
RUN npm install -g gulp@~3.9.1 gulp-stylus@~2.3.1 gatsby@0.10.0
RUN npm install --dev
CMD ["npm","run","dev"]
