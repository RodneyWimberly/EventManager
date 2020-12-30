ARG TAG=5.0-buster-slim
FROM mcr.microsoft.com/dotnet/aspnet:${TAG} AS aspnet
WORKDIR /app
EXPOSE 80
EXPOSE 443

ARG TAG
FROM mcr.microsoft.com/dotnet/sdk:${TAG} AS sdk
WORKDIR /app
COPY . .
RUN dotnet publish -c Release -o bin

FROM aspnet
WORKDIR /app
COPY --from=sdk /app/bin/ .
CMD dotnet $ASPNETCORE_WebAppBin