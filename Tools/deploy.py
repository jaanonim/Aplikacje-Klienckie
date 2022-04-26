import os

name = input("Enter name: ")
path = input("Enter path: ")
buildpack = input("Enter buildpack (node / java / URL): ")

if buildpack == "java":
    buildpack = "https://github.com/heroku/heroku-buildpack-java.git"
elif buildpack == "node":
    buildpack = "https://github.com/heroku/heroku-buildpack-nodejs.git"

print("Deploying...")

os.system(f"heroku create -a {name} --buildpack {buildpack}")
os.system(
    f"heroku buildpacks:add -a {name} -i 1 https://github.com/lstoll/heroku-buildpack-monorepo"
)
os.system(f"heroku config:set -a {name} APP_BASE={path}")
os.system(f"git push https://git.heroku.com/{name}.git HEAD:master")

print("Creating deploy file in apps")

f = open(f"apps/{name}.bat", "w")
f.write(f"git push https://git.heroku.com/{name}.git HEAD:master")
f.close()

print("Done!")
