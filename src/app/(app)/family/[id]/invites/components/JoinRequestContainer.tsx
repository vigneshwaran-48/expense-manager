import { JoinRequest } from "@/util/AppTypes";
import Image from "next/image";
import React from "react";

const JoinRequestContainer = ({ requests }: { requests: JoinRequest[] }) => {
  const requestElems = requests.map((request) => {
    const requestTime = new Date(request.requestedTime);
    return (
      <tr key={request.id}>
        <td className="w-[250px] p-2">
          <div className="flex items-center">
            <Image
              src={request.requestUser.image || "/person.jpg"}
              width={30}
              height={30}
              alt={`${request.requestUser.name}'s image`}
              className="rounded-full sm:w-[35px] sm:h-[35px] mr-2"
            />
            <div className="flex flex-col">
              <h4 className="text-[14px] sm:text-[16px] font-medium text-color-text">
                {request.requestUser.name}
              </h4>
              <p className="text-[12px] hidden md:block">
                {request.requestUser.email}
              </p>
            </div>
          </div>
        </td>
        <td className="p-2  hidden sm:table-cell">
          {`${requestTime.getDate()}/${requestTime.getMonth()}/${requestTime.getFullYear()}`}
        </td>
        <td className="p-2">
          <button className="px-2 py-1 rounded bg-other-bg text-other-text">Accept</button>
        </td>
        <td className="p-2">
          <button className="px-2 py-1 rounded bg-red-500 text-white">Reject</button>
        </td>
      </tr>
    );
  });

  return (
    <div className="flex flex-col w-full p-2 h-1/2">
      <h1 className="text-xl font-bold py-2">Join Requests</h1>
      <div className="flex w-full h-[calc(100%-30px)] items-center">
        <p className="w-[200px] p-2 hidden lg:block">
          View the join requests people made to your family. Accept or Reject it
        </p>
        <div className="h-full overflow-y-scroll hide-scrollbar flex items-center">
          <table className="border-collapse bg-dark-bg text-light-color-text">
            <thead className="sticky top-0 bg-dark-bg">
              <tr className="text-left sticky top-0">
                <th className="w-[250px] lg:w-[300px] p-2 sticky top-0">Name</th>
                <th className="p-2 sticky top-0 hidden sm:table-cell">Requested Time</th>
                <th className="p-2 sticky top-0">Accept</th>
                <th className="p-2 sticky top-0">Reject</th>
              </tr>
            </thead>
            <tbody>
              {requestElems}
              {requestElems}
              {requestElems}
              {requestElems}
              {requestElems}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JoinRequestContainer;
