'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface DiaryFormProps {
  onEntrySubmitted: () => void
}

export default function DiaryForm({ onEntrySubmitted }: DiaryFormProps) {
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await fetch('/api/posts/', {
        method: 'POST',
        body: content,
      })
      setContent('')
      onEntrySubmitted()
    } catch (error) {
      console.error('Error submitting diary entry:', error)
    }
    setIsSubmitting(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className='shadow-lg'>
        <CardHeader>
          <CardTitle className='text-2xl font-semibold text-gray-800'>New Entry</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <Textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="What's on your mind today?"
              className='min-h-[150px] text-gray-700'
            />
            <Button
              type='submit'
              disabled={isSubmitting}
              className='w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105'
            >
              {isSubmitting ? 'Submitting...' : 'Save Entry'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
