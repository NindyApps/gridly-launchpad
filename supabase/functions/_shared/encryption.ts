// AES-GCM token encryption for Supabase Edge Functions (Deno).
// ENCRYPTION_KEY must be exactly 32 characters (256-bit).
// Generate securely: node -e "console.log(require('crypto').randomBytes(24).toString('base64').slice(0,32))"
// Add to Supabase Edge Function Secrets as ENCRYPTION_KEY.

function getKeyData(): Uint8Array {
  const key = Deno.env.get('ENCRYPTION_KEY')
  if (!key) throw new Error('[encryption] ENCRYPTION_KEY secret is not set')
  if (key.length !== 32) {
    throw new Error(
      `[encryption] ENCRYPTION_KEY must be exactly 32 characters, got ${key.length}`
    )
  }
  return new TextEncoder().encode(key)
}

async function importKey(usage: 'encrypt' | 'decrypt'): Promise<CryptoKey> {
  return crypto.subtle.importKey('raw', getKeyData(), { name: 'AES-GCM' }, false, [usage])
}

export async function encrypt(plaintext: string): Promise<string> {
  const key = await importKey('encrypt')
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv }, key, new TextEncoder().encode(plaintext)
  )
  const combined = new Uint8Array(iv.length + encrypted.byteLength)
  combined.set(iv)
  combined.set(new Uint8Array(encrypted), iv.length)
  return btoa(String.fromCharCode(...combined))
}

export async function decrypt(ciphertext: string): Promise<string> {
  const key = await importKey('decrypt')
  const combined = Uint8Array.from(atob(ciphertext), c => c.charCodeAt(0))
  const iv = combined.slice(0, 12)
  const encrypted = combined.slice(12)
  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv }, key, encrypted
  )
  return new TextDecoder().decode(decrypted)
}
