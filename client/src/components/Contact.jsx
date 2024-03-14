import React from 'react';
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import {useMutation, useQueryClient} from "react-query";
import { removeContact } from '../fetchContact/FetchContact';
import { ContactContextShare } from '../context/Context';
import {useNavigate} from "react-router-dom";

const Contact = ({contact}) => {
    const {firstName,middleName,lastName,email,phoneNumber1,phoneNumber2,image,address, _id} = contact;
    const {setUpdate, update} = ContactContextShare();
    const navigate = useNavigate();

    //console.log(update);

    const folder = import.meta.env.VITE_IMAGE_URL;

    // remove contact
    const queryClient = useQueryClient();
    const {mutate, isLoading, isError} = useMutation(["contact", _id], removeContact,{
        onSuccess: () => queryClient.invalidateQueries("contact"),
    });

    // update contact
    const handleUpdate = () => {
        setUpdate(contact);
        navigate("/add");
    }

  return (
    <div className='w-[17rem] shadow-md shadow-gray-400 overflow-hidden rounded-lg'>
        <img className='w-full h-[12rem] object-cover' src={folder + image} alt="contactImg" />

        <div className='p-3 text-sm flex flex-col gap-1'>
            <p>FirstName : {firstName}</p>
            <p>MiddleName : {middleName}</p>
            <p>LastName : {lastName}</p>
            <p>Email : {email}</p>
            <p>PhoneNumber1 : {phoneNumber1}</p>
            <p>PhoneNumber2 : {phoneNumber2}</p>
            <p>Address : {address}</p>
        </div>

        <div className='p-3 flex items-center justify-end gap-2'>
            <button onClick={() => mutate(_id)} className='text-red-700 hover:opacity-75'>
                <BsFillTrashFill />
            </button>
            <button onClick={handleUpdate} className='text-xl text-blue-600 hover:opacity-75'>
                <AiFillEdit />
            </button>
        </div>
    </div>
  )
}

export default Contact