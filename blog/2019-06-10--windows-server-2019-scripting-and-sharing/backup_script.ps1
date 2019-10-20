Class DirToBackup
{
    [String]$path
    DirToBackup([String]$path) {
      $this.path = $path
    }
}
$defaultListOfExcluded = "C:\inetpub\wwwroot\just_testing\listOfBackupExcluded.txt"
$pathFromPrefix = "C:\inetpub\wwwroot\just_testing\test_data\"
$pathToPrefix = "C:\inetpub\wwwroot\just_testing\backup_data\"
Write-Output "Plug external disk drive."
pause
$dirsToBackup = @(
    New-Object DirToBackup "backup"
    New-Object DirToBackup "development"
)
$dirsToBackup | ForEach-Object {
    mkdir -Path $($pathToPrefix + $_.path) -Force
    xcopy $($pathFromPrefix + $_.path) $($pathToPrefix + $_.path) /D /S /Y /H /EXCLUDE:$defaultListOfExcluded
}
pause