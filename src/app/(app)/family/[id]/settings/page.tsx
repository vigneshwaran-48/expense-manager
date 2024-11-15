import React from 'react'
import PermissionSection from './components/PermissionSection';
import FamilyEditSection from './components/FamilyEditSection';
import DeleteFamilySection from './components/DeleteFamilySection';


const page = () => {
  return (
    <div className="w-full h-full overflow-y-scroll hide-scrollbar">
      <FamilyEditSection />
      <PermissionSection />
      <DeleteFamilySection />
    </div>
  )
}

export default page;
