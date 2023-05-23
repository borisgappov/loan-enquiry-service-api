# Loan Enquiry service API
To run it please use the command: 
```
docker-compose up
```
For testing, you can use Swagger UI http://localhost:3000/swagger

To generate new migration please start postgres container and execute command below:
```
npm run typeorm:win migration:generate -- apps/loans/src/migrations/{MIGRATION_NAME} -d apps/loans/migrations.ormconfig.ts --outputJs
```
please replace {MIGRATION_NAME} placeholder with new migration name. 

