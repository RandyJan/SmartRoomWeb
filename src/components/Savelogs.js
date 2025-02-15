import axios from 'axios';

const Savelogs = {

    async saveLog(username, activity,room) {
        const serverCreds = localStorage.getItem('serverCreds');
        try {
            const response = await axios.post('http://'+serverCreds+'/api/saveLogs', { username,activity,room });
            return response.data;
        } catch (error) {
            console.error('Error saving log:', error);
            throw error; // Rethrow the error for handling in the component
        }
    },
};

export default Savelogs;