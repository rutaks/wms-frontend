# Two-stage build approach
FROM node:14.15.0 as build

# Set working directory
WORKDIR /app

# Copy everything to the container
COPY . .

# Install dependencies
RUN yarn install

# Check what scripts are available and what binaries exist
RUN echo "Available scripts:" && \
    cat package.json | grep -A 20 "\"scripts\"" && \
    echo "\nBinary location check:" && \
    ls -la node_modules/.bin/

# Set environment variables
ARG REACT_APP_BASE_URL_BACKEND
ARG REACT_APP_GOOGLE_MAP_KEY
ENV REACT_APP_BASE_URL_BACKEND=$REACT_APP_BASE_URL_BACKEND
ENV REACT_APP_GOOGLE_MAP_KEY=$REACT_APP_GOOGLE_MAP_KEY

# Try building using yarn command syntax
RUN yarn craco build || \
    npx craco build || \
    node_modules/.bin/craco build || \
    yarn react-scripts build || \
    npx react-scripts build || \
    node_modules/.bin/react-scripts build

# Nginx stage for serving the app
FROM nginx:alpine

# Copy the build output from the React build
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]