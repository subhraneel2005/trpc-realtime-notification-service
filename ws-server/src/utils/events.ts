export const WS_EVENTS = {
  CONNECTION: "connection_init",
  LIKE_POST: "like_post",
  CONNECTION_ACK: "connection_ack",
  NOTIFICATION: "notification_event",
  ERROR: "error_event",
  PING: "ping",
  PONG: "pong",
} as const;

export type WSEvent = (typeof WS_EVENTS)[keyof typeof WS_EVENTS];
