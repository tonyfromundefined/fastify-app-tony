import type { BaseDomainEvent, BaseReducer } from "eventive";

export type UserEvent =
  | BaseDomainEvent<
      "created",
      {
        email: string;
      }
    >
  | BaseDomainEvent<"deleted", {}>;

export type UserState = {
  email: string;
  deletedAt?: string;
};

export const userReducer: BaseReducer<UserEvent, UserState> = (
  prevState,
  event,
) => {
  switch (event.eventName) {
    case "created": {
      return {
        email: event.body.email,
      };
    }
    case "deleted": {
      return {
        ...prevState,
        deletedAt: event.eventCreatedAt,
      };
    }
  }
};
