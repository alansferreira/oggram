FROM node:16-alpine

WORKDIR /app

COPY dist/ package.json package-lock.json ./
RUN npm i 

RUN echo "#!/bin/sh" >> ./entrypoint.sh
RUN echo "node main.js" >> ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

ENTRYPOINT [ "./entrypoint.sh" ] 
