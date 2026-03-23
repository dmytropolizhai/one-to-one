# Email Service

This service provides a REST API to send emails using the Resend platform.

## Configuration

The service requires the following environment variables:

- `RESEND_API_KEY`: Your API key from Resend.
- `EMAIL_FROM`: The sender's email address (optional, defaults to support@one-to-one.polizhai.site).
- `PORT`: The port on which the server will listen (optional, defaults to 3002).

## API Reference

### Send OTP Email

`POST /send-otp`

Request Body:
```json
{
  "to": "user@example.com",
  "code": "123456"
}
```

Response:
```json
{
  "success": true
}
```

## Getting Started

### Installation
```bash
pnpm install
```

### Development
```bash
pnpm run dev
```

### Build
```bash
pnpm run build
```

### Production
```bash
pnpm start
```

## Docker

### Build Image
```bash
docker build -t email-service .
```

### Run Container
```bash
docker run -p 3002:3002 --env RESEND_API_KEY=your_key email-service
```
