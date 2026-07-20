const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: 'gemini-3.5-flash',
});

const extractRideSearch = async (message) => {
  const today = new Date().toISOString().split('T')[0];

  const prompt = `
You are an information extraction AI for a Lebanese ride-sharing application.

Today's date is ${today}.

Extract the ride search information from the user's message.

Rules:
- Return ONLY valid JSON.
- Do NOT include markdown or \`\`\`.
- Convert relative dates like "today", "tomorrow", and "next Monday" into YYYY-MM-DD format.
- If the user doesn't mention a date, return an empty string.
- Keep city names exactly as the user wrote them.

Return this schema:

{
  "from": "",
  "to": "",
  "date": ""
}

Examples:

User:
Find me a ride from Beirut to Tripoli tomorrow

Response:
{
  "from": "Beirut",
  "to": "Tripoli",
  "date": "2026-07-19"
}

User:
I need a ride from Saida to Beirut on July 25

Response:
{
  "from": "Saida",
  "to": "Beirut",
  "date": "2026-07-25"
}

User:
Find a ride from Tyre to Nabatieh

Response:
{
  "from": "Tyre",
  "to": "Nabatieh",
  "date": ""
}

User:
${message}
`;

  const result = await model.generateContent(prompt);

  return result.response.text();
};

module.exports = extractRideSearch;
