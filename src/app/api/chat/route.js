import { chatbot } from "../chatbot_functions/chatbot";

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body) {
      return Response.json(
        {
          success: false,
          message: "User request error",
        },
        { status: 400, statusText: "Request not found" }
      );
    }

    const { user_query, history_chat } = body;
    // console.log(user_query)
    // console.log(history_chat)
    if (!user_query || !history_chat) {
      return Response.json(
        {
          success: false,
          message: "Bad request",
        },
        { status: 400 }
      );
    }

    // console.log("HERE_01");
    const {ai_answer, chat_history} = await chatbot({
      question: user_query,
      chat_history: history_chat,
    });
    // console.log("HERE_02");

    if (!ai_answer || !chat_history) {
      return Response.json(
        {
          success: false,
          message: "No Response from AI",
        },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      message: "Ai message recieved successfully",
      ai_answer,
      chat_history,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Error fetching data",
        error,
      },
      { status: 500 }
    );
  }
}
