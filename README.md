# lowkey_trello

### Built With

* React.js
* Node.js
* express
* TailwindCSS
* Redux

### Installation
_follow the below instructions to run this locally

1. Clone the repo locally using  
```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
2. navigate to client and run `npm install --legace-peer-deps`
  
3. navigate to api and run `npm instll`

4. make sure to create .env files in both directories
5. env file in api directory should have a connection string for mongoDB and JWT secret
6. env file in client directory should have the url of the backend service and google client ID
7. create your own client id in [here](https://console.developers.google.com/).
8. set up a new project and configure your own O auth consent screen
9. create credentials and make sure to include your front end url in it (http://localhost:3000) in your case.
10. add the url in both javascript origin and redirect URI
11. now to start the app, use `node index.js` or `node .` in the api directory to start the back-end service.
12. to start the client side app, use `npm start` in the client directory.
13. If the google client ID is configured, the you should not have any problem starting the app.

## Functionalities
* Responsive
* supports drag and drop functionality
* allows google sign in
* uses REST api


## Roadmap

- [x] Styling
- [x] Google login and log out
- [x] Created REST api
- [x] Deployed
   

























[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB