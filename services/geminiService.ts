
import { GoogleGenAI, Type } from "@google/genai";
import type { Keyword, Paper, Idea } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const keywordsSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            keyword: { type: Type.STRING, description: "The trending keyword or phrase." },
            description: { type: Type.STRING, description: "A brief explanation of the keyword's relevance." },
            score: { type: Type.INTEGER, description: "A popularity score from 1-100, where 100 is most popular." },
        },
        required: ["keyword", "description", "score"],
    },
};

const papersSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            title: { type: Type.STRING, description: "The full title of the paper." },
            authors: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "A list of the primary authors."
            },
            summary: { type: Type.STRING, description: "A concise one-paragraph summary of the paper's key findings." },
            publicationDate: { type: Type.STRING, description: "The publication date in YYYY-MM-DD format." },
            sourceTitle: { type: Type.STRING, description: "The name of the conference or journal (e.g., 'arXiv', 'NeurIPS 2023')." }
        },
        required: ["title", "authors", "summary", "publicationDate", "sourceTitle"],
    },
};

const ideasSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            title: { type: Type.STRING, description: "A compelling and novel title for a research paper." },
            keywords: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "A list of relevant keywords for this research idea."
            },
            outline: { type: Type.STRING, description: "A brief paragraph outlining the proposed research direction, including problem statement and methodology." },
        },
        required: ["title", "keywords", "outline"],
    },
};

export const getTrendingKeywords = async (field: string): Promise<Keyword[]> => {
    try {
        const prompt = `As a research analyst, identify the top 5-7 trending keywords in the field of "${field}" over the last three months. Provide a popularity score and a brief description for each.`;
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: keywordsSchema,
            },
        });

        const jsonString = response.text;
        const result = JSON.parse(jsonString);
        return result.sort((a: Keyword, b: Keyword) => b.score - a.score);

    } catch (error) {
        console.error(`Error fetching trending keywords for ${field}:`, error);
        return [];
    }
};

export const getLatestPapers = async (field: string): Promise<Paper[]> => {
    try {
        const prompt = `As a research domain expert for "${field}", find the 5-7 most significant and recent papers published in the last 2 years. I need a structured list of these papers.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: papersSchema,
            },
        });

        const jsonString = response.text;
        const papers = JSON.parse(jsonString);

        // Sort by publication date descending to ensure the newest are first
        papers.sort((a: Paper, b: Paper) => {
            const dateA = a.publicationDate ? new Date(a.publicationDate).getTime() : 0;
            const dateB = b.publicationDate ? new Date(b.publicationDate).getTime() : 0;
            return dateB - dateA;
        });

        return papers;

    } catch (error) {
        console.error(`Error fetching latest papers for ${field}:`, error);
        return [];
    }
};


export const getResearchIdeas = async (field: string): Promise<Idea[]> => {
    try {
        const prompt = `Based on current trends in "${field}", generate 3 novel and promising research paper ideas. These ideas should ideally bridge different concepts within the field or apply a new technique to an existing problem.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: ideasSchema,
            },
        });

        const jsonString = response.text;
        return JSON.parse(jsonString);

    } catch (error) {
        console.error(`Error fetching research ideas for ${field}:`, error);
        return [];
    }
};