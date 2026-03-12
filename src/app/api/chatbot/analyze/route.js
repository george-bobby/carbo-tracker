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
				'You explain carbon footprint impacts clearly and briefly. Give practical environmental context and include concrete estimates when they are reasonable.',
			prompt: `Explain how the following activity contributes to the carbon footprint in detail: ${input.trim()}. Provide specific metrics or environmental impacts in a concise paragraph.`,
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