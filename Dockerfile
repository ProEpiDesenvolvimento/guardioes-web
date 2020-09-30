# Pull official base image
FROM node:13.12.0-alpine

# Set working directory
WORKDIR /myapp

# Add `/app/node_modules/.bin` to $PATH
ENV PATH /myapp/node_modules/.bin:$PATH

# Copy all files to docker container
COPY . ./

# Install app dependencies
RUN npm install
RUN npm install react-scripts@3.4.1 -g
RUN npm install serve

# Load app into container

RUN npm run-script build

# Start app
CMD ["serve", "-s", "build"]