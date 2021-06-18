FROM arm32v7/node:14.17-alpine3.13

COPY . .
RUN npm install --only=prod

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG PORT=80
ENV PORT $PORT
EXPOSE $PORT

CMD [ "node", "index.js" ]