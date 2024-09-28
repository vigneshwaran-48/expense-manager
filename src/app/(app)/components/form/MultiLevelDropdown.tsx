import PlainTick from '@/app/components/icon/PlainTick'
import TickIcon from '@/app/components/icon/TickIcon'
import React from 'react'

interface Props {
  listContainers: ListContainer[],
  open: boolean
}

interface ListContainer {
  displayName: string,
  lists: List[]
}

interface List {
  id: string,
  displayName: string,
  children?: ListContainer,
  onSelect?: () => void,
  openChildren?: boolean,
  selected?: boolean
}

const MultiLevelDropdown = ({ listContainers, open }: Props) => {

  const constructListContainer = (container: ListContainer) => {
    return (
      <li className="py-2">
        <p className="mb-2 font-bold">{container.displayName}</p>
        <ul className="pl-2">
          {container.lists.map(list => constructList(list))}
        </ul>
      </li>
    )
  }

  const constructList = (list: List) => {
    return (
      <li className="p-2 hover:bg-light-bg cursor-pointer flex items-center" onClick={list.onSelect}>
        <div className={`mr-2 w-[20px] h-[20px] border border-color-text ${list.selected ? "bg-other-bg" : ""} 
flex justify-center items-center`}>
          <span className={`${!list.selected ? "text-transparent" : ""} font-bold`}>
            <PlainTick />
          </span>
        </div>
        <p>{list.displayName}</p>
      </li>
    )
  }

  const listElems = listContainers.map(container => constructListContainer(container))

  return (
    <ul className={`origin-top ${open ? "scale-y-1" : "scale-y-0"} max-h-[200px] overflow-y-scroll hide-scrollbar
  bg-dark-bg rounded p-2 z-30 transition duration-500 absolute top-[115%] right-0`}>
      {listElems}
    </ul>
  )
}

export default MultiLevelDropdown
