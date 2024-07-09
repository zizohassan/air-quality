
# Air Quality Monitoring Application

This is a NestJS application that monitors air quality using data from the IQAir API. The application stores the air quality data in a MariaDB database.

## Prerequisites

- Node.js (>= 18)
- MariaDB
- TypeORM

## Project Structure

- `src/`: Source code for the NestJS application.
- `src/air-quality/`: Contains the air quality feature module.
- `datasource.ts`: TypeORM datasource configuration file.
- `.env`: Environment configuration file.
- `.env.test`: Environment configuration file for testing .

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/air-quality-monitoring.git
   cd air-quality-monitoring
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create environment configuration:**

   Create a `.env` file in the root directory with the following content:

   ```env
   DATABASE_HOST=localhost
   DATABASE_PORT=3306
   DATABASE_USERNAME=user
   DATABASE_PASSWORD=password
   DATABASE_NAME=air_quality
   ```

## Running Migrations

Compile the TypeScript code and run the migrations to set up the database schema:

```bash
npm run migration:run
```

## Running the Application

1. **Start MariaDB:** Ensure your MariaDB server is running and accessible.

2. **Start the Application:**

   ```bash
   npm run start:dev
   ```

This will start the application in development mode with hot reloading. The application should be accessible at http://localhost:3000.

## Running Swagger

Swagger is used to document and test the API. To access the Swagger UI, open your browser and navigate to:
<br />
<br />
http://localhost:3000/api

This will provide an interactive documentation page for the API endpoints.


## Running Tests

1. **Unit Tests:**

Unit tests are used to test individual components of the application. To run the unit tests, use the following command:
```bash
npm run test
```

2. **Integration Tests**

Integration tests are used to test the application's components together, including interactions with the database. To run the integration tests, use the following command:

```bash
npm run test:e2e
```

## Project Commands

- `npm start`: Starts the application.
- `npm run start:dev`: Starts the application in development mode with hot reloading.
- `npm run start:prod`: Starts the application in production mode.
- `npm run build`: Builds the application.
- `npm run lint`: Lints the code.
- `npm run migration:run`: Runs the TypeORM migrations.
- `npm run test:e2e`: Runs the end-to-end tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
