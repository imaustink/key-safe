const crypto = require('crypto');
const fs = require('fs');

function writeFile(filePath, key){
	fs.writeFileSync(filePath, key, {
		encoding: 'utf8',
		mode: 0o777
	});
}

class KeySafe{
	constructor(filePath, cypher = 'aes192'){
		let key = '';
		try{
			key = fs.readFileSync(filePath, 'utf8');
		}catch(err){
			writeFile(filePath, key);
		}
	
		this.key = key;
		this.filePath = filePath;
		this.cypher = cypher;
	}
	set(password, text, force){
		if(force || !this.key.length || this.unlock(password) !== null){
			const cipher = crypto.createCipher(this.cypher, password);
			let encrypted = cipher.update(text, 'utf8', 'hex');
			encrypted += cipher.final('hex');
			writeFile(this.filePath, encrypted);
			this.key = encrypted;
			return encrypted;
		}
		return null;
	}
	unlock(password){
		const decipher = crypto.createDecipher(this.cypher, password);
		let decrypted = decipher.update(this.key, 'hex', 'utf8');
		try{
			decrypted += decipher.final('utf8');
		}catch(err){
			return null;
		}
		return decrypted;
	}
}

module.exports = KeySafe;
