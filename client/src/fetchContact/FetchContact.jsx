import axios from "axios";

// base url
const baseUrl = import.meta.env.VITE_BASEURL;

// get all data from the api
export const getAllData = async () => {
    try {
        const res =await axios.get(`${baseUrl}/api/contact`);
        return res.data.allContacts;
    } catch (error) {
        console.log(error);
    }
};

// create a new contact
export const addContact = async(data) => {
    if(data.image){
        const form = new FormData();
        const imageName = Date.now() + data.image.name;

        form.append("name", imageName);
        form.append("file", data.image);

        data.image = imageName;

        try {
            await axios.post(`${baseUrl}/api/upload`, form);
        } catch (error) {
            throw new Error(error);
        }
    }

    try {
        const res = await axios.post(`${baseUrl}/api/contact/create`, data);
        return res.newContact;
    } catch (error) {
        throw new Error(error);
    }
}

// delete a contact
export const removeContact = async(id) => {
    try {
        await axios.delete(`${baseUrl}/api/contact/delete/${id}`);
    } catch (error) {
        throw new Error(error);
    }
}

// update a contact
export const updateContact = async (contact) => {
    try {
        await axios.put(`${baseUrl}/api/contact/update/${contact._id}`, contact);
    } catch (error) {
        throw new Error(error);
    }
}