import os from 'node:os'

/**
 * Get ip(v4) address
 * @return {string} the ipv4 address or 'localhost'
 */
export function getIPAddress(): string {
  const interfaces = os.networkInterfaces()
  let ip = ''
  for (const dev in interfaces) {
    interfaces[dev]?.forEach((details) => {
      if (ip === '' && details.family === 'IPv4' && !details.internal)
        ip = details.address
    })
  }
  return ip || '127.0.0.1'
}
