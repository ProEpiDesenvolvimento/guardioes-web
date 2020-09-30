# Pull official base image
FROM node:13.12.0-alpine

# Set working directory
WORKDIR /myapp

# Add `/app/node_modules/.bin` to $PATH
ENV PATH /myapp/node_modules/.bin:$PATH

# Install app dependencies
COPY package.json ./
COPY package-lock.json ./
COPY node_modules ./
# RUN npm install
# RUN npm install react-scripts@3.4.1 -g

# Load app into container
COPY . ./

# Start app
CMD ["npm", "start"]
