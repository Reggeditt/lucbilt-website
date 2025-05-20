"use client"

import { useEffect } from "react"
import Link from "next/link"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

import { aboutData } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function AboutSection() {
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
        staggerChildren: 0.2
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
    <section ref={ref} id="about" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          variants={container}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center"
        >
          <motion.div variants={item} className="relative">
            <div className="relative z-10">
              {/* <img
                src="https://images.pexels.com/photos/6626999/pexels-photo-6626999.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Students learning at Lucbilt Institute"
                className="w-full rounded-lg shadow-xl"
              /> */}
              <Image
                src="/images/about/01.jpg"
                alt="Students learning at Lucbilt Institute"
                width={600}
                height={400}
                className="w-full rounded-lg shadow-xl"
                priority
                sizes="(max-width: 600px) 100vw, 600px"
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </div>
            <div className="absolute -bottom-5 -right-5 w-64 h-64 bg-amber-600/20 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -top-5 -left-5 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl -z-10"></div>
          </motion.div>

          <div className="space-y-6">
            <motion.div variants={item} className="inline-block">
              <span className="text-sm md:text-base font-medium px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-400">
                {aboutData.tagline}
              </span>
            </motion.div>

            <motion.h2 variants={item} className="text-3xl md:text-4xl font-bold leading-tight">
              {aboutData.title}
            </motion.h2>

            <motion.p variants={item} className="text-muted-foreground text-base md:text-lg leading-relaxed">
              {aboutData.description}
            </motion.p>

            <motion.h3 variants={item} className="text-xl md:text-2xl font-semibold mt-6">
              {aboutData.subtitle}
            </motion.h3>

            <motion.div variants={container} className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8">
              {aboutData.achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  className="p-4 border rounded-lg bg-background shadow-sm"
                >
                  <div className="text-amber-600 mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className="font-medium">{achievement}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={item} className="pt-4">
              <p className="text-muted-foreground mb-6">
                Established since <span className="font-medium">{aboutData.since}</span>, we have been 
                committed to excellence in vocational skills training.
              </p>
              <Button asChild className="bg-amber-600 hover:bg-amber-700">
                <Link href={aboutData.ctaLink}>
                  {aboutData.cta}
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}