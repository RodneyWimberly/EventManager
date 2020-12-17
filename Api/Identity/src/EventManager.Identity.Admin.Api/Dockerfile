FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["src/EventManager.Identity.Admin.Api/EventManager.Identity.Admin.Api.csproj", "src/EventManager.Identity.Admin.Api/"]
COPY ["src/EventManager.Identity.Admin.EntityFramework.Shared/EventManager.Identity.Admin.EntityFramework.Shared.csproj", "src/EventManager.Identity.Admin.EntityFramework.Shared/"]
COPY ["src/EventManager.Identity.Admin.EntityFramework.SqlServer/EventManager.Identity.Admin.EntityFramework.SqlServer.csproj", "src/EventManager.Identity.Admin.EntityFramework.SqlServer/"]
COPY ["src/EventManager.Identity.Admin.EntityFramework.PostgreSQL/EventManager.Identity.Admin.EntityFramework.PostgreSQL.csproj", "src/EventManager.Identity.Admin.EntityFramework.PostgreSQL/"]
COPY ["src/EventManager.Identity.Shared/EventManager.Identity.Shared.csproj", "src/EventManager.Identity.Shared/"]
COPY ["src/EventManager.Identity.Admin.EntityFramework.MySql/EventManager.Identity.Admin.EntityFramework.MySql.csproj", "src/EventManager.Identity.Admin.EntityFramework.MySql/"]
RUN dotnet restore "src/EventManager.Identity.Admin.Api/EventManager.Identity.Admin.Api.csproj"
COPY . .
WORKDIR "/src/src/EventManager.Identity.Admin.Api"
RUN dotnet build "EventManager.Identity.Admin.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "EventManager.Identity.Admin.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENV ASPNETCORE_FORWARDEDHEADERS_ENABLED=true
ENTRYPOINT ["dotnet", "EventManager.Identity.Admin.Api.dll"]