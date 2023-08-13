export const getJwtToken = () => {
  return localStorage.getItem('jwtToken')
}

export const saveJwtToken = (jwtToken) => {
  localStorage.setItem('jwtToken', jwtToken)
}

export const deleteJwtToken = () => {
  localStorage.removeItem('jwtToken')
}