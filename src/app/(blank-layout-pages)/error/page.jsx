// Component Imports
import NotFound from '@views/NotFound'

// Server Action Imports
import { getMode } from '@core/utils/serverHelpers'

const Error = () => {
  // Vars
  const mode = getMode()

  return <NotFound mode={mode} />
}

export default Error
