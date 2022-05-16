#!/bin/sh

if [ "`git status -s`" ]
then
    echo "The working directory is dirty. Please commit any pending changes."
    exit 1;
fi

echo "Deleting old publication"
rm -rf public
mkdir public
git worktree prune
rm -rf .git/worktrees/public/

echo "Checking out gh-pages branch into public"
git worktree add -B gh-pages public origin/gh-pages

echo "Removing existing files"
rm -rf public/*

echo "Generating site"
env HUGO_ENV="production" hugo

echo "Check hugo build"
if [ -z "$(ls -A public)" ]; then
    echo "hugo build failed"
    exit 1;
fi

echo "Updating gh-pages branch"
cd public && git add --all && git commit -m "Publishing to gh-pages"

echo "Pushing to github"
git push --all