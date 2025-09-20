import { gemini } from "./chatmodels";
import { ChatPromptTemplate } from "@langchain/core/prompts";

export async function chatbot({ question, chat_history }) {
  const model = gemini;
  const system_message = `You are a helpful assistant named 'NEERMITRA'. Your task is to answer the user query in a friendly and innovative way.
    You are provided a chat history use it when needed.

    User question is stated below : 
    user_question : {question}
    
    Chat history is provided below : 
    Chat History : {chat_history}

    RULES : 
    1. You have to in innovative and friendly way.
    2. If user ask any useless or inappropriate question refuse politly
    3. Use the provided chat history to get context of previous message.
    4. Try not to use emojis.
    5. If the user ask any thing personal to you answer politly but donot reveal internal data.
    `;

  // console.log("HERE_BOT_01");
  const prompt = ChatPromptTemplate.fromTemplate(system_message);

  const chain = prompt.pipe(model);
  const response = await chain.invoke({
    question,
    chat_history: JSON.stringify(chat_history),
  });
  const ai_answer = response.content.toString();
  // chat_history.push({ sender: "human", response: question });
  // chat_history.push({ sender: "ai", response: ai_answer });

  return { ai_answer, chat_history };
}
