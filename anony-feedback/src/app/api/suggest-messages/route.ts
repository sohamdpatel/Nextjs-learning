import { OpenAI } from 'openai'; // The actual OpenAI client from 'openai'
import { streamText } from 'ai'; // The general streamText helper from 'ai' (or '@ai-sdk/core')
import { openai as openaiProvider } from '@ai-sdk/openai'; // The AI SDK's OpenAI provider helper, aliased to avoid name conflict
import { NextResponse } from 'next/server';

// Initialize your actual OpenAI client instance
const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge'; // Crucial for Vercel's Edge functions

export async function POST(req: Request) {
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    const result = streamText({
      // This is the correct way to pass the OpenAI client instance and model settings
      // to the AI SDK's completion provider.
      model: openaiProvider.completion(openaiClient, { model: 'gpt-3.5-turbo-instruct' }),
      prompt: prompt, // Use 'prompt' for completion models
      maxTokens: 400, // max_tokens is camelCase here
    });

    // FIX FOR SECOND ERROR: Use 'toDataStreamResponse'
    return result.toDataStreamResponse();

  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      // OpenAI API error handling
      const { name, status, headers, message } = error;
      return NextResponse.json({ name, status, headers, message }, { status });
    } else {
      // General error handling
      console.error('An unexpected error occurred:', error);
      // For Edge runtime, return a specific error response instead of throwing
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
  }
}