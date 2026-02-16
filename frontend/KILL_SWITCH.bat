@echo off
echo WARNING: THIS WILL DELETE THE ENTIRE GOOGLE CLOUD PROJECT 'decoded-app-483909-a7'.
echo This action is IRREVERSIBLE.
echo.
set /p confirmation="Are you sure you want to DESTROY this project? (Type 'DESTROY' to confirm): "
if "%confirmation%"=="DESTROY" (
    echo Destroying project...
    call gcloud projects delete decoded-app-483909-a7 --quiet
    echo Project deletion initiated.
) else (
    echo Deletion cancelled.
)
pause
