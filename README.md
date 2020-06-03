# Forms, Back-end and Front-end

This is a simple program we wrote for our Internet Engineering course at Shahid Beheshti University. The general idea is, users can open the application and see a list of forms. They can choose a form from that list, and fill it with their information. Then their information will be sent to the back-end to be processed. Also, there's an admin who can add forms by sending some requests to the back-end. I will explain types of requests and front-end abilities in more detail at the rest of the README.

## Running on Your Own System

You have to install Node.js on your system. You can check if you already have it by typing this command:

```
node --version
```

If you don't have this package, just follow the instructions from [Node.js' official website](https://nodejs.org/en/download/).

You'll also the Yarn package. You can check if you already have it on your system by typing this command:

```
yarn --version
```

I you don't have it, follow the instructions from [Yarn's official website](https://classic.yarnpkg.com/en/docs/install/#debian-stable).

Once you setup these packages, clone this project from the repository. On the project's root you'll see two folders: _front_ and _back_. Open the terminal on the root folder. Then go to each folder and install it's dependencies. You can install the back-end's dependencies by typing `npm install`. The front-end's dependencies can be installed using `yarn install`.

And as the last step, you need to create two _environment variables_. Go to the back-end folder, and type `echo 'PORT=8000' >.env` in your command line. Then go to the front folder and type `echo 'REACT_APP_GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY' >.env` in your command line. We assume that you already have an active Google API Key in your pocket. Checkout [Google Maps Platform](https://developers.google.com/maps/documentation/javascript/get-api-key) for more details about how to get an API Key.

Now the program is ready! First run the back-end by going to the _back_ folder and type `npm start`. Then go to the _front_ folder and type `yarn start` to start the front-end. At this point, a tab should pop up in your browser and You should be able to see the program's home page.

## Back-end

The back-end has four endpoints that you can use. Although you only need to work with one of them, and the other three are used within the front-end.

-   **/api/forms/**: By sending a GET request to this path, you'll get all of the available forms' description in JSON format.

-   **/api/forms/:id**: By sending a GET request to this path, you'll get the respective form's description in JSON format.

-   **/api/post_form/**: When a form is submitted, its information will be sent to this path with a POST request.

-   **/api/admin/add/**: Admin can make a POST request to this path, to add a new form to the program. Form's description has to be available it the request's body. I should note that in this phase there's no authentication, so anyone can add a new form to the program.

I recommend using [Postman](https://www.postman.com/) to easily perform these requests.

Note to less technical users: After you started the back-end, these paths will be available within _localhost:8000/_. For example you can get the list of forms by sending a GET request to _localhost:8000/api/forms/_ (or simply by typing it in your browser).

## Front-end

I think the front-end is pretty self-explanatory, As all front-ends should be.

## Implementation Details

Here's a brief description about the code files in the project.

**back/**

-   _resources/repository.json_: Forms' descriptions are stored in this file.

-   _src/app.js_: Main program in back-end. Starts the back-end and does some additional stuff to set things up.

-   _src/controller.js_: Handles routings and requests.

-   _src/repository.js_: Loads the data from _repository.json_, and adds data to it if needed.

**front/**

-   _public/index.html_: The HTML file for project. If you're not familiar with React, notice that there's a `<div id="root"></div>` in the file, which is where the React app takes place when started.

-   _src/App.js_: Handles the routings for the front-end.

-   _src/index.js_: Renders the React app.

-   _src/components/Forms.js_: This component loads all of the forms, and shows a list of them. The user can click on each form and go to that form's page.

-   _src/components/MyForm.js_: This component loads a single form in the page. The user can then fill the form and submit it.
