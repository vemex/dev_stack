set -e
PYTHON_PACKAGES_DIR=`python -c "from distutils.sysconfig import get_python_lib; print get_python_lib()"`
MKDOCS_DIR="$PYTHON_PACKAGES_DIR/mkdocs"

cp -i ./__init__.py "$MKDOCS_DIR/contrib/search/__init__.py"
cp -i ./lunr.jp.py "$MKDOCS_DIR/contrib/search/lunr-language/lunr.jp.js"
cp -i ./prebuild-index.js "$MKDOCS_DIR/contrib/search/prebuild-index.js"
cp -i ./tinyseg.js "$MKDOCS_DIR/contrib/search/lunr-language/tinyseg.js"
cp -i ./worker.js "$MKDOCS_DIR/contrib/search/templates/search/worker.js" 