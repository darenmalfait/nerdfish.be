import { Grid, H2 } from '@daren/ui-components'
import { motion } from 'framer-motion'
import * as React from 'react'

import { OptimizedImage } from '../elements/optimized-image'
import { Container } from '../layout'

import { getLowQualityUrlFor } from '~/lib/sanity'

import type { SanityImage } from '~/types/sanity'
import { getResponsiveImageSizes } from '~/utils/image'

export interface HeroProps {
  title?: string
  subTitle?: React.ReactNode
  image?: SanityImage | string
  as?: React.ElementType
  action?: React.ReactNode
}

const childVariants = {
  initial: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

function Hero({ action, as = 'header', title, subTitle, image }: HeroProps) {
  return (
    <Grid as={as} className="items-start pt-24 h-auto lg:pb-12 lg:my-12">
      <Container size="medium">
        <div className="flex flex-col justify-between items-center lg:flex-row lg:space-x-8">
          <motion.div
            className="flex flex-col flex-auto justify-start max-w-screen-sm lg:mt-36"
            initial="initial"
            animate="visible"
            variants={{
              initial: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
            }}
          >
            <motion.div variants={childVariants}>
              <H2 className="font-black">{title}</H2>
            </motion.div>

            {subTitle ? (
              <motion.div
                className="mt-3 mb-12 prose prose-lg dark:prose-invert"
                variants={childVariants}
              >
                {subTitle}
              </motion.div>
            ) : null}
            {action ? (
              <motion.div
                variants={childVariants}
                className="flex flex-col mt-14 space-y-4"
              >
                {action}
              </motion.div>
            ) : null}
          </motion.div>

          {image && (
            <motion.div
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.75 }}
              className="w-full max-w-md lg:-mt-36"
            >
              {typeof image === 'string' ? (
                <OptimizedImage src={image} className="rounded-xl" />
              ) : (
                <OptimizedImage
                  {...image}
                  blurDataUrl={getLowQualityUrlFor(image)}
                  alt={image.alt}
                  className="rounded-xl"
                  responsive={getResponsiveImageSizes('medium')}
                />
              )}
            </motion.div>
          )}
        </div>
      </Container>
    </Grid>
  )
}

export { Hero }
