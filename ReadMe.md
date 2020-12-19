
# Prequeries

Following tools/software must be installed before you can install the ebs online shop application:

- [Docker Desktop](https://docs.docker.com/docker-for-windows/install/)
- Clone this repository

## Install ebs online shop

Please run following commands in cmd as administrator:

- browse (`cd`) to the cloned repository
- `cd docker`
- `docker-compose up`

## URLs
Following urls are available after docker compose installation

| Application         | Url      |
| ------------- |-----------|
| IDP | http://localhost:32839/swagger/index.html |
| API | http://localhost:8080/ebs/swagger/index.html |
| CLIENT | http://localhost:4200 |