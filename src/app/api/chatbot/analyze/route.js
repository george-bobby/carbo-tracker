import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

const CHATBOT_MODEL = 'gemini-2.5-flash';

export async function POST(req) {
	try {
		const { input } = await req.json();

		if (!input || !input.trim()) {
			return Response.json({ error: 'Input is required.' }, { status: 400 });
		}

		const { text } = await generateText({
			model: google(CHATBOT_MODEL),
			system:
				'You explain carbon footprint impacts clearly and briefly. Give practical environmental context and include concrete estimates when they are reasonable. Always format the response in clean markdown. Use a short opening sentence, then bullet points or numbered points for the main breakdown, and use bold or italics for emphasis where helpful.',
			prompt: `Explain how the following activity contributes to the carbon footprint: ${input.trim()}. Format the answer in markdown with:
- a short summary sentence
- 3 to 5 bullet points or numbered points for the main impacts
- brief concrete examples or estimates when relevant
- a short closing takeaway
Keep it readable and human, not robotic.`,
		});

		return Response.json({ text });
	} catch (error) {
		console.error('Chatbot analyze error:', error);

		return Response.json(
			{ error: error?.message || 'Failed to generate response.' },
			{ status: 500 }
		);
	}
}