import React, { useMemo, useState } from 'react'
import { getUser } from '../../controllers/user.controller.js'

const TeacherItem = ({ teacher }) => {
    const [data, setData] = useState({})

    const getData = async () => {
        const res = await getUser(teacher)
        setData(res)
    }
    useMemo(() => {
        getData()
    }, [teacher])
    return (
        <option value={teacher}>{data?.firstName + ' ' + data?.lastName}</option>
    )
}

export default TeacherItem;