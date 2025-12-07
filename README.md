# High level design

![Architecture Diagram 1](https://raw.githubusercontent.com/subhraneel2005/trpc-realtime-notification-service/main/web/public/architecture-diagram-1.png)
![Architecture Diagram 2](https://raw.githubusercontent.com/subhraneel2005/trpc-realtime-notification-service/main/web/public/architecture-diagram-2.png)

---

## Event flow during user signin

### this is only a notifcations service, so connecting to ws server on user login

![Initial event flow after user login](https://raw.githubusercontent.com/subhraneel2005/trpc-realtime-notification-service/main/web/public/event0.png)

---

## e2e JWT token flow

### this is the e2e flow of the jwtToken from client to server, so that private function/procedures are properly authenticated through the token

![e2e flow of jwt token from client to server](https://raw.githubusercontent.com/subhraneel2005/trpc-realtime-notification-service/main/web/public/jwtToken-flow.png)

---

## e2e post like and notification flow

### this is the full e2e flow of what happens when user1 likes user2's post

---

### flow1

just after user1 likes user2's post there are two websocket events that are fired (1 inbound and 2 outbounds)

### flow2

at first the inbound event (user1's client to the server) goes and does 2 tasks. one to update likes count in the db and the other is to asynchronously send the LIKE_POST event to the ws server.

### flow3

then the ws server constructs a NOTIFICATION_EVENT to send to the post author client and a LIKE_ACK_EVENT to send to user1 client. therefore the ws server sends 2 outbound events (server to client)

---

### payload of the inbound (LIKE_POST) event

```
{
  "event": "LIKE_POST",
  "userId": "user1",
  "postId": "post2"
}
```

### payload of the outbound (NOTIFICATION) event

```
{
  "event": "NOTIFICATION",
  "notification": {
    "type": "LIKE",
    "liked_by": "user2",
    "post_liked_on": "post1",
    "post_author": "user1"
  }
}
```

---

![feed screen wireframe](https://raw.githubusercontent.com/subhraneel2005/trpc-realtime-notification-service/main/web/public/feedScreen.png)

![initial like flow](https://raw.githubusercontent.com/subhraneel2005/trpc-realtime-notification-service/main/web/public/like0.png)

![main e2e like flow](https://raw.githubusercontent.com/subhraneel2005/trpc-realtime-notification-service/main/web/public/mainLikeFlow.png)

![outbound and inbound events diagram](https://raw.githubusercontent.com/subhraneel2005/trpc-realtime-notification-service/main/web/public/eventsFlowLike.png)
