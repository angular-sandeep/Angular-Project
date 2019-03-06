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
