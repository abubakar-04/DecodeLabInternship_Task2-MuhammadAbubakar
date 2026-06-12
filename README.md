# DecodeLabs Project 2 - Backend API Development

This project is a simple backend API built with Node.js. It uses only the built-in `http` module, so no package installation is required.

## Requirements Covered

- Create backend API endpoints
- Support `GET` and `POST` requests
- Handle user input and JSON responses
- Validate basic data
- Return useful HTTP status codes

## Run The Project

```bash
npm start
```

The API will run at:

```text
http://localhost:3000
```

## Endpoints

### `GET /`

Returns a welcome message and available endpoints.

### `GET /health`

Checks if the server is running.

### `GET /tasks`

Returns all tasks.

### `POST /tasks`

Creates a new task.

Example JSON body:

```json
{
  "title": "Complete backend API project"
}
```

## Example Test Commands

```bash
curl http://localhost:3000/tasks
```

```bash
curl -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d "{\"title\":\"Submit Project 2\"}"
```
