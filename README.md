# Aplikacje-Klienckie

## Heroku:

1) Create `Procfile`
    For node.js it's:

        web: npm start
    
2) Create heroku app (this buildpack is for node.js)

        heroku create -a lekcjaXXX-mm3i2a --buildpack https://github.com/heroku/heroku-buildpack-nodejs.git

3) Configure buildpack

        heroku buildpacks:add -a lekcjaXXX-mm3i2a -i 1 https://github.com/lstoll/heroku-buildpack-monorepo
        heroku config:set -a  lekcjaXXX-mm3i2a APP_BASE=lekcjaXXX

4) Push to heroku

        git push https://git.heroku.com/lekcjaXXX-mm3i2a.git HEAD:master
