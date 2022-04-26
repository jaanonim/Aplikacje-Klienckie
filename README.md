# Aplikacje-Klienckie

A repository for school lessons, client and server applications.

## Most interesting projects

-   **anonim-server** (`Prace\Node\anonim-server`)\
     Simple express like http server written on top of clean node.js. Published as npm package.
-   **checkers** (`Prace\WebGL\checkers`)\
     3D chekers game written using three.js and express as backend.

## Folders:

-   Sprawdziny - big tests
-   Kartkowki - small tests
-   Templates - templates for faster project setup
-   Prace - projcets and homewroks
-   Tools - some usefull tool for managing this repo

## Topics:

-   JS
-   JQuery
-   Node.js
-   Express
-   Three.js
-   PHP
-   Java
-   Spark
-   Hosting: Heroku, DETA

---

## Heroku:

1.  Create `Procfile`
    For node.js it's:

        web: npm start

Then use `deploy` tool or do this manualy:

2.  Create heroku app (this buildpack is for node.js)

        heroku create -a DZIAL-lekcjaXXX-mm3i2a --buildpack https://github.com/heroku/heroku-buildpack-nodejs.git

3.  Configure buildpack

        heroku buildpacks:add -a DZIAL-lekcjaXXX-mm3i2a -i 1 https://github.com/lstoll/heroku-buildpack-monorepo

4.  Setup env variables

        heroku config:set -a DZIAL-lekcjaXXX-mm3i2a APP_BASE=Prace/DZAL/lekcjaXXX

5.  Push to heroku

        git push https://git.heroku.com/DZIAL-lekcjaXXX-mm3i2a.git HEAD:master
