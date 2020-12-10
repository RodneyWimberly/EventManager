#
# PackageUI.ps1
#
#   This script is used to build the Angular SPA and prepare it for deployment
Clear-Host
$location = Get-Location
Set-Location "C:\Projects\EventManager\Web\ClientApp"
npm install
npm run build
Set-Location $location