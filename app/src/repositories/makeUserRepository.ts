import type { Db } from "mongodb";

import { eventive } from "eventive";

import type { UserRepository } from "../core/entities/User";

import { reducer } from "../core/entities/User.reducer";

export function makeUserRepository({ db }: { db: Db }): UserRepository {
  return eventive({
    db,
    entityName: "User",
    reducer,
  });
}
