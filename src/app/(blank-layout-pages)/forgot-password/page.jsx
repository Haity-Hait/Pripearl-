// Component Imports
import ForgotPassword from '@views/ForgotPassword'

// Server Action Imports
import { getMode } from '@core/utils/serverHelpers'

const ForgotPasswordPage = () => {
  // Vars
  const mode = getMode()

  return <ForgotPassword mode={mode} />
}

export default ForgotPasswordPage
