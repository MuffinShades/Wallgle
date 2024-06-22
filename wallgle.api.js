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

//Communications class
/*

For communication with main server
This will be in the api but make it
secure porfavor

*/
var Communicator = {
    Connect: null,
};

Communicator.Connect = function(url) {

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
    console.error('Wallgle API failed to load :/')
})=window._apiCode;
switch (typeof window._apiCode) {
    case 'object': {
        window.ApiCode = window._apiCode.getStatus();
        window._wapi = window._apiCode;
        break;
    }
    case 'number': {
        window.ApiCode = window._apiCode;
        break;
    }
    default: {
        console.error('Failed to load api, got code ',window._apiCode);
        window._wapi=void 0;
        break;
    }
}
const WallgleApi=window._wapi;