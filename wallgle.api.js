(function(api) {
    if (typeof api == 'function') {
        api();
        return;
    }

    api.test = 1;
    console.log(api);


})(typeof window == 'object' ? window._wapi={} : function() {console.error('Wallgle API failed to load :/')});
const WallgleApi=window._wapi;console.log(WallgleApi);