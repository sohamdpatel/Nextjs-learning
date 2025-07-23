import { google } from "@ai-sdk/google";
import { APICallError, generateText, streamText } from "ai";
import { NextResponse } from "next/server";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    console.log("post method called");

    const result = await generateText({
      model: google("gemini-1.5-flash"),
      prompt:
        "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.",
    });

    // console.log(" this is full result : ", result);

    return NextResponse.json({ message: result.text }, { status: 200 });
  } catch (error) {
    if (error instanceof APICallError) {
      const { statusCode, responseBody, responseHeaders, data } = error;

      return NextResponse.json({
        statusCode,
        headers: responseHeaders,
        body: responseBody,
        data,
        message: "Error while api call",
      });
    } else {
      console.error("An unexpected error occured", error);
      throw error;
    }
  }
}
