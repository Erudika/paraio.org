#!/bin/bash

if [ -n "$1" ]; then
  grunt && git commit -am "updated docs" && git checkout gh-pages
  cp -Rf dist/* .
  rm -rf javadocs
  wget -O jdocs.zip https://oss.sonatype.org/service/local/repositories/releases/content/com/erudika/para/$1/para-$1-javadoc.jar && 
  unzip jdocs.zip -d javadocs && rm jdocs.zip
  git commit -am "updated docs"
  git push origin gh-pages
  git checkout master
  echo "done"
fi