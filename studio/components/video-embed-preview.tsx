import getVideoId from 'get-video-id'
import * as React from 'react'
import tw from 'twin.macro'

export const Container = tw.div`
 min-height[2em]
`

interface VideoEmbedPreviewProps {
  value: {
    url?: string
  }
}

function VideoEmbedPreview({ value }: VideoEmbedPreviewProps) {
  const embedCode = React.useMemo(() => {
    const videoId = value && value.url ? getVideoId(value.url) : ''

    if (!videoId) {
      return <span />
    }

    const { service, id } = videoId

    switch (service) {
      case 'youtube': {
        return (
          <iframe
            title="video-embed"
            src={`https://www.youtube.com/embed/${id}?rel=0`}
            frameBorder="0"
            allowFullScreen
          />
        )
      }

      case 'vimeo': {
        return (
          <iframe
            title="video-embed"
            src={`https://player.vimeo.com/video/${id}`}
            width="640"
            frameBorder="0"
            allowFullScreen
          />
        )
      }
      default: {
        return <span>Unsupported video service: {service}</span>
      }
    }
  }, [value])

  return <Container>{embedCode}</Container>
}

export { VideoEmbedPreview }
