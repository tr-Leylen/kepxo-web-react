FROM node:21.2.0 AS build
WORKDIR /app

COPY package.json /app/
RUN npm install --force --silent

COPY ./ /app/

ARG VITE_BASE_URL
ENV VITE_BASE_URL $VITE_BASE_URL

ARG NODE_OPTIONS=--max-old-space-size=4096
RUN npm run build

FROM nginx:1.23.3
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
CMD ["nginx", "-g","daemon off;"]
