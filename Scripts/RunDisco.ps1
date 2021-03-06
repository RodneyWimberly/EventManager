#
# RunUI.ps1
#
#   This script is used to build the Angular SPA and then host it in NodeJS
Clear-Host
$logFile = "c:\Projects\EventManager\Api\Consul\RunDisco.log"
if (Test-Path -Path $logFile -PathType Leaf) {
    Remove-Item $logFile
}
consul agent -dns-port=53 -dev -enable-script-checks -recursor 8.8.8.8 -config-dir=c:\projects\eventmanager\api\consul | Out-File -FilePath $logFile