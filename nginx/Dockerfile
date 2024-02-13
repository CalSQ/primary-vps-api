FROM nginx:1.21.6
EXPOSE 80
EXPOSE 443
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf