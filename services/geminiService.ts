
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
        const prompt = `Using Google Search, find 5 recent and highly impactful research papers related to "${field}" published in the last 6 months. For each paper, provide the title, all authors, and a concise one-paragraph summary of its contributions.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                tools: [{ googleSearch: {} }],
            },
        });

        const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
        
        // This is a simplified regex to find paper sections. A more robust solution might be needed.
        const paperSections = response.text.split(/\d+\.\s/).filter(section => section.trim() !== "");

        const papers: Paper[] = paperSections.map((section, index) => {
            const titleMatch = section.match(/Title:\s*\"(.*?)\"/i);
            const authorsMatch = section.match(/Authors?:\s*(.*?)(?=\nSummary:|\n$)/i);
            const summaryMatch = section.match(/Summary:\s*(.*)/i);

            const paper: Paper = {
                title: titleMatch ? titleMatch[1] : 'Title not found',
                authors: authorsMatch ? authorsMatch[1].split(/,\s*and\s*|,\s*/) : [],
                summary: summaryMatch ? summaryMatch[1] : 'Summary not available.',
                url: groundingChunks?.[index]?.web?.uri,
                sourceTitle: groundingChunks?.[index]?.web?.title
            };
            return paper;
        });

        return papers.filter(p => p.title !== 'Title not found');

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
