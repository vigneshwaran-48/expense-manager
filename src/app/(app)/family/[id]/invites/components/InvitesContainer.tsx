import { Invitation, Role } from "@/util/AppTypes";
import Image from "next/image";
import React from "react";
import ResendRequestButton from "./button/ResendInvitationButton";
import RevokeInvitationButton from "./button/RevokeInvitationButton";
import InviteMemberContainer from "./InviteMemberContainer";

const InvitesContainer = ({
  invitations,
  currentUserRole,
  familyId,
}: {
  invitations: Invitation[];
  currentUserRole: Role;
  familyId: string;
}) => {
  const invitationElems = invitations.map((invitation) => {
    const sentTime = new Date(invitation.sentTime);
    return (
      <tr key={invitation.id}>
        <td className="w-[250px] p-2">
          <div className="flex items-center">
            <Image
              src={invitation.recipient.image || "/person.jpg"}
              width={30}
              height={30}
              alt={`${invitation.recipient.name}'s image`}
              className="rounded-full sm:w-[35px] sm:h-[35px] mr-2"
            />
            <div className="flex flex-col">
              <h4 className="text-[14px] sm:text-[16px] font-medium text-color-text">
                {invitation.recipient.name}
              </h4>
              <p className="text-[12px] hidden md:block">
                {invitation.recipient.email}
              </p>
            </div>
          </div>
        </td>
        <td
          className={`p-2 sticky top-0 ${
            currentUserRole === "LEADER" ? "hidden sm:table-cell" : ""
          }`}
        >
          {`${sentTime.getDate()}/${sentTime.getMonth()}/${sentTime.getFullYear()}`}
        </td>
        {currentUserRole === "LEADER" ? (
          <>
            <td className="p-2">
              <ResendRequestButton
                invitationId={invitation.id}
                familyId={familyId}
              />
            </td>
            <td className="p-2">
              <RevokeInvitationButton
                invitationId={invitation.id}
                familyId={familyId}
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
      <InviteMemberContainer show={true} />
      <h1 className="text-xl font-bold py-2">Invites Sent</h1>
      <div
        className={`flex w-full h-[calc(100%-30px)] items-center justify-center lg:justify-between`}
      >
        <div className="h-full items-start">
          <p className="mt-7 w-[200px] p-2 hidden lg:block">
            View the invites you family sent
            {currentUserRole === "LEADER"
              ? "You can revoke or resend it."
              : "."}
          </p>
          <button className="px-4 py-1 rounded bg-other-bg text-other-text m-2">
            Invite
          </button>
        </div>
        <div className="h-full overflow-y-scroll hide-scrollbar flex">
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
                  Sent Time
                </th>
                {currentUserRole === "LEADER" ? (
                  <>
                    <th className="p-2 sticky top-0">Resend</th>
                    <th className="p-2 sticky top-0">Revoke</th>
                  </>
                ) : (
                  ""
                )}
              </tr>
            </thead>
            <tbody>{invitationElems}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InvitesContainer;