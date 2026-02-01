import React, { useContext, useEffect, useState } from 'react'
import './ShowTask.css'
import ApiGetX2 from '../../../utils/ApiServicesX/ApiGetX2'
import TaskTable from './TaskTable'
import { HomeContext, TaskContext } from '../../../context/CmsContext';
export default function ShowTask() {
    let { isGet } = useContext(TaskContext);
    let { isLogin } = useContext(HomeContext)
    const [todayTask, setTodayTask] = useState([])
    const [notCompletedTask, setNotCompletedTask] = useState([])


    useEffect(() => {
        // اولین بار اجرا بشه
        ApiGetX2(`/api/Task/todayTasks`, setTodayTask);
        ApiGetX2(`/api/Task/admin&UserTasks?show=false`, setNotCompletedTask);

        // تنظیم تایمر هر 1 ساعت (3600000 ms)
        const intervalId = setInterval(() => {
            ApiGetX2(`/api/Task/todayTasks`, setTodayTask);
            ApiGetX2(`/api/Task/admin&UserTasks?show=false`, setNotCompletedTask);
        }, 3600000);

        // پاکسازی موقع unmount شدن یا تغییر dependency
        return () => clearInterval(intervalId);

    }, [isGet, isLogin]);
    return (

        <div >
            {
                notCompletedTask.length != 0 && <>
                    <TaskTable prop={todayTask} theme="warning" heightP='400px' title=" یادداشت/مأموریت امروز :" isShowButt={true} />
                    <hr />
                    <TaskTable prop={notCompletedTask} theme="info" heightP='600px' title="همه یادداشتها/مأموریتها :" isShowButt={true} /></>
            }

        </div>
    )
}
