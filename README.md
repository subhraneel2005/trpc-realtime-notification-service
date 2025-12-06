# High level design

![Architecture Diagram 1](https://raw.githubusercontent.com/subhraneel2005/trpc-realtime-notification-service/main/web/public/architecture-diagram-1.png)  
![Architecture Diagram 2](https://raw.githubusercontent.com/subhraneel2005/trpc-realtime-notification-service/main/web/public/architecture-diagram-2.png)

## Event flow during user signin

### this is only a notifcations service, so connecting to ws server on user login

![Initial event flow after user login](https://raw.githubusercontent.com/subhraneel2005/trpc-realtime-notification-service/main/web/public/event0.png)

## e2e JWT token flow

### this is the e2e flow of the jwtToken from client to server, so that private function/procedures are properly authenticated through the token

![e2e flow of jwt token from client to server](https://raw.githubusercontent.com/subhraneel2005/trpc-realtime-notification-service/main/web/public/jwtToken-flow.png)
