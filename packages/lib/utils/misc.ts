import nodeCrypto from 'crypto'

export function getCrypto() {
	if (typeof window !== 'undefined') return window.crypto
	return nodeCrypto
}
