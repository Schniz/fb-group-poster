FROM vvoyer/docker-selenium-firefox-chrome
RUN mkdir /app
WORKDIR /app
ADD package.json /app/
RUN npm install
ADD . /app/
ENTRYPOINT ["sh", "start.sh"]
ENV PORT 80
EXPOSE 80
