import type { UserReducer } from "./User";
import { UserEventName } from "./User";

export const reducer: UserReducer = (prevState, event) => {
  switch (event.eventName) {
    case UserEventName.Created: {
      return {
        email: event.body.email,
      };
    }
    case UserEventName.Deleted: {
      return {
        ...prevState,
        deletedAt: event.eventCreatedAt,
      };
    }
  }
};
