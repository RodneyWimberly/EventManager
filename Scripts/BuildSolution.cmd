@echo off
cls

echo ====================================================================================================
echo Building EventManager binaries and containers, Please Wait...
echo ====================================================================================================
cd C:\Projects\EventManager\Api\Identity

echo ----------------------------------------------------------------------------------------------------
echo Incrementing the assembly version number for the next build
echo ----------------------------------------------------------------------------------------------------
dotnet build "C:\Projects\EventManager\Api\Identity\build\Cadru.VersionUpdate.targets" -t:UpdateAssemblyVersionInfo -v d

echo ----------------------------------------------------------------------------------------------------
echo Cleaning, restoring, and building the solution assemblies
echo ----------------------------------------------------------------------------------------------------
BuildConsole "C:\Projects\EventManager\Api\Identity\EventManager.Identity.AdminUI.sln" /build /CFG="Release" /CLEAN /STOPONERRORS /OPENMONITOR /SHOWTIME

echo ----------------------------------------------------------------------------------------------------
echo Publishing the solution assemblies
echo ----------------------------------------------------------------------------------------------------
dotnet publish "C:\Projects\EventManager\Api\Identity\EventManager.Identity.AdminUI.sln" --no-build -c Release -o "C:\Projects\EventManager\Api\Identity\publish" -v d

echo ----------------------------------------------------------------------------------------------------
echo Killing the current service containers
echo ----------------------------------------------------------------------------------------------------
docker-compose  -f "C:\Projects\EventManager\Api\Identity\docker-compose.yml" -f "C:\Projects\EventManager\Api\Identity\docker-compose.override.yml" -p eventmanager --no-ansi --log-level DEBUG kill

echo ----------------------------------------------------------------------------------------------------
echo Stopping and removing the current service containers
echo ----------------------------------------------------------------------------------------------------
docker-compose  -f "C:\Projects\EventManager\Api\Identity\docker-compose.yml" -f "C:\Projects\EventManager\Api\Identity\docker-compose.override.yml" -p eventmanager --no-ansi --log-level DEBUG down --rmi local --remove-orphans

echo ----------------------------------------------------------------------------------------------------
echo Validating and printing the new service container definiton
echo ----------------------------------------------------------------------------------------------------
docker-compose  -f "C:\Projects\EventManager\Api\Identity\docker-compose.yml" -f "C:\Projects\EventManager\Api\Identity\docker-compose.override.yml" -p eventmanager --no-ansi --log-level DEBUG config

echo ----------------------------------------------------------------------------------------------------
echo Building the new service containers with the latest assemblies
echo ----------------------------------------------------------------------------------------------------
docker-compose  -f "C:\Projects\EventManager\Api\Identity\docker-compose.yml" -f "C:\Projects\EventManager\Api\Identity\docker-compose.override.yml" -p eventmanager --no-ansi --log-level DEBUG build --parallel --force-rm --pull --progress auto

echo ----------------------------------------------------------------------------------------------------
echo Creating and starting the new service containers
echo ----------------------------------------------------------------------------------------------------
docker-compose  -f "C:\Projects\EventManager\Api\Identity\docker-compose.yml" -f "C:\Projects\EventManager\Api\Identity\docker-compose.override.yml" -p eventmanager --no-ansi --log-level DEBUG up --force-recreate --remove-orphans
