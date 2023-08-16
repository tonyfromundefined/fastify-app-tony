import type { Eventive } from "eventive";
import { eventive } from "eventive";
import type { Db } from "mongodb";

import type { UserEvent, UserState } from "../core/entities";
import { userReducer } from "../core/entities";

export type UserRepository = Eventive<UserEvent, UserState>;

export function makeUserRepository({ db }: { db: Db }): UserRepository {
  return eventive({
    db,
    entityName: "User",
    reducer: userReducer,
  });
}
