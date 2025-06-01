# Expense Tracker API Documentation

## Authentication

### Login
`POST /api/auth/login`

Request:
```json
{
    "email": "user@example.com",
    "password": "hashedPassword"
}