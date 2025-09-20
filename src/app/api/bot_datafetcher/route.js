import axios from "axios";

export async function POST(request) {
  const body = await request.json();
  if (!body) {
    return Response.json(
      {
        success: false,
        message: "Request not fetched",
      },
      { status: 400 }
    );
  }

  const { query, chat_history } = body;
  if (!query || query.length == 0 || query == "") {
    return Response.json(
      {
        success: false,
        message: "User query not found",
      },
      { status: 400 }
    );
  }

  const response = await axios.post("https://chatbot-interface-ingres-sih.vercel.app/chat", {
    query: query,
    chat_history: chat_history,
  });

  console.log(response.data)
//   const jsoned_response = await response.data.json()
  return Response.json(
    {
      success: true,
      message: "Chat bot responded successfully",
      data: response.data,
    },
    { status: 200 }
  );
}
