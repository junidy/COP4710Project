# ClubHub
ClubHub is a website for colleges to be able to organize events and clubs and to make it easier for students to stay up-to-date and aware of what is going on at their campus. Any college can register themselves and can designate super admins and admins to oversee RSO creation, event creation, and users registering for their respective university.

## Repository Structure

- `FinalReport.pdf`
- `frontend`
    - React-based UI.
- `backend`
    - Express-based REST server.
- `database`
    - Contains `.sql` files for initializing the database and adding test data, respectively.

## Instructions
1. [Install MySQL](https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/). Then, in the `database` directory, execute the `ProjectSchema.sql` file, and then the `TestData.sql` file.
2. Ensure that the login and password to your local database are `root@localhost:3306` and `password` respectively, otherwise the database queries will not work properly.
3. Navigate to the `frontend` directory. Run `npm install`. Then run `npm run dev`.
4. Navigate to the `backend` directory. Run `npm install`. Then run `npm run dev`.
5. In your web browser, navigate to `localhost:5173`.