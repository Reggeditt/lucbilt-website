"use client"

import { useState, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

import { galleryData } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

export function GallerySection() {
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [filteredItems, setFilteredItems] = useState(galleryData.items)

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredItems(galleryData.items)
    } else {
      setFilteredItems(
        galleryData.items.filter((item) => item.category === selectedCategory)
      )
    }
  }, [selectedCategory])

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
          <motion.h2 variants={item} className="text-3xl md:text-4xl font-bold mb-2">
            {galleryData.title}
          </motion.h2>
          <motion.h3 variants={item} className="text-lg md:text-xl font-medium text-amber-600 mb-4">
            {galleryData.subtitle}
          </motion.h3>
          <motion.p variants={item} className="text-muted-foreground text-lg max-w-3xl mx-auto">
            {galleryData.description}
          </motion.p>
        </motion.div>

        <motion.div 
          variants={item} 
          initial="hidden"
          animate={controls}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {galleryData.categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={
                selectedCategory === category 
                  ? "bg-amber-600 hover:bg-amber-700 border-amber-600" 
                  : "hover:border-amber-600 hover:text-amber-600"
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              variants={container}
              className="group"
              layoutId={`gallery-item-${item.id}`}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <div className="cursor-pointer overflow-hidden rounded-lg relative aspect-square">
                    <img
                      src={item.type === "video" ? item.poster : item.src}
                      alt={item.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white">
                      <div className="text-center p-4">
                        <p className="font-medium">{item.caption}</p>
                      </div>
                    </div>
                    {item.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
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
                            className="text-white"
                          >
                            <polygon points="5 3 19 12 5 21" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-3xl p-0 border-none overflow-hidden">
                  {item.type === "image" ? (
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-auto object-contain max-h-[80vh]"
                    />
                  ) : (
                    <video
                      src={item.src}
                      poster={item.poster}
                      controls
                      className="w-full h-auto max-h-[80vh]"
                    >
                      Your browser does not support the video tag.
                    </video>
                  )}
                  <div className="p-4 bg-background">
                    <p className="font-medium">{item.caption}</p>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </motion.div>

        {/* <motion.div
          variants={item}
          initial="hidden"
          animate={controls}
          className="mt-12 text-center"
        > */}
          {/* <Button asChild className="bg-amber-600 hover:bg-amber-700">
            <a href="/gallery">View Full Gallery</a>
          </Button> */}
        {/* </motion.div> */}
      </div>
    </section>
  )
}