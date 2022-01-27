import axios from 'axios';

// const key = process.env.REACT_APP_PINATA_KEY
// const secret = process.env.REACT_APP_PINATA_SECRET
const key = "e687a54d7a9ef6464618"
const secret = "b21132320d7fcfc729fa5c4c11e9ccd24ff857b6c0b9d568b957ff50f7d1f1e3"

export const pinJSONToIPFS = async(JSONBody:any) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    //making axios POST request to Pinata ⬇️
    return axios 
        .post(url, JSONBody, {
            headers: {
                pinata_api_key : key!,
                pinata_secret_api_key: secret!
            }
        })
        .then(function (response:any) {
           return {
               success: true,
               pinataUrl: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash 
           };
        })
        .catch(function (error:any) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }

    });
};