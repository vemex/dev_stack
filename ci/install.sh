set -e
PYTHON_PACKAGES_DIR=`python -c "from distutils.sysconfig import get_python_lib; print get_python_lib()"`
MKDOCS_DIR="$PYTHON_PACKAGES_DIR/mkdocs"

yes | cp -rf ./ci/__init__.py "$MKDOCS_DIR/contrib/search/__init__.py"
yes | cp -rf ./ci/lunr.jp.py "$MKDOCS_DIR/contrib/search/lunr-language/lunr.jp.js"
yes | cp -rf ./ci/prebuild-index.js "$MKDOCS_DIR/contrib/search/prebuild-index.js"
yes | cp -rf ./ci/tinyseg.js "$MKDOCS_DIR/contrib/search/lunr-language/tinyseg.js"
yes | cp -rf ./ci/worker.js "$MKDOCS_DIR/contrib/search/templates/search/worker.js" 