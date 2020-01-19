FROM alpine
WORKDIR /app
COPY . /app
RUN apk add nodejs 
RUN apk add --update npm
RUN apk --no-cache add --virtual builds-deps build-base python
RUN npm config set python /usr/bin/python

RUN npm i -g npm
RUN npm install
RUN npm --build-from-source install bcrypt
RUN npm rebuild bcrypt --build-from-source
RUN apk del builds-deps

EXPOSE 3001
ENTRYPOINT ["npm"]
CMD ["start"]
