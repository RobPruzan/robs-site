'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

export function CornerCreature() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring physics for eye movement
  const eyeX = useSpring(mouseX, { stiffness: 100, damping: 25 })
  const eyeY = useSpring(mouseY, { stiffness: 100, damping: 25 })

  // Transform mouse position to constrained eye movement range
  const rotateX = useTransform(eyeY, [0, 1], [-10, 10])
  const rotateY = useTransform(eyeX, [0, 1], [-10, 10])

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event
      const { innerWidth, innerHeight } = window
      
      // Normalize mouse position to 0-1 range
      mouseX.set(clientX / innerWidth)
      mouseY.set(clientY / innerHeight)
      
      setMousePosition({ x: clientX, y: clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <motion.div 
      className="fixed top-4 right-4 w-24 h-24 pointer-events-none"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Panda Body */}
      <div className="relative w-full h-full">
        {/* Main body - sitting pose */}
        <div className="absolute bottom-0 right-0 w-20 h-16 bg-white rounded-3xl" />
        <div className="absolute bottom-2 right-2 w-16 h-12 bg-black rounded-2xl" />
        
        {/* Head */}
        <div className="absolute bottom-8 right-4 w-14 h-12 bg-white rounded-full">
          {/* Ears */}
          <div className="absolute -top-2 -left-1 w-4 h-4 bg-black rounded-full" />
          <div className="absolute -top-2 -right-1 w-4 h-4 bg-black rounded-full" />
          
          {/* Eyes */}
          <motion.div 
            className="absolute top-3 left-2 w-3 h-3 bg-black rounded-full"
            style={{ rotateX, rotateY }}
          >
            <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full" />
          </motion.div>
          <motion.div 
            className="absolute top-3 right-2 w-3 h-3 bg-black rounded-full"
            style={{ rotateX, rotateY }}
          >
            <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full" />
          </motion.div>
          
          {/* Nose */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-2 h-1.5 bg-black rounded-full" />
        </div>

        {/* Feet */}
        <div className="absolute bottom-0 right-6 w-4 h-2 bg-black rounded-full" />
        <div className="absolute bottom-0 right-10 w-4 h-2 bg-black rounded-full" />
      </div>
    </motion.div>
  )
} 