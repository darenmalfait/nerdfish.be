import {Metadata} from 'next'
import Image from 'next/image'
import {ButtonLink, Container, Grid, H2, Paragraph, Section} from '@nerdfish/ui'

import remmyScreeshot from '~/assets/images/remmy-screenshot.png'
import {BigTitle} from '~/components/blocks/big-title'
import {Features} from '~/components/blocks/features'
import {CodeBlock} from '~/components/common/code-block/code-block'
import {Layout} from '~/components/layout/layout'
import {RemmyBackground} from '~/components/misc/remmy-bg'
import {getMetaData} from '~/lib/utils/seo'
import {generateOGImageUrl} from '~/lib/utils/social'

export async function generateMetadata(): Promise<Metadata | undefined> {
  const title = 'Structure your files with Remmy'

  return getMetaData({
    ogImage: generateOGImageUrl({
      cardType: 'primary',
      heading: title,
      image:
        'https://res.cloudinary.com/darenmalfait/image/upload/v1682078653/android-chrome-512x512_y1jigr.png',
    }),
    title,
    url: '/products/remmy',
    description:
      'Remmy enforces a fixed name structure for your files. This makes it easy to find files and to keep your files like invoices organized.',
  })
}

export default async function Page() {
  return (
    <Layout
      forceTheme="dark"
      navigationClassName="bg-gradient-to-b from-gray-900 to-[#141720]"
    >
      <div className="bg-gray-900">
        <div className="relative h-screen w-full overflow-hidden">
          <div className="absolute left-1/2 top-1/2 min-h-screen min-w-full -translate-x-1/2 -translate-y-1/2">
            <RemmyBackground className="min-h-screen min-w-full" />
          </div>
          <BigTitle
            parentField="none"
            title="Structure in your files with Remmy"
            action={{
              title: 'Get Remmy for macOS',
              label: 'Download',
              href: 'https://5387854441136.gumroad.com/l/remmy',
            }}
          />
        </div>
        <Section className="mt-0 block w-full bg-gradient-to-b from-[#141720] to-gray-900 pt-24">
          <Features
            parentField=""
            title="Features"
            subTitle="What does Remmy do?"
            items={[
              {
                title: 'Fixed name structure',
                description:
                  'Remmy enforces a fixed name structure for your files. This makes it easy to find files and to keep your files organized.',
                icon: 'Folder',
              },
              {
                title: 'VAT lookup',
                description:
                  'Remmy checks if there is a VAT number in your file name and if so, it will automatically look up the VAT number and add the company name to the file name.',
                icon: 'Search',
              },
              {
                title: 'Date recognition',
                description:
                  'Remmy will automatically recognize dates in your file name and will add them to the file name.',
                icon: 'Calendar',
              },
              {
                title: 'Customizable filename patterns',
                description:
                  'Remmy allows you to customize the filename pattern to your liking.',
                icon: 'Edit',
              },
            ]}
          />
          <div className="flex justify-center">
            <ButtonLink
              target="_blank"
              rel="noopener noreferrer"
              href="https://5387854441136.gumroad.com/l/remmy"
              className="mx-auto mt-12 "
            >
              Download Remmy for macOS
            </ButtonLink>
          </div>
        </Section>

        <Section className="mt-24 bg-gray-900">
          <Grid>
            <Container size="medium">
              <H2>The logic behind Remmy`&apos;s default naming convention</H2>
              <Paragraph>
                The default naming convention looks like this:
              </Paragraph>
              <CodeBlock
                forceColorTheme="dark"
                className="mt-4"
                code={`{year}_{month}_{day}-{company_name}-{description}.{extension}

2023_01_01-nerdfish_company-remmy_description.pdf`}
              />
              <Paragraph>
                This is a file naming convention used to organize files. It
                includes the year, month, day, company name, a brief
                description, and the file extension. For example,
                2020_05_15-example_company-report.pdf would be a PDF file from
                Example Company dated May 15, 2020.
              </Paragraph>
              <Paragraph>
                The file name consists of multiple parts, separated by hyphens
                (-), and each part is composed of underscores (_).
              </Paragraph>

              <H2>Why hyphens and underscores?</H2>
              <Paragraph>
                Navigating through filenames is easier with the hyphen (-) and
                underscore (_) keys. `Ctrl + left/right arrow` skips over
                underscores, but not hyphens, making it easier to move through
                the filename parts using the keyboard.
              </Paragraph>
            </Container>
          </Grid>
        </Section>
        <Section className="bg-primary mt-24">
          <Grid>
            <Container size="full">
              <div className="shadow-outline from-nerdfish-100 to-nerdfish-900 via-nerdfish-500 relative isolate overflow-hidden bg-gradient-to-br px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                  <H2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Start structuring your files today
                  </H2>
                  <p className="mt-6 text-lg leading-8 text-white">
                    Remmy is a simple tool that will help you structure your
                    files. It will automatically rename your files based on a
                    fixed name structure.
                  </p>
                  <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                    <ButtonLink
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://5387854441136.gumroad.com/l/remmy"
                    >
                      Get started on macOS
                    </ButtonLink>
                  </div>
                </div>
                <div className="relative mt-16 h-80 lg:mt-8">
                  <Image
                    className="absolute left-12 top-12 w-[40rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
                    src={remmyScreeshot}
                    alt="Remmy screenshot"
                    width={1824}
                    height={1080}
                  />
                </div>
              </div>
            </Container>
          </Grid>
        </Section>
      </div>
    </Layout>
  )
}
