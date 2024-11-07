@REM start homepage.bat local
@REM wait 10
@REM npm --prefix ./vn/ run build

node ./server/homepage_local.js && npm --prefix ./vn/ run build &&node ./server/homepage_online.js && node ./server/create_media.js

