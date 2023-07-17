import { Attachment, Collection } from "discord.js";

export enum FeedbackReason {
  Suggestion = "Suggestion",
  Feedback = "Feedback",
  Bug = "Bug",
}

export class Feedback {
  constructor(
    public readonly author: string,
    public readonly reason: string,
    public readonly title: string,
    public readonly description: string,
    public readonly attachments: Collection<string, Attachment>
  ) {
    console.log(reason, reason in FeedbackReason);
    if (!(reason in FeedbackReason)) {
      throw new Error(
        `invalid feedback reason (use one of the following: ${Object.values(
          FeedbackReason
        ).join("|")})`
      );
    }

    if (title.length < 3 || title.length > 24) {
      throw new Error(
        `invalid title length (min. 3 characters; max. 24 characters)`
      );
    }

    if (description.length < 6 || description.length > 128) {
      throw new Error(
        `invalid description length (min. 6 characters; max. 128 characters)`
      );
    }
  }

  toString(): string {
    return `
    Author: ${this.author}
    Reason: ${this.reason}
    Title: ${this.title}
    Description: ${this.description}
    `.trim();
  }
}
