"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

import { statsData } from "@/lib/constants"
import { Card, CardContent } from "@/components/ui/card"

export function StatsSection() {
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  }

  return (
    <section 
      ref={ref} 
      className="py-16 md:py-24 bg-amber-600 dark:bg-amber-950 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate={controls}
          className="text-center mb-12"
        >
          <motion.h2 
            variants={item} 
            className="text-2xl md:text-3xl font-bold text-white max-w-3xl mx-auto"
          >
            {statsData.title}
          </motion.h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {statsData.stats.map((stat, index) => (
            <motion.div key={index} variants={item}>
              <Card className="border-0 h-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/15 transition-colors duration-300">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                  <p className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</p>
                  <p className="text-white/80">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}