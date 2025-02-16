'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

export function FloatingGhost() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [scrollY, setScrollY] = useState(0)
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 })
  const lastMousePos = useRef({ x: 0, y: 0 })
  
  // Lazy following movement
  const springX = useSpring(0, { 
    stiffness: 100,
    damping: 50,
    mass: 2,
  })
  
  const springY = useSpring(0, { 
    stiffness: 100,
    damping: 50,
    mass: 2,
  })

  // Initialize viewport size
  useEffect(() => {
    const updateSize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  const updateGhostPosition = (clientX: number, clientY: number, scroll: number) => {
    const padding = 100
    const boundedX = Math.max(padding, Math.min(viewportSize.width - padding, clientX))
    const boundedY = Math.max(padding, Math.min(viewportSize.height - padding, clientY))
    
    lastMousePos.current = { x: boundedX, y: boundedY }
    springX.set(boundedX)
    springY.set(boundedY + scroll)
  }

  // Track mouse and scroll
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      updateGhostPosition(e.clientX, e.clientY, window.scrollY)
    }
    
    const handleScroll = () => {
      setScrollY(window.scrollY)
      // Use the last known mouse position when scrolling
      updateGhostPosition(
        lastMousePos.current.x,
        lastMousePos.current.y,
        window.scrollY
      )
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [viewportSize])

  // Set initial position
  useEffect(() => {
    if (viewportSize.width === 0) return
    const initialX = viewportSize.width / 2
    const initialY = viewportSize.height / 2
    updateGhostPosition(initialX, initialY, window.scrollY)
  }, [viewportSize.width])

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        x: springX,
        y: springY,
      }}
      className="pointer-events-none w-16 h-16 z-40"
    >
      <motion.div 
        className="relative w-full h-full"
        animate={{ 
          rotate: [0, 5, -5, 0],
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Ghost body */}
        <div className="w-16 h-16 relative">
          <div className="absolute inset-0">
            {/* Main ghost shape */}
            <div className="absolute inset-0 bg-white rounded-t-[100px] shadow-lg">
              {/* Ghost waves */}
              <div className="absolute -bottom-2 left-0 right-0 flex justify-between">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-4 h-4 bg-white rounded-b-full"
                    animate={{
                      y: [0, 4, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
              
              {/* Face */}
              <div className="absolute top-5 inset-x-0 flex flex-col items-center">
                {/* Eyes */}
                <div className="flex justify-center gap-4 mb-3">
                  <motion.div 
                    className="w-[10px] h-[10px] bg-black rounded-full"
                    animate={{
                      scaleY: [1, 0, 1],
                    }}
                    transition={{
                      duration: 0.15,
                      repeat: Infinity,
                      repeatDelay: 3,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div 
                    className="w-[10px] h-[10px] bg-black rounded-full"
                    animate={{
                      scaleY: [1, 0, 1],
                    }}
                    transition={{
                      duration: 0.15,
                      repeat: Infinity,
                      repeatDelay: 3,
                      ease: "easeInOut"
                    }}
                  />
                </div>

                {/* Mouth - subtler SVG smile */}
                <svg width="16" height="4" viewBox="0 0 16 4" fill="none">
                  <path d="M4 1.5C4 1.5 6 2.5 8 2.5C10 2.5 12 1.5 12 1.5" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Shadow */}
          <motion.div 
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-10 h-2 bg-black/10 blur-md rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}