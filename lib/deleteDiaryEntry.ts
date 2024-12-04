import supabase from './supabase'

export async function deleteDiaryEntry(id: string): Promise<void> {
  const { error } = await supabase.from('diary_entries').delete().eq('id', id)

  if (error) throw error
}
