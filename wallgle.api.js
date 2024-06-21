(function(api){
    if(typeof api!='object'){
        if(typeof api=='function')api();
        return
    }
//write all api code here and export it by doing api.

api = {
    status: 0,
    getStatus: function() {
        return this.status;
    }
};


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