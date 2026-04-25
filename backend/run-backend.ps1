# Stops whatever is listening on SERVER_PORT (default 10200), then starts Spring Boot.
$ErrorActionPreference = 'SilentlyContinue'
Set-Location $PSScriptRoot
$port = 10200
if ($env:SERVER_PORT -match '^\d+$') { $port = [int]$env:SERVER_PORT }
foreach ($c in Get-NetTCPConnection -LocalPort $port -State Listen) {
    Stop-Process -Id $c.OwningProcess -Force
}
Write-Host "Starting Uniflow (freed TCP $port if it was in use)..."
if ($args.Count -eq 0) {
    & .\mvnw.cmd spring-boot:run
} else {
    & .\mvnw.cmd @args
}
