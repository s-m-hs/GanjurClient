import React, { useContext, useEffect, useState } from 'react'
import './AddTAsk.css'
import Modal from 'react-bootstrap/Modal';
import TiptapEditor from '../../Editor/TiptapEditor';
import { useForm } from "react-hook-form";
import ApiPostX from '../../../utils/ApiServicesX/ApiPostX';
import apiUrl from '../../../utils/ApiConfig';
import DatePicker from 'react-multi-date-picker';
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import transition from "react-element-popper/animations/transition";
import opacity from "react-element-popper/animations/opacity";
import InputIcon from 'react-multi-date-picker/components/input_icon';
import { HomeContext, TaskContext } from '../../../context/CmsContext';
import ApiGetX2 from '../../../utils/ApiServicesX/ApiGetX2';
import DateFormat from '../../../utils/DateFormat';
import ApiPuX2 from '../../../utils/ApiServicesX/ApiPutX2';
import alertA from '../../../utils/AlertFunc/AlertA';
import { GiCheckMark } from "react-icons/gi";
import { FaCircle } from "react-icons/fa6";
import AllTask from './AllTask';
import ApiDeleteX2 from '../../../utils/ApiServicesX/ApiDeleteX2';
export default function AddTAsk() {
    let { themContext, userId } = useContext(HomeContext);
    let { allUser, TaskState, important, color, TaskScore, TaskKind, showEditMod, setShowEditMod, task, setTask, isGet, setIsGet } = useContext(TaskContext);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {},
    });
    const [show, setShow] = useState(false);
    const [ckValue, setCkValue] = useState("");
    const [expireDate, setExpireDate] = useState(new Date());
    const [showError, setShowError] = useState(false)
    const handleClose = () => {
        setShow(false)
        setShowEditMod(false)
        setShowError(false)
        setTask({})
        reset(setValue(''))
        setCkValue('')
        setExpireDate(new Date())
    };
    const handleShow = () => setShow(true);
    function handleChange(value) {
        setExpireDate(value && value.toDate());
        // console.log(value.format());   /// convert  to persian format
    }
    console.log(task.adminId, userId)

    const handleRegistration = (data) => {
        if (!showEditMod && (data.title == '' || data.taskKind == 0)) return setShowError(true)
        setShowError(false)
        let obj = {
            id: !showEditMod ? 0 : task.id,
            createDate: "2025-09-06T08:00:47.475Z",
            completionDate: expireDate,
            title: !showEditMod ? data.title : data.update.title,
            description: ckValue,
            taskKind: !showEditMod ? Number(data.taskKind) : Number(data.update.taskKind),
            score: !showEditMod ? 1 : Number(data.update.taskScore),
            taskState: !showEditMod ? 0 : Number(data.update.taskstate),
            adminId: null,
            userId: !showEditMod ? Number(data.user) : Number(data.update.user),
            color: !showEditMod ? data.color : data.update.color,
            important: !showEditMod ? Number(data.important) : Number(data.update.important)
        }
        if (!showEditMod) {
            ApiPostX('/api/Task/addTask', obj, function () {
                alertA("با موفقیت اضافه شد")
                reset(setValue(''))
                setShow(false)
                setIsGet(!isGet)
                setCkValue('')
                setExpireDate(new Date())
            })

        } else if (showEditMod) {
            async function myAppPost() {
                const res = await fetch(`${apiUrl}/api/Task/editeTask`, {
                    method: "PUT",
                    credentials: "include",

                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(obj),
                })
                    .then((res) => {
                        // console.log(res)
                        if (res.ok) {
                            return res.json().then((result) => {
                                alertA('ویرایش با موفقیت انجام شد')
                                setTask({})
                                setShowEditMod(false)
                                reset(setValue(''))
                                setShow(false)
                                setIsGet(!isGet)
                                setCkValue('')
                                setExpireDate(new Date())

                            });
                        }
                    })
                    .catch((err) => console.log(err));
            }
            myAppPost();
            // ApiPuX2('/api/Task/editeTask', obj, function () {
            //     alertA('ویرایش با موفقیت انجام شد')
            //     setTask([])
            //     reset(setValue(''))
            //     setShow(false)
            // })
        }
    }

    useEffect(() => {
        reset(setValue(''))
        if (showEditMod) {
            setShow(true)
            setValue('update', { title: task.title, user: task.userId, kind: task.kind, taskstate: task.taskstate, taskScore: task.taskScore, taskKind: task.taskKind, important: task.important, color: task.color })
            setExpireDate(task.completionDate)
            setCkValue(task.description)
        }
    }, [showEditMod])
    console.log(task)
    return (
        <div>

            <AllTask />

            <button className='addTask-addButt btn btn-success mx-1'
                onClick={() => {
                    setTask({})
                    setShowEditMod(false)
                    setShow(true)

                }}>یاداشت/مأموریت  جدید</button>


            <FaCircle style={{ color: '#fd00ff', margin: '3px 3px', fontSize: '18px' }} />
            <span className='addTask-span-text'>یادداشت</span>
            <FaCircle style={{ color: '#7c00ff', margin: '3px 3px', fontSize: '18px' }} />
            <span className='addTask-span-text'>مأموریت</span>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>                <div className='container'>

                    <div className='row'>
                        <div className='col-12 centercc' >
                            <form
                                style={{ width: '100%' }}
                                action=""
                                onSubmit={handleSubmit(handleRegistration)}
                            >
                                <div
                                    className={
                                        (showEditMod && task.adminId != userId) ? 'login-label-float mt-2 m-1  disable' :
                                            'login-label-float mt-2 m-1 '}
                                >
                                    <input
                                        name="title"
                                        type="text"
                                        placeholder=""
                                        // isInvalid={!!errors.title}
                                        {...register(!showEditMod ? "title" : "update.title"
                                            // , { required: "این قسمت باید انتخاب شود" }
                                        )}

                                    />

                                    <label>عنوان یادداشت - مأموریت</label>
                                    <span className='addTask-span-error' >
                                        {/* {errors.title?.message} */}
                                    </span>
                                </div>
                                < span className='addTask-select-span' >
                                    <select
                                        className={(showEditMod && task.adminId != userId) ? 'addTaskselect mt-2 m-1 disable' : 'addTaskselect mt-2 m-1'}
                                        // isInvalid={!!errors.taskKind}
                                        name="taskKind"
                                        type="select"
                                        {...register(!showEditMod ? "taskKind" : "update.taskKind"
                                            // , { required: "این قسمت باید انتخاب شود" }
                                        )}
                                    >
                                        <option value="" key=""> نوع</option>
                                        {TaskKind.map(item => (
                                            <option value={item.id} key=""> {TaskKind?.filter(filter => (
                                                filter.id == item.id))[0]?.desc}</option>
                                        ))}

                                    </select>

                                    <span className='addTask-span-error' >
                                        {/* {errors.taskKind?.message} */}
                                    </span>
                                </span>

                                <select
                                    className={(showEditMod && task.adminId != userId) ? 'addTaskselect mt-2 m-1 disable' : 'addTaskselect mt-2 m-1'}
                                    name="user"
                                    type="select"
                                    {...register(!showEditMod ? "user" : "update.user")}
                                >
                                    <option value="" key="">مامور انجام مأموریت</option>
                                    {allUser.length != 0 && allUser.filter(filter => filter.id != userId).map(item => (
                                        <option value={item.id} key="">{item.cyUsNm}</option>
                                    ))}
                                </select>

                                <select
                                    className={(!showEditMod) ? 'addTaskselect mt-2 m-1 disable' : 'addTaskselect mt-2 m-1'}

                                    name="taskstate"
                                    type="select"
                                    {...register(!showEditMod ? "taskstate" : "update.taskstate")}
                                >
                                    <option value="" key=""> وضعیت</option>
                                    {TaskState.map(item => (
                                        <option
                                            style={{
                                                color: `${TaskState?.filter(filter => (
                                                    filter.id == item.id))[0]?.color}`
                                            }}
                                            value={item.id} key=""> {TaskState?.filter(filter => (
                                                filter.id == item.id))[0]?.desc}</option>
                                    ))}
                                </select>
                                <select
                                    className={(!showEditMod || (showEditMod && task.adminId != userId)) ? 'addTaskselect mt-2 m-1 disable' : 'addTaskselect mt-2 m-1'}

                                    name="taskScore"
                                    type="select"
                                    {...register(!showEditMod ? "taskstate" : "update.taskScore")}
                                >
                                    <option value="" key=""> رضایتمندی</option>
                                    {TaskScore.map(item => (
                                        <option value={item.id} key=""> {TaskScore?.filter(filter => (
                                            filter.id == item.id))[0]?.desc}</option>
                                    ))}
                                </select>

                                <select
                                    className={(showEditMod && task.adminId != userId) ? 'addTaskselect mt-2 m-1 disable' : 'addTaskselect mt-2 m-1'}
                                    name="important"
                                    type="select"
                                    {...register(!showEditMod ? "important" : "update.important")}
                                >
                                    <option value="0" key="">  اهمیت</option>
                                    {important.length != 0 && important.map(item => (
                                        <option value={item.id} key="">{item.title}</option>
                                    ))}
                                </select>

                                <select
                                    className={(showEditMod && task.adminId != userId) ? 'addTaskselect mt-2 m-1 disable' : 'addTaskselect mt-2 m-1'}
                                    name="color"
                                    type="select"
                                    {...register(!showEditMod ? "color" : "update.color")}
                                >
                                    <option value="" key="">  رنگ </option>
                                    {color.length != 0 && color.map(item => (
                                        <option value={item.color} style={{ backgroundColor: `${item.value}` }} key=""></option>
                                    ))}
                                </select>


                                <div
                                    className={
                                        !themContext
                                            ? "newsubject-form-col3-span mt-3"
                                            : "newsubject-form-col3-span darkthem-color mt-3"
                                    }
                                >
                                    تاریخ انجام :
                                </div>

                                <div
                                    className={(showEditMod && task.adminId != userId) ? 'coupon-expir-div mt-2 m-1 disable' : 'coupon-expir-div mt-2 m-1'}
                                >

                                    <DatePicker
                                        // className="custom-input"
                                        // className="bg-gray"
                                        className={!themContext ? "" : "bg-dark"}
                                        calendar={persian}
                                        locale={persian_fa}
                                        calendarPosition="top-right"
                                        value={expireDate}
                                        onChange={handleChange}
                                        zIndex={10000}
                                        animations={[
                                            opacity(),
                                            transition({ from: 35, duration: 800 }),
                                        ]}
                                        render={<InputIcon />}
                                    />
                                    <span style={{ color: 'var(--black0)' }}><DateFormat dateString={task.completionDate} /> </span>
                                </div>


                                <button className='btn btn-warning m-2' style={{ width: '100px' }} type='submit'>
                                    تایید<GiCheckMark />
                                </button>
                                {showError && <span className='addTask-span-error' >
                                    قسمت عنوان ونوع نمیتوانند خالی باشند
                                    {/* {errors.taskKind?.message} */}
                                </span>}
                                <div className={(showEditMod && task.adminId != userId) ? 'disable' : ''}>
                                    <TiptapEditor
                                        value={ckValue}
                                        onChange={(e) => {
                                            setCkValue(e);
                                        }}
                                    />

                                </div>

                            </form>



                        </div>
                    </div>

                </div></Modal.Body>

            </Modal>




        </div >
    )
}
