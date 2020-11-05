#
# PackageUI.ps1
#
#   This script is used to build the Angular SPA and prepare it for deployment
Clear-Host
$location = Get-Location
Set-Location "..\Web\ClientApp"
npm install
npm run build
Set-Location $location