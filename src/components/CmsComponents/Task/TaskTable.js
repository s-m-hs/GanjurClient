import React, { useContext, useEffect, useState } from 'react'
import DateFormat from '../../../utils/DateFormat'
import Modal from 'react-bootstrap/Modal';
import ApiGetX2 from '../../../utils/ApiServicesX/ApiGetX2';
import { HomeContext, TaskContext } from '../../../context/CmsContext';
import { FaEye } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import './ShowTask.css'
import { FaCircle } from "react-icons/fa6";
import { RiDeleteBin2Fill } from "react-icons/ri";
import ApiDeleteX2 from '../../../utils/ApiServicesX/ApiDeleteX2';
import alertA from '../../../utils/AlertFunc/AlertA';
export default function TaskTable({ prop, theme, title, isShowButt, heightP }) {
    let { allUser, TaskState, setShowEditMod, task, setTask, isGet, setIsGet } = useContext(TaskContext);
    let { themContext } = useContext(HomeContext)
    const [show, setShow] = useState(false);
    const [score, setScore] = useState([])
    const funcA = () => {
        alertA('حذف با موفقیت انجام شد')
        setIsGet(!isGet)
    }
    const deletTask = (id) => {
        ApiDeleteX2(`/api/Task/deleteTask?taskId=${id}`, funcA)
    }
    useEffect(() => {
        let n = parseInt(task.score);

        // ساختن آرایه با طول n
        setScore(Array.from({ length: n }, (_, i) => i + 1));
    }, [task])
    return (
        <>
            <h6 className='taskTable-title'>{title}</h6>
            <div style={{ maxHeight: heightP, overflow: 'auto' }}>

                <table className={!themContext ?
                    `table table-hover table-${theme} text-center` :
                    `table table-hover table-dark text-center`
                }>

                    <thead>
                        <tr key="">
                            <th>عنوان</th>
                            <th className="element-hide">وضعیت</th>
                            <th className="element-hide">تاریخ انجام </th>
                            <th>{isShowButt ? 'نمایش/ویرایش' : 'نمایش'} </th>
                        </tr>
                    </thead>

                    <tbody className='taskTable-tbody'>
                        {prop.length != 0 && prop.map(item => (

                            <tr key={item.id} className={`${item.color}`}>

                                <td style={{ textAlign: 'justify', position: 'relative' }} >
                                    <span className='taskTable-important-span centercc'>
                                        {item.important == 0 ? " قابل توجه" :
                                            item.important == 1 ? 'مهم ' :
                                                item.important == 2 ? 'خیلی مهم ' : ''
                                        }</span>

                                    <span className='taskTable-title-span'>

                                        {item.taskKind == 1 ?
                                            <FaCircle style={{ color: '#fd00ff', marginLeft: '3px' }} />
                                            : <FaCircle style={{ color: '#7c00ff', marginLeft: '3px' }} />}
                                        {item.title}
                                    </span>

                                </td>

                                <td className="element-hide" style={{
                                    color: `${TaskState?.filter(filter => (
                                        filter.id == item.taskState))[0]?.color}`
                                }}>
                                    {TaskState?.filter(filter => (
                                        filter.id == item.taskState))[0]?.desc}
                                </td>
                                <td className="element-hide"><DateFormat dateString={item.completionDate} />
                                </td>
                                <td>

                                    <button className='btn btn-info taskTable-span-but mx-1' onClick={() => {
                                        setTask(item)
                                        setShow(true)
                                    }}><FaEye style={{ fontSize: '15px' }} /></button>

                                    {isShowButt && <button
                                        className='btn btn-warning taskTable-span-but mx-1'
                                        onClick={() => {
                                            setTask(item)
                                            setShowEditMod(true)
                                        }}><MdEditSquare style={{ fontSize: '15px' }} /></button>}
                                    <button className="btn btn-danger taskTable-span-but mx-1" onClick={() => deletTask(item.id)} >
                                        <RiDeleteBin2Fill style={{ fontSize: '15px' }}

                                        />
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>



            <Modal
                show={show}
                onHide={() => setShow(false)}
                size="lg"
            // dialogClassName="modal-80w"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='centerc TaskTable-modal-div'>
                        <p>شناسه : {task.id}</p>
                        <p>عنوان : {task.title}</p>
                        <p>تاریخ ایجاد : <DateFormat dateString={task.createDate} />
                        </p>
                        <p>تاریخ انجام : <DateFormat dateString={task.completionDate} /></p>
                        <p>رضایتمندی :{score?.map(item => (<span>⭐</span>))}  </p>
                        <p style={{
                            color: `${TaskState?.filter(filter => (
                                filter.id == task.taskState))[0]?.color}`
                        }}>وضعیت :  {TaskState?.filter(filter => (
                            filter.id == task.taskState))[0]?.desc}</p>
                        <p>ایجاد کننده :  {allUser?.filter(filter => filter.id == task.adminId)[0]?.cyUsNm}</p>
                        <p>انجام دهنده :
                            {allUser?.filter(filter => filter.id == task.userId)[0]?.cyUsNm}</p>
                        <p style={{ border: '1px dotted green', borderRadius: '8px' }} dangerouslySetInnerHTML={{ __html: task.description }}>

                        </p>
                    </div>

                </Modal.Body>
            </Modal>


        </>
    )
}
