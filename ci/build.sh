mkdocs build
ls
git clone  --depth 50 --branch gh-pages http://${GH_REF}  dev-stack-pages
mkdir -p nicety-pages/reporter/test
mkdir -p nicety-pages/reporter/coverage
cp -r ./site/*  dev-stack-pages/ 
cd dev-stack-pages
git add .
git commit -m "[auto]deliver docs"
git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" HEAD:gh-pages