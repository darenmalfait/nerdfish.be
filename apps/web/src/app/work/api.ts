import {tina, type Work, type WorkQueryQuery} from '../cms'

export async function getWorks() {
  const workListData = await tina.queries.workConnection()

  return workListData.data.workConnection.edges?.map(item => ({
    ...item?.node,
  }))
}

export function mapWorkData(data: WorkQueryQuery) {
  return {
    ...data,
    work: data.workConnection.edges?.map((item: any) => ({
      ...(item?.node ?? {}),
    })) as Work[],
  }
}

export async function getWork(relativePath: string) {
  const work = await tina.queries
    .workQuery({
      relativePath,
    })
    .catch(() => null)

  if (!work) return null

  return {
    ...work,
    data: mapWorkData(work.data),
  }
}
