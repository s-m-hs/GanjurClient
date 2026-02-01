import React, { useContext } from 'react'
import ModalFull from '../../../utils/ModalFull'
import { TaskContext } from '../../../context/CmsContext'
import TaskTable from './TaskTable'

export default function AllTask() {
    let { allTask, setAllTask } = useContext(TaskContext)
    return (
        <ModalFull breakpoint={true} text='نمایش همه' >
            <TaskTable prop={allTask} theme="info" heightP='600px' title="همه یادداشتها/مأموریتها :" isShowButt={true} />


        </ModalFull  >


    )
}
