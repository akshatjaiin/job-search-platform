"use server"

import { GoogleGenerativeAI } from "@google-generative-ai"

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
      Analyze the following resume and provide structured feedback:
      
      ${resumeText}
      
      Focus on identifying key skills, areas for improvement, and potential job matches.
    `

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    })

    const response = result.response
    return response.text()
  } catch (error) {
    console.error("Error analyzing resume:", error)
    throw new Error("Failed to analyze resume")
  }
}

