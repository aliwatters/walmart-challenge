# Walmart Take Home Challenge

https://gist.github.com/daniyalzade/8e32cd266aebd6d2ce35

## Challenge;

For a list of ids;

1. retrieve data from Walmart API - and store
2. create a simple REST service to serve data
3. create a simple react frontend to browse

## To Run

Prerequisites; (developed with)
* node v10.10
* npm v6.4.1
* expects ports 3000, 3088 to be unused

1. in the import directory - run;
  `node import.js; node translate.js`
2. in the api directory - run;
  `node server.js` -- api running on `http://localhost:3088/`
3. in the front end directory - run;
  `npm start` -- browser should start and point to `http://localhost:3000/`

## Approach

See the "issues" tab, each commit was tagged against an issue, each issue was broken down into sub-tasks.

I didn't follow a git branching strategy (working within a team would do that), merged against master.

## Follow up work

*KNOWN BUGS*

* data - lots of stop words not removed
* data - didn't clean up html encoding so "&quot;'s" common
* react app - flash of prior products on starting to type in search box

*If this was a "real world" project:*

1. data would be in a database, search would be performed in the database
2. tests would be more extensive both on backend and frontend
3. Hapi API would be created in a more modular fashion, each route in a separate file or plugin.
4. HTTPS - everywhere.
5. the react app is a simple demo, again each component in it's own file, look at if redux would be a better choice for state, add bootstrap or whatever UI/UX framework is chosen.
6. lots of work to productionize all of this! SLIs, SLOs defined and implemented, config from env vars of etc'd, hooking into CI/CD
7. and lots more...

## Results

![Image of WalReactMart](https://raw.githubusercontent.com/aliwatters/walmart-challenge/master/WalReactMart.png)
