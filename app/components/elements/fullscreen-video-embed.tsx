import { PlusIcon } from '@heroicons/react/solid'
import Dialog from '@reach/dialog'
import getVideoId from 'get-video-id'
import * as React from 'react'

import playIcon from '~/assets/images/icons/play-icon.svg'
import { OptimizedImage } from '~/components/elements/optimized-image'
import { Placeholder } from '~/components/layout/'
import { getLowQualityUrlFor, urlFor } from '~/lib/sanity'

import type { SanityFile, SanityImage } from '~/types/sanity'
import { getResponsiveImageSizes } from '~/utils/image'

interface VideoEmbedProps {
  url?: string
  file?: SanityFile
  videoType: 'url' | 'file'
  onCloseClick: React.MouseEventHandler<HTMLButtonElement>
}

function VideoEmbed({ onCloseClick, url, file, videoType }: VideoEmbedProps) {
  function getVideoUrl() {
    if (videoType === 'file') {
      return file?.asset?.url || undefined
    }

    if (videoType === 'url' || !videoType) {
      const videoId = url ? getVideoId(url) : ''

      if (!videoId) {
        return undefined
      }

      const { service, id } = videoId || {}

      switch (service) {
        case 'youtube': {
          return `https://www.youtube.com/embed/${id}?rel=0&autoplay=1`
        }
        case 'vimeo': {
          return `https://player.vimeo.com/video/${id}?autoplay=1`
        }
        default: {
          return undefined
        }
      }
    }
  }

  const videoUrl = getVideoUrl()

  return (
    <div className="fixed inset-0 px-5vw bg-black">
      <button
        aria-label="close video"
        onClick={onCloseClick}
        className="absolute top-8 right-4 z-50 w-8 h-8 text-white focus:outline-none rotate-45"
      >
        <PlusIcon className="block w-full h-full" />
      </button>
      <div className="flex flex-col justify-center w-full h-full">
        {!videoUrl && <Placeholder componentName="Unsupported video service" />}
        {videoUrl && (
          <article className="aspect-w-16 aspect-h-9">
            <iframe
              title="video"
              loading="lazy"
              width="560"
              height="315"
              src={videoUrl}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </article>
        )}
      </div>
    </div>
  )
}

export interface FullscreenVideoEmbedProps {
  url?: string
  file?: SanityFile
  videoType: 'url' | 'file'
  placeholder: SanityImage
  autoplay?: boolean
  title?: string
}

function FullscreenVideoEmbed({
  autoplay = false,
  placeholder,
  title,
  ...videoEmbedProps
}: FullscreenVideoEmbedProps) {
  const [playerVisible, setPlayerVisible] = React.useState(autoplay)

  function showPlayer() {
    setPlayerVisible(true)
  }

  function hidePlayer() {
    setPlayerVisible(false)
  }

  return (
    <>
      <Dialog
        isOpen={playerVisible}
        onDismiss={hidePlayer}
        aria-label="Watch the video"
      >
        <VideoEmbed onCloseClick={hidePlayer} {...videoEmbedProps} />
      </Dialog>

      {playerVisible ? null : (
        <button
          className="group block relative py-8 m-0 mx-auto w-full lg:py-16"
          onClick={showPlayer}
        >
          {placeholder && (
            <OptimizedImage
              src={urlFor(placeholder).url()}
              blurDataUrl={getLowQualityUrlFor(placeholder)}
              alt="Watch the video"
              className="rounded-xl"
              responsive={getResponsiveImageSizes('medium')}
            />
          )}
          <span className="absolute top-0 left-0 w-full h-full">
            <span className="flex justify-center items-center w-full h-full">
              <span className="opacity-70 group-hover:opacity-100 group-focus:opacity-100 transition-all group-hover:scale-110 group-focus:scale-110 group-active:scale-125">
                <OptimizedImage
                  src={playIcon}
                  alt="play"
                  className="w-32 h-32"
                />
              </span>
            </span>
          </span>
        </button>
      )}
      {title && <p className="text-xl text-primary">{title}</p>}
    </>
  )
}

export { FullscreenVideoEmbed }
