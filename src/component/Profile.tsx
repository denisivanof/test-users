import React, {FC, SetStateAction, useState} from 'react';
import {userType} from "./UsersContainer";
import s from '../style/profile.module.scss'


interface profileType {
    profile: userType | undefined
}
interface Ifiled{
    value: string|undefined,
    err: boolean
}
interface dataType{
    value: Ifiled |undefined,
    action: React.Dispatch<SetStateAction<any>>,
    label: string,
    type: string
}

const Profile: FC<profileType> = ({profile}) => {
    const [disabled, setDisabled] = useState<boolean>(true)

    const [name, setName] = useState<Ifiled>({value: profile?.name, err: false})
    const [username, setUsername] = useState<Ifiled>({value: profile?.username, err: false})
    const [email, setEmail] = useState<Ifiled>({value: profile?.email, err: false})
    const [street, setStreet] = useState<Ifiled>({value: profile?.address.street, err: false})
    const [city, setCity] = useState<Ifiled>({value: profile?.address.city, err: false})
    const [zipcode, setZipcode] = useState<Ifiled>({value: profile?.address.zipcode, err: false})
    const [phone, setPhone] = useState<Ifiled>({value: profile?.phone, err: false})
    const [website, setWebsite] = useState<Ifiled>({value: profile?.website, err: false})
    const [comment, setComment] = useState('')

    const data:Array<dataType> = [
        {
            value: name,
            action: setName,
            label: 'Name',
            type: 'text'
        },
        {
            value: username,
            action: setUsername,
            label: 'User name',
            type: 'text'
        },
        {
            value: email,
            action: setEmail,
            label: 'E-mail',
            type: 'email'
        },
        {
            value: street,
            action: setStreet,
            label: 'Street',
            type: 'text'
        },
        {
            value: city,
            action: setCity,
            label: 'City',
            type: 'text'
        },
        {
            value: zipcode,
            action: setZipcode,
            label: 'Zip-code',
            type: 'text'
        },
        {
            value: phone,
            action: setPhone,
            label: 'Phone',
            type: 'text'
        },
        {
            value: website,
            action: setWebsite,
            label: 'Website',
            type: 'text'
        },
    ]
    const submit = (e: any) => {
        e.preventDefault()
        let isErr = 0
        const formData: any= {
            Comment: comment
        }
        data.forEach(item=>{
            if(item.value?.value){
                formData[item.label] = item.value.value
                isErr += 0
            }else {
                item.action({value: item.value?.value, err: true})
                isErr += 1
            }
        })
        console.log(isErr)
        if(!isErr)(console.log(JSON.stringify(formData)))
    }
    const isDisabled = () => {
      setDisabled(false)
    }
    return (
        <>
            <div className={s.profile}>
                <div className={s.profile_header}>
                    <h3>Профиль пользоваетля</h3>
                    <button onClick={isDisabled}>Редактироввать</button>
                </div>
                <div className={s.profile_block}>
                    <form>
                        {data.map(item=>{
                            return(
                                <div className={s.profile_input} key={item.label}>
                                    <div>{item.label}</div>
                                    <input style={{border: item.value?.err? '1px solid #D91313': ''}} disabled={disabled} type={item.type} value={item.value?.value}
                                           onChange={(e)=>item.action({value:e.target.value, err:false})}/>
                                </div>
                            )
                        })}
                        <div className={s.profile_textarea}>
                            <div>Comment</div>
                            <input  disabled={disabled}  value={comment}
                                    onChange={(e)=>setComment(e.target.value)}/>
                        </div>
                        <input className={disabled ? s.profile_from_btn_dis : s.profile_from_btn}
                               disabled={disabled} type="submit" onClick={submit} value='Отправить'></input>
                    </form>
                </div>
            </div>

        </>
    );
};

export default Profile;