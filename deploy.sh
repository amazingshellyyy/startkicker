git add .
git commit -m "commit for update before deploy"
git subtree push --prefix backend heroku master
echo ">> backend deployed successfully"
cd ./frontend
npm run build
sleep 5s
git add .
git commit -m "create docs and ready for deploy"
git push origin master
echo ">> frontend deployed successfully"
echo "|| client-> https://amazingshellyyy.com/startkicker"
echo "|| server-> https://dashboard.heroku.com/apps/startkicker-server/logs"