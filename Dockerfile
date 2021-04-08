FROM alpine/git
COPY . /data
WORKDIR /data
RUN rm -fR themes/*
RUN git submodule init && git submodule update

##

FROM klakegg/hugo:ext-alpine
COPY --from=0 /data /data
WORKDIR /data
RUN hugo

##

FROM nginx:alpine
COPY --from=1 /data/public /usr/share/nginx/html

