import React from 'react'
import PermissionSection from './components/PermissionSection';
import FamilyEditSection from './components/FamilyEditSection';


const page = () => {
  return (
    <div className="w-full h-full overflow-y-scroll hide-scrollbar">
      <FamilyEditSection />
      <PermissionSection />
    </div>
  )
}

export default page;
