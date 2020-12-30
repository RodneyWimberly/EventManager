@echo off
echo Get a local copy of the CA Root Cert
copy $env:LOCALAPPDATA\mkcert\rootCA.pem cacerts.crt

:choose
echo Please select which crypto library you perfer to use
echo Libraries: [M]kCert/[O]penSSL
set /p lib=
if /i "%lib%"=="M" goto mkcert
if /i "%lib%"=="O" goto openssl
echo Invalid selection.
echo Valid choices are M for MkCert or O for OpenSSL
echo Would you like to try again? [Y]es/[N]o
set /p again=
if /i "%again"=="Y" goto choose
goto end

:mkcert
echo First, we need to generate the cert and a key pair
mkcert -cert-file em.host.crt -key-file em.host.key em.host *.em.host
echo Once certificate is generated, it can be converted to PFX format
mkcert -pkcs12 em.host.pfx em.host *.em.host
goto end

:openssl
echo First, we need to generate the CSR and a key pair
openssl req -newkey rsa:2048 -nodes -keyout em.host.key -out em.host.csr
echo Now we need to generate certificate using above key and CSR,
openssl x509 -signkey em.host.key -in em.host.csr -req -days 365 -out em.host.crt
echo Once certificate is generated, it can be converted to PFX format
openssl pkcs12 -inkey em.host.key -in em.host.crt -export -out em.host.pfx
goto end

:error
echo Error is script
goto end

:end
echo Script has completed
exit/b
