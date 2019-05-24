# this is a comment
FROM ubuntu:14.04
MAINTAINER hkp<414078681@qq.com>
RUN apt-get update
RUN apt-get install -y nginx
RUN echo 'Hello,world'>/usr/share/nginx/html/index.html
RUN service nginx start
EXPOSE 80
