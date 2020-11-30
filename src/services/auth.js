
export function getHeaders () {
  const token = localStorage.getItem('authorization')

  return { authorization: `Bearer ${token}`}
}

export function isAuthenticated () {
  const token = localStorage.getItem('authorization')
console.log('auth check')
  if(!token) return false

  return true
}