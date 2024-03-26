# examples
Colstonjs examples


## Prerequisite
- [x] Ensure Bun and TypeScript are both installed and properly configured on the test/dev environment machine.

## Usage - api
- Clone repository 
- cd into `api`
- run `bun server.ts`
- We have the following endpoints

```bash
### post a single note
Host: 127.0.0.1:8000
POST /api/v1/note HTTP/1.1
Content-Type: application/json

{
  "title": "New note Note one",
  "note": "this is my first test note"
}


### get single note
Host: 127.0.0.1:8000
GET /api/v1/note/:id HTTP/1.1
Content-Type: application/json


### get all notes
Host: 127.0.0.1:8000
GET /api/v1/notes HTTP/1.1
Content-Type: application/json


### patch a specific resource
Host: 127.0.0.1:8000
PATCH /api/v2/note HTTP/1.1
Content-Type: application/json

{
  "id": "L4JPI2tLmXMpwmaPcUZZlfuLljW7JYPP2hfmYcmSQ",
  "title": "Edited Note Title zero",
  "note": "this is my first test note"
}


### delete a single note
Host: 127.0.0.1:8000
DELETE /api/v1/:id HTTP/1.1
Content-Type: application/json

```

## Usage - ws
- Clone repository
- cd into `ws/simple`, `ws/chat`, or `ws/pub-sub`
- run `bun server.ts`
- to connect to the server, run `bun [client.ts | client1.ts | client2.ts]` depending on the case.

_Note - for the pub-sub and the chat examples, it is important to use a browser client or Postman or any other client that is capable of connecting and sending WebSocket messages independently._


Take a look at the below Postman collection for all `HTTP` requests in the example repository.

<a href="#">
  <img src="./img/postman.jpeg" width="120">
</a>