ARG TAG=5.0-buster-slim
FROM mcr.microsoft.com/dotnet/aspnet:${TAG} AS aspnet
WORKDIR /app
EXPOSE 50001 12201

ARG TAG
FROM mcr.microsoft.com/dotnet/sdk:${TAG} AS sdk
WORKDIR /app
COPY . .
RUN dotnet publish -c Release -o bin

FROM aspnet
WORKDIR /app
COPY --from=sdk /app/bin/ .
ENV VIRTUAL_HOST=idweb.service.em.docker
ENV ASPNETCORE_FORWARDEDHEADERS_ENABLED=true
ENV ASPNETCORE_URLS=http://+:50001
ENV ASPNETCORE_Kestrel__Certificates__Default__Path=/app/certs/em.host.pfx
ENV ASPNETCORE_Kestrel__Certificates__Default__Password=changeit
ENV DockerConfiguration__UpdateCaCertificate=true
ENTRYPOINT [ "dotnet", "EventManager.Identity.Admin.dll" ]