function pingMatter() {
  return "pong darkmatter"
}

function initMatter() {
  if (typeof chrome.runtime === 'undefined') {
    console.log('Chrome runtime is not defined. Are you running in an Android WebView?');
    return;
  } else {
    console.log('blackmatter-js is in itialised.');  
  }  
}

function sendToken(address_from, address_to, amount, memo) {
  if (typeof chrome.runtime === 'undefined') {
    console.log('Chrome runtime is not defined. Are you running in an Android WebView?');
    return;
  } else {
    var editorExtensionId = "cidldciikbgbemcccegkacpncnajjpnp";
    // Make a simple request:
    //console.log(chrome.runtime)
    chrome.runtime.sendMessage(editorExtensionId, {
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

function delegateToken(address_from, delegator, amount, memo) {
  console.log('Call delegateToken')
}

function undelegateToken(address_from, delegator, amount, memo) {
  console.log('Call undelegateToken')
}

function redelegateToken(address_from, delegator_from, delegator_to, amount, memo) {
  console.log('Call redelegateToken')
}

function getRewardToken() {
  console.log('Call getRewardToken')
}

module.exports.base = { 
  pingMatter,
  initMatter,
  sendToken,
  delegateToken,
  undelegateToken,
  redelegateToken,
  getRewardToken
} 
