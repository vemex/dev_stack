set -e
PYTHON_PACKAGES_DIR=`python -c "from distutils.sysconfig import get_python_lib; print get_python_lib()"`
MKDOCS_DIR="$PYTHON_PACKAGES_DIR/mkdocs"

cp -i ./ci/__init__.py "$MKDOCS_DIR/contrib/search/__init__.py"
cp -i ./ci/lunr.jp.py "$MKDOCS_DIR/contrib/search/lunr-language/lunr.jp.js"
cp -i ./ci/prebuild-index.js "$MKDOCS_DIR/contrib/search/prebuild-index.js"
cp -i ./ci/tinyseg.js "$MKDOCS_DIR/contrib/search/lunr-language/tinyseg.js"
cp -i ./ci/worker.js "$MKDOCS_DIR/contrib/search/templates/search/worker.js" 