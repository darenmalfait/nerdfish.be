'use client'

import {Container, Grid, H2} from '@nerdfish/ui'
import {motion} from 'framer-motion'
import {type RichTextType} from 'tinacms'

import {Image} from '~/components/common/image'
import {type Block, type Image as ImageType} from '~/lib/types/cms'
import {
  buildSrc,
  buildSrcSet,
  getLowQualityUrlFor,
} from '~/lib/utils/cloudinary'

import {PortableText} from '../common/portable-text'

const childVariants = {
  initial: {opacity: 0, y: 25},
  visible: {opacity: 1, y: 0, transition: {duration: 0.5}},
}

const Hero = ({
  parentField = '',
  image,
  text,
  title,
}: Block & {
  image?: ImageType
  text?: RichTextType
  title?: string
}) => {
  return (
    <Grid as="header" className="h-auto items-start pt-24 lg:my-12 lg:pb-12">
      <Container size="full">
        <div className="relative w-full pb-8 pt-6 text-center lg:py-8 lg:text-left">
          <motion.div
            className="flex flex-auto flex-col justify-start lg:w-1/2 xl:pr-16"
            initial="initial"
            animate="visible"
            variants={{
              initial: {opacity: 0},
              visible: {opacity: 1, transition: {staggerChildren: 0.2}},
            }}
          >
            <motion.div variants={childVariants} className="space-y-6">
              <H2
                data-tinafield={`${parentField}.title`}
                className="font-black"
              >
                {title}
              </H2>
            </motion.div>

            {text ? (
              <motion.div
                data-tinafield={`${parentField}.text`}
                variants={childVariants}
                className="prose prose-lg dark:prose-invert mb-12 mt-3"
              >
                <PortableText content={text} />
              </motion.div>
            ) : null}
          </motion.div>

          {image ? (
            <motion.div
              data-tinafield={`${parentField}.image`}
              initial={{scale: 1.5, opacity: 0}}
              animate={{scale: 1, opacity: 1}}
              transition={{duration: 0.75}}
              className="relative mx-auto flex w-full items-center sm:w-3/4 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2"
            >
              <Image
                className="mb-12 rounded-xl"
                placeholder={getLowQualityUrlFor(image.src)}
                srcSet={buildSrcSet(image.src)}
                src={buildSrc(image.src, {
                  width: 500,
                })}
                loading="eager"
                alt={image.alt}
              />
            </motion.div>
          ) : null}
        </div>
      </Container>
    </Grid>
  )
}

export {Hero}
