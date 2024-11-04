const classifier = () => {
  const result = {
    therapist: 'Test therapist',
    info: 'test object',
  };
  return result;
};

const sanitizeInput = (input) => {
  const escapedInput = input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const sanitizedInput =
    escapedInput.length > 100 ? escapedInput.substring(0, 100) : escapedInput;
  return sanitizedInput;
};

export { classifier, sanitizeInput };
