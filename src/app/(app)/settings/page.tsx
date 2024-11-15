import React from 'react'
import Title from '../components/Title';
import PersonalInfoForm from './components/PersonalInfoForm';

const page = () => {
  return (
    <div>
      <Title title={"Settings"} />
      <PersonalInfoForm />
    </div>
  )
}

export default page;
