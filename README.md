#The Drusk Base Back End

This project contains the Drusk Backend. The backend is a Node.JS project and based on the magnificent work of the people behind Nest.JS - https://github.com/nestjs/nest.

It follows a similar application structure than angular and is therefore a nice fit.It uses graphql as main endpoint, and controllers for a smaller subsection of the application. The complete architecture of the application can be found in Jente's thesis and will be documented here later.

To run the Drusk Base FrontEnd, we first need to run the backend. Follow the following steps:

### 1) Configure the database
  1. Install MongoDB on your local machine or create a test database on https://www.mongodb.com/cloud/atlas
  
  2. Navigate to `/drusk-backend/src/base/config`
  
  3. Add a new file inside this folder called `db.connectionstring.ts. *For security purposes, this file is excluded from git using .gitignore*
  
  4. Put the connection string in the file, in the following format 
  `export const connString = "{{ mongodb connection string (Older format < 3.4) }}";`

  5. Don't worry about seeding the database. Our fixtures will do that automatically for you on server load :)

### 2) Run the backend server 
Navigate with shell/cmd to `/drusk-backend` and execute `yarn run start`. The backend will now be running at `http://localhost:3000/`. #


34
t
4
3
3
43
5
3
5
3
4
8
th
epr
ig
;k
-
=i
w
e
op
e
r
ui
gh
4p
8
h
34
9
8
3
4
f
ue
nl
u
34
h8
0
t
3
4
g
