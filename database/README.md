# database

This README refers to the Database subproject of the corretores-online monorepo.
The code only contains the database migrations for the corretores-online project, but a few more steps are required to set up the database.
The technologies used in this subproject are:

- [PostgreSQL](https://www.postgresql.org/) (version 12 or higher)
- [pgAdmin](https://www.pgadmin.org/)
- [DBeaver](https://dbeaver.io/)

## Setting up the database

- After downloading the technologies listed above, you will need to create the corretores-online database in your PostgreSQL instance.
  Technically, you can name the database whatever you want, but the default name is `corretoresOnline`, and it might be better for compatibility reasons.

- Save your database user and password! You will need them to connect the backend to the database.

- Once everything is set up, you will have to run the migrations in the `migrations` folder. They have to be run in order, so you should start with the `202311220031_schema.sql` file and then run the rest of the files in order. (note that the name of the file is YYYYMMDDHHMM_description.sql, where the description is a brief explanation of what the migration does)

- After running all the migrations, you will have to run a few Insert statements to populate the database with some initial data. The files are in the `seeds` folder, and they should be run in order as well.
