"use client"

import { useEffect } from "react"
import Link from "next/link"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowUpRight } from "lucide-react"

import { programsData } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export function ProgramsSection() {
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
    <section ref={ref} id="programs" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={container}
          className="text-center mb-16"
        >
          <motion.h2 variants={item} className="text-3xl md:text-4xl font-bold mb-4">
            Our Programs
          </motion.h2>
          <motion.p variants={item} className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Discover our comprehensive range of vocational training programs designed to equip you with practical skills for success.
          </motion.p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {programsData.map((program) => (
            <motion.div key={program.id} variants={item}>
              <Card className="h-full overflow-hidden group border-muted hover:border-amber-300 transition-colors duration-300">
                <CardHeader className="p-6 pb-0">
                  <div className="flex items-start justify-between">
                    <span className="text-5xl font-bold text-muted-foreground/20">{program.number}</span>
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted group-hover:bg-amber-100 dark:group-hover:bg-amber-950/40 transition-colors duration-300">
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-amber-600 transition-colors duration-300" />
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{program.title}</h3>
                  <p className="text-muted-foreground">{program.description}</p>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button 
                    asChild 
                    variant="ghost" 
                    className="p-0 h-auto hover:bg-transparent text-amber-600 hover:text-amber-700 font-medium"
                  >
                    <Link href={program.link}>
                      Learn More
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          variants={item} 
          initial="hidden"
          animate={controls}
          className="mt-12 text-center"
        >
          <Button 
            asChild 
            className="bg-amber-600 hover:bg-amber-700"
          >
            <Link href="/courses">
              View All Courses
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}