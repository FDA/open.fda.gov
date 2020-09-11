FROM  node:6

ADD . /app
WORKDIR /app

EXPOSE 3000
RUN rm -rf css/ node_modules/
RUN npm i
RUN npm run dev:css
CMD ["npm","run","dev:site"]
