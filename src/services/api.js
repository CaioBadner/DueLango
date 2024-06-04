import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://eme0pvxirc.execute-api.us-east-1.amazonaws.com/Prod', 
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'ZJmpAg3CY17fq9uvTiGR91hVYPv0P16I1pu0cjyo'
    }
});

export default {
    getBoard(boardId) {
        return apiClient.get('/boards/'+ boardId);
    }
};