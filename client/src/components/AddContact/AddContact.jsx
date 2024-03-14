import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {useMutation, useQueryClient} from "react-query";
import { addContact, updateContact } from '../../fetchContact/FetchContact';
import { ContactContextShare } from '../../context/Context';

const AddContact = () => {
    const navigate = useNavigate();
    const {setUpdate, update} = ContactContextShare();
    //console.log(update);

    const [contact, setContact] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        phoneNumber1: "",
        phoneNumber2: "",
        image: "",
        address: "",
    });

    useEffect(() => {
        if(update){
            setContact({
                ...contact,
                firstName: update.firstName,
        middleName: update.middleName,
        lastName: update.lastName,
        email: update.email,
        phoneNumber1: update.phoneNumber1,
        phoneNumber2: update.phoneNumber2,
        image: update.image,
        address: update.address,
        _id: update._id,
            });
        }
    },[]);

    // add new contact
    const queryClient = useQueryClient();
    const {mutate, isLoading, isError} = useMutation(addContact,{
        onSuccess: () => queryClient.invalidateQueries("contact"),
    });

    
    const {mutate: updateContacts, isLoading: updateLoading, isError: updateError} = useMutation(updateContact,{
        onSuccess: () => queryClient.invalidateQueries("contact"),
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(contact);
        if(update){
            updateContacts(contact);
            navigate("/");
        }else{
            mutate(contact);
        navigate("/");
        }
    };


  return (
    <section>
        <button onClick={() => navigate(-1)} className='absolute top-[2rem] left-[4rem] button px-5 text-sm'>Go Back</button>

        <div className='flex items-center justify-center h-screen'>
            <form onSubmit={handleSubmit} className='border border-gray-400 w-[30rem] p-5 flex flex-col gap-5 rounded-md shadow-md shadow-gray-400 m-5 lg:m-0'>
                <h1 className='text-center text-xl font-medium'>{update ? "Update Contact" : " Add Contact"}</h1>
                <input value={contact.firstName} onChange={(e) => setContact({...contact, firstName : e.target.value})} className='input' type="text" placeholder='First Name...'/>
                <input value={contact.middleName} onChange={(e) => setContact({...contact, middleName : e.target.value})} className='input' type="text" placeholder='Middle Name...'/>
                <input value={contact.lastName} onChange={(e) => setContact({...contact, lastName : e.target.value})} className='input' type="text" placeholder='Last Name...'/>
                <input value={contact.email} onChange={(e) => setContact({...contact, email : e.target.value})} className='input' type="email" placeholder='Email...'/>
                <input value={contact.phoneNumber1} onChange={(e) => setContact({...contact, phoneNumber1 : e.target.value})} className='input' type="text" placeholder='Phone Number1...'/>
                <input value={contact.phoneNumber2} onChange={(e) => setContact({...contact, phoneNumber2 : e.target.value})} className='input' type="text" placeholder='Phone Number2...'/>
                <input  onChange={(e) => setContact({...contact, image : e.target.files[0] })} type="file" />
                <input value={contact.address} onChange={(e) => setContact({...contact, address : e.target.value})} className='input' type="text" placeholder='Address...'/>
                <button className='button'>{update ? "Update" : "Submit"}</button>
            </form>
        </div>
    </section>
  )
}

export default AddContact
