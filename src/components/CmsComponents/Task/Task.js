import React, { useEffect, useState } from 'react'
import './AddTAsk.css'
import AddTAsk from './AddTAsk'
import ShowTask from './ShowTask'
import { TaskContext } from '../../../context/CmsContext'
import ApiGetX2 from '../../../utils/ApiServicesX/ApiGetX2'

export default function Task() {
    const [allUser, setAllUser] = useState([])
    const [allTask, setAllTask] = useState([])
    const [showEditMod, setShowEditMod] = useState(false)
    const [task, setTask] = useState('')
    const [isGet, setIsGet] = useState(false)

    const TaskState = [

        { id: 0, state: 'Wating', desc: 'در انتظار', color: '#ff8f00' },
        { id: 1, state: 'Started', desc: 'شروع شده ', color: '#009517' },
        { id: 2, state: 'InTest', desc: 'منتظر تست', color: '#e600ff' },
        { id: 3, state: 'Completed', desc: 'انجام شده', color: '#0006ff' },
        { id: 4, state: 'Cannceled', desc: 'لغو شده', color: '#ff3333' },
    ]
    const TaskScore = [

        { id: 1, state: 'VeryBad', desc: 'غیر قابل قبول' },
        { id: 2, state: 'Bad', desc: 'قابل قبول' },
        { id: 3, state: 'MoreEffort', desc: 'خوب' },
        { id: 4, state: 'Good', desc: 'خیلی خوب' },
        { id: 5, state: 'Excellent', desc: 'عالی' },
    ]
    const TaskKind = [

        { id: 1, state: 'note', desc: 'یادداشت' },
        { id: 2, state: 'task', desc: 'مأموریت' },]

    const important = [


        { id: 0, state: 'Considerable', title: "قابل توجه " },
        { id: 1, state: 'Important', title: "مهم" },
        { id: 2, state: 'TooImportant', title: "خیلی مهم " },
    ]

    const color = [

        { id: 1, color: 'table-primary', value: "#cfe2ff" },
        { id: 2, color: 'table-success', value: "#d1e7dd" },
        // { id: 3, color: 'table-info', value: "#cff4fc" },
        { id: 3, color: 'table-secondary', value: "#e2e3e5" },
        // { id: 5, color: 'table-warning', value: "#fff3cd" },
        { id: 4, color: 'table-danger', value: "#f8d7da" },
        { id: 5, color: 'table-light', value: "#f8f9fa" },

    ]


    useEffect(() => {
        ApiGetX2('/api/CyUsers/GetUserByType/2', setAllUser)
    }, [])
    useEffect(() => {
        ApiGetX2('/api/Task/admin&UserTasks?show=true', setAllTask)
    }, [isGet])
    return (
        <TaskContext.Provider value={{
            allUser, setAllUser, TaskState, TaskScore, TaskKind, showEditMod, setShowEditMod
            , task, setTask, isGet, setIsGet, allTask, setAllTask, important, color
        }}>
            <div className='task-main-div' >
                <AddTAsk />
                <hr />
                <ShowTask />
            </div>
        </TaskContext.Provider>
    )
}
