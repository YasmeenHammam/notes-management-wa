## Introduction
We will continue from hw1, the previous website. The main goal of this task is to write a backend server instead of the JSON server in hw1.

1. We will use a Mongo database service from Atlas.
2. The database will hold the notes data.
3. We will use Express to implement the backend, which will support fetching, adding, deleting, and removing messages.
4. implement a logger middleware: log to file called "log.txt".
5. Most of the material can be found in [Full Stack Open- part 3](https://fullstackopen.com/en/part3).
6. In hw1, I accidentally used 'note' and 'post'. As a result, many people use '/posts.json' instead of '/notes.json' as a JSON server input, so we changed the tests to fit both. From HW2 on, we'll align on 'note.'. Please change the HTML names of the buttons and in other places from 'post' to 'note'.
7. Warning: the University's firewall prevents connection with Atlas. If you have to work from the university, you can  [install](https://www.mongodb.com/docs/manual/installation/) a local mongodb server, just for development inside BGU.

## Submission
1. Submission is in pairs, but starting alone is better for practice.
2. Coding: 70%, Questions: 30%.
3. Your submitted git repo should be *private*, please make barashd@post.bgu.ac.il and nitzanlevy (github username) collaborators.
4. Do not use external libraries that provide the pagination component. If in doubt, contact the course staff.
5. Deadline: 30.6.24, end of day.
6. Additionally, solve the [theoretical questions](https://forms.gle/r4gVbb16KKNjmW1e8).
7. Fill in repository details in (Moodle's "הגשה מטלה 2").
8. Use Typescript in the front end.
9. The ex2 forum is open for questions in Moodle.
10. Git repository content:
    1. Aim for a minimal repository size that can be cloned and installed:  most of the files in github should be code and package dependencies (package.json).
    2. Don't submit node_modules dir, .next project dir, JSON creation script, .env file, or JSON files.
11. If a specific use case is not described here, you can code it as you see fit.
12. the submission commit will be tagged as "a2": [git tagging](https://git-scm.com/book/en/v2/Git-Basics-Tagging)
    1. git tag -a a2 -m "msg"
    2. git push origin --tags


## AI
Recommendation about using an AI assistant: You can ask questions and read the answers but never copy them. Understand the details, but write the code yourself. If two people copy the same AI code, it will be considered plagiarism.

## Plagiarism
1. We use a plagiarism detector.
2. The person who copies and the person who was copied from are both responsible. Set your repository private, and don't share your code.


## Code
1. Please put the previous code in a subdirectory called "frontend" and create a new directory called "backend." you can use the same GitHub link.
2. As before, we will run the frontend on port 3000 and the backend on port 3001.
3. The backend will use the .env file to define your environment variables:
    1. Atlas connection string: You'll use your own, and the tests will use a new .env file. (Details in 'backend' below).

### Github 
As before, You will submit HW2 will be submitted via Github.

## Prerequisites
### Tools
The hw1 tools, plus:
1. Enable requests between the frontend and backend by using cors in the backend: [CORS](https://fullstackopen.com/en/part3/deploying_app_to_internet#same-origin-policy-and-cors), note the expose headers parameter: it's needed to allow the browser to access your custom headers.
2. Read the local .env file: [dotenv](https://www.npmjs.com/package/dotenv)
3. The backend uses Mongoose to query the database. [mongoose](https://mongoosejs.com/docs/index.html)
4. Use nodemon to rerun the backend automatically when the source file changes. [nodemon](https://www.npmjs.com/package/nodemon)
5. Refresh: Read about [await/async](https://javascript.info/async-await)
6. What is [express](https://expressjs.com)
7. Use [Postman](https://www.postman.com/downloads/) for backend testing.
8. Use [Nodemon](https://www.npmjs.com/package/nodemon) to auto refresh the backend after saving its code.
   

## Initialize a mongo server
1. We will use the Mongo database to store the notes. It can be local or external to your machine. This task will use the external.
2. We will follow the example from [Saving data to MongoDB- MongoDB](https://fullstackopen.com/en/part3/saving_data_to_mongo_db#mongo-db). 
3. Open a free account and initialize a new database in Atlas.

## Frontend Description:
1. The front end should connect to the backend with Axios HTTP requests.
2. The UI will have buttons (see backend section for routes description):
    1. add an edit button for each note: Replace the content with an editable text initialized with the note's current content.
    2. For each note, add a delete button.
    2. One "add new note" button.
3. Like before, each page has ten notes. The backend is now responsible for fetching only ten at a time.


## Backend Description:
1. The front end should connect to the backend with Axios HTTP requests.
2. Like before, each page has ten notes. You can use Mongoose's pagination API to bring 10 notes only from Atlas.[Queries with limit example](https://mongoosejs.com/docs/queries.html), [Skip](https://mongoosejs.com/docs/api/query.html#Query.prototype.skip()), if you want to use other libraries, please ask in the forum.
3. The backend should use dotenv to read the ".env" file. It will contain "MONGODB_CONNECTION_URL = '...'", which Mongoose will use.
4. Routes:
    1. Get all notes, HTTP GET request to '/notes.' 
    2. Get the i'th note, GET request to '/notes/[i].' (For example, http://localhost:3001/notes/1)
    3. Create a new note POST request to '/notes.'
    4. Update the i'th note, PUT request to 'notes/[i].'
    5. Delete the i'th note, DELETE request to 'notes/[i].'
5. The backend will have a middleware logger for the incoming HTTP requests; it will log to a file called "log.txt":
    1. time
    2. HTTP request method.
    3. request target path
    4. request body



## Atlas Description:
1. Like before, the destination Mongodb will always contain at least one note.
2. Like in the full-stack course (link above), the collection name is `notes,` and the schema will match the `note structure`:
```
{
 id: number;
 title: string;
 author: {
 name: string;
 email: string;
 } | null;
 content: string;
};
```

3. Read and use the following error codes: [HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
    1. Unknown route/note number: 404
    2. Generic error response, cannot delete/update note: 500
    4. Missing fields in the request: 400.
    5. Success codes:
        1. Saved note: 201.
        2. Deleted note: 204.
        3. Other: 200.

## Checking the coding task:

## Front End test requirements- reminder from hw1
1. Each note should be of [class name](https://www.w3schools.com/html/html_classes.asp) **"note"**. (And not post)
2. A note must get the unique ID from the database and use it as the [html id attribute](https://www.w3schools.com/html/html_id.asp).
3. Pagination buttons:
    1. Navigation buttons should be with [html name attribute](https://www.w3schools.com/tags/att_name.asp) **"first"**, **"previous"**, **"next"**, **"last"**.
    2. Page buttons should be with the [html name attribute](https://www.w3schools.com/tags/att_name.asp) **"page-<target_page_number>"**

## Front End test requirements- hw2
1. Each note should have an `Edit`/`Delete` button.
2. Edit button: we will only test the body of the edited note, (content field).
    1. name attribute: **"edit-<note_id>"**  [html name attributes](https://www.w3schools.com/tags/att_name.asp). For example, "edit-1".
    2. When clicked, a text input should be rendered:
        1. with the same input as the note.
        2. It should be editable
        3. with name **"text_input-<note_id>"**
        4. with "save" button **"text_input_save-<note_id>"**
        5. with "cancel" button **"text_input_cancel-<note_id>"**

3. Delete button:
    1. name **"delete-<note_id>"** [html name attributes](https://www.w3schools.com/tags/att_name.asp). For example, "delete-1".

4. `Add new note` button: we will only test the body of the new note, (content field).
    1. button name **"add_new_note"**. [html name attributes](https://www.w3schools.com/tags/att_name.asp).
    2. When clicked, React should render a text input:
        1. It should be editable
        2. with name **"text_input_new_note"**
        3. with "save" button **"text_input_save_new_note"**
        4. with "cancel" button **"text_input_cancel_new_note"**
5. There should be a global "theme" button that changes between two styles: dark and light.
    1. name attribute: **"change_theme"**.
    2. You're free to implement any style change, as long as it appears visually on the UI.
6. Data transfer: 10 notes at a time, (frontend-backend, backend-atlas, see Mongoose pagination API, similarly to hw1).
   


### The tester will:
1. `git clone <your_submitted_github_repo>`
2. `cd <cloned_dir>`
3. `git checkout a2`
4. `npm install` from the `frontend` dir (package.json should exist)
5. `npm run dev` from the `frontend` dir  (configured to default port 3000)
3. Copy a `.env` file into the `backend` dir.
4. `npm install` from the `backend` dir (package.json should exist)
5. `node index.js` from the `backend` dir (configured to default port 3001)
6. Run tests based on 'test requirement'.



## Good luck!

