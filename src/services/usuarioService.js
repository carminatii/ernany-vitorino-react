const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333/api'

export async function getUsuarios() {
  const response = await fetch(`${BASE_URL}/usuarios`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })

  const data = await response.json()
  if (!response.ok) throw new Error(data.erro || 'Erro ao buscar usuários')
  return data.dados ?? []
}

export async function getCorretores() {
  const usuarios = await getUsuarios()
  return usuarios.filter(u =>
    ["corretor", "admin"].includes(String(u.papel || '').toLowerCase())
  )
}