import { openai } from "@/lib/openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { rawIdea } = await request.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a Web3 credential expert that generates ideas for on-chain verifiable credentials (Creds). Each Cred can contain multiple NFTs that users can mint by meeting specific on-chain criteria. Focus on Web3 achievements like: transaction history, token holdings, protocol interactions, governance participation, etc. Generate a credential idea in JSON format with the following fields: name (name of the Cred collection), description (what the Cred represents), criteria (specific on-chain requirements to qualify), verification_process (technical process to verify the criteria), links (relevant protocol/documentation links), type (category like 'DeFi', 'NFT', 'Governance' etc)",
        },
        {
          role: "user",
          content:
            rawIdea ||
            "Generate a Web3 credential idea that verifies on-chain activity",
        },
      ],
    });

    const ideaText = completion.choices[0].message.content;
    if (!ideaText) {
      throw new Error("No content received from OpenAI");
    }

    const formattedIdea = JSON.parse(ideaText);
    formattedIdea.created_at = new Date().toISOString();
    formattedIdea.type = "generated"; // Set type to "generated" by default for AI responses

    return NextResponse.json({ formattedIdea });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to generate idea" },
      { status: 500 }
    );
  }
}
