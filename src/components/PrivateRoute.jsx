import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { getSessao } from '../services/authService'

export default function PrivateRoute({ role }) {
  const sessao = getSessao()

  if (!sessao) {
    return <Navigate to="/login" replace />
  }

  if (sessao.trocar_senha) {
    return <Navigate to="/trocar-senha" replace />
  }

  if (!role) {
    return <Outlet />
  }
  const papelUsuario = String(sessao.usuario?.papel || '').toLowerCase()
  let papeisRequeridos = []
  if (Array.isArray(role)) {
    papeisRequeridos = role.map(r => String(r).toLowerCase())
  } else {
    papeisRequeridos = String(role).split(',').map(r => r.trim().toLowerCase())
  }

  if (!papeisRequeridos.includes(papelUsuario)) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
