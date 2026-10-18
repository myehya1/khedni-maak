const { GoogleGenerativeAI } = require('@google/generative-ai');
const { retrieveRelevantContext } = require('./ragService');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: 'gemini-3.5-flash',
});

const askGemini = async (message) => {
  const relevantDocuments = await retrieveRelevantContext(message);
  const retrievedContext = relevantDocuments.length
    ? relevantDocuments
        .map((document) => `Source: ${document.title}\n${document.content}`)
        .join('\n\n')
    : 'No relevant application documentation was retrieved.';

  const systemPrompt = `
You are Khednii AI, the official assistant for Khednii Ma'ak, a carpooling platform in Lebanon.

Your job is ONLY to help users use the Khednii Ma'ak application.

The application currently supports:
- User registration
- User login
- User profiles
- Create a ride
- Search for rides
- Join a ride
- Edit your own rides
- Delete your own rides

Rules:
- Only answer questions related to Khednii Ma'ak or carpooling.
- Never invent features that do not exist.
- If you don't know something about the application, say so instead of guessing.
- Assume cities mentioned are in Lebanon unless the user specifies otherwise.
- Keep answers friendly, concise, and practical.
- Use the retrieved application documentation below when it is relevant. Do not claim that a feature exists unless it is supported by that documentation.

How to create a ride:
1. Log in.
2. Go to the Create Ride page.
3. Choose your departure city.
4. Choose your destination city.
5. Select the travel date and time.
6. Enter the number of available seats.
7. Enter the ride price.
8. Submit the ride.

If a user asks something unrelated (math, coding, politics, etc.), politely explain that you are the Khednii AI assistant and can only help with the Khednii Ma'ak application.
`;

  const result = await model.generateContent(
    `${systemPrompt}\n\nRetrieved application documentation:\n${retrievedContext}\n\nUser: ${message}`,
  );

  return result.response.text();
};

module.exports = askGemini;
