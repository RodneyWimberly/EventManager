#
# RunUI.ps1
#
#   This script is used to build the Angular SPA and then host it in NodeJS
Clear-Host
$location = Get-Location
$logFile = "c:\Projects\EventManager\Scripts\RunUI.log"
Set-Location "c:\Projects\EventManager\Web\ClientApp"
if (Test-Path -Path $logFile -PathType Leaf) {
    Remove-Item $logFile
}
ng serve | Out-File -FilePath $logFile
Set-Location $location