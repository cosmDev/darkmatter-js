import { createProtobufRpcClient, QueryClient } from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import * as distrib from "cosmjs-types/cosmos/distribution/v1beta1/query";
import * as bank from "cosmjs-types/cosmos/bank/v1beta1/query";

let finalAddress = ''

class DarkMatter {
  constructor(chainId, client) {
    this.editorExtensionId = "cidldciikbgbemcccegkacpncnajjpnp";
    this.chainId = chainId;
    this.client = client;
  }  

  pingMatter() {
    return "pong darkmatter";
  }

  async initMatter() {
    if (typeof chrome.runtime === 'undefined') {
      console.log('Chrome runtime is not defined. Are you running in an Android WebView?');
      return;
    } else {
      console.log('blackmatter-js is in itialised.');  
      console.log('Debug', { editorExtensionId: this.editorExtensionId, chainId: this.chainId })   
    }  
  }
  
  connect() {
    const customPromise = new Promise((resolve, reject) => {      
      chrome.runtime.sendMessage(this.editorExtensionId, {
        type: 'connect'
      }, function(response) {
        if (response) {
          finalAddress = response.data
          resolve(response)
        } else {
          reject(new Error('Oops!..'))
        }
        return response
      });
    })  
    return customPromise  
  }
  
  sendToken(address_from, address_to, amount, memo) {
    if (typeof chrome.runtime === 'undefined') {
      console.log('Chrome runtime is not defined. Are you running in an Android WebView?');
      return;
    } else {
      // Make a simple request:
      //console.log(chrome.runtime)
      chrome.runtime.sendMessage(this.editorExtensionId, {
        type: '/cosmos.bank.v1beta1.MsgSend',
        from: address_from, 
        to: address_to, 
        amount: amount,
        memo: memo
      }, function(response) {
        console.log(response)
      }); 
    }  
  }

  async getBalance(address) {
    const queryClient = new QueryClient(this.client);
    const rpcClient = createProtobufRpcClient(queryClient);
    const queryBank = new bank.QueryClientImpl(rpcClient);
    const queryBankResult = await queryBank.AllBalances({ address: finalAddress });
    let returnValue = ''
    if ( queryBankResult.balances.length > 0){
      returnValue = queryBankResult.balances[0].amount
    } else {
      returnValue = 0
    }
    return returnValue    
  }
  
  delegateToken(address_from, delegator, amount, memo) {
    console.log('Call delegateToken')
  }

  undelegateToken(address_from, delegator, amount, memo) {
    console.log('Call undelegateToken')
  }

  redelegateToken(address_from, delegator_from, delegator_to, amount, memo) {
    console.log('Call redelegateToken')
  }

  async getRewardToken(address) {
    const queryClient = new QueryClient(this.client);
    const rpcClient = createProtobufRpcClient(queryClient);
    const queryDistrib = new distrib.QueryClientImpl(rpcClient);
    const queryDistribResult = await queryDistrib.DelegationTotalRewards({ delegatorAddress: finalAddress });  
    let returnValue = ''
    if ( queryDistribResult.total.length > 0){
      returnValue = queryDistribResult.total[0].amount / 1000000000000000000000000 
    } else {
      returnValue = 0
    }
    return returnValue
  }
}
export { DarkMatter };
