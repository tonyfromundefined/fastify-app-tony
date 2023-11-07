import type { BaseDomainEvent } from "eventive";

import { eventCreatedAt } from "./eventCreatedAt";
import { eventId } from "./eventId";

export function createTestEvent<
  DomainEvent extends BaseDomainEvent<string, {}>,
  EventName extends DomainEvent["eventName"],
>(params: {
  body: Extract<DomainEvent, { eventName: EventName }>["body"];
  entityId: string;
  entityName: string;
  eventName: EventName;
}): DomainEvent {
  return {
    body: params.body,
    entityId: params.entityId,
    entityName: params.entityName,
    eventCreatedAt: eventCreatedAt(),
    eventId: eventId(),
    eventName: params.eventName,
  } as any;
}
