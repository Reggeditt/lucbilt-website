"use client"

import { useEffect } from "react"
import Link from "next/link"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowUpRight, CalendarIcon, UserIcon } from "lucide-react"

import { blogData } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export function BlogSection() {
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
    <section ref={ref} className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          variants={container}
          initial="hidden"
          animate={controls}
          className="text-center mb-12"
        >
          <motion.h2 variants={item} className="text-3xl md:text-4xl font-bold mb-4">
            {blogData.title}
          </motion.h2>
          <motion.p variants={item} className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Stay updated with the latest trends, success stories, and insights from the world of vocational skills.
          </motion.p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {blogData.posts.map((post) => (
            <motion.div key={post.id} variants={item}>
              <Card className="h-full flex flex-col overflow-hidden border-muted hover:border-amber-300 transition-colors duration-300">
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <CardHeader className="p-6 pb-2">
                  <div className="flex items-center text-sm text-muted-foreground space-x-4 mb-2">
                    <div className="flex items-center">
                      <UserIcon className="mr-1 h-3 w-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center">
                      <CalendarIcon className="mr-1 h-3 w-3" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold hover:text-amber-600 transition-colors">
                    <Link href={post.link}>{post.title}</Link>
                  </h3>
                </CardHeader>
                <CardContent className="p-6 pt-2 flex-grow">
                  <p className="text-muted-foreground">{post.excerpt}</p>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button 
                    asChild 
                    variant="ghost" 
                    className="p-0 h-auto hover:bg-transparent text-amber-600 hover:text-amber-700 font-medium"
                  >
                    <Link href={post.link}>
                      Read More
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
          <Button asChild variant="outline">
            <Link href="/blog">
              View All Posts
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}