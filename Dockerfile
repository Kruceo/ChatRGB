FROM node:19-bullseye-slim
RUN apt update -y
RUN apt install git -y
RUN echo "#!/bin/bash" > start.sh
RUN echo "rm /chatrgb -r" >> start.sh
RUN echo "git clone https://github.com/Kruceo/ChatRGB.git /chatrgb" >> start.sh
RUN echo "cd /chatrgb" >> start.sh
RUN echo "npm i" >> start.sh
RUN echo "node index.mjs -cp /tmp/chatrgb" >> start.sh
ENTRYPOINT [ "/bin/bash" ,"/start.sh" ]
