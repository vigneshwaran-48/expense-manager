import React from 'react'
import Title from '../components/Title';
import PersonalInfoForm from './components/PersonalInfoForm';
import Preferences from './components/Preferences';

const page = () => {
  return (
    <div className="w-full h-full overflow-y-scroll hide-scrollbar">
      <Title title={"Settings"} />
        <PersonalInfoForm />
        <Preferences />
    </div>
  )
}

export default page;
