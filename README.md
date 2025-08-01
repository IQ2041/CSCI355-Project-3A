# CSCI355-Project-3
Creating a quiz website that loads a random amount of questions and communicates with a server for questiosn, answers, and leaderboards
Website is deployed at: https://app.netlify.com/projects/iqquizapp/overview

Ivan: Worked with Roel to get the code into the live server application, troubleshooting with Roel for the additional code added and figuring out what could be changed and what couldn't. The sign-in and sign-up page collisions didn’t work due to the pathing being from Project 2 versions and required more absolute and direct paths. Additionally, I was the main decision-maker on GitHub who figured out how to properly merge the two code bases—Roel's and mine, along with Saul's database code—so they could function together. This is the reason for the 3A designation: due to the Project 2 codebase being used and changed so drastically, the merge and pull request options were unavailable without creating a fresh portfolio to run. I helped with creating the leaderboard however was unable to figure out the proper requesting without more time. 


Roel: Connected the quiz page to the API URL to retrieve  the questions while taking the quiz. Created a quiz.js file that picks random questions which pulls from the API and how it shows correct/incorrect feedback after clicking each answer choice with the colors over the choices. Implemented a timer when the user starts the quiz and the buttons to go back to the sign up page. Collaborated with both teammates via call to discuss our changes and made sure that we were coding the right implementations so the website can look and work smoothly.


Saul:
Connecting what we have with mongodb so we have a database with all logged in players
Created a team email and team mongodb account where we all have access to our "Central" DB and am able to connect to the db that was created. 
Created the signin and sigup page to communicate with the mongodb backend to save the values of the username, eamil, password and confirmpassword and for the signin it is looking for the username and password to redirect to quiz page.
Made the landing page for the app to be the signup page so users can signup or have the option to signin if they already have a account with us and if they dont want to create an account they have an option of siging in as a guest. 
Below if a collection of images to show that mongodb and the signin and signup page are connected and gives varifications that they were added inside of the database, I wasn't able to hide the passwords inside of the db due to the short amount of time of the class but I will include that in thee future. 
Note: I had an issue with moving my files from project 2 repo to this repo, if you want to see how that code runs go to   

https://github.com/IQ2041/CSCI355-Project-2/tree/database-test-saul


To run I used npm run dev so it runs with nodemone

<img width="2559" height="1368" alt="Screenshot 2025-07-31 194854" src="https://github.com/user-attachments/assets/ccdbb8d1-babb-493a-a12c-720bdf9e4e23" />

<img width="2559" height="1359" alt="Screenshot 2025-07-31 194648" src="https://github.com/user-attachments/assets/5428517f-f8ba-4e23-a092-c2dcb4a0da7f" />

<img width="2549" height="1354" alt="Screenshot 2025-07-31 194629" src="https://github.com/user-attachments/assets/f8d6980b-5838-4b56-8dfb-f7bf2d8932cf" />

<img width="612" height="153" alt="Screenshot 2025-07-31 194929" src="https://github.com/user-attachments/assets/00d07cde-a65f-4909-a541-ec5dfc6f3078" />
