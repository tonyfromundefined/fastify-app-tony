import type { BaseDomainEvent, BaseReducer, Eventive } from "eventive";

export enum UserEventName {
  Created = "user.created",
  Deleted = "user.deleted",
}

export type UserEvent =
  | BaseDomainEvent<
      UserEventName.Created,
      {
        email: string;
      }
    >
  | BaseDomainEvent<UserEventName.Deleted, {}>;

export type UserState = {
  deletedAt?: string;
  email: string;
};

export type UserReducer = BaseReducer<UserEvent, UserState>;

export type UserRepository = Eventive<UserEvent, UserState>;
