import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        // Fetching posts from DB related to only that id which we get in params... 
        const prompts = await Prompt.find({creator: params.id}).populate('creator');

        return new Response(JSON.stringify(prompts), { status: 200 });
        
    } catch (error) {
        
        return new Response("Failed to fetch prompt data", { status: 500 });
    }
}