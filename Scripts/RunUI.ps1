#
# RunUI.ps1
#
#   This script is used to build the Angular SPA and then host it in NodeJS
Clear-Host
$location = Get-Location
Set-Location "c:\Projects\EventManager\Web\ClientApp"
ng serve
Set-Location $location