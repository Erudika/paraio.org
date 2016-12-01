#!/bin/bash

DIST="docs"
grunt cb
# cp -Rf docs/* .
if [ -n "$1" ]; then
  sed -e "1,/version: / s/version: .*/version: \"$1\"/" -i.bak ./src/monolite/index.html
  wget -O jdocs1.zip https://oss.sonatype.org/service/local/repositories/releases/content/com/erudika/para-core/$1/para-core-$1-javadoc.jar &&
  wget -O jdocs2.zip https://oss.sonatype.org/service/local/repositories/releases/content/com/erudika/para-server/$1/para-server-$1-javadoc.jar &&
  wget -O jdocs3.zip https://oss.sonatype.org/service/local/repositories/releases/content/com/erudika/para-client/$1/para-client-$1-javadoc.jar &&
  unzip jdocs1.zip -d ${DIST}/javadocs-core && rm jdocs1.zip
  unzip jdocs2.zip -d ${DIST}/javadocs-server && rm jdocs2.zip
  unzip jdocs3.zip -d ${DIST}/javadocs-client && rm jdocs3.zip
  rm ./src/monolite/index.html.bak
fi
git add -A && git commit -am "updated docs"
git push origin master
