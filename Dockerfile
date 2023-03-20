FROM node:18.15

WORKDIR /app

COPY package*.json .

RUN npm install

RUN npm install --save-dev -g nodemon

# RUN npm install -g express
# RUN npm install --save-dev @babel/core @babel/cli
# RUN npm install @babel/preset-env --save-dev
# RUN npm install @babel/core @babel/node --save-dev
# RUN npm install -g morgan
# RUN npm install -g pug
# RUN npm install -g mongoose
# RUN npm install -g bcrypt
# RUN npm install -g express-session
# RUN npm install -g connect-mongo
# RUN npm install -g dotenv

COPY . .

# CMD [ "npm", "start" ]
CMD [ "npm", "run", "dev" ]

EXPOSE 3000
