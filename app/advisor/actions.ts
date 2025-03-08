"use server"

import { GoogleGenerativeAI } from "@google/generative-ai"

export async function analyzeResumeForChat(resumeText: string) {
  try {
    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set")
    }

    const genAI = new GoogleGenerativeAI(apiKey)

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    })

    const generationConfig = {
      temperature: 0.2,
      topP: 0.8,
      topK: 40,
      maxOutputTokens: 8192,
    }

    const prompt = `
      Analyze the following resume and provide structured feedback in JSON format:
      
      ${resumeText}
      
      Return a JSON object with the following structure:
      {
        "skills": {
          "present": [string],
          "missing": [string]
        },
        "jobMatches": [
          {
            "id": string,
            "title": string,
            "company": string,
            "match": number (0-100),
            "reasons": [string]
          }
        ],
        "careerAdvice": string,
        "learningPaths": [
          {
            "skill": string,
            "resources": [string]
          }
        ]
      }
      
      Focus on providing actionable insights that would help a fresh graduate find suitable job opportunities.
    `

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    })

    const response = result.response
    return JSON.parse(response.text())
  } catch (error) {
    console.error("Error analyzing resume for chat:", error)
    throw new Error("Failed to analyze resume")
  }
}

