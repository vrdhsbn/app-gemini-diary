import type { DiaryEntry } from '@/app/types/DiaryEntry'
import supabase from './supabase'

export async function getDiaryEntries(page: number, pageSize = 10): Promise<DiaryEntry[]> {
  const { data, error } = await supabase
    .from('diary_entries')
    .select('*')
    .order('created_at', { ascending: false })
    .range((page - 1) * pageSize, page * pageSize - 1)

  if (error) throw error
  return data
}
