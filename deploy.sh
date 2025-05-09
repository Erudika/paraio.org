#!/bin/bash

DIST="docs"
if [ -n "$1" ]; then
  sed -e "1,/version: / s/version: .*/version: \"$1\"/" -i.bak ./src/monolite/index.html
	rm jdocs1.zip jdocs2.zip jdocs3.zip ./src/monolite/index.html.bak
  wget -O jdocs1.zip https://repo1.maven.org/maven2/com/erudika/para-core/$1/para-core-$1-javadoc.jar &&
  wget -O jdocs2.zip https://repo1.maven.org/maven2/com/erudika/para-server/$1/para-server-$1-javadoc.jar &&
  wget -O jdocs3.zip https://repo1.maven.org/maven2/com/erudika/para-client/$1/para-client-$1-javadoc.jar
fi
grunt cb
unzip jdocs1.zip -d ${DIST}/javadocs-core
unzip jdocs2.zip -d ${DIST}/javadocs-server
unzip jdocs3.zip -d ${DIST}/javadocs-client
git add -A && git commit -am "updated docs"
git push origin master
