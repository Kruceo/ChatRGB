FROM node:alpine3.10

RUN mkdir /ChatRGB

COPY . /ChatRGB

WORKDIR /ChatRGB/

ENTRYPOINT [ "node","/ChatRGB/index.mjs" ]


