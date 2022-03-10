##DOCKER
docker run --name g2news-mysqldb -e MYSQL_DATABASE=g2news -e MYSQL_USER=g2news -e MYSQL_PASSWORD=my-ultra-password -e MYSQL_ROOT_PASSWORD=my-root-ultra-password -p 3306:3306 -d mysql:8.0.28