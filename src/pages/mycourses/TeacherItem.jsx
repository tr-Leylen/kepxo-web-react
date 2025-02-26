import React from 'react'

const TeacherItem = ({ teacher }) => {
    return (
        <option value={teacher._id}>{teacher?.firstName + ' ' + teacher?.lastName}</option>
    )
}

export default TeacherItem;