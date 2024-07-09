// Component Imports
import UnderMaintenance from '@views/pages/misc/UnderMaintenance'

// Server Action Imports
import { getMode } from '@core/utils/serverHelpers'

const UnderMaintenancePage = () => {
  // Vars
  const mode = getMode()

  return <UnderMaintenance mode={mode} />
}

export default UnderMaintenancePage
