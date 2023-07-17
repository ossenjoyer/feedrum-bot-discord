import { Colors } from "discord.js";
import { Feedback, FeedbackReason } from "../utils/feedback";

export default function FeedbackEmbed(feedback: Feedback) {
  return {
    title: "New feedback received",
    color:
      feedback.reason == FeedbackReason.Suggestion
        ? Colors.Yellow
        : feedback.reason == FeedbackReason.Bug
        ? Colors.Red
        : Colors.Green,
    fields: [
      { name: "Author", value: feedback.author },
      { name: "Reason", value: feedback.reason },
      { name: "Title", value: feedback.title },
      { name: "Description", value: feedback.description },
    ],
  };
}
