FROM openjdk:8-jre-alpine

VOLUME /tmp

ENV SPRING_OUTPUT_ANSI_ENABLED=ALWAYS \
    JHIPSTER_SLEEP=0 \
    JAVA_OPTS="-Duser.timezone=Asia/Shanghai -Djava.io.tmpdir=/tmp/data" \
    DB_ADDRESS="localhost:3306"

ADD *.war /app.war

EXPOSE 8080
CMD echo "The application will start in ${JHIPSTER_SLEEP}s..." && \
    sleep ${JHIPSTER_SLEEP} && \
    java ${JAVA_OPTS} -Djava.security.egd=file:/dev/./urandom -jar /app.war \
    --spring.profiles.active=prod \
    --server.port=8080 \
    --spring.datasource.url="jdbc:mysql://${DB_ADDRESS}/physicalexam?useUnicode=true&characterEncoding=utf8&useSSL=false" \
    --application.uploadDir=/tmp/upload
