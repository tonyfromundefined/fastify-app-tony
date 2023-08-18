import type { BaseDomainEvent, BaseReducer } from "eventive";

export enum WebhookTargetEvent {
  UserCreated = "user.created",
}

export type WebhookEvent =
  | BaseDomainEvent<
      "create",
      {
        webhookId: string;
        targetEvents: WebhookTargetEvent[];
      }
    >
  | BaseDomainEvent<
      "update",
      {
        targetEvents: WebhookTargetEvent[];
      }
    >
  | BaseDomainEvent<"delete", {}>;

export type WebhookState = {
  webhookId: string;
  targetEvents: WebhookTargetEvent[];
  deletedAt?: string;
};

export const webhookReducer: BaseReducer<WebhookEvent, WebhookState> = (
  prevState,
  event,
) => {
  switch (event.eventName) {
    case "create":
      return {
        webhookId: event.body.webhookId,
        targetEvents: event.body.targetEvents,
      };
    case "update":
      return {
        ...prevState,
        targetEvents: event.body.targetEvents,
      };
    case "delete":
      return {
        ...prevState,
        deletedAt: event.eventCreatedAt,
      };
  }
};
