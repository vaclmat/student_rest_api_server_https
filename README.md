# Open API Node JS server application on IBM i

Sample application demonstrating REST-API interface for transactions over IBM i database.

This sample application use Open API 3.xx for description of API, Node js 8 or 10 as server engine and JWT for token authentication and accesscontrol, accesscontrol-middleware as part oas-tools for authorization.

Description of API is clear from api/swagger/swagger.yaml file.

As database drive is utilized idb-pcontroller.

Certification files key.pem and cert.pem was created by following commands:

openssl genrsa -out key.pem

openssl req -new -key key.pem -out csr.pem

openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem

rm csr.pem

To add this nodejs server certificate to trusted certificates follow link:

https://www.seidengroup.com/2021/04/26/how-to-validate-self-signed-ssl-tls-certificates-from-ibm-i/


 