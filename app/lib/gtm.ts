export function track(eventName: string, payload = {}): void {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: eventName,
    ...payload,
  })
}
