## Personal Information Management(PIM)
 This is MEAN project. This uses token based authetication using JWT. It consist of `Angular-client` which act as client and `WebAPI` as server-API.

### Angular-Project Directory Structure: -
  
  This consist of many componenets.
  
- App 
   + `Footer-Component`  --> having footer of dashboard
   + `Header-Component`  --> having navbar of dashboard
   + `Login-Component`   --> having login page with it's functionality and validation <br >
                         1. error :-> when we enter wrong `username` and/or `password` then error message print as `Please enter correct username and password`.<br>
                         2. error :-> when we enter correct `username` and `password` but not `authorized by Admin` then error message print as `you are not authrozied by Admin`.<br>
                         3. success :-> when we enter correct `username` and `password` and `authorized by Admin` then successfully login into application. We store `token, userid, username` into `localstorage`.<br>
   + `Logout-Component`  --> having logout logic.ts file which delete all entreis from `localstorage`
   + `Model` --> having `login, person, and user` models
   + `New-Person-Component` --> having `new-person` creation form with validation. This component used for `Addding` new person and also for `Updating` existing person profile based on `Route-Param` link.  
   + `New-User-Component`  --> having `new-user` creation form with validation.
   + `Person-Status-Component`  --> having `person-status` table component. This component will display person information based on person status using `Drop-down` like `Pending` and `Approved`. Default is `Pending`. 
   + `User-Status-Component`  --> having `user-status` table component. <br>
     ----- This component will display user information based on user status using `Drop-down` like `Pending`, `Approved`, `Rejected` and `All`. Default is `Pending`.
     ---- This uses `searching` functionality. This functionality searches based on `UserId, UserName, Email, and Mobile`.
     ---- `Search functionality` is working based on `drop-down list` selection options like `Pending`, `Approved`, `Rejected` and `All`.

