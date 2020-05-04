FROM maven:alpine as builder

WORKDIR /usr/app
ADD pom.xml .
RUN mvn dependency:go-offline

ADD . .
RUN mvn clean install -Dmaven.test.skip=true

FROM openjdk:8-jre-alpine
WORKDIR /usr/app
COPY --from=builder /usr/app/target/auth.jar .
ENV spring_profiles_active prod
EXPOSE 8081
CMD ["java", "-jar", "auth.jar"]