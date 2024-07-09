// Component Imports
import Register from '@views/Register'

// Server Action Imports
import { getMode } from '@core/utils/serverHelpers'

const RegisterPage = () => {
  // Vars
  const mode = getMode()

  return <Register mode={mode} />
}

export default RegisterPage
