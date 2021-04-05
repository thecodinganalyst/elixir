# Elixir

Elixir is a frontend web application builder, that allows users to create the user interface for their web applications easily with json data files. It is built with [Angular](https://angular.io/), implementing the [Material design system](https://material.io/) with [Angular Material](https://material.angular.io/).

This project is still work-in-progress, and many features have not been implemented. But it is actively in development.


## Prerequisite

- Node & Npm: [Node](https://nodejs.org/en/) is to be installed before the project can be built


## Building 

After downloading/cloning the code to local, open a terminal and run `npm install` in the project folder to install dependencies needed for this project.

In the same terminal window, run `ng serve` and navigate to `http://localhost:4200/` on a browser.

## Testing

Run `ng test` for unit tests, and `ng e2e` for end to end testing

## Code coverage

Run `ng test --no-watch --code-coverage` to generate the code coverage report, which will be generated in the `coverage` folder. Open the index.html in the folder to view the report

## Production build

Run `ng build --prod`, and the production ready files will be generated in the `dist` folder. Copy the results to a web server to serve. 

If a webserver is not available, install [serve](https://www.npmjs.com/package/serve) with `npm install -g serve`, navigate to `/dist/elixir` and run `serve`. The url to access the served pages will be shown in the terminal - `http://localhost:5000`.

