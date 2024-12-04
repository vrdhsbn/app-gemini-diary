import type { DiaryEntry } from '@/app/types/DiaryEntry'
import supabase from './supabase'

export async function getDiaryEntries(): Promise<DiaryEntry[]> {
  const { data, error } = await supabase
    .from('diary_entries')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10)

  if (error) throw error
  return data
}
