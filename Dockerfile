FROM node:19-bullseye-slim

WORKDIR /chatrgb

COPY src src

COPY index.mjs index.mjs

COPY package.json package.json

run apt update && apt install git -y 

RUN npm i

ENV GENAI_TOKEN=PUT_YOUR_GEN_AI_TOKEN
ENV DISC_TOKEN=PUT_YOUR_BOT_TOKEN

ENTRYPOINT [ "node" ,"index.mjs" ]
