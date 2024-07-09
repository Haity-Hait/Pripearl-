// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

// Style Imports
import '@/app/globals.css'

// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css'

import '@fontsource/poppins'; import '@fontsource/poppins';

export const metadata = {
  title: 'Pripearl Beads',
  description:
    'Pripearl app'
}

const RootLayout = ({ children }) => {
  // Vars
  const direction = 'ltr'

  return (
    <html id='__next' dir={direction}>
      <body className='flex is-full min-bs-full flex-auto flex-col' style={{ fontFamily: "Poppins, sans-serif" }}>{children}</body>
    </html>
  )
}

export default RootLayout
