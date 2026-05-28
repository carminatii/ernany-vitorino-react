import { useReducer, useCallback } from 'react'

const inicial = { status: 'idle', erro: '' }

function reducer(state, action) {
  switch (action.type) {
    case 'SUBMITTING': return { status: 'loading', erro: '' }
    case 'SUCCESS':    return { status: 'success', erro: '' }
    case 'ERROR':      return { status: 'error', erro: action.erro }
    case 'RESET':      return inicial
    default:           return state
  }
}

// Models mutually-exclusive async states: idle → loading → success | error
export function useAsyncStatus() {
  const [state, dispatch] = useReducer(reducer, inicial)

  // useCallback with empty deps: dispatch (from useReducer) is stable, so these
  // wrappers are stable too — safe to include in useEffect dependency arrays.
  const iniciarEnvio = useCallback(() => dispatch({ type: 'SUBMITTING' }), [])
  const aoSucesso    = useCallback(() => dispatch({ type: 'SUCCESS' }), [])
  const aoErro       = useCallback((msg) => dispatch({ type: 'ERROR', erro: msg }), [])
  const limparErro   = useCallback(() => dispatch({ type: 'RESET' }), [])
  const reset        = useCallback(() => dispatch({ type: 'RESET' }), [])

  return {
    enviando: state.status === 'loading',
    sucesso:  state.status === 'success',
    erro:     state.erro,
    iniciarEnvio,
    aoSucesso,
    aoErro,
    limparErro,
    reset,
  }
}
