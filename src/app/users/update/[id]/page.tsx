import React from 'react'
import UpdateUser from '@/components/users/UpdateUser'

interface ParamsType{
 params:{
id:number
 }
}
function UPdatePage({params}:ParamsType) {

  return (
    <div>
      <UpdateUser user_id={params.id}/>
    </div>
  )
}

export default UPdatePage
