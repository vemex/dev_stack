mkdocs build

 git clone  --depth 50 --branch gh-pages http://github.com/vemex/Nicety.git  nicety-pages
    mkdir -p nicety-pages/reporter/test
    mkdir -p nicety-pages/reporter/coverage
    cp -r Nicety/target/test/*  nicety-pages/reporter/test
    cp -r Nicety/target/coverage/html/*  nicety-pages/reporter/coverage
    cd nicety-pages
    git add .
    git commit -m "[auto]deliver reporter"
    git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" HEAD:gh-pages