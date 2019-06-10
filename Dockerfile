# Use a lighter version of Node as a parent image
FROM mhart/alpine-node:latest
# Set the working directory to /client
WORKDIR /client
# Copy the current directory contents into the container at /client
COPY . /client/
# install dependencies
RUN yarn install
# Make port 3000 available to the world outside this container
EXPOSE 3000
# Run the app when the container launches
CMD ["yarn", "start"]