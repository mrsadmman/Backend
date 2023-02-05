
Dentro de la carpeta NginxNode/public donde esta el server.js ejecutar estos comandos:

pm2 start server.js --name="general" -i 1

pm2 start server.js --name="fork" -- 8081

pm2 start server.js --name="Cluster1" -i 1 -- 8082

pm2 start server.js --name="Cluster2" -i 1 -- 8083

pm2 start server.js --name="Cluster3" -i 1 -- 8084

pm2 start server.js --name="Cluster4" -i 1 -- 8085


Dentro de la carpeta base de todo el proyecto donde esta nginx.exe ejecutar este comando:
nginx usando cmd
./nginx.exe usando powershell

Si hay un error con la carpeta temp o logs aca esta la solucion
https://stackoverflow.com/questions/35563834/nginx-fails-to-create-directories-on-windows-10-with-error-nginx-createfile

Para iniciarlo en LINUX
- sudo systemctl start nginx
Status
- sudo systemctl status nginx
Stop
- sudo systemctl stop nginx
Restart
- sudo systemctl restart nginx

https://www.baeldung.com/linux/nginx-start-stop-restart
