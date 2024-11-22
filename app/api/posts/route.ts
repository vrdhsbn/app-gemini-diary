import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { createClient } from '@supabase/supabase-js'
import { generateText } from 'ai'
import { NextResponse } from 'next/server'

export const runtime = 'edge'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
)

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
})

export async function POST(req: Request) {
  const content = await req.text()
  const { data, error } = await supabase.from('diary_entries').insert({ content }).select()

  if (error) throw error

  // Generate AI comment
  const prompt = `あなたは私の人生の指導者であり、エキスパートのWeb系エンジニアでもあります。以下の入力文に日本語でコメントしてください。コメントの文字数は200文字前後にしてください。助言的かつ共感的で建設的な内容にしてください。ちょっとしたユーモアを交えたり絵文字を使うなどして親しみのある文体でお願いします。\n入力文： "${content}"`

  // console.log(`プロンプト： ${prompt}`)

  const result = await generateText({
    model: google('gemini-1.5-flash'),
    prompt: prompt,
  })

  const aiComment = result.text

  // console.log(`AIのコメント： ${aiComment}`)

  // Update the entry with the AI comment
  const { error: updateError } = await supabase
    .from('diary_entries')
    .update({ ai_comment: aiComment })
    .eq('id', data[0].id)

  if (updateError) throw updateError

  return NextResponse.json({ ...data[0], ai_comment: aiComment })
}
