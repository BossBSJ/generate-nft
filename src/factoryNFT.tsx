import { ethers } from 'ethers'
import React, {useEffect, useState} from 'react'
import factoryNFT_abi from './contracts/factoryNFT_abi.json'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {pinJSONToIPFS} from './pinata'
import './style/factoryNFT.css'


declare let window: any

function BasicButtons(str:string) {
    return (
      <Stack spacing={2} direction="row">
        <Button variant="contained">{str}</Button>
      </Stack>
    );
  }

const FactoryNFT = () => {
    let contractAddress = '0x892C98402B736c806a7789923F5518275e95d36f'

    const [errorMessage, setErrorMessage] = useState<string>();
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [connButtonText, setConnButtonText] = useState('Connect Wallet');

    const [provider, setProvider] = useState<any>(null);
    const [signer, setSigner] = useState<any>(null);
    const [contract, setContract] = useState<any>(null);

    const [name, setName] = useState<any>();
    const [description, setDescription] = useState<any>();
    const [recipient, setRecipient] = useState<any>();
    const [url, setUrl] = useState<any>();

    const connectWalletHandler = () => {
        if (window.ethereum) {
            window.ethereum.request({method: 'eth_requestAccounts'})
            .then((result:any) => {
                accountChangedHandler(result[0])
                setConnButtonText('Wallet Connected')
            })
        } else {
            setErrorMessage('Need to Install MetaMask')
        }
    }

    const accountChangedHandler = (newAccount:any) => {
        setDefaultAccount(newAccount)
        updateEthers();
    }

    const updateEthers = () => {
        let tempProvider = new ethers.providers.Web3Provider(window.ethereum)
        setProvider(tempProvider);

        let  tempSigner = tempProvider.getSigner();
        setSigner(tempSigner)

        let tempContract = new ethers.Contract(contractAddress, factoryNFT_abi, tempSigner)
        setContract(tempContract)
    }  

    const mintNFT = async(url:any, name:any, description:any, recipient:any) => {
            //make metadata
        const metadata = {
            "name" : name,
            "url" : url,
            "description" : description
        }
        
            //make pinata call
            const pinataResponse:any = await pinJSONToIPFS(metadata);
            // console.log(pinataResponse)
            const tokenURI = pinataResponse.pinataUrl;
            // console.log(tokenURI)
            if (!pinataResponse.success) {
                return {
                    success: false,
                    status: "😢 Something went wrong while uploading your tokenURI.",
                }
            } else {
                console.log(contract)
                const tokenId = contract.mintNFT(recipient, tokenURI)
                return {success: true,
                        tokenId        
                }
            }
    }

    async function assemble() {
        console.log({
            "Name": name,
            "Description": description,
            "Url": url,
            "Recipient": recipient
        })
        const status = await (mintNFT(url,name,description,recipient))
    }

    const handleOnChangeName = (e:any) => {
        setName(e.target.value)
    }
    const handleOnChangeDescription = (e:any) => {
        setDescription(e.target.value)
    }
    const handleOnChangeUrl = (e:any) => {
        setUrl(e.target.value)
    }
    const handleOnChangeRecipient = (e:any) => {
        setRecipient(e.target.value)
    }

  return (
    <div className='container'>
    <div className='card'>
        <form className='left-child'>
          
          <div className='topic'>Create your NFT</div>
          <div>
            <div>
              <input 
                className='inputbox' 
                placeholder='Name'
                onChange={handleOnChangeName}
                
              />
            </div>
          </div>

          <div>
            <div>
              <input 
                className='inputbox' 
                placeholder='Description'
                onChange={handleOnChangeDescription}
              ></input>
            </div>
          </div>

          <div>
            <div>
              <input 
                className='inputbox' 
                placeholder='url'
                onChange={handleOnChangeUrl}
              ></input>
            </div>
          </div>

          <div>
            <div>
              <input 
              className='inputbox' 
              placeholder='recipient'
              onChange={handleOnChangeRecipient}
              ></input>
            </div>
          </div>
          
          <div onClick={assemble}> {BasicButtons("mint")}</div>
        </form>

        <div>
        <div onClick={connectWalletHandler}> {BasicButtons(connButtonText)}</div>
        <div>Address: {defaultAccount}</div>
        <img 
          className='image'
          src = {url}
        />
        </div>

    </div>
  </div>
  )
}
export default FactoryNFT