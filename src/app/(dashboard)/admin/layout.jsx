
// Layout Imports
import LayoutWrapper from '@layouts/LayoutWrapper'
import VerticalLayout from '@layouts/VerticalLayout'

// Component Imports
import Providers from '@components/Providers'
import Navigation from '@components/layout/vertical/Navigation'
import Navbar from '@components/layout/vertical/Navbar'

import '@fontsource/poppins';

const Layout = async ({ children }) => {
  // Vars
  const direction = 'ltr'


  return (
    <div style={{fontFamily: "'Poppins', sans-serif"}}>
      <Providers direction={direction}>
        <LayoutWrapper
          verticalLayout={
            <VerticalLayout
              navigation={<Navigation />}
              navbar={<Navbar />}
            >
              {children}
            </VerticalLayout>
          }
        />
      </Providers>
    </div>
  )
}

export default Layout
