'use client'

import type { DiaryEntry } from '@/app/types/DiaryEntry'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { motion } from 'framer-motion'
import {} from 'react'
import ReactMarkdown from 'react-markdown'

interface DiaryEntriesProps {
  entries: DiaryEntry[]
}

export default function DiaryEntries({ entries }: DiaryEntriesProps) {
  return (
    <div className='space-y-6'>
      <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Your Entries</h2>
      {entries.map((entry, index) => (
        <motion.div
          key={entry.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className='shadow-md hover:shadow-lg transition-shadow duration-300'>
            <CardHeader>
              <CardTitle className='text-xl font-medium text-gray-700'>
                {new Date(entry.created_at).toLocaleString('ja-JP', {
                  // weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-gray-600 mb-4'>{entry.content}</p>
              {entry.ai_comment && (
                <div className='bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-md'>
                  <div className='flex items-center gap-1 mb-2'>
                    <Avatar className='w-8 h-8'>
                      <AvatarImage src='/images/ai-avatar.png' alt='AI' className='rounded-full' />
                    </Avatar>
                    <h4 className='font-semibold text-indigo-700'>AIより:</h4>
                  </div>
                  <ReactMarkdown
                    components={{
                      p: ({ node, ...props }) => (
                        <p {...props} className='text-gray-700 mb-2 text-sm' />
                      ),
                    }}
                  >
                    {entry.ai_comment}
                  </ReactMarkdown>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
