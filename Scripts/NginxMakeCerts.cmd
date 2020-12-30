
cd C:\Projects\EventManager\Api\Identity\nginx\foo
rem mkcert --install
copy $env:LOCALAPPDATA\mkcert\rootCA.pem cacerts.pem
copy $env:LOCALAPPDATA\mkcert\rootCA.pem cacerts.crt
mkcert -cert-file em.host.crt -key-file em.host.key -p12-file em.host.p12 -pkcs12 em.host *.em.host
mkcert -pkcs12 em.host.pfx em.host *.em.host
