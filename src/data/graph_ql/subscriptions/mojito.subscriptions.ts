import { gql } from "@apollo/client";

export enum EMojitoSubscriptions {
  timeNotifier,
}

export const mojitoSubscriptions = {
  [EMojitoSubscriptions.timeNotifier]: gql`
    subscription TimeNotifier {
      timeNotifier {
        time
      }
    }
  `,
};
