import { ethers } from 'ethers';
import { API } from '../api/api.js';
import { privateKey } from '../../accounts/accounts.js';
import { Helper } from '../utils/helper.js';
import a2_0x53ac64 from '../utils/logger.js';
import { RPC } from './network/rpc.js';
import { SIGHTAI } from './dapps/sight_ai.js';
import { Config } from '../../config/config.js';
export default class Core extends API {
  constructor(_0x27e811) {
    super("https://sightai.io", "sightai.io", 'https://sightai.io', "4K0I6S");
    this.acc = _0x27e811;
    this.played = false;
    this.provider = new ethers.JsonRpcProvider(RPC.RPCURL, RPC.CHAINID);
    this.stateTree = '%5B%22%22%2C%7B%22children%22%3A%5B%22(platform)%22%2C%7B%22children%22%3A%5B%22dashboard%22%2C%7B%22children%22%3A%5B%22__PAGE__%3F%7B%5C%22referral-code%5C%22%3A%5C%22' + this.something + "%5C%22%7D%22%2C%7B%7D%2C%22%2Fdashboard%3Freferral-code%3D" + this.something + "%22%2C%22refresh%22%5D%7D%5D%7D%5D%7D%2Cnull%2Cnull%2Ctrue%5D";
  }
  async ["connectWallet"]() {
    try {
      const _0x3ca21f = this.acc.replace(/^0x/, '');
      await Helper.delay(0x3e8, this.acc, "Connecting to Account : " + (privateKey.indexOf(this.acc) + 0x1), this);
      const _0x183dc2 = Helper.determineType(_0x3ca21f);
      a2_0x53ac64.info("Account Type : " + _0x183dc2);
      if (_0x183dc2 == "Secret Phrase") {
        this.wallet = new ethers.Wallet.fromPhrase(_0x3ca21f, this.provider);
      } else {
        if (_0x183dc2 == "Private Key") {
          this.wallet = new ethers.Wallet(_0x3ca21f.trim(), this.provider);
        } else {
          throw Error("Invalid account Secret Phrase or Private Key");
        }
      }
      this.address = this.wallet.address;
      this.cookie = "wagmi.recentConnectorId=\"com.okex.wallet\"; wagmi.store={\"state\":{\"connections\":{\"__type\":\"Map\",\"value\":[[\"b5fe8e1e492\",{\"accounts\":[\"" + this.wallet.address + "\"],\"chainId\":17000,\"connector\":{\"id\":\"com.okex.wallet\",\"name\":\"OKX Wallet\",\"type\":\"injected\",\"uid\":\"b5fe8e1e492\"}}],[\"8c5b60aac25\",{\"accounts\":[\"" + this.wallet.address + "\"],\"chainId\":17000,\"connector\":{\"id\":\"metaMask\",\"name\":\"MetaMask\",\"type\":\"injected\",\"uid\":\"8c5b60aac25\"}}]]},\"chainId\":17000,\"current\":\"8c5b60aac25\"},\"version\":2}";
      await Helper.delay(0x3e8, this.acc, "Wallet connected " + JSON.stringify(this.wallet.address), this);
    } catch (_0x5a58a6) {
      throw _0x5a58a6;
    }
  }
  async ["getBalance"](_0x47c709 = false) {
    try {
      if (!_0x47c709) {
        await Helper.delay(0x1f4, this.acc, "Getting Wallet Balance of " + this.wallet.address, this);
      }
      const _0x32ef52 = ethers.formatEther(await this.provider.getBalance(this.wallet.address));
      this.balance = _0x32ef52;
      await Helper.delay(0x1f4, this.acc, "Balance updated", this);
    } catch (_0x22b52a) {
      throw _0x22b52a;
    }
  }
  async ["getUserInfo"](_0x3025cb = false) {
    try {
      if (_0x3025cb) {
        await Helper.delay(0x1f4, this.acc, "Getting User Information of " + this.wallet.address, this);
      }
      const _0x5dfa8a = await this.fetch("/dashboard?referral-code=" + this.something, "POST", undefined, [this.address], {
        'Referer': "https://sightai.io/dashboard?referral-code=" + this.something,
        'Next-Action': "5dd1862a3d5d9a970c36c027f2d82f7280223906",
        'Next-Router-State-Tree': this.stateTree,
        'Cookie': this.cookie
      });
      if (_0x5dfa8a.status == 0xc8) {
        this.user = this.decodeData(_0x5dfa8a.message);
        this.cookie = "wagmi.recentConnectorId=\"com.okex.wallet\"; wagmi.store={\"state\":{\"connections\":{\"__type\":\"Map\",\"value\":[[\"b5fe8e1e492\",{\"accounts\":[\"" + this.address + "\"],\"chainId\":17000,\"connector\":{\"id\":\"com.okex.wallet\",\"name\":\"OKX Wallet\",\"type\":\"injected\",\"uid\":\"b5fe8e1e492\"}}],[\"8c5b60aac25\",{\"accounts\":[\"" + this.address + "\"],\"chainId\":17000,\"connector\":{\"id\":\"metaMask\",\"name\":\"MetaMask\",\"type\":\"injected\",\"uid\":\"8c5b60aac25\"}}]]},\"chainId\":17000,\"current\":\"8c5b60aac25\"},\"version\":2}; " + this.sessionCookie;
        if (_0x3025cb) {
          await Helper.delay(0x1f4, this.acc, "Successfully Got User Data", this);
        }
      }
    } catch (_0x4e9b58) {
      throw _0x4e9b58;
    }
  }
  async ["checkIn"]() {
    try {
      await Helper.delay(0x1f4, this.acc, "Try To Check In...", this);
      const _0x155a89 = await this.fetch("/dashboard?referral-code=" + this.something, 'POST', undefined, [], {
        'Referer': "https://sightai.io/dashboard?referral-code=" + this.something,
        'Next-Action': 'e5afaaaeff44c664f214a016c10409c8e930d77a',
        'Next-Router-State-Tree': this.stateTree,
        'Cookie': this.cookie
      });
      if (_0x155a89.status == 0xc8) {
        await Helper.delay(0x1f4, this.acc, "Successfully Check In", this);
      } else {
        throw Error("Failed To Check In " + _0x155a89.message);
      }
    } catch (_0x50011b) {
      throw _0x50011b;
    }
  }
  async ["connectSightAiDapps"]() {
    await Helper.delay(0x3e8, this.acc, "Connecting to Sight Ai Dapps", this);
    const _0x3ad5e9 = SIGHTAI.URL + " wants you to sign in with your Ethereum account: " + this.address + "\n\nMake sure that you trust this site and are aware of the security implications of signing this message.\n\nURI: " + SIGHTAI.URL + "\nVersion: " + SIGHTAI.VERSION + "\nChain ID: " + RPC.CHAINID + "\nNonce: " + Helper.generateNonce() + "\nIssued At: " + new Date().toISOString() + "\n";
    a2_0x53ac64.info("Message to sign: " + _0x3ad5e9);
    const _0x34d4a8 = await this.wallet.signMessage(_0x3ad5e9);
    a2_0x53ac64.info("Signed Message: " + _0x34d4a8);
    const _0x1e3b31 = await this.fetch("/dashboard?referral-code=" + this.something, "POST", undefined, [_0x34d4a8, _0x3ad5e9, this.something], {
      'Referer': "https://sightai.io/dashboard?referral-code=" + this.something,
      'Next-Action': "3b934a35aaaa2acd0f7846cda4c3b1031a840b89",
      'Next-Router-State-Tree': this.stateTree,
      'Cookie': this.cookie
    });
    if (_0x1e3b31.status == 0xc8) {
      await Helper.delay(0x1f4, this.acc, "Connected to Sight AI", this);
      this.sightAiSignature = _0x34d4a8;
    } else {
      throw Error("Failed to connect to SIGHT AI");
    }
  }
  async ["getArcadeData"](_0x1a2940 = false) {
    try {
      if (_0x1a2940) {
        await Helper.delay(0x1f4, this.acc, "Getting Arcade Game Information...", this);
      }
      const _0x158a1d = await this.fetch("/fomo", 'POST', undefined, [0x0, '$undefined', 0x1, 0x6], {
        'Referer': "https://sightai.io/fomo",
        'Next-Action': "5ac42dcc7a005b04d92431cdc4172391e05d2ca3",
        'Next-Router-State-Tree': this.stateTree,
        'Cookie': this.cookie
      });
      if (_0x158a1d.status == 0xc8) {
        const _0x270b20 = this.decodeData(_0x158a1d.message);
        this.arcade = [];
        if (_0x270b20.pools) {
          this.arcade.push(..._0x270b20.pools);
        }
        this.availableArcade = this.arcade.find(_0x335e32 => _0x335e32.state == 0x1 || _0x335e32.state == 0x2 || _0x335e32.winner == "0x0000000000000000000000000000000000000000");
        if (_0x1a2940) {
          await Helper.delay(0x1f4, this.acc, "Successfully Got Arcade Info", this);
        }
      }
    } catch (_0x560698) {
      throw _0x560698;
    }
  }
  async ["playArcade"](_0x550027) {
    try {
      await Helper.delay(0x3e8, this.acc, "Playing Arcade Game ID " + _0x550027.id + "...", this);
      await Helper.delay(0x1f4, this.acc, "Prepare for Tx...", this);
      await Helper.delay(0x1f4, this.acc, "Estimating Gas...", this);
      const _0x2d8a48 = ethers.parseEther(Config.PLAYAMOUNT.toString());
      const _0x124136 = Config.RAWDATA;
      const _0x2c8278 = await this.provider.getTransactionCount(this.wallet.address, "latest");
      const _0x2b9b9b = await this.provider.getFeeData();
      const _0x6c75b6 = await this.estimateGasWithRetry(_0x550027.address, _0x2d8a48, _0x124136, 0x3);
      await Helper.delay(0x1f4, this.acc, "Build Tx Data...", this);
      const _0x2ac4b6 = {
        'from': this.address,
        'to': _0x550027.address,
        'value': _0x2d8a48,
        'gasLimit': _0x6c75b6,
        'gasPrice': _0x2b9b9b.gasPrice,
        'nonce': _0x2c8278,
        'data': _0x124136
      };
      a2_0x53ac64.info("Preparing to send transaction for Arcade Game ID " + _0x550027.id);
      await this.executeTx(_0x2ac4b6);
      this.played = true;
    } catch (_0x2afecf) {
      await Helper.delay(0xbb8, this.acc, "Error Playing Arcade " + _0x2afecf.message + "...", this);
      this.played = false;
    }
  }
  async ["estimateGasWithRetry"](_0x1b4d1e, _0x439276, _0x197e30, _0x44d56c = 0x3, _0x411c25 = 0xbb8) {
    for (let _0x121ac0 = 0x0; _0x121ac0 < _0x44d56c; _0x121ac0++) {
      try {
        const _0x1fcb16 = await this.provider.estimateGas({
          'from': this.wallet.address,
          'to': _0x1b4d1e,
          'value': _0x439276,
          'data': _0x197e30
        });
        return _0x1fcb16;
      } catch (_0x202f2d) {
        await Helper.delay(_0x411c25, this.acc, _0x202f2d.shortMessage + "... Attempt " + (_0x121ac0 + 0x1) + " of " + _0x44d56c, this);
        if (_0x121ac0 === _0x44d56c - 0x1) {
          throw Error("Failed to estimate gas after " + _0x44d56c + " attempts.");
        }
      }
    }
  }
  ['decodeData'](_0x1d4284) {
    const _0x1b83ee = _0x1d4284.split("\n").filter(Boolean);
    let _0x5ef1be = null;
    _0x1b83ee.forEach(_0x287ff3 => {
      if (_0x287ff3.startsWith('1:')) {
        const _0x2fede2 = _0x287ff3.substring(0x2).trim();
        try {
          _0x5ef1be = JSON.parse(_0x2fede2);
        } catch (_0x43ec38) {
          _0x5ef1be = {};
        }
      }
    });
    let _0x4a1473 = JSON.stringify(_0x5ef1be).replace(new RegExp(this.something, 'g'), '?????');
    if (_0x4a1473.length > 0xc8) {
      _0x4a1473 = _0x4a1473.substring(0x0, 0xc8) + "...";
    }
    a2_0x53ac64.info("JSON Data : " + _0x4a1473);
    return _0x5ef1be;
  }
  async ["executeTx"](_0x3fc595) {
    a2_0x53ac64.info("TX DATA " + JSON.stringify(Helper.serializeBigInt(_0x3fc595)));
    await Helper.delay(0x1f4, this.acc, "Executing TX...", this);
    const _0xa123a7 = await this.wallet.sendTransaction(_0x3fc595);
    const _0x3f0718 = await _0xa123a7.wait();
    a2_0x53ac64.info("Tx Confirmed and Finalizing: " + JSON.stringify(_0x3f0718));
    await Helper.delay(0x1388, this.acc, "Tx Executed \n" + RPC.EXPLORER + 'tx/' + _0x3f0718.hash, this);
    await this.getBalance(true);
  }
}
