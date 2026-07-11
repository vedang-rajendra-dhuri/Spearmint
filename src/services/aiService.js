import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error(
    "Gemini API key is missing. Please add VITE_GEMINI_API_KEY to your .env file."
  );
}

const ai = new GoogleGenAI({ apiKey });

export async function getAIRecommendations(userPreference, products) {
  // Split user query into keywords
  const keywords = userPreference
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 2);

  // Local search filter before sending to AI
  const filteredProducts = products.filter((product) => {
    const searchableText = `
      ${product.title}
      ${product.category}
      ${product.description}
    `.toLowerCase();

    return keywords.some((keyword) =>
      searchableText.includes(keyword)
    );
  });

  // If nothing matches, send all products
  const productsToSend =
    filteredProducts.length > 0 ? filteredProducts : products;

  const productList = productsToSend.map((product) => ({
    id: product.id,
    title: product.title,
    category: product.category,
    description: product.description,
    price: product.price,
    rating:
      typeof product.rating === "object"
        ? product.rating.rate
        : product.rating,
  }));

  const prompt = `
You are an AI Product Recommendation Assistant.

Recommend ONLY products from the provided list.

Rules:
- Never invent products.
- Recommend the BEST matching products.
- Return maximum 5 products.
- Return ONLY valid JSON.

User Request:
"${userPreference}"

Available Products:
${JSON.stringify(productList, null, 2)}

Return exactly:

{
  "recommended": [
    { "id": 1 },
    { "id": 2 }
  ]
}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    let text = response.text;

    if (!text) {
      throw new Error("Gemini returned an empty response.");
    }

    text = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    console.log("Gemini Response:", text);

    const parsed = JSON.parse(text);

    if (!parsed.recommended || !Array.isArray(parsed.recommended)) {
      return [];
    }

    return parsed.recommended
      .map((item) => item.id)
      .filter((id) => productList.some((p) => p.id === id));

  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error(error.message || "Failed to get AI recommendations.");
  }
}