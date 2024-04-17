
const express = require('express')
const { sendRequest, getRequest, deleteRejectRequest, deleteAcceptRequest } = require('../../controllers/request/requestController')

const router = express.Router()

router.post('/request',sendRequest );
router.get('/request/:userId',getRequest);
router.delete('/request/delete/:id',deleteRejectRequest);
router.delete('/request/delete/accept/:id',deleteAcceptRequest);


module.exports =router