'use client'

import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'

interface FloatingActionButtonProps {
  onClick: () => void
}

export default function FloatingActionButton({ onClick }: FloatingActionButtonProps) {
  return (
    <motion.button
      className='fixed bottom-8 right-8 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out'
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      <Plus size={24} />
    </motion.button>
  )
}
