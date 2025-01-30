export const extractQuestions = (text: string) => {
  return text.match(/[^.!?]*\?/g) || [];
};
