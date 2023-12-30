// On each promt record we must be able to read it (GET request), update it(PATCH request), and delete it(delete request)

import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET endpoint:  GET from 'http://localhost:3000/api/prompt/[id]'
export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate("creator");

        if(!prompt){
            return new Response("Prompt Not Found", { status: 404 });
        }

        return new Response(JSON.stringify(prompt), { status: 200 });

    } catch (error) {
        
        return new Response("Failed to fetch prompt data", { status: 500 });
    }
}

// Patch Endpoint
export const PATCH = async (request, { params }) => {

    const { prompt, tag } = await request.json();

    try {
        await connectToDB();
        
        const existingPrompt = await Prompt.findById(params.id);

        if(!existingPrompt){
            return new Response("Prompt Not Found", { status: 404 });
        }

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), { status: 200 });   

    } catch (error) {
        
        return new Response("Failed to update prompt.", { status: 500 });

    }
}

// Delete Endpoint:
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        await Prompt.findByIdAndDelete(params.id);

        return new Response("Prompt Deleted Successfully", { status: 200 });
        
    } catch (error) {
        console.log(error);
        return new Response("Failed to Delete Prompt!", { status: 500 });
    }
}