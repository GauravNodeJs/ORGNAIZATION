# USER ORGNAIZATION
## Overview 
*I have worked on the user orgnaization Operations using the techonlogy i.e
* I have implemented the password functionality in which i have used the bcrypt(used for the password hashing)
* Implement the validations as well for this i have used the Joi validator.
* i have used jwt to genrate the token 
* a) Express framework-4.18.2
* b) Mongodb database -4.11.0
* c) Node version-v16.18.1
* d) Npm version-8.19.2
* e) Bcrypt version-5.1.0
* f) Dotenv version-16.0.3
* g) Mongoose version-6.7.3
## Steps for using crud
* step1->npm i
* step2->npm start
# CRUD API Link & Working:
  >>USER Register :POST API --   localhost:3000/user/add
* Here you can register yourself and you can add orgnaization its optional 
    
  >>USER LOGIN : POST API -- localhost:3000/user/login
* Here you can login from username and password

  >>USER ORGNAIZATION ADD : POST API -- localhost:3000/org/add
* After login you can add your orgnaization as many as you can 

  >>USER ORGNAIZATION LIST : GET API --  localhost:3000/org/list
* Here you can have your all orgnaization list 

  >>USER PROFILE UPDATE : PUT API -- localhost:3000/user/update
* Here you can update only your profile

  >>USER ORGNAIZATION UPDATE : PUT API -- localhost:3000/org/list/update/:id
* Here you can update your orgnaization