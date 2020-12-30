@echo off
REM cls
ECHO Creating Certifactes for Signing and Validating JWT Tokens
cd C:\Projects\EventManager\Api\Identity\src\EventManager.Identity.STS.Identity\certs

copy C:\Users\Rodney\AppData\Local\mkcert\rootCA.pem cacerts.pem
copy C:\Users\Rodney\AppData\Local\mkcert\rootCA.pem cacerts.crt

MakeCert /n "CN=EventManager" /r /h 0 /eku "1.3.6.1.5.5.7.3.3,1.3.6.1.4.1.311.10.3.13" /e 12/31/2021 /sv SignJwt.pvk SignJwt.cer
Pvk2Pfx /pvk SignJwt.pvk /pi eventmanagersecret /spc SignJwt.cer /pfx SignJwt.pfx /po eventmanagersecret
Certutil -addStore TrustedPeople SignJwt.cer

MakeCert /n "CN=EventManager" /r /h 0 /eku "1.3.6.1.5.5.7.3.3,1.3.6.1.4.1.311.10.3.13" /e 12/31/2021 /sv ValidateJwt.pvk ValidateJwt.cer
Pvk2Pfx /pvk ValidateJwt.pvk /pi eventmanagersecret /spc ValidateJwt.cer /pfx ValidateJwt.pfx /po eventmanagersecret
Certutil -addStore TrustedPeople ValidateJwt.cer

Certutil -store TrustedPeople
pause