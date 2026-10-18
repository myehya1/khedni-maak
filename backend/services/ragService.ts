const { GoogleGenerativeAI } = require('@google/generative-ai');

export interface RetrievedDocument {
  title: string;
  content: string;
  score: number;
}

interface KnowledgeDocument {
  title: string;
  content: string;
}

// Keep this content limited to features that exist in the application.
// Add or edit documents here when the product changes.
const knowledgeBase: KnowledgeDocument[] = [
  { title: 'Account registration and login', content: 'Users can register with a name, email address, and password. After registering, they can log in with their email address and password. Logging in gives the user access to protected actions such as offering a ride and viewing their profile.' },
  { title: 'Offering a ride', content: 'To offer a ride, a user must log in, open the Create Ride page, choose a departure city and destination city, select a future travel date and time, enter the number of available seats and price, then submit the form. Departure and destination cannot be the same.' },
  { title: 'Searching for rides', content: 'Anyone can search available rides from the Search Rides page. Search can filter by departure city, destination city, and date. The app excludes past rides from normal search results.' },
  { title: 'Joining and leaving rides', content: 'A logged-in user can join an available ride that was created by another user. Joining a ride decreases its available seats by one. A passenger can leave a ride they joined, which restores one available seat. Users cannot join their own rides or join the same ride twice.' },
  { title: 'Managing rides', content: 'A ride creator can edit or delete their own rides. Other users cannot edit or delete a ride created by someone else. The profile page shows rides created by the user and rides the user has joined.' },
  { title: 'Profile and account deletion', content: 'The profile page displays the signed-in user and their created and joined rides. A user can delete their account. When an account is deleted, its created rides are deleted and the user is removed from passenger lists on rides they joined.' },
  { title: 'AI ride search', content: 'The chatbot recognizes messages asking to find or search for a ride. It extracts departure city, destination city, and an optional date, then searches the ride database. It can report matching ride details when rides are available.' },
];

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const embeddingModel = genAI.getGenerativeModel({ model: 'text-embedding-004' });
let documentEmbeddings: number[][] | null = null;

const cosineSimilarity = (first: number[], second: number[]) => {
  const length = Math.min(first.length, second.length);
  let dotProduct = 0;
  let firstMagnitude = 0;
  let secondMagnitude = 0;
  for (let index = 0; index < length; index += 1) {
    dotProduct += first[index] * second[index];
    firstMagnitude += first[index] ** 2;
    secondMagnitude += second[index] ** 2;
  }
  return firstMagnitude && secondMagnitude ? dotProduct / Math.sqrt(firstMagnitude * secondMagnitude) : 0;
};

const keywordScore = (query: string, content: string) => {
  const terms = query.toLowerCase().match(/[a-z]{3,}/g) || [];
  const searchableContent = content.toLowerCase();
  return terms.length ? terms.filter((term) => searchableContent.includes(term)).length / terms.length : 0;
};

const getDocumentEmbeddings = async () => {
  if (documentEmbeddings) return documentEmbeddings;
  const response = await embeddingModel.batchEmbedContents({
    requests: knowledgeBase.map((document) => ({ content: { role: 'user', parts: [{ text: document.content }] } })),
  });
  documentEmbeddings = response.embeddings.map((embedding) => embedding.values);
  return documentEmbeddings;
};

export const retrieveRelevantContext = async (query: string, limit = 3): Promise<RetrievedDocument[]> => {
  try {
    const [queryResponse, embeddings] = await Promise.all([embeddingModel.embedContent(query), getDocumentEmbeddings()]);
    return knowledgeBase
      .map((document, index) => ({ ...document, score: cosineSimilarity(queryResponse.embedding.values, embeddings[index]) }))
      .filter((document) => document.score >= 0.35)
      .sort((first, second) => second.score - first.score)
      .slice(0, limit);
  } catch (error) {
    // The chatbot remains available if the embedding model is unavailable.
    console.error('RAG retrieval failed; using keyword retrieval instead.', error);
    return knowledgeBase
      .map((document) => ({ ...document, score: keywordScore(query, document.content) }))
      .filter((document) => document.score > 0)
      .sort((first, second) => second.score - first.score)
      .slice(0, limit);
  }
};
