export function track(eventName: string, payload = {}): void {
  window.dataLayer.push({
    event: eventName,
    ...payload,
  })
}
