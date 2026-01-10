import { RoundFormData } from "../interfaces/shared.interface";

export const transformToCreateRoundPayload = (
  values: RoundFormData,
  jobId: string
) => {
  // Transform skills to API format
  const skillsForRound = values?.skills?.map((skill) => [
    {
      propertyId: "69525c30c9ba83a076aac44b",
      key: "skill",
      value: skill,
    },
  ]);

  // Transform questions array
  const questions: any[] = [];

  // Add custom questions
  if (values?.questionType === "hybrid") {
    values?.customQuestionTexts?.forEach((questionText, index) => {
      if (questionText?.trim()) {
        questions.push([
          {
            propertyId: "69525d19c9ba83a076aac44f",
            key: "question",
            value: questionText,
          },
          {
            propertyId: "69525d77c9ba83a076aac450",
            key: "qType",
            value: "custom",
          },
        ]);
      }
    });
  }

  const valuesArray = [
    {
      propertyId: "69525a92c9ba83a076aac43d",
      key: "roundName",
      value: values?.roundName,
    },
    {
      propertyId: "69525ad1c9ba83a076aac43f",
      key: "roundType",
      value: values?.roundType,
    },
    {
      propertyId: "69525aefc9ba83a076aac440",
      key: "roundObjective",
      value: values?.roundObjective,
    },
    {
      propertyId: "69525bb8c9ba83a076aac448",
      key: "duration",
      value: values?.duration,
    },
    {
      propertyId: "69525c1cc9ba83a076aac44a",
      key: "accessibility",
      value: "Private", // Default to Private as per new payload structure
    },
    {
      propertyId: "69525c5ac9ba83a076aac44c",
      key: "skillsForRound",
      value: skillsForRound,
    },
    {
      propertyId: "69525c85c9ba83a076aac44d",
      key: "questionsType",
      value: values?.questionType,
    },
    {
      propertyId: "69525ca7c9ba83a076aac44e",
      key: "numOfAiQuestions",
      value:
        values.questionType === "ai" || values.questionType === "hybrid"
          ? values.aiGeneratedQuestions
          : 0,
    },
    {
      propertyId: "69525dbbc9ba83a076aac453",
      key: "questions",
      value: questions,
    },
    {
      propertyId: "69525dd4c9ba83a076aac454",
      key: "interviewInstructions",
      value: values?.interviewInstructions,
    },
    {
      propertyId: "69525decc9ba83a076aac455",
      key: "allowSkip",
      value: values?.allowSkip,
    },
    {
      propertyId: "69525e05c9ba83a076aac456",
      key: "sendReminder",
      value: values?.sendReminder,
    },
    {
      propertyId: "69525e47c9ba83a076aac457",
      key: "reminderTime",
      value: values?.sendReminder ? values?.reminderTime : "",
    },
    {
      propertyId: "69525e6bc9ba83a076aac458",
      key: "numOfCustomQuestions",
      value: values?.questionType === "hybrid" ? values?.customQuestions : 0,
    },
    {
      propertyId: "69576660c9ba83a076aac596",
      key: "formUser",
      value: ["6938f9fb2276e3fc3ac7b328"], // TODO: Get from auth context
    },
    {
      propertyId: "6960b827c9ba83a076aac89b",
      key: "jobName",
      value: jobId,
    },
    {
      propertyId: "6960b94ec9ba83a076aac89c",
      key: "interviewerName",
      value: "69576a84c9ba83a076aac5a0", // TODO: Get interviewer name/ID
    },
  ];

  return {
    values: valuesArray,
    propertyIds: [
      "69525a07c9ba83a076aac437",
      "69525a38c9ba83a076aac439",
      "69525a60c9ba83a076aac43b",
      "69525a92c9ba83a076aac43d",
      "69525ad1c9ba83a076aac43f",
      "69525aefc9ba83a076aac440",
      "69525b69c9ba83a076aac443",
      "69525bb8c9ba83a076aac448",
      "69525bf5c9ba83a076aac449",
      "69525c1cc9ba83a076aac44a",
      "69525c5ac9ba83a076aac44c",
      "69525c85c9ba83a076aac44d",
      "69525ca7c9ba83a076aac44e",
      "69525dbbc9ba83a076aac453",
      "69525dd4c9ba83a076aac454",
      "69525decc9ba83a076aac455",
      "69525e05c9ba83a076aac456",
      "69525e47c9ba83a076aac457",
      "69525e6bc9ba83a076aac458",
      "69576660c9ba83a076aac596",
      "6960b827c9ba83a076aac89b",
      "6960b94ec9ba83a076aac89c",
    ],
    flows: [
      {
        stageId: "1",
        status: "PENDING",
      },
    ],
    status: "PENDING",
    formId: "69521d61c9ba83a076aac3c3",
  };
};
