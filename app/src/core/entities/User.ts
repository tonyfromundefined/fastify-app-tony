import type { BaseDomainEvent, BaseReducer, Eventive } from "eventive";

export type UserEvent =
  | BaseDomainEvent<
      "user.created",
      {
        email: string;
      }
    >
  | BaseDomainEvent<"user.deleted", {}>;

export type UserState = {
  deletedAt?: string;
  email: string;
};

export type UserReducer = BaseReducer<UserEvent, UserState>;

export type UserRepository = {};
