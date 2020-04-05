FROM maven:alpine as builder

WORKDIR /usr/app
ADD pom.xml .
RUN mvn dependency:go-offline

ADD . .
RUN mvn clean install -Dmaven.test.skip=true

FROM openjdk:11.0.4-jre-slim-buster
WORKDIR /usr/app
COPY --from=builder /usr/app/target/api.jar .
ENV spring_profiles_active prod
EXPOSE 8080
CMD ["java", "-jar", "api.jar"]