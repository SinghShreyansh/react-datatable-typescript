# React-Datatable

The web application is designed to pull user data from a user API and display it in a table. It also includes functionalities such as creating, deleting, and editing users, as well as sorting and pagination. The UI components used in the application are badges, button components, and pagination.

## Functional Requirements

The web application has the following functional requirements:

- Pull user data from a user API (JSONPlaceholder can be used as a mock API , I used dummy json using json-server).
- Display user data in a table format.
- Create a user using a modal.
- Edit a user's name and role.
- Delete a user.
- Sort the user list based on different columns.
- Implement pagination to display a limited number of users per page.
- Display the last login field as a string in [RFC3339 format](https://www.rfc-editor.org/rfc/rfc3339) (optional).

## Getting Started

To get started with the web application, follow the steps below:

### Prerequisites

Before running the application, ensure you have the following software installed:

- Node.js: [Download and install Node.js](https://nodejs.org/en/download/)

### Setting Up the Project

1. Download the zip folder of this repository or clone it using gitbash by following command
   ```bash
   git clone https://github.com/SinghShreyansh/react-datatable-typescript/

2. if downloaded a zip then extract it first.
3. Now go into your folder path 

   ```bash
   cd <folder-name>
   
4. Now install all dependencies using npm
     ```bash
     npm install

5. Once all dependencies gets installed , start the react application
     ```bash
     npm run dev
Then your react application will start at  Local:   http://localhost:5173/ 🥳

Note - this appliaction is fetching json data first then doing other things, so to give a json data to my application I created a json-server, which is present in json-server folder.

6. So, to start it first go to json-server directory
   ```bash
    cd json-server

7. Now install all dependencies using npm(just require json-server dependencies)
     ```bash
      npm install

8. Once all dependencies gets installed , start the json-server application
     ```bash
      npm start
It will get start on http://localhost:3000/user 🥳

Now your application will run successfully.
