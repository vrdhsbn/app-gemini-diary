'use client'

import type { DiaryEntry } from '@/app/types/DiaryEntry'
import DiaryEntries from '@/components/DiaryEntries'
import DiaryForm from '@/components/DiaryForm'
import FloatingActionButton from '@/components/FloatingActionButton'
import { deleteDiaryEntry } from '@/lib/deleteDiaryEntry'
import { getDiaryEntries } from '@/lib/getDiaryEntries'
import { AnimatePresence, motion } from 'framer-motion'
import { BookMarked } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Home() {
  const [showForm, setShowForm] = useState(false)
  const [entries, setEntries] = useState<DiaryEntry[]>([])

  const fetchEntries = async () => {
    const fetchedEntries = await getDiaryEntries()
    setEntries(fetchedEntries)
  }

  // biome-ignore lint:
  useEffect(() => {
    fetchEntries()
  }, [])

  // 投稿の新規作成時にデータを取得し直す
  const handleNewEntry = () => {
    fetchEntries()
  }

  // 投稿の削除処理
  const handleDeleteEntry = async (id: string) => {
    if (window.confirm('投稿を削除します。よろしいですか？')) {
      try {
        await deleteDiaryEntry(id)
        await fetchEntries()
      } catch (error) {
        console.error('Error deleting entry:', error)
      }
    }
  }

  return (
    <div className='space-y-8'>
      <header className='text-center'>
        <h1 className='flex justify-center mb-2'>
          <BookMarked size={40} className='text-gray-800' />
        </h1>
        <p className='text-gray-600 italic'>Capture your thoughts, receive AI insights</p>
      </header>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <DiaryForm onEntrySubmitted={handleNewEntry} />
          </motion.div>
        )}
      </AnimatePresence>

      <DiaryEntries entries={entries} onDeleteEntry={handleDeleteEntry} />

      <FloatingActionButton onClick={() => setShowForm(!showForm)} />
    </div>
  )
}
