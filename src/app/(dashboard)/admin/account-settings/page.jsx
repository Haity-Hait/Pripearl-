"use client";

// Next Imports
import dynamic from 'next/dynamic'

import useVerifyToken from '../../VerifyToken'


// Component Imports
import AccountSettings from '@views/account-settings'

const AccountTab = dynamic(() => import('@views/account-settings/account'))
const NotificationsTab = dynamic(() => import('@views/account-settings/notifications'))
const ConnectionsTab = dynamic(() => import('@views/account-settings/connections'))

// Vars
const tabContentList = () => ({
  account: <AccountTab />,
  notifications: <NotificationsTab />,
  connections: <ConnectionsTab />
})

const AccountSettingsPage = () => {
  const { verifyData, expired, LogOut } = useVerifyToken();

  console.log('useVerifyToken:', useVerifyToken); // Debugging to ensure the hook is imported correctly
  console.log('verifyData:', verifyData); // Debugging to check data
  console.log('expired:', expired); // Debugging to check expired state

  if (expired) {
    return (
      <div>
        You are currently logged out. Please
        <button style={{ textDecoration: "underline" }} onClick={LogOut}>Log in</button>
        back to continue your adventure.
      </div>
    );
  }

  return <AccountSettings tabContentList={tabContentList()} />
}

export default AccountSettingsPage
