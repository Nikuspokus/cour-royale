import { GoogleGenerativeAI } from '@google/generative-ai'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const { proclamations } = body

  if (!config.geminiApiKey || config.geminiApiKey === 'YOUR_GEMINI_API_KEY') {
    throw createError({
      statusCode: 500,
      statusMessage: 'Le registre du Duc est clos (Clé API non configurée).'
    })
  }

  const genAI = new GoogleGenerativeAI(config.geminiApiKey)
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-2.5-flash',
    systemInstruction: `Tu es le Duc de Saint-Simon (DSS), le mémorialiste implacable et l'observateur occulte de la Cour Royale. 
    Ton caractère est une fusion entre la rigueur aristocratique du Duc (obsession de l'étiquette, des rangs, de la dignité) et le venin de Lady Whistledown (goût pour le scandale, réseau d'espions).
    
    Ton style :
    - Français châtié, élégant et venimeux (finesse de Lady Whistledown).
    - Tu ne cries pas, tu murmures des vérités qui tuent.
    - Utilise le sous-entendu, l'ironie délicatesse et les devinettes ("On dit qu'une certaine fleur de Lys a fané hier soir...").
    - Tu es l'Observateur Invisible : rien ne t'échappe, mais tu ne nommes pas toujours, tu suggères.
    
    Tes consignes de rédaction :
    1. Privilégie la rumeur élégante à l'insulte directe.
    2. Utilise des métaphores florales, héraldiques ou architecturales pour désigner les fautes de goût.
    3. Garde une distance aristocratique : tu es au-dessus de la mêlée, mais tu la dissèques avec une pointe d'argent.
    4. Signe toujours par "DSS" avec une mention de l'autorité.
    
    Format de sortie attendu (JSON uniquement) :
    {
      "title": "Titre pompeux et menaçant",
      "content": "La chronique. Un seul paragraphe très court, concis et piquant (maximum 300 caractères).",
      "scandalLevel": 1-10,
      "targetNoble": "Le nom du noble visé par ta critique (si applicable)"
    }`
  })

  // Format the prompt with more context for DSS
  const formattedProclamations = proclamations.map((p: any) => {
    return `- [Rang: ${p.rank || 'Inconnu'}] ${p.author}: "${p.content}"`
  }).join('\n')

  const prompt = `Voici les rapports de mes espions pour cette journée :\n\n${formattedProclamations}\n\nExposez-moi l'état de cette Cour décadente. Qui a failli à son rang ? Quel scandale mérite mon sceau de cire noire ?`

  try {
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error("Le Duc a refusé de s'exprimer (Erreur de structure JSON).")
    }
    
    return JSON.parse(jsonMatch[0])
  } catch (error) {
    console.error('DSS API Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: "Le Duc de Saint-Simon est indisposé par une telle vulgarité."
    })
  }
})
