import type { BaseDomainEvent } from "eventive";

import { eventCreatedAt } from "./eventCreatedAt";
import { eventId } from "./eventId";

export function createTestEvent<
  DomainEvent extends BaseDomainEvent<string, {}>,
  EventName extends DomainEvent["eventName"],
>(params: {
  entityId: string;
  entityName: string;
  eventName: EventName;
  body: Extract<DomainEvent, { eventName: EventName }>["body"];
}): DomainEvent {
  return {
    eventCreatedAt: eventCreatedAt(),
    eventId: eventId(),
    entityId: params.entityId,
    entityName: params.entityName,
    eventName: params.eventName,
    body: params.body,
  } as any;
}
