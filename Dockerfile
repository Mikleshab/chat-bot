###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:22.1.0-alpine As development
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
RUN npm ci
COPY --chown=node:node . .
USER node
EXPOSE 3000
CMD ["npm", "run", "start:dev"]

###################
# BUILD FOR PRODUCTION
###################

FROM node:22.1.0-alpine As build
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .
RUN npm run build
ENV NODE_ENV production
RUN npm ci --only=production && npm cache clean --force
USER node

###################
# PRODUCTION
###################

FROM node:22.1.0-alpine As production
WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/main.js"]
