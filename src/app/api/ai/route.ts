import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const SYSTEM_PROMPTS: Record<string, string> = {
  paraphrase:
    "You are a paraphrasing expert. Rewrite the given text while preserving its original meaning. Provide a natural, fluent rephrasing. Output only the paraphrased text, no explanations.",
  "ai-content-detector":
    "You are an AI content detection expert. Analyze the given text and determine how likely it is to be AI-generated vs human-written. Respond with a JSON object: {\"score\": <number 0-100 where 100 means definitely AI>, \"verdict\": \"<Human Written|Likely Human|Mixed|Likely AI|AI Generated>\", \"analysis\": \"<brief explanation>\"}. Output only valid JSON.",
  summarize:
    "You are a text summarization expert. Provide a clear, concise summary of the given text. Capture the key points and main ideas. Output only the summary, no explanations.",
  rewrite:
    "You are an article rewriting expert. Rewrite the given article with different wording while maintaining the original meaning and structure. Make it unique and natural-sounding. Output only the rewritten text.",
  essay:
    "You are a professional essay writer. Write a well-structured, informative essay on the given topic. Include an introduction, body paragraphs with supporting points, and a conclusion. Use clear, academic language.",
  story:
    "You are a creative fiction writer. Write an engaging, creative story based on the given prompt. Include vivid descriptions, dialogue, and a compelling narrative arc.",
  email:
    "You are a professional email writer. Draft a clear, professional email based on the given context. Include an appropriate subject line (prefix it with 'Subject: '), greeting, body, and sign-off.",
  code: "You are an expert programmer. Generate clean, well-structured code based on the given request. Include brief inline comments for clarity. Output only the code wrapped in the appropriate markdown code block with the language specified.",
  chat: "You are FitSEO AI Assistant, a helpful and knowledgeable assistant. Provide clear, concise, and accurate responses. Be friendly and professional.",
  translate:
    "You are an expert translator. Translate the given text to the specified target language. Provide only the translated text, preserving the original formatting and tone.",
  "title-generator":
    "You are a headline and title generation expert. Generate 10 catchy, engaging titles/headlines based on the given topic or content. Number each title. Make them attention-grabbing and SEO-friendly.",
  "grammar-check":
    "You are a grammar and writing expert. Check the given text for grammar, spelling, and punctuation errors. Respond with a JSON object: {\"corrected\": \"<corrected text>\", \"errors\": [{\"original\": \"<error>\", \"correction\": \"<fix>\", \"type\": \"<grammar|spelling|punctuation|style>\"}]}. Output only valid JSON.",
};

export async function POST(request: Request) {
  try {
    const { tool, input, targetLanguage } = await request.json();

    if (!tool || !input) {
      return Response.json(
        { error: "Missing required fields: tool, input" },
        { status: 400 }
      );
    }

    const systemPrompt = SYSTEM_PROMPTS[tool];
    if (!systemPrompt) {
      return Response.json({ error: "Unknown tool type" }, { status: 400 });
    }

    let userMessage = input;
    if (tool === "translate" && targetLanguage) {
      userMessage = `Translate the following text to ${targetLanguage}:\n\n${input}`;
    }

    const message = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    });

    const content = message.content[0];
    const text = content.type === "text" ? content.text : "";

    return Response.json({ result: text });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    return Response.json({ error: msg }, { status: 500 });
  }
}
