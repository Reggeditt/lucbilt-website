"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

import { teamData } from "@/lib/constants"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"

export function TeamSection() {
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
    <section ref={ref} className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          variants={container}
          initial="hidden"
          animate={controls}
          className="text-center mb-12"
        >
          <motion.h2 variants={item} className="text-3xl md:text-4xl font-bold mb-4">
            {teamData.title}
          </motion.h2>
          <motion.p variants={item} className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Meet our outstanding alumni and team members who have made significant contributions to the fashion industry.
          </motion.p>
        </motion.div>

        <motion.div
          variants={item}
          initial="hidden"
          animate={controls}
          className="mt-10"
        >
          <Carousel className="w-full">
            <CarouselContent>
              {teamData.members.map((member, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="border-muted hover:border-amber-300 transition-colors duration-300 h-full overflow-hidden">
                    <div className="aspect-[4/3] overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={400}
                        height={300}
                        priority
                        sizes="(max-width: 400px) 100vw, 400px"
                        // style={{
                        //   objectFit: "cover",
                        //   objectPosition: "center",
                        // }}
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                      <p className="text-muted-foreground">{member.role}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:flex">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  )
}