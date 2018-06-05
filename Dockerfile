FROM openjdk:8-jdk-alpine
VOLUME /tmp
COPY target/smarthealthcare-0.0.1-SNAPSHOT.war smarthealthcare.war
EXPOSE 8080
ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-Djava.io.tmpdir=/tmp/data", "-Duser.timezone=Asia/Shanghai",
"-jar", "/smarthealthcare.war", "--spring.profiles.active=prod", "--server.port=8080", "--logging.path=/tmp/logs"]
