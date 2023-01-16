## Abstract
The purpose of this app is to display a user's data, such as sleep, hydration and activity for the latest day and week including comparisions to the average of all user's for each topic.

## Setup

1. In your browser, paste this link: https://github.com/jheidepriem/fitLit-tracker
2. Fork this repo - on the top right corner of this page, click the **Fork** button.
3. Once you have cloned the repo, change into the directory and install the project dependencies. Run `npm install` to install project dependencies.
4. Run `npm start` in the terminal to see the HTML page. `Control + C` is the command to stop running the local server.  Closing the terminal without stopping the server first could allow the server to continue to run in the background and cause problems. This command is not specific to Webpack; make note of it for future use.    
5. Do not run `npm audit fix --force`.  This will update to the latest version of packages.  We need to be using `webpack-dev-server@3.11.2` which is not the latest version.  If you start to run into Webpack errors, first check that all group members are using the correct version.  

## Contributors
* [Josephine Heidepriem](https://github.com/jheidepriem)
* [Angie Wirth](https://github.com/awirth224)
* [Matt Rowan](https://github.com/MRowan121)
* [Reid Poole](https://github.com/rpoole444)

## Technologies Used
* Mocha
* Chai
* NPM
* Webpack
* Javascript
* HTML
* CSS
* Github
* VScode

## Future Features
Some future features would be to add each user's friends activity and rank them highest to lowest in a right side panel. Another feature would be to add a profile image for each user. A separate page view to add data would also be a fun future feature so that the page isn't cluttered.

## GIF
![fitGif](https://user-images.githubusercontent.com/110955503/207127036-e1385276-5b43-4af0-84c3-173de74355b0.gif)



## Deploying to GitHub Pages

_If you are finished with the functionality and testing of your project_, then you can consider deploying your project to the web! This way anyone can play it without cloning down your repo.

[GitHub Pages](https://pages.github.com/) is a great way to deploy your project to the web. Don't worry about this until your project is free of bugs and well tested!

If you _are_ done, you can follow [this procedure](./gh-pages-procedure.md) to get your project live on GitHub Pages.
