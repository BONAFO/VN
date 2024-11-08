setlocal enabledelayedexpansion

for /f "tokens=* delims=" %%i in ("./server/env") do (
    set "line=%%i"
    for /f "tokens=1,2 delims==" %%a in ("!line!") do (
        set "%%a=%%b"
    )
)

echo El valor de MI_VARIABLE es: %MI_VARIABLE% 
echo El valor de OTRA_VARIABLE es: %OTRA_VARIABLE%


node ./server/both/manage_app.js de  && ^
node ./server/both/validate_db.js && ^
@REM cd ./vn/ && npm run build && cd ../ && ^
@REM node ./server/both/manage_app.js co && ^
@REM node ./server/local/create_media.js && ^
@REM node ./server/both/update_db.js && ^
@REM node ./server/both/delete_build.js && ^
@REM cd ./vn/ && npm start

endlocal