import axios from 'axios'
export const state = () => ({
    siteInfo: {

    },
    siteGo: {

    },
    siteIndexLink: {

    }, 
    siteNotIndexLink: {

    }
  })
  
  export const getters = {
    getSiteGoUrl: (state) => (key) => {
      return state.siteGo[key];
    },
    getIndexLink:  (state) => (key) => {
      return state.siteIndexLink;
    },
  }
  export const mutations = {
    setSiteBase(state, siteBase) {
      state.siteInfo =  siteBase;
      // let _this  = this; 
      // _this.$LruCache().set("qy_siteInfo",state.siteInfo );      
    },
    setSiteGo(state, siteGoBase) {
      state.siteGo =  siteGoBase;
      // let _this  = this; 
      // _this.$LruCache().set("qy_siteGo",state.siteGo );     
      // _this.$LocalServeStorage().setSIteGoLink(state.siteGo);   
    },
    setSiteIndexLink(state, data) {
        state.siteIndexLink =  data;
        // let _this  = this; 
        // _this.$LruCache().set("qy_siteIndexLink",state.siteIndexLink );     
    },
    setSiteNotIndexLink(state, data) {
      state.siteNotIndexLink =  data;
      // let _this  = this; 
      // _this.$LruCache().set("qy_siteNotIndexLink",state.siteNotIndexLink );     
      }
  }

  export const actions = {
    async getSiteInfo({state,commit}, val) {
      let _this  =  this; 
   
      // if (  _this.$QyServeTool().isEmpty(state.siteInfo) ) {
        let  siteInfo =    {};
        // let  siteInfo =   _this.$LruCache().get("qy_siteInfo"); 
        // if ( _this.$QyServeTool().isEmpty(siteInfo)) {  
            siteInfo  =  await     _this.$axios.get('/web/siteInfo/all').then(res => {
             if(!res|| !res.data) {
              _this.error({ statusCode: 500, message: res});
             } 
            let resp  = res.data;	
              if(resp.success) {  
                return resp.content;
              } else {
                  if(resp.code == '404') {
                    _this.error({ statusCode: 404, message: resp.message});
                  } else  {
                      _this.error({ statusCode: 500, message: resp.message});
                  }
              }
          })
          if (siteInfo && !siteInfo.header ) {
            let menus = await _this.$axios.get('/web/siteInfo/menus').then(res => {
              let resp  = res.data;	
                if(resp.success) { 
                  return resp.content;
                } else {
                  if(resp.code == '404') {
                    _this.error({ statusCode: 404, message: resp.message});
                  } else  {
                      _this.error({ statusCode: 500, message: resp.message});
                  }
                }
            })
            siteInfo.header =  menus.header;
            siteInfo.footer =  menus.footer;
          } 
          else {
            siteInfo.header = JSON.parse(siteInfo.header);
            siteInfo.footer = JSON.parse(siteInfo.footer );
          }
          commit('setSiteBase',  siteInfo);
        // }
      // } 
    
    },
    async getSiteGo({state, commit}, val)  {
      let _this  =  this;
      // if (  _this.$QyServeTool().isEmpty(state.siteGo) ) { 
        // let  siteGo=   _this.$LruCache().get("qy_siteGo"); 
        // if(_this.$QyServeTool().isEmpty(siteGo)) {
            siteGo =   await     _this.$axios.get('/web/siteInfo/shortLinks').then(res => {
              let resp  = res.data;	
                if(resp.success) {  
                  return resp.content;
                } else {
                  if(resp.code == '404') {
                    _this.error({ statusCode: 404, message: resp.message});
                  } else  {
                      _this.error({ statusCode: 500, message: resp.message});
                  }
                }
            }); 
      // }
      commit('setSiteGo',  siteGo);
    // } 
  },
  async getSiteIndexLink({state, commit}, val)  {
    let _this  =  this;
    let  siteIndexLink=  {};
    // if (  _this.$QyServeTool().isEmpty(state.siteIndexLink) ) { 
      // let  siteIndexLink=   _this.$LruCache().get("qy_siteIndexLink"); 
      // if(_this.$QyServeTool().isEmpty(siteIndexLink)) {
        siteIndexLink =   await     _this.$axios.get('/web/siteInfo/indexlinks').then(res => {
            let resp  = res.data;	
              if(resp.success) {  
                return resp.content;
              } else {
                if(resp.code == '404') {
                  _this.error({ statusCode: 404, message: resp.message});
                } else  {
                    _this.error({ statusCode: 500, message: resp.message});
                }
              }
          }); 
    // }
    commit('setSiteIndexLink',  siteIndexLink);
  // } 
}
};