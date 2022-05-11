import { Grid, H2 } from '@daren/ui-components'
import { motion } from 'framer-motion'

import { OptimizedImage } from '../elements/optimized-image'
import { Container } from '../layout'

import { getLowQualityUrlFor } from '~/lib/api/sanity'
import { getResponsiveImageSizes } from '~/lib/utils/image'
import type { SanityImage } from '~/types/sanity'

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
        <div className="relative pt-6 pb-8 w-full text-center lg:py-8 lg:text-left">
          <motion.div
            className="flex flex-col flex-auto justify-start lg:w-1/2 xl:pr-16"
            initial="initial"
            animate="visible"
            variants={{
              initial: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
            }}
          >
            <motion.div variants={childVariants} className="space-y-6">
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
              className="flex relative items-center mx-auto w-full sm:w-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full"
            >
              {typeof image === 'string' ? (
                <OptimizedImage src={image} className="rounded-xl" />
              ) : (
                <OptimizedImage
                  {...image}
                  blurDataUrl={getLowQualityUrlFor(image)}
                  alt={image.alt}
                  className="mb-12 rounded-xl"
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
