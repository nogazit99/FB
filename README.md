# Foobar

Foobar is a social networking application similar to Facebook, designed to connect people and support sharing of updates and photos.

wiki: https://github.com/edenbdv/FooBar-Server/tree/main/wiki

## Features

- **Sign Up and Login:** Foobar allows users to create accounts securely with a unique username and password. Users can then log in to access their account and use the app's features.

- **Feed:** The heart of Foobar is its feed, where the user can see updates, posts, and media. 

## Technologies Used

- **Frontend:** The frontend of Foobar is built using modern web technologies such as HTML, CSS, and JavaScript. It utilizes frameworks like React.js for dynamic user interfaces and smooth interactions.

## Dependencies

- **Frontend:**
  - React.js
  - React Router
  - Bootstrap 

## Running the code

1. Clone the repository:

   ```bash
   git clone client
   https://github.com/nogazit99/FB
   git clone server
   https://github.com/edenbdv/FooBar-Server.git 
   ```
the relevant branch in the FB repo is 'client' branch.


2. Install dependencies for both client and server:

   ```bash
   cd foobar/client
   npm install
   cd ../server
   npm install
   ```

3. Build the client-side code:

   ```bash
   npm run build
   ```

4. Copy the `build/static` folder into the server directory:


5. Set up configuration:

   - In the `config` folder of both client and server, modify the `config.js` file to include the appropriate IP address and port for your server.

## Usage

1. Run the server:

   ```bash
   node app.js
   ```

2. Access Foobar in your browser at `http://ip:port`.


## Work Process

Our development process follows these steps:

1. **Planning:** We start with brainstorming and defining the features and functionalities of Foobar and then we put it onto Jira.
2. **Design:** Once the requirements are clear, we move to the design phase.
3. **Implementation:** With the designs in hand, we proceed to implement the frontend components of Foobar, ensuring they meet the specified requirements.
