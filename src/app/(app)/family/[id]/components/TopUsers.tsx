import { getUserById } from '@/app/actions/user'
import { User } from '@/util/AppTypes';
import Image from 'next/image';
import React from 'react'

const TopUsers = async ({ topUsers }: { topUsers: Record<string, number> }) => {

  const userFetchPromises: Promise<User>[] = [];

  Object.keys(topUsers).forEach(id => {
    userFetchPromises.push(getUserById(id))
  });

  const users = await Promise.all(userFetchPromises);

  const userTopElems = users.map(user => {
    return (
      <div key={user.id} className="w-full p-2 flex justify-between items-center">
        <Image src={user.image || "/images/person.jpg"} width={50} height={50} alt="User image" className="rounded-full m-2" />
        <div className="flex-grow flex-col">
          <p className="font-bold">{user.name}</p>
          <p className="text-[14px] text-color-light-text">{user.email}</p>
        </div>
        <p className="font-bold">{topUsers[user.id]}</p>
      </div>
    )
  })

  return (
    <div className="w-full m-2">
      <h2 className="font-bold text-2xl p-2">Top Users</h2>
      <div className="p-2">
        {userTopElems}
      </div>
    </div>

  )
}

export default TopUsers
