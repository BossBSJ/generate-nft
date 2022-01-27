import axios from 'axios';

export const pinJSONToIPFS = async(JSONBody:any) => {
    const key = process.env.REACT_APP_PINATA_KEY
    const secret = process.env.REACT_APP_PINATA_SECRET
    console.log(key, secret)
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