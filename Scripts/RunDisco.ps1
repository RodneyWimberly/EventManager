#
# RunUI.ps1
#
#   This script is used to build the Angular SPA and then host it in NodeJS
Clear-Host
$logFile = "c:\Projects\EventManager\Scripts\RunDisco.log"
if (Test-Path -Path $logFile -PathType Leaf) {
    Remove-Item $logFile
}
consul agent -dev | Out-File -FilePath $logFile