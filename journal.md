# SDC Engineering Journal and Notes

Brenton Hershner

API Specifications
Which api did you choose? Why?

Product. We decided on Group 3’s FEC app before selecting our api’s. Tony did the Product Detail Module for Group 3 so he couldn’t do the Product api. Gabe was interested in Q&A over 

Product and I didn’t have a strong preference, so took it.

What will you have to do to recreate this api? 

Implement a relational database to access and deliver the data.

Find ways to scale the deployment and make the api as performant as possible. 

What is it’s main functionality or purpose?

Deliver the results of a query to the product endpoint

What are important design/styles to create for the user experience?

Very fast and efficient code. Scalable infrastructure.

Optimizing Performance

What can be optimized? What are the trade-offs?

[TODO]

Performance notes.  What did you try? What is the difference in performance? Does the page load faster or create a better user experience? 

[TODO]

Other Notes

[TODO]

Error Messages / Resources / New Techniques you learned, etc.

## Template or suggested daily topics:

- What went well?  What could be improved?
- What went badly?  What have you tried? What is next step?
- What observations do you have on the work done today? Yours? Others?
- Not many. Just initial understanding of the problem at hand.
- What pointers or advice would you give someone who is facing the day you just had?  
- I wish I’d….
- What bugs/problems did you encounter? How did you explore it? How did you get past it?

## Daily Reflections 2021-05-03 W8D1

- Good first day with the new group. We setup a lot of sytems. We were unclear on some of the - requirements. We could have asked clarifying questions sooner.
- The Google form link didn’t work for many. Someone asked for help but it didn’t seem too - important so the answer was deferred until tomorrow morning.
- Setup a Trello board for the group.
- Selected a set of technologies to be implemented in the SDC sprint.
- Defined a database schema for the product api.


![](https://i.imgur.com/I8Dvx23.png)

What went well?  What could be improved?

Good first day with the new group. We setup a lot of sytems. We were unclear on some of the requirements. We could have asked clarifying questions sooner.

What went badly?  What have you tried? What is next step?

The Google form link didn’t work for many. Someone asked for help but it didn’t seem too important so the answer was deferred until tomorrow morning.

What observations do you have on the work done today? Yours? Others?

Not many. Just initial understanding of the problem at hand.

What pointers or advice would you give someone who is facing the day you just had?  

I wish I’d….



What bugs/problems did you encounter? How did you explore it? How did you get past it?

## Daily Reflections 2021-05-04 W8D2

** Engage critically with your work and learning process.  Copy this page each day to do a short reflection on your progress.

Daily summary of what you worked on & what you learned

What went well?  What could be improved?

What went badly?  What have you tried? What is next step?

What observations do you have on the work done today? Yours? Others?

What pointers or advice would you give someone who is facing the day you just had?  
I wish I’d….

What bugs/problems did you encounter? How did you explore it? How did you get past it?

To launch Postgres: sudo -i -u postgres

Psql postgres without the -U

## Daily Reflections 2021-05-05 W8D3

Spent a lot of time trying to determine how to best parse the csv data and save it back as a cleaned file.

## Daily Reflections 2021-05-06 W8D4

Csv-parse and csv-parser are ***NOT*** the same.

Parsing a csv with mismatched quotes needs to be done by ignoring the quote character. Parse({quote:false}).

## Daily Reflections 2021-05-07 W8D5

To start up the database:

    psql postgres
https://www.postgresqltutorial.com/psql-commands/

To run a file from within postgres: 

    \i filename

With a filepath, it should be like this, but I wasn't able to get this to work...

    \i \path\TO\file_name.sql

https://kb.objectrocket.com/postgresql/how-to-run-an-sql-file-in-postgres-846

Alternatively, it can be loaded with javascript:

https://bezkoder.com/node-js-csv-postgresql/

Navigating within psql:

    \cd ..
    \cd folder
    \! ls -l

When creating tables, use commas but **not** after the last statement. Also, don't forget your semicolons.

In Postgres, use `TEXT` instead of `VARCHAR(n)` for unlimited length.

**Be careful about syntax differences with mySQL!!!**

UNSIGNED  and TINYINT are not a valid data types in postgres. Use INTEGER instead of INT.

https://stackoverflow.com/questions/2991405/what-is-the-difference-between-tinyint-smallint-mediumint-bigint-and-int-in-m


