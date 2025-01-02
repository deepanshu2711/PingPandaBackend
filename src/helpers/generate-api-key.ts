export const generateApiKey = (user_id: string): string => {
  const randomDigits = Math.random().toString().slice(2, 10);
  return `pingpanda_${user_id}_${randomDigits}`;
};
