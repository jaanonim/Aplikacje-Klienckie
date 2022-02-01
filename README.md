# Aplikacje-Klienckie

## Folders:

-   Sprawdziny - big tests
-   Kartkowki - small tests
-   Templates - templates for faster project setup
-   Prace - projcets and homewroks

---

## Heroku:

1.  Create `Procfile`
    For node.js it's:

        web: npm start

2.  Create heroku app (this buildpack is for node.js)

        heroku create -a DZIAL-lekcjaXXX-mm3i2a --buildpack https://github.com/heroku/heroku-buildpack-nodejs.git

3.  Configure buildpack

        heroku buildpacks:add -a DZIAL-lekcjaXXX-mm3i2a -i 1 https://github.com/lstoll/heroku-buildpack-monorepo

4.  Setup env variables

        heroku config:set -a DZIAL-lekcjaXXX-mm3i2a APP_BASE=Prace/DZAL/lekcjaXXX

5.  Push to heroku

        git push https://git.heroku.com/DZIAL-lekcjaXXX-mm3i2a.git HEAD:master
