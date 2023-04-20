FROM node:19-bullseye-slim
RUN apt update -y
RUN apt install git -y
RUN git clone https://github.com/Kruceo/ChatRGB.git /chatrgb
WORKDIR /chatrgb
RUN npm i 
ENTRYPOINT [ "node","index.mjs","-cp","/tmp/chatrgb" ]
