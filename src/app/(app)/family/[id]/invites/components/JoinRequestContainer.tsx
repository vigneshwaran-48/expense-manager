import { JoinRequest, Role } from "@/util/AppTypes";
import Image from "next/image";
import React from "react";
import AcceptRequestButton from "./button/AcceptRequestButton";
import RejectRequestButton from "./button/RejectRequestButton";

const JoinRequestContainer = ({
  requests,
  currentUserRole,
}: {
  requests: JoinRequest[];
  currentUserRole: Role;
}) => {
  const requestElems = requests.map((request) => {
    const requestTime = new Date(request.requestedTime);
    return (
      <tr key={request.id}>
        <td className="w-[250px] p-2">
          <div className="flex items-center">
            <Image
              src={
                request.requestUser.image &&
                request.requestUser.image.startsWith("http")
                  ? request.requestUser.image
                  : "/images/person.jpg"
              }
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
        <td
          className={`p-2 sticky top-0 ${
            currentUserRole === "LEADER" ? "hidden sm:table-cell" : ""
          }`}
        >
          {`${requestTime.getDate()}/${requestTime.getMonth()}/${requestTime.getFullYear()}`}
        </td>
        {currentUserRole === "LEADER" ? (
          <>
            <td className="p-2">
              <AcceptRequestButton
                familyId={request.family.id as string}
                requestId={request.id}
              />
            </td>
            <td className="p-2">
              <RejectRequestButton
                familyId={request.family.id as string}
                requestId={request.id}
              />
            </td>
          </>
        ) : (
          ""
        )}
      </tr>
    );
  });

  return (
    <div className="flex flex-col w-full p-2 h-1/2 max-w-[1200px] m-auto">
      <h1 className="text-xl font-bold py-2">Join Requests</h1>
      <div
        className={`flex w-full h-[calc(100%-30px)] items-center justify-center lg:justify-between`}
      >
        <div className="h-full items-start">
          <p className="mt-7 w-[200px] p-2 hidden lg:block">
            View the join requests people made to your family
            {currentUserRole === "LEADER" ? "Accept or Reject it." : "."}
          </p>
        </div>
        <div
          className={`w-full h-full overflow-y-scroll hide-scrollbar flex ${
            requests.length <= 0 ? "w-[calc(100%-200px)]" : "justify-center"
          }`}
        >
          {requests.length > 0 ? (
            <table className="border-collapse bg-dark-bg text-light-color-text h-fit">
              <thead className="sticky top-0 bg-dark-bg">
                <tr className="text-left sticky top-0">
                  <th className="w-[250px] lg:w-[300px] p-2 sticky top-0">
                    Name
                  </th>
                  <th
                    className={`p-2 sticky top-0 ${
                      currentUserRole === "LEADER" ? "hidden sm:table-cell" : ""
                    }`}
                  >
                    Requested Time
                  </th>
                  {currentUserRole === "LEADER" ? (
                    <>
                      <th className="p-2 sticky top-0">Accept</th>
                      <th className="p-2 sticky top-0">Reject</th>
                    </>
                  ) : (
                    ""
                  )}
                </tr>
              </thead>
              <tbody>{requestElems}</tbody>
            </table>
          ) : (
            <div className="w-full h-full flex flex-col justify-center items-center">
              <img
                src="/images/empty-invites.png"
                alt="No pending invites available"
                height={100}
                width={100}
                className="h-[150px] w-[150px] md:h-[250px] md:w-[250px]"
              />
              <p className="text-xl font-boldc">No requests here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JoinRequestContainer;
