# Hello 😊 This is the front-end for the second coding test for Foodles.

## How to use

This project is using a custom server.js file to run a local server over HTTPS.
You'll need to create a self-signed certificate to run the server, to do this you can use [mkcert](https://github.com/FiloSottile/mkcert).
Generate the certificate and copy the 2 .pem files in the root of the project under a folder named `certs`.
Rename the key file to `127.0.0.1-key.pem` and the certificate file to `127.0.0.1.pem`.
Once done, you can run the server with the following command :

```
npm run dev
```

To run the tests, you can use the following command :

```
npm run test
```
