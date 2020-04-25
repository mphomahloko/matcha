FROM mysql:8.0.15

# Run commands on terminal to create and setup the mysql image
# docker run -d -p 3306:3306 --name my-mysql -e MYSQL_ALLOW_EMPTY_PASSWORD=true my-mysql
# docker exec -it my-mysql bash
# mysql --user=root --password
# ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY '';
