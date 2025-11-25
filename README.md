# The Builder

## What is The Builder?

 The Builder is a project which its main focus is to help us gain some experience with things like creating a website and connect it to some backend code, know how to work with non relational databases like MongoDB, how to connect the backend code to Mongo Atlas, how to work with APIs in order to connect the frontend and backend. We also want to gain some experience with machine learning models based on the information we stored into the database.

 In order to make all of this possible and since we have different backgrounds, we decided to focus on something that both of us were familiar and also that the people could understand and interact with. That's why we are using the build system from the popular game League of Legends where the user choose a champion from the game and select the items and runes for the champion and the user will get a score based on some reference builds that are considered optimal.

We are still working in the project and make it better, but the main objective is that the user can ask for an optimal build for one champion and the machine learning system, based on all the previous builds that it gather, could make an optimal build for the selected champion. Since League of Legends is a team-based game and the composition of the team and the enemy team is important in order to create an optimal build. We also want to take this in consideration. 

So please, stay tunned to see how the project is evolving and see the new features!

## What we used to create The Builder?

All the backend and all of the script of every component in the project is written using javascript and the equivalent queries for MongoDB. In order to create the website, we used Vue 3 and the last version of Vuetify.

## What is the structure of the project?

There are a lot of stuff here so let's tackle it folder by folder

**the-builder**
This is the main folder that contains all the subfolders of the project where you can see the index.html file and the packages and this README file of course!

**public folder**
Inside this folder, there are basically all the images that appear in the project, the avatar of all the available champions at the moment, their splash-arts, the icons for the runes and items and our logo for the website!
 
**src folder**
Here is where all the magic happens. In this folder, we still have some subfolders that we'll explain later, and some files like our main backend file *Score-system.js*. Inside this file you can see how the score system works, how we connect everything to Mongo Atlas and the call to the api. Inside this folder you can also see the *routes.js* file where you can see all the routes related to our website and how they are connected between them. The *main.js* file is where we import the important things for the project to work and the global components to be available across all the project. The *api.js* file is what we used to connect our backend to our frontend. It may not be pretty, but it's functional, and since it was our first time doing all of this, we are pretty proud.

**assets folder**
Inside this folder,  we have some images that the user will see in the Home page, the font from League of Legends (it's free and everybody have access to it) and the settings for each font.

**components folder**
Here we have all the elements that our website is composed of. *SearchBar.vue* is the component where you can look for an specific champion to create a build for it by typing their name. *RuneSelector.vue* and *ItemSelector.vue* are the responsibles for the selection of the runes and items respectively. *DailyButtonComponent.vue* is the botton you can see in the Home page that will lead you to the Daily Build page. *BuildScore.vue* is the component where we use the api to call the *Score-system.js* file and calculate the scores based on the selection of the items and runes that the user made for the selected champion, or the champion of the day.

**Home folder**
Here resides the *Home.vue* which is the first thing the users see when they enter our website, and the *ContactUs.vue* component is the contact information the user can see at the bottom of the Home page.

**BuildCreator folder**
Here you can find the *BuildCreator.vue* that is the page where the user can create a build for the selected champion from the search bar. The user selects the items and the runes and once the build is ready, the user can click on the button to score their build.

**DailyBuild folder**
Inside this folder we can find the *DailyBuild.vue* that is the page where the user can "challenge" themselves with the creation of a build for a random champion that resets each day.