(function(api){
    if(typeof api!='object'){
        if(typeof api=='function')api();
        return
    }
//write all api code here and export it by doing api.something =

/*

Main API class
This is what will be exported, all other classes wont

*/
api = {
    status: 0,
    getStatus: function() {
        return this.status;
    },
    getPublicAccountInfo: function(id) {

    },
    exportObjectAs: function(c, a) {
        if (typeof c != typeof void 0 && typeof a == 'string')
            this[a] = c;
    }
};

/*
 * Base 64 Stuff
 * 
 * For doing le base64 stuff
 * Encode -> encodes binary into base64
 * Decode -> decodes base64 into binary
 */

//B64
var b64 = {
    table: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ/+',
    paddingData: '==',
    bitCombine: function(bits, i, len) {
        var r = 0;
        for (var j = 0; j < len; j++) { //basically just collects all the bits into a int / long
            r |= bits[i++];
            r <<= 1;
        }
        return r >> 1;
    },
    addPadding: function(dat) {
        return dat + this.paddingData;
    },
    encode: function(dat) {
        var res = "";

        //remove padding if present
        if (dat.length >= this.paddingData.length) {
            if (dat.substring(dat.length-this.paddingData.length) == this.paddingData)
                dat = dat.sbustring(0,dat.length-this.paddingData.length);
        }
      
        var bits = [],v = null;
      
        //extract all the bits from the bytes to encode
        for (var i = 0; i < dat.length; i++) { //cant use of :/
            v = dat[i];
            for (var b = 0; b < 8; b++) {
                bits.push(
                    (v >> b) 
                    & 1
                );
            }
        }
      
        //combine the bits into 6 bit chunks from 0-64 and index a table to get the character
        for (i = 0; i < bits.length; i += 6) {
            var cmax = i >= bits.length ? 6 - (i - bits.length) : 6;
            res += this.table[
                this.bitCombine(bits, i, cmax)
            ];
        }
        return res;
    },
    decode: function(dat, padding) {
        var bits = [];
        var v;

        if (typeof padding == typeof void 0)
            padding = true;
      
        //collect all the bytes
        for (var i = 0; i < dat.length; i ++) {
            v = this.table.indexOf(dat[i]); //opposite of the prior table indexing
            for (var b = 0; b < 6; b++)
                bits.push(
                    (v >> (5-b)) & 1  
                );
        }
      
        var res = [];
      
        //now assemble as bytes instead of 6 bit chunks
        var val = 0;
        for (var b = 0; b < bits.length; b += 8) {
            val = 0;
            var cmax = b >= bits.length ? 8 - (b - bits.length) : 8;
            for (var j = 0; j < cmax; j++) {
                val |= (bits[b+j] << j);
            }
            res.push(val);
        }

        if (padding) res = this.applyPadding(res);
      
        return res;
    }
};

api.exportObjectAs(b64, 'Base64');
  
//Binary utility functions
var bin = {
    combineBytes: function(bytes, i, sz) {
        var r = 0;
      
        for (var b = i+sz-1; b >= i;) {
            r |= bytes[b--];
            r <<= 8;
        }
      
        return r >> 8;
    },
    intSplit: function(v, sz) {
        var r = [];
        
        for (var i = 0; i < sz; i++) {
            r.push(v & 255);
            v >>= 8;
        }
      
        return r;
    }
};

//Communications class
/*

For communication with main server
This will be in the api but make it
secure porfavor

*/
var Communicator = {};

Communicator.GetJson = function(url) {
    const req_settings = {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',

    }
}

//add random things that would be useful here oh yeah Zlib >:)
const Zlib = {
    Deflate: null,
    Inflate: null,
}

api.exportObjectAs(Zlib, 'Zlib');

const BitStream = {
    bytes: [],
    len: 0,
    cBit: 0,
}

//



//remove this before final export cause well we cant have those rapscallions accessing thing function
api.exportObjectAs=void 0;
})(typeof window=='object'?window._wapi={}:function(){
    console.error('Wallgle API failed to load :/');
    window._wapi = void 0;
});
const WallgleApi=window._wapi;