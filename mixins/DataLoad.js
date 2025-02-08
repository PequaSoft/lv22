import axios from 'axios'

//import { mapGetters } from 'vuex'

export default {
  getDeviceType () {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return "tablet";
    }
    if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
      return "mobile";
    }
      return "desktop";
  },
  cleanString (parInput, parRemove) {
    var source=parInput
    var result = ""
  
    if(parInput == undefined){return;}
      for (var i = 0; i < parInput.length; i++) {
        if(source.charCodeAt(i) !== parRemove){
            result=result+parInput[i];
      }
    }
    return result;
  },
  clean_String (parInput) {
    const source = parInput
    let result = ''
    for (let i = 0; i < parInput.length; i++) {
      if (source.charCodeAt(i) !== 92) {
        result = result + parInput[i]
      }
    }
    return result
  },
  getTokenValueRange(parInput,parToken,parEndToken){
    var ptr = parInput.indexOf(parToken);
    var sBuff = ''
  
    if(ptr == -1){return sBuff}
    ptr = ptr + parToken.length
    sBuff = parInput.substring(ptr)
    var ptr2 = sBuff.indexOf(parEndToken);
    if(ptr2 == -1){return sBuff;}
  
    sBuff = sBuff.substring(0,ptr2)
  
    return sBuff
  },    
  doCurrDomain(parStorage){
    var sBuff = localStorage.getItem('PS_CurrDomain');
    //console.log('doCurrDomain: ' + sBuff )
    if(sBuff == undefined){sBuff = '--';}
    if(sBuff.length > 0){
      sBuff = sBuff.replaceAll("%20", " "); 
      sBuff = this.cleanString(sBuff,34)
    }
    if(sBuff == '' || sBuff == '--' || sBuff == 'null'){sBuff = 'Main';}
    
    //parStorage.commit('globalData/setCurrDomain', sBuff)
    parStorage.sCurrDomain = sBuff
    //console.log('Current Domain: ' + sBuff + '|' + this.xCurrDomain )
  
    var sCommandLine = window.location.href.split('?')
    
    // Command Line
    if(sCommandLine.length > 1 ){
      //sCommandLine = sCommandLine.replaceAll("%20", " "); 
      var sBuff2 = sCommandLine[1].split('=')
      let result = sBuff2[0].includes("domain");
      let descresult = sBuff2[1].includes("desc");
      //let iconresult = sBuff[1].includes("icon");
      //console.log('doCurrDomain-cl: ' + sBuff2[1] )    
      if(sBuff2.length > 0 && sBuff2[0] == 'domain' && result == true){
        if(descresult == false){

          sBuff2[1]= decodeURIComponent(sBuff2[1]);
          sBuff = sBuff2[1];
          sBuff = sBuff.replaceAll("%20", " "); 
          sBuff = sBuff.replaceAll("+", " ");           
          //parStorage.commit('globalData/setCurrDomain', sBuff)
          parStorage.sCurrDomain = sBuff
          localStorage.setItem('PS_CurrDomain', JSON.stringify(sBuff));
        }
        if(descresult == true){
          var sBuff3 = sBuff2[1].split('&')
          sBuff3[0]= decodeURIComponent(sBuff3[0]);
          sBuff = sBuff3[0];
          sBuff = sBuff.replaceAll("%20", " "); 
          sBuff = sBuff.replaceAll("+", " ");           
          //parStorage.commit('globalData/setCurrDomain', sBuff)
          parStorage.sCurrDomain = sBuff
          localStorage.setItem('PS_CurrDomain', JSON.stringify(sBuff));
        }
      }
    }
  },      
  async loadDomainFavorites(parStore) {
    //localStorage.removeItem('PS_DomainFavorites');
    //parStore.commit('globalData/clearDomainFavorites')
    parStore.domainFavorites = [];
    //parStore.itemFavorites = [];

    var sHistBuff = localStorage.getItem('PS_DomainFavorites');
    sHistBuff = [];

    if(sHistBuff == undefined || sHistBuff.length == null || sHistBuff.length < 3){
      console.log('** Entering-loadDomainDefault');
      await this.loadDomainDefault(parStore.axios, parStore);
      console.log('** Ending-loadDomainDefault');
      return;
    }
  
    sHistBuff = this.cleanString(sHistBuff,34); 
      
    var sHistBuff2 = sHistBuff.split('}')
    //console.log('itemFavorites Pre: ' + sHistBuff);
    //console.log('** Entering-loadDomainFavorites');
    for (var mm = 0; mm < sHistBuff2.length; mm++) {  
      var sHolder = sHistBuff2[mm];
  
        sHolder = this.cleanString(sHolder,91); 
        sHolder = this.cleanString(sHolder,93); 
        sHolder = this.cleanString(sHolder,123); 
        sHolder = this.cleanString(sHolder,125); 
        //console.log('domainFavorites: ' + sHolder);
        var sPtr = sHolder.indexOf('icon:');
        var sText;
        var sIcon = '--';
        if(sPtr == -1){
          sText = this.getTokenValueRange(sHolder,'text:','<<END>>');
          sIcon = 'mdi-domain'
        }
        if (sPtr != -1){
          sText = this.getTokenValueRange(sHolder,'text:',',icon:');
          sIcon = this.getTokenValueRange(sHolder,'icon:','<<END>>');
          
          sIcon = this.resolveImgURL(sIcon);
        }
        var sCombo = sText + '|' + sIcon
        sCombo = {text: sText, icon: sIcon}
        //console.log('domainFavorites: '  + sHolder);
        if(sText != undefined && sText.length > 1){
            parStore.domainFavorites.push(sCombo); 
            //parStore.itemFavorites.push(sCombo); 
          }
        }
      parStore.domainFavorites.splice(parStore.favoritesMax); 
    },

    resolveImgURL(parURL) {
      
      if(this.showImages == 0){return 'mdi-domain';} 
      
      return parURL;
    },
    async loadDomainDefault(parAxios, parStore) {
      //parStore.commit('globalData/clearDomainFavorites')
      parStore.domainFavorites = [];

      const formData = new FormData();
      console.log('*** Start-loadDomainDefault');
      //this.$store.commit('globalData/setLoginStatus', 1)
      formData.append("default",  'abc');
  
      let promise = new Promise((resolve, reject) => {  
        axios.post(parAxios + 'domaindefault', formData).then((res) => {
          console.log('**** Process DomainDefault');
          var result = JSON.stringify(res.data.rows)
            
          result = this.cleanString(result,92)
          result = this.cleanString(result,34)
          result = this.cleanString(result,39)
  
          if(result.includes("}") == true){
            var sTbuff = result.split("},")
            var arraylength = sTbuff.length
  
            for (let i = 0; i < arraylength; i++) {
              //alert("default Results: " + sTbuff[i]);            
              var sText = this.getTokenValueRange(sTbuff[i],'Domain:',',DomainDescription:');
              var sIcon = this.getTokenValueRange(sTbuff[i],'DomainIcon:','<<END>>');
              var sCombo = sText + '|' + sIcon
              sIcon = this.cleanString(sIcon,123)  
              sIcon = this.cleanString(sIcon,125)  
              console.log('**** loadDomainDefault: ' + sText + '|' + sIcon);
              //state.domainFavorites.push({text: sText, icon: sIcon}); 
              //parDest.push({text: sText, icon: sIcon}); 
              sCombo = {text: sText, icon: sIcon}
              //parStore.commit('globalData/addDomainFavoriteSeq', sCombo)
              parStore.addDomainFavoriteSeq(sCombo)
            }
            
            //parStore.commit('globalData/storeDomainFavorites')
            parStore.storeDomainFavorites();
            
          }         
  
          setTimeout(() => resolve("done!"), 1)
        });
       
      });
      let result = await promise;
      
      console.log('*** Finish-loadDomainDefault');
      return;
    },

    //===========================================
    loadSidebars(parAxios, parStore) {
      this.loadDomainFavorites(parAxios, parStore)
      this.loadClickFavorites(parAxios, parStore)

      this.loadDomainHistory( parStore)
      this.loadClickHistory( parStore)

      //parStore.commit('globalData/setLoadSidebar', true)
      //parStore.loadSidebar = true
    },
    loadClickFavorites(parStore) {
      //parStore.commit('globalData/clearClickFavorites')
      parStore.itemFavorites = [];
      //localStorage.removeItem('PS_ClickFavorites');
      
      //console.log('Start-Click Favorites: ' + parAxios + '|');
      var sHistBuff = localStorage.getItem('PS_ClickFavorites');
      //console.log('Start-Click Favorites: ' + JSON.stringify(sHistBuff))
      console.log('itemFavorite -load' )

      if(sHistBuff == undefined || sHistBuff.length == null){
        //this.loadClickDefault(parAxios,parDest);
        console.log('Start Click Default')
        this.loadClickDefault(parStore.sAxios, parStore);  //,parAxios,clickFavorites);
        return;
        }
  
      sHistBuff = this.cleanString(sHistBuff,34); 
      //this.itemFavorites = [];
      var sHistBuff2 = sHistBuff.split('}')
      //console.log('Start-Click Favorites: ' + JSON.stringify(sHistBuff2.length))
      var endLoad = sHistBuff2.length;
      if(endLoad > 20 ){endLoad = parStore.favoritesMax;}
      for (var mm = 0; mm < endLoad; mm++) {  
        var sHolder = sHistBuff2[mm];
  
        if(sHolder != undefined && sHolder.length > 1){
        sHolder = this.cleanString(sHolder,91); 
        sHolder = this.cleanString(sHolder,93); 
        sHolder = this.cleanString(sHolder,123); 
        sHolder = this.cleanString(sHolder,125); 
        
        
        var sNav = this.getTokenValueRange(sHolder,'nav:',"<<END>>");
        var sIcon = this.getTokenValueRange(sHolder,'icon:',',nav:');
        var sText = this.getTokenValue(sHolder,'text:');
        var sDomain = this.getTokenValue(sHolder,'domain:');
        var sID = this.getTokenValue(sHolder,'id:');
        }
        
        
        if(sText != undefined && sText.length > 1){
          //console.log('itemFavorite: '  + sDomain);
          
          var sCombo = sDomain + '|' + sID + '|' + sText + '|' + sIcon + '|' + sNav
          //this.itemFavorites.unshift({domain: item.domain,id: item.id,text: item.text, icon: item.icon, nav: item.nav}); 
          sCombo = {domain: sDomain, id: sID, text: sText, icon: sIcon, nav: sNav}
          //parStore.commit('globalData/addClickFavoriteSeq', sCombo)
          //console.log('Start-Click Favorites: ' + JSON.stringify(sCombo))
          parStore.addClickFavoriteSeq(sCombo)

          }
        
      }
      //parStore.commit('globalData/storeClickFavorites')
      parStore.storeClickFavorites();

    },
    
    loadClickDefault(parAxios, parStore) {
      //parStore.commit('globalData/clearClickFavorites')
      parStore.itemFavorites =[];
      console.log('Start ClickDefault');
            
      const formData = new FormData();
  
      formData.append("default",  'abc');
      axios.post(parAxios + 'clickdefault', formData).then((res) => {
        //alert('Load Default Clicks: ');
        var result = JSON.stringify(res.data.rows)
        console.log('ClickDefault: ' + result);
  
        if(result != undefined && result.length > 1){
        result = this.cleanString(result,92)
        result = this.cleanString(result,34)
        result = this.cleanString(result,39)
        if(result.includes("}") == true){
  
          var sTbuff = result.split("},")
          var arraylength = sTbuff.length
  
          for (let i = 0; i < arraylength; i++) {
            var sDomain = 'default';
            var sID = '1';
            var sText;
            var sNav;
  
            var xBbuff = sTbuff[i].split(",")
            var nBuff = JSON.stringify(xBbuff)
  
            nBuff = this.cleanString(nBuff,91)
            nBuff = this.cleanString(nBuff,93)
            nBuff = this.cleanString(nBuff,34)
            nBuff = this.cleanString(nBuff,125)
            
            sText =  this.getTokenValueRange(nBuff,'title:',",itemurl:");
            //console.log('itemDefault-: ' + sText);
            sNav = this.getTokenValueRange(nBuff,'itemurl:',"<<END>>");
            var sIcon =  sNav;
            sIcon=this.extractDomain(sNav ,this.iHomeMax);
  
            if(sText != undefined && sText.length > 1){
              var sCombo = sDomain + '|' + sID + '|' + sText + '|' + sIcon + '|' + sNav
              console.log('itemDefault-: ' + sNav);
              sCombo = {domain: sDomain, id: sID, text: sText, icon: sIcon, nav: sNav}
              //parStore.commit('globalData/addClickFavoriteSeq', sCombo)
              parStore.addClickFavoriteSeq(sCombo)
            }
          }
          
          //parStore.commit('globalData/storeClickFavorites')
          parStore.storeClickFavorites();
          return
        }    
      }      
      });
    },
    extractDomain(url, parNode) {
      var domain;
  
      var frame = this.isDomainEpic(url);
      if(frame == true){

        //console.log('extract EPIC Domain: ' + url);

        let domainResult = url.includes("domain");
        let iconResult = url.includes("icon");          
        if(iconResult == true && domainResult == true){
          let sBuff = url.split("icon=");          
          if(sBuff.length > 0){
            //console.log('extract EPIC Domain: ' + url);
            const img = new Image();
            //img.src = 'abc';    // sBuff[1];
            sBuff[1] = this.resolveImgURL(sBuff[1]);
            //console.log('returning early - ' + sBuff[1]);    
            return sBuff[1]; 
          }	
        }		
      }
  
      if (url.indexOf("://") > -1) {
          domain = url.split('/')[2];
      }
      else {
          domain = url.split('/')[0];
      }
  
      if (domain.indexOf("www.") > -1) { 
          domain = domain.split('www.')[1];
      }
  
      domain = domain.split(':')[0]; //find & remove port number
      domain = domain.split('?')[0]; //find & remove url params
  
      var sPrepend = "https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url="
      //sPrepend = "https://s2.googleusercontent.com/s2/favicons?domain="
      sPrepend = "https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url="
  
      var sPrepend2 = "https://";
      var sPrepend3 = "http://";
      var sPostpend = "/favicon.ico";
      var sSizepend = "&size=64";
      
      var sDomainSearch = url.split('.')
      if(sDomainSearch.length > 1 ){
  
          for (var i = 1; i < sDomainSearch.length ; i++) {
              var sPre = sDomainSearch[i-1];
              var sCurr = sDomainSearch[i];
              var sCurrBuff = sCurr.toString().toUpperCase();
              sPre = sPre.toString().toUpperCase();
  
              //console.log('Split Search A:' + sPre + '.' + sCurrBuff);
              if(sCurrBuff.includes("COM") == true) {
                  //console.log('Split Search:' + sPre + '.' + sCurr.substring(0,3));
                  domain = sPre + '.' + sCurr.substring(0,3);
  
                  if(sPre.includes("HTTP") == false){
                  domain = sPrepend2 + sPre + '.' + sCurr.substring(0,3);
                  }
                  domain = domain.toLowerCase();
              }
          }
      }
  
     if (url.indexOf("?") > -1) {
          domain = url.split('?')[0];
      }
      else {
          domain = url;
      }
      //var sResult = sPrepend + domain;
      var sResult = sPrepend + domain;  // + sSizepend;
      //sResult = sPrepend + url;
      sResult = sPrepend + domain + sSizepend;
      var sResult2 = domain + sPostpend;
  
      sResult = this.resolveTreeImgURL(sResult);
  
      return sResult;
    },
    isDomainEpic(parNAV){
      var sBuff = parNAV.toLowerCase();
      var ptr = sBuff.indexOf('theepiclink.com');
      if(ptr != -1){return true;}
      return false;
    },
    resolveTreeImgURL(parURL) {
      
      return parURL;
    },

    loadClickHistory(parStore) {
      //parStore.commit('globalData/clearClickHistory')
      if(parStore != undefined){parStore.itemHistory = [];}
      //localStorage.removeItem('PS_ClickHistory');
      var sHistBuff = localStorage.getItem('PS_ClickHistory');
      
      //var sHistBuff = localStorage.getItem('PS_ClickFavorites');

      if(sHistBuff == undefined || sHistBuff.length == null){return;}
      console.log('Start ClickHistory');
      sHistBuff = this.cleanString(sHistBuff,34); 
   
      var sHistBuff2 = sHistBuff.split('}')
      //console.log('itemHistoryFull Pre: ' + sHistBuff);

      for (var mm = 0; mm < sHistBuff2.length; mm++) {  
        var sHolder = sHistBuff2[mm];

        sHolder = this.cleanString(sHolder,91); 
        sHolder = this.cleanString(sHolder,93); 
        sHolder = this.cleanString(sHolder,123); 
        sHolder = this.cleanString(sHolder,125); 
        
        var sNav = this.getTokenValueRange(sHolder,'nav:',"<<END>>");
        var sIcon = this.getTokenValueRange(sHolder,'icon:',',nav:');
        var sText = this.getTokenValue(sHolder,'text:');
        var sDomain = this.getTokenValue(sHolder,'domain:');
        var sID = this.getTokenValue(sHolder,'id:');

        if(sText != undefined && sText.length > 2 && sIcon.length > 2){
          var sCombo = sDomain + '|' + sID + '|' + sText + '|' + sIcon+ '|' + sNav
          sCombo = {domain: sDomain, id: sID, text: sText, icon: sIcon, nav: sNav}
          //parStore.commit('globalData/addClickHistorySeq', sCombo)
          if(parStore != undefined){parStore.addClickHistorySeq(sCombo);}
         
          //this.itemHistoryFull.push({domain: sDomain, id: sID, text: sText, icon: sIcon, nav: sNav}); 
          }

      }
      //parStore.commit('globalData/spliceClickHistory')
      if(parStore != undefined){parStore.itemHistory.splice(parStore.favoritesMax);} 
      //parStore.commit('globalData/storeClickHistory')
    },
    loadClickHistoryTest(parStore) {

      
      //const title = await getTitleAtUrl(sURL);

      //var getTitleAtUrl = require("get-title-at-url");
      //const title = await getTitleAtUrl(sURL);

      //console.log(title);

      
      var sURL = "https://instapundit.com/"
      var iImg = "";
      if(iImg != '--') {iImg=this.extractDomain(sURL);}
      var sCombo
      sCombo = {domain: 'abc', id: 1, text: 'Instapundit', icon: iImg , nav: sURL}
      //parStore.addClickHistory(sCombo)

      sURL = "https://markettrackerpro.com/indicesMini"
      if(iImg != '--') {iImg=this.extractDomain(sURL);}
      sCombo = {domain: 'def', id: 1, text: 'Market Tracker Pro', icon: iImg , nav: sURL}
      //parStore.addClickHistory(sCombo)

      console.log('Start ClickHistory-test');

    },  
    loadDomainHistoryTest(parStore) {

      parStore.domainHistory = [];

      var sText
      var sIcon
      var sCombo

      sText = 'Military History'
      sIcon = 'mdi-domain'
      sCombo = {text: sText, icon: sIcon}
      parStore.addDomainHistorySeq(sCombo)

      sText = 'Main'
      sIcon = 'mdi-domain'
      sCombo = {text: sText, icon: sIcon}
      parStore.addDomainHistorySeq(sCombo)

      sText = 'Catholica'
      sIcon = 'mdi-domain'
      sCombo = {text: sText, icon: sIcon}
      parStore.addDomainHistorySeq(sCombo)

      sText = 'Search the Web'
      sIcon = 'mdi-domain'
      sCombo = {text: sText, icon: sIcon}
      parStore.addDomainHistorySeq(sCombo)      

      parStore.storeDomainHistory()
      console.log('Start DomainHistory-test');

    },      
    loadDomainHistory(parStore) {
      //parStore.commit('globalData/clearDomainHistory')
      
      if(parStore != undefined){parStore.domainHistory = [];}

      //localStorage.removeItem('PS_DomainHistory');
      var sHistBuff = localStorage.getItem('PS_DomainHistory');

      if(sHistBuff == undefined || sHistBuff.length == null){return;}
      //console.log('Domain History: ' + sHistBuff)
      sHistBuff = this.cleanString(sHistBuff,34); 
      
      this.domainHistory = [];
      var sHistBuff2 = sHistBuff.split('}')

      for (var mm = 0; mm < sHistBuff2.length; mm++) {  
        var sHolder = sHistBuff2[mm];
        sHolder = this.cleanString(sHolder,91); 
        sHolder = this.cleanString(sHolder,93); 
        sHolder = this.cleanString(sHolder,123); 
        sHolder = this.cleanString(sHolder,125); 
        //console.log('Domain History: ' + sHolder);
        var sDomainBuff = sHolder.split('text:')  

        var sPtr = sHolder.indexOf('icon:');
        var sText;
        var sIcon = '--';
        if(sPtr == -1){
          sText = this.getTokenValueRange(sHolder,'text:','<<END>>');
          sIcon = 'mdi-domain'
        }
        if(sPtr != -1){
          sText = this.getTokenValueRange(sHolder,'text:',',icon:');
          sIcon = this.getTokenValueRange(sHolder,'icon:','<<END>>');

          sIcon = this.resolveImgURL(sIcon);
        }

        //var sText=sDomainBuff[1]
        if(sText != undefined && sText.length > 2 && !sText.includes("%20")){
          var sCombo = sText + '|' + sIcon
          sCombo = {text: sText, icon: sIcon}
          //parStore.commit('globalData/addDomainHistorySeq', sCombo)
          if(parStore != undefined){parStore.addDomainHistorySeq(sCombo)}
        }
      }        

    },
    getTokenValue(parInput,parToken){
      var ptr = parInput.indexOf(parToken);
      var sBuff = ''

      if(ptr == -1){return sBuff}
      ptr = ptr + parToken.length
      sBuff = parInput.substring(ptr)
      var ptr2 = sBuff.indexOf(',');
      if(ptr2 == -1){ptr2 = sBuff.indexOf('}')}
      //if(ptr2 == -1){return sBuff}

      sBuff = sBuff.substring(0,ptr2)

      ptr2 = sBuff.indexOf('\\');
      if(ptr2 == -1){return sBuff}

      sBuff = sBuff.substring(0,ptr2)

      return sBuff
    },

    async loadHomeDomain(parDomain, parAxios, parStore, parDest, parSwitch) {
      var sLocalBuff;  // = localStorage.getItem('PS_LocalDomain');
      var iSize;
      var readBlock = 50;
      var isEmpty = 1;

      //parStore.commit('globalData/setLoadActive', true)
      parStore.loadActive = true;

      const x = await this.loadDomainDescription(parDomain, parAxios, parStore, parSwitch);

      const sizeData = new FormData()    

      sizeData.append("domain", parDomain)

      let promise = new Promise((resolve, reject) => {
        
        //this.loadDomainDescription(parDomain, parAxios, parStore);
      
        axios.post(parAxios + 'domaintreesize', sizeData).then((res) => {
          var sLocalBuff = res.data.rows;
          iSize = parseInt(this.getTokenValue(sLocalBuff,'TreeData:'));
          //console.log('Domain Tree Size: ' + parDomain + ' | ' + iSize);
          setTimeout(() => resolve("done!"), 10)
        })
        
      });
      let result = await promise;
      //console.log('Domain Tree Size: End ');

      if(isNaN(iSize) == true || iSize == 0){
        
        //parStore.commit('globalData/setLoadActive', false)
        parStore.loadActive = false;
        return;
      } 

      //domain countup
      const countupData = new FormData();
      countupData.append("domain", parDomain)    
      
      let countupPromise = new Promise((resolve, reject) => {
        axios.post(parAxios + 'domaincountup', countupData).then((res) => {
          setTimeout(() => resolve("done!"), 10)
        })
        
      });
      let countupResult = await countupPromise;

      isEmpty = 1;  
      var iIncr = readBlock;
      var iLoop = Math.ceil(iSize/iIncr);
      var iStart = 1;
      var iEnd = iIncr;
      var sChunk;
      sLocalBuff = '';

      for (var ii = 0; ii < iLoop; ii++) {      
        const chunkData = new FormData()
        sChunk = '';
      
        chunkData.append('user', JSON.stringify('abc'))
        chunkData.append('domain', parDomain)
        chunkData.append('start', JSON.stringify(iStart))
        chunkData.append('end', JSON.stringify(iEnd))
        
        console.log('Domain Tree Chunk Load ' + parDomain);

        let promise2 = new Promise((resolve, reject) => {
        axios.post(parAxios + 'domaindetailsseq', chunkData).then((res) => {
          sChunk = JSON.stringify(res.data.rows);

          setTimeout(() => resolve("done!"), 1)
        })
        
      });
      let result = await promise2;
      //console.log('Domain Tree Chunk: End ');

      if(sLocalBuff.length > 0){sLocalBuff = sLocalBuff + ',' + sChunk;}
      if(sLocalBuff.length == 0){sLocalBuff = sChunk;} 
      
      iStart+=iIncr;
      iEnd+=iIncr;
      }
      
      sChunk = sLocalBuff
      sChunk = sChunk.replace(/","/g, ","); 
            
      this.genTreeData(sChunk, parStore, parDest)   

      /*
      if(parSwitch == 1) {parStore.commit('globalData/copyNestedArray', parDest);}
      if(parSwitch == 2) {parStore.commit('globalData/copyHomeArray', parDest);}
      parStore.commit('globalData/setLoadActive', false)
      */
      if(parSwitch == 1) {parStore.treeData=parDest;}
      if(parSwitch == 2) {parStore.homeData=parDest;}
      parStore.loadActive = false;

    },
    async loadDomainDescription(parDomain, parAxios, parStore, parSwitch) {
      const sizeData = new FormData()    
      sizeData.append("domain", parDomain)
      
      let promise = new Promise((resolve, reject) => {  
      axios.post(parAxios + 'domaindescription', sizeData).then((res) => {
        var sLocalBuff = res.data.rows;
        
        var sDesc = this.getTokenValue(sLocalBuff,'DomainDescription:');
                
        var sIcon = this.getTokenValue(sLocalBuff,'DomainIcon:');

        var sImage = this.getTokenValue(sLocalBuff,'DomainImage:');
        var iStyle = this.getTokenValue(sLocalBuff,'DomainStyle:');        

        console.log('Domain Description: ' + sDesc + '|'+ sIcon + '|'+ sImage + '|'+ iStyle);

        if (parSwitch == 1) {
          parStore.sCurrDomainDesc = sDesc
          parStore.sCurrDomainIcon = sIcon        
          parStore.sCurrDomainImage = sImage        
          parStore.sCurrDomainStyle = iStyle                        
          } 

        if (parSwitch == 2) {
          console.log('Boo-1')
          parStore.sDomainDescription = sDesc
          parStore.sDomainIcon = sIcon        
          parStore.sDomainImage = sImage        
          parStore.sDomainStyle = iStyle                        
          }           
        
        var sCombo = sDesc + '|' + sIcon + '|' 
        sCombo = {text: parDomain, icon: sIcon}
        setTimeout(() => resolve("done!"), 1)  
        
      })
    });
    let result = await promise;
    },
    async genTreeData (parSource, parStore,parDest) {
      var sBuff; 
      var sBuff2; 
      var sBuff3; 
      var tData = [];
      var xData = [];
      var sTitle;

      //console.log('Step 2-1');
      
      var resultx = parSource;
      sBuff =  resultx.split('{');

      for (var i = 0; i < sBuff.length; i++) {

        if(sBuff[i].length > 5){

          sBuff2 = sBuff[i].split(',')

          var item_id = '--';
          var item_parentid = '--';
          var item_sortindex = '--';
          var item_title = '--';
          var item_url = '--';
          var item_type = 1;
          var item_desc = '--';

          for (var j = 0; j < sBuff2.length; j++) {
            sBuff3 = sBuff2[j].split(':')

            for (var k = 0; k < sBuff3.length; k++) {
              //console.log('pre title store: '+ sBuff3[0] + '|' + sBuff3[1]);
              if(sBuff3[0] == 'itemid'){item_id = sBuff3[1];}
              if(sBuff3[0] == 'parentid'){item_parentid = sBuff3[1];}
              if(sBuff3[0] == 'sortindex'){item_sortindex = sBuff3[1];}
              if(sBuff3[0] == 'title'){item_title = sBuff3[1];}
              if(sBuff3[0] == 'itemurl' && sBuff3[1] == '--'){item_url = sBuff3[1];}
              
              if(sBuff3[0] == 'itemurl' && sBuff3[1] != '--'){
                item_url =sBuff2[j].substring(8)
                item_type = 0;
                //console.log('item url: '+ item_url);
              }
              
              if(sBuff3[0] == 'itemurl' && sBuff3[1] != '--' && sBuff3[1].includes('<<LISTING>>')){
                item_url = sBuff2[j].substring(8)
                //item_url = item_url.replace('<<LISTING>>','')
                item_type = 0;
              }

              if(sBuff3[0] == 'itemtype'){item_type = sBuff3[1];}
              if(sBuff3[0] == 'itemdesc'){
                item_desc = sBuff3[1].substring(0,sBuff3[1].length-1);
                item_desc=item_desc.replaceAll(";", ",");
                //item_desc = sBuff3[1];
                if(item_desc.length > 10){console.log('item desc: '+ item_desc);}
              }
              
            }
          }
        }
        if(i == 0 ){item_parentid = 0;}
        if(item_title != undefined && item_title != '--' ){
          //console.log('Chunk Push: '+ item_title + '|' + item_id + '|' + item_parentid + '|' + item_id);  
          tData.push({text: item_title, name: item_title, id: parseInt(item_id), index: item_sortindex , parent: item_parentid, data: {  nav: item_url, type: item_type, icon: 'def', id: item_id, index: item_sortindex, desc: item_desc}});    
        }
      }
      //verify output load
      var xData = [];
      var sPrevHolder = '--'
      if(tData === undefined){console.log('Empty Load');return;}
      //var tChildren = [];  
      //console.log('ArrayData Load: ' + tData.length);
      for (var mm = 0; mm < tData.length; mm++) {  
        
        var sHolder = tData[mm].text
        
        //console.log('ArrayData: ' + sPrevHolder + '|'+sHolder);
        if (sPrevHolder != sHolder && tData[mm].parent == 0){  // && tData[mm].data.nav == '--'
       
          var tChildren = [];
          sTitle = tData[mm].text; 

          var ptr2 = sTitle.indexOf('\\');
          if(ptr2 != -1){sTitle = sTitle.substring(0,ptr2-1 )}
        
          //console.log('DestinationData: '+  tData[mm].id + '|' + tData[mm].text + '|' + tData[mm].data.type + '|' + tData[mm].parent + '|' + tData[mm].index + '|' + tData[mm].data.nav) ;

          var sCombo = {name: sTitle, text: sTitle, id: parseInt(tData[mm].id), index: tData[mm].index , parent: tData[mm].parent, children: tChildren , data: { nav: tData[mm].data.nav, type: tData[mm].data.type, icon: '--', id: tData[mm].id, index: tData[mm].index, desc: tData[mm].data.desc}}

          parDest.push({name: sTitle, text: sTitle, id: parseInt(tData[mm].id), index: tData[mm].index , parent: tData[mm].parent, children: tChildren , data: { nav: tData[mm].data.nav, type: tData[mm].data.type, icon: '--', id: tData[mm].id, index: tData[mm].index, desc: tData[mm].data.desc}});    

          if(parseInt(tData[mm].id) > this.iHomeMax){this.iHomeMax = parseInt(tData[mm].id); }
        
          if(tData[mm].data.nav == '--' ){this.genChildren(tData[mm].id,tData,tChildren,parDest);}

          sPrevHolder = sHolder;
        }
      }
    },
    genChildren(parParent,parSource,parDest){
      if(parSource == undefined){return;}
      if(parSource.length == undefined){return;}

      for (var mm = 0; mm < parSource.length; mm++) {  
        var sID = parSource[mm].id;
        var sParentId = parSource[mm].parent;
        
        //console.log('target: ' +  parParent);
        var iImg = parSource[mm].data.nav;
        if(iImg != '--') {iImg=this.extractDomain(parSource[mm].data.nav,sID)}
        //console.log('ChildData: '+  parSource[mm].id + '|' + parSource[mm].text + '|' + parSource[mm].parent + '|' + iImg + ' | ' + parSource[mm].data.nav);

        if(parSource[mm].parent == parParent && parParent != 0){
          var tChildren = [];

          var sCombo
          //if(parSource[mm].data.type == 0)
        
          //if(parSource[mm].data.type == 0) {sCombo = {name: parSource[mm].text, text: parSource[mm].text , id: parSource[mm].id, index: parSource[mm].index, parent: parParent, data: { nav: parSource[mm].data.nav, type: parSource[mm].data.type, icon: iImg }};}    
          //if(parSource[mm].data.type == 1) {sCombo = {name: parSource[mm].text, text: parSource[mm].text , id: parSource[mm].id, index: parSource[mm].index, parent: parParent, children: tChildren , data: { nav: parSource[mm].data.nav, type: parSource[mm].data.type, icon: iImg }};}    

          if(parSource[mm].data.type != 1) parDest.push({name: parSource[mm].text, text: parSource[mm].text , id: parSource[mm].id, index: parSource[mm].index, parent: parParent, data: { nav: parSource[mm].data.nav, type: parSource[mm].data.type, icon: iImg, desc: parSource[mm].data.desc }});    
          if(parSource[mm].data.type == 1) parDest.push({name: parSource[mm].text, text: parSource[mm].text , id: parSource[mm].id, index: parSource[mm].index, parent: parParent, children: tChildren , data: { nav: parSource[mm].data.nav, type: parSource[mm].data.type, icon: iImg, desc: parSource[mm].data.desc }});    
          
          if(parseInt(parSource[mm].id) > this.iHomeMax){this.iHomeMax = parseInt(parSource[mm].id);}
          if(parSource[mm].data.type == 1){this.genChildren(parSource[mm].id,parSource,tChildren);}
        }
      }
        
    },
    isDomainEpic(parNAV){
      var sBuff = parNAV.toLowerCase();
      var ptr = sBuff.indexOf('theepiclink.com');

      if(ptr != -1){return true;}
      return false;
    },
    isDomainLike(item) {
      //console.log("Whoo! " + item);
          
      if(this.xDomainFavorites.length == 0 ){
        return 0;
      }

      for (var mm = 0; mm < this.xDomainFavorites.length; mm++) {  
        if(item == this.xDomainFavorites[mm].text ){
          //console.log("Boo! " + item);
          return 1;
        }
      }
      return 0;
    },             
    getTokenValueRange(parInput,parToken,parEndToken){
      var ptr = parInput.indexOf(parToken);
      var sBuff = ''

      if(ptr == -1){return sBuff}
      ptr = ptr + parToken.length
      sBuff = parInput.substring(ptr)
      var ptr2 = sBuff.indexOf(parEndToken);
      if(ptr2 == -1){return sBuff;}

      sBuff = sBuff.substring(0,ptr2)
      
      return sBuff
    },
    //setAddressBar(sParDomain,sParDesc,sParIcon){
    setAddressBar(sParStore){
      var nextURL = window.location.href;   // + '?domain=PequaSoft';
      let result = nextURL.includes("domain=");
      let sLocation = this.getLocation();

      if (sLocation != 'index'){return;}
      //let iconresult = nextURL.includes("icon=");
      const sStub = '?domain=' + sParStore.sCurrDomain; // sParDomain;
      console.log("Address Bar: " + sStub)
      if(result == false){
        nextURL = nextURL + sStub;
        //console.log("Address rebuilt Stub: " + nextURL)
      }
      if(result == true){
        var sBuff = nextURL.split('?domain=')
        console.log("Address rebuilt Stub: " + nextURL)
        nextURL = sBuff[0] + sStub;
      }  
      if(sParStore.sCurrDomainDesc.length > 0){
        nextURL = nextURL + "&desc=" + sParStore.sCurrDomainDesc
      } 
      if(sParStore.sCurrDomainIcon.length > 0){
        nextURL = nextURL + "&icon=" + sParStore.sCurrDomainIcon
      } 
      if(sParStore.sCurrDomainImage.length > 0){
        nextURL = nextURL + "&image=" + sParStore.sCurrDomainImage
      } 
      if(sParStore.sCurrDomainIcon.length > 0){
        nextURL = nextURL + "&style=" + sParStore.sCurrDomainStyle
      } 
        //console.log("Address Bar2: " + nextURL)
      const nextTitle = 'EpicLink';
      const nextState = { additionalInformation: 'Updated the URL' };

      // This will create a new entry in the browser's history, without reloading
      //window.history.pushState(nextState, nextTitle, nextURL);

      // This will replace the current entry in the browser's history, without reloading
      window.history.replaceState(nextState, nextTitle, nextURL);
      
      },
      getLocation() {
        var res = 'index';
  
        var nextURL = window.location.href;   // + '?domain=PequaSoft';
        nextURL = nextURL.replace("/localhost","/xyz")

        let loc_home = nextURL.includes("/home");
        let loc_local = nextURL.includes("/local");
        let loc_localhost = nextURL.includes("/localhost");
        let loc_about = nextURL.includes("/about");

        if(loc_home == true){res ='home';}        
        if(loc_about == true){res ='about';}        
        if(loc_local == true && loc_localhost == false){res ='local';}        
        //if(loc_local == true && loc_localhost == true){res ='local';}        
        
        return res;
  
      },    

      loadLocalDomain(parStore) {
        var sLocalBuff = localStorage.getItem('PS_LocalDomain');
        
        if(sLocalBuff == undefined || sLocalBuff.length == null){
          //parStore.commit('globalData/setLoadActive', false)
          parStore.loadActive = false
          return;
        }
  
        var treeLocal = [];

        //parStore.commit('globalData/setLoadActive', true)
        parStore.loadActive = true
        //console.log('Load Local Domain')
        sLocalBuff = this.cleanString(sLocalBuff,34); 
        var results = [];  
        var tData = [];  
        //console.log('Local Domain History: ' + sLocalBuff)
        var sSplitStub = "dateAdded";
        if(sLocalBuff.indexOf(sSplitStub) == -1){
          sSplitStub = "date_added";
          //this.loadLocalDomain_ff(sLocalBuff);
          //parStore.commit('globalData/setLoadActive', false)
          parStore.loadActive = false
          return;
          }
        var sBlob2 = sLocalBuff.split(sSplitStub);
        var sTitle = "<< NONE >>";
        var sURL = "<< NONE >>";
        var sID = "<< NONE >>";
        var sIndex = "<< NONE >>";
        var sParentID = "<< NONE >>";
        var MostRecentID = 10000;  
        var sType = "<< NONE >>";
        var sDesc = "<< NONE >>";
  
        //console.log('Local Domain Count: ' + sBlob2.length)
        for (var i = 0; i < sBlob2.length; i++) {
          sTitle = "<< NONE >>";
          sURL = "<< NONE >>";
          sID = -1 ;  //"<< NONE >>";
          sIndex = -1 ;  // "<< NONE >>";
          sParentID = -1 ;  // "<< NONE >>";
  
          sBlob2[i] = sBlob2[i].replace('guid', 'gggg');
          console.log('Local Domain pre: ' + sBlob2[i])
          sBlob2[i] = this.cleanString(sBlob2[i],93);  
          sBlob2[i] = this.cleanString(sBlob2[i],125);  
          sID = this.getTokenValue(sBlob2[i],'id:')
          sTitle = this.getTokenValue(sBlob2[i],'title:')
          sURL = this.getTokenValue(sBlob2[i],'url:')
          sIndex = this.getTokenValue(sBlob2[i],'index:')
          sParentID = this.getTokenValue(sBlob2[i],'parentId:')
          sType = this.getTokenValue(sBlob2[i],'type:')
          sDesc = this.getTokenValue(sBlob2[i],'desc:')

          if(sIndex == undefined || sIndex.length < 1){sIndex = i+1;}
          if(sURL == undefined || sURL.length < 1){sURL = this.getTokenValue(sBlob2[i],'nav:');}
          //if(sDesc == undefined || sDesc == "<< NONE >>"){sDesc = this.getTokenValue(sBlob2[i],'desc:');}
          if(sParentID == undefined || sParentID.length < 1){sParentID = this.getTokenValue(sBlob2[i],'parent:');}
  
          if(sTitle == undefined || sTitle.length < 1){sTitle = this.getTokenValue(sBlob2[i],'name:')}
          if(sParentID == undefined || sParentID.length < 1){sParentID = 0;}
  
          if(sID == 0){sTitle = '<<Root>>'; sParentID = 0; sURL = "<< NONE >>";}
          if(sURL == undefined || sURL.length < 1){sURL = "<< NONE >>";}
          if(sType == 'folder'){sURL = "<< NONE >>";}
          if(sID != -1 && sID != undefined && sID.length > 0){
            console.log('Local Domain blob: ' + sID + '|'+ sType + '|' + sTitle  + '|' + sDesc + '|' + sURL + '|' + sParentID + '|' + sIndex + '|' );
            results.push({id: parseInt(sID), index: parseInt(sIndex) , parentid: parseInt(sParentID) , title: sTitle, url: sURL , type: sType , desc: sDesc , icon: '--'});    
          }
          
          //console.log('bblob: ' + sBlob2[i] );
          this.loadLocalActive = false;  
        }
        
        console.log('blob count: ' + results.length );
        var treeLocal = [];
        //this.treeLocalEdit = [];
        treeLocal = this.genChildrenLocal(0,tData,results,MostRecentID);
        //tData = this.genChildrenLocal(0,this.treeLocal,results,MostRecentID);
        treeLocal = tData
      
        if(tData != undefined){console.log('blob out count: ' + tData.length );}
        
        if(treeLocal.length  != undefined){
          for (var mm = 0; mm < treeLocal.length; mm++) {  
            //console.log('Blob load: '+  tData[mm].id + '|' + tData[mm].text + '|' + tData[mm].parent + '|' + tData[mm].data.nav + '|' +  tData[mm].children.length + '|') ;        
            //console.log('Blob load: '+  this.treeLocal[mm].id + '|' + this.treeLocal[mm].text + '|' + this.treeLocal[mm].parent + '|' + this.treeLocal[mm].data.nav + '|' + this.treeLocal[mm].data.id + '|' + this.treeLocal[mm].data.index + '|' + this.treeLocal[mm].children.length + '|') ;        
          }
        }
        //parStore.commit('globalData/copyLocalArray', treeLocal)
        //parStore.commit('globalData/setLoadActive', false)
        parStore.localData = treeLocal;
        parStore.loadActive = false
        //document.title = 'Local Desktop'
        
      },    

      genChildrenLocal (parParentID,parChildren,parResults,parMostRecentID){
        var iCount = parResults.length;
        var jCount = parResults.length;
        var sTitle;
  
        // console.log(`child folder: ${iCount}`);
        
        for (var i = 0; i < iCount; i++) {
           //console.log(`add child folder: ${parParentID} - ${parResults[i].parentid} - ${parResults[i].id} - ${parResults[i].title} - ${parResults[i].url}`);
          if(parResults[i].id != undefined && parResults[i].parentid == parParentID && parResults[i].id != 0 && parResults[i].url == "<< NONE >>" ){
            //console.log(`add child-folder: ${parResults[i].parentid} - ${parResults[i].id} - ${parResults[i].title} - ${parResults[i].url}`);
            var tChildren = [];
            sTitle = this.cleanString(parResults[i].title,39);
            sTitle = this.cleanString(sTitle,34);
            sTitle = this.cleanString(sTitle,41);
            sTitle = this.cleanString(sTitle,44);
            sTitle = this.cleanString(sTitle,46);
            sTitle = this.cleanString(sTitle,93);
            sTitle = this.cleanString(sTitle,125);
            var ptr2 = sTitle.indexOf('\\');
            if(ptr2 != -1){sTitle = sTitle.substring(0,ptr2-1 )}
  
            if(parResults[i].id != 0) {this.genChildrenLocal (parResults[i].id,tChildren,parResults,parMostRecentID);}
                      
            if(parResults[i].parentid == 0 && tChildren.length > 0){
              console.log('most recent folder item: ' + sTitle + '|' + parResults[i].parentid);    
              //parChildren.push({ text: sTitle, id: parResults[i].id, parent: parResults[i].parentid, index: parResults[i].index, OPTIONS: {expanded: true,dropable: true,draggable: true}, children: tChildren , data: {  nav: 'folder', icon: 'ion-folder', type: 1}});    
              parChildren.push({ dateAdded: parResults[i].id, text: sTitle, name: sTitle, id: parResults[i].id, parent: 0, index: i+1, OPTIONS: {expanded: true,dropable: true,draggable: true}, children: tChildren , data: {  nav: '--', icon: '--', type: 1, id: parResults[i].id, index: i+1}});    
            }
            if(parResults[i].parentid != 0 && tChildren.length > 0){
              console.log('most recent item: ' + sTitle + '|' + parResults[i].parentid);    
              parChildren.push({ dateAdded: parResults[i].id, text: sTitle, name: sTitle, id: parResults[i].id, parent: parResults[i].parentid, index: i+1, OPTIONS: {expanded: false,draggable: true}, children: tChildren , data: {  nav: '--', icon: '--', type: 1, id: parResults[i].id, index: i+1}});    
            }
          }
        }
        for (var j = 0; j < jCount; j++) {
          var iImg =  parResults[j].url;
          if(iImg != '--') {iImg=this.extractDomain(parResults[j].url,parResults[j].id)}
  
          if(parResults[j].parentid == parParentID && parResults[j].parentid !== parMostRecentID && parResults[j].url != "<< NONE >>" && parResults[j].url != "chrome://bookmarks/"){
            sTitle = parResults[j].title;
            console.log('most recent item:: ' + sTitle + '|' + parResults[j].desc);
            parChildren.push({ dateAdded: parResults[j].id, text: sTitle, name: sTitle, id: parResults[j].id, parent: parResults[j].parentid, index: j+1 , OPTIONS: {expanded: true,dropable: false}, data: {  nav: parResults[j].url, icon: iImg, type: parResults[j].type, desc: parResults[j].desc, id: parResults[j].id, index: j+1}});    
        
            }
  
          if(parResults[j].parentid == parParentID && parResults[j].parentid == parMostRecentID && parResults[j].url != "<< NONE >>" && parResults[j].url != "chrome://bookmarks/"){
            sTitle = parResults[j].title;
            console.log('most recent item::: ' + sTitle + '|' + parResults[j].desc);
            parChildren.push({ dateAdded: parResults[j].id, text: sTitle, name: sTitle, id: parResults[j].id, parent: parMostRecentID, index: j+1 , OPTIONS: {expanded: true,draggable: false,dropable: false}, data: {  nav: parResults[j].url, icon: iImg, type: parResults[j].type, desc: parResults[j].desc, id: parResults[j].id, index: j+1}});    
        
          }
        }
        
        if(parChildren.length > 0){
          //console.log('Sort: ' + parChildren.length);
          parChildren.sort((a, b) => {
           // console.log('Sort: ' + a.text);
            return (a.data.index ) - (b.data.index);
          });  
        }
        
      },

      loadLocalDomainHTML(parStore) {
        var sLocalBuff = localStorage.getItem('PS_ReadText');
        if(sLocalBuff == undefined || sLocalBuff.length == null){return;}
              
        var treeLocal = [];
        //parStore.commit('globalData/setLoadActive', true)
        parStore.loadActive = true
        //alert("loadLocalDomainHTML")
        
        sLocalBuff = this.cleanString(sLocalBuff,34); 
        var work = [];  
        var details = [];  
  
        var sSplitStub = "<DT><H3";
        
        var sBlob2 = sLocalBuff.split('\n');
        var sFolderDecode = "";
        var sTitle = "<< NONE >>";
        var sIndent = 0;
      
        var iNewID=1;
        var kk=0;
  
        work.push({title: 'Imports', indent: 0 , level: 0, id: 0, parent: -1, type: '--'});    
        console.log('Local Domain Count: ' + sBlob2.length)
        for (var i = 0; i < sBlob2.length; i++) {
        
          sBlob2[i] = this.cleanString(sBlob2[i],93);  
          sBlob2[i] = this.cleanString(sBlob2[i],125);  
          //sBlob2[i] = sBlob2[i].substring(0,70);
          //console.log('blobout: ' + sBlob2[i] );
  
          var folderPtr = sBlob2[i].indexOf('</H3>');
          if(folderPtr != -1){
            sFolderDecode = this.getTokenValuePre(sBlob2[i],'</H3>')
            if(sFolderDecode.length > 0 ){
          
            sFolderDecode = sFolderDecode.split('|');
            sTitle = sFolderDecode[0];
            sIndent = sFolderDecode[1];
  
            work.push({title: sTitle, indent: parseInt(sIndent) , level: 0, id: 0, parent: -1, type: '--'});    
            //console.log('html-Folder: ' + sFolderDecode );
            //console.log('html-Folder: ' + sTitle + '|' + sIndent + '|' );
            }
          }
  
          var entryPtr = sBlob2[i].indexOf('<DT><A HREF=');
          if(entryPtr != -1){
            sFolderDecode = this.getTokenValueDetails(sBlob2[i],'<DT><A HREF=',details)
            //console.log('html-Folder: ' + sFolderDecode );
            var sDecode = sFolderDecode.split('|');
            //console.log('html-Folder:: ' + sDecode[0] + '|' + sDecode[1] + '|' + sDecode[2]);
            work.push({title: sDecode[2], indent: parseInt(sDecode[0]) , level: 0, id: 0, parent: -1, type: sDecode[1]});    
          }
        }
  
        for (var i = 0; i < work.length; i++) {
          if(work[i].type == '--'){
            if(i == 0){work[i].level = 1;work[i].id = iNewID;work[i].parent = 0;}
              if(i > 0){
                work[i].id = iNewID;
                var mm = i
                while(mm > 0 && work[i].parent < 0) {
                  kk=mm-1;
                  if(work[i].indent > work[kk].indent){work[i].level = work[kk].level+1;work[i].parent = work[kk].id;}
                  mm --;
               }
  
              }  
          //console.log('work Folder: ' + work[i].title + '|' + work[i].indent + '|' + work[i].level + '|' + work[i].id + '|' + work[i].parent)
          iNewID++;
          }
          
          if(work[i].type != '--'){
            if(i == 0){work[i].level = 1;work[i].id = iNewID;work[i].parent = 0;}
              if(i > 0){
                work[i].id = iNewID;
                var mm = i
                while(mm > 0 && work[i].parent < 0) {
                  kk=mm-1;
                  if(work[i].indent > work[kk].indent){work[i].level = work[kk].level+1;work[i].parent = work[kk].id;}
                  mm --;
                }
              }  
          //console.log('work Folder:: ' + work[i].title + '|' + work[i].indent + '|' + work[i].level + '|' + work[i].id + '|' + work[i].parent)
          iNewID++;
          }
        }
  
        this.genHTMLLevel(work,treeLocal,0,1);
  
        //parStore.commit('globalData/copyLocalArray', treeLocal)
        parStore.localData = treeLocal;
        var sLocalBuff = JSON.stringify(treeLocal); 
        localStorage.setItem('PS_LocalDomain', sLocalBuff);
        //parStore.commit('globalData/setLoadActive', false)
        parStore.loadActive = false
        
      },

      loadLocalDomainHTML_Safari(parStore) {
        var sLocalBuff = localStorage.getItem('PS_ReadText');
        if(sLocalBuff == undefined || sLocalBuff.length == null){return;}
        
        //parStore.commit('globalData/setLoadActive', true)
        parStore.loadActive = true
        sLocalBuff = this.cleanString(sLocalBuff,34); 
        
        //alert('Safari Load:' );
        var treeLocal = [];
        var work = [];  
        var details = [];  
  
        var sSplitStub = "<DT><H3";

        var sBlob2 = sLocalBuff.split('\n');
        var sFolderDecode = "";
        var sTitle = "<< NONE >>";
        var sIndent = 0;
        var iNewID=1;
        var kk=0;
  
        work.push({title: 'Imports', indent: 0 , level: 0, id: 0, parent: -1, type: '--'});    
        console.log('-Local Domain Count: ' + sBlob2.length)
        for (var i = 0; i < sBlob2.length; i++) {
          //console.log('-blobout: ' + sBlob2[i] );
          var folderPtr = sBlob2[i].indexOf('</H3>');
  
          if(folderPtr != -1){
            
            sFolderDecode = this.getTokenValueRange(sBlob2[i],'FOLDED','</H3>');
            var folderPtr = sFolderDecode.indexOf('>');
            if( folderPtr != -1){sFolderDecode = sFolderDecode.substring(folderPtr+1);}
  
            sIndent = sBlob2[i].indexOf('<DT><H3');
            sTitle = sFolderDecode;
  
            //console.log('-blobout: ' + sBlob2[i] );
            console.log('-blobout: ' + sIndent + '|' + sTitle );
            work.push({title: sTitle, indent: parseInt(sIndent) , level: 0, id: 0, parent: -1, type: '--'});    
          }  
  
          var entryPtr = sBlob2[i].indexOf('<DT><A HREF=');
          if(entryPtr != -1){
            var sURL = this.getTokenValueRange(sBlob2[i],'<DT><A HREF=','>');
            sTitle = sBlob2[i].substring(entryPtr+12);   // this.getTokenValueRange(sBlob2[i],'>','<');
            sTitle =this.getTokenValueRange(sTitle,'>','<');
            sIndent = entryPtr;
            console.log('entryout: ' + sIndent + '|' + sTitle + '|' + sURL  );
            work.push({title: sTitle, indent: parseInt(sIndent) , level: 0, id: 0, parent: -1, type: sURL});    
          }
         
        }
        
        for (var i = 0; i < work.length; i++) {
          if(work[i].type == '--'){
            if(i == 0){work[i].level = 1;work[i].id = iNewID;work[i].parent = 0;}
              if(i > 0){
                work[i].id = iNewID;
                
               var mm = i
                while(mm > 0 && work[i].parent < 0) {
                  kk=mm-1;
                  if(work[i].indent > work[kk].indent){work[i].level = work[kk].level+1;work[i].parent = work[kk].id;}
                  mm --;
               }
  
              }  
          console.log('work Folder: ' + work[i].title + '|' + work[i].indent + '|' + work[i].level + '|' + work[i].id + '|' + work[i].parent)
          iNewID++;
          }
          
          if(work[i].type != '--'){
            if(i == 0){work[i].level = 1;work[i].id = iNewID;work[i].parent = 0;}
              if(i > 0){
                work[i].id = iNewID;
              
                var mm = i
                while(mm > 0 && work[i].parent < 0) {
                  kk=mm-1;
                  if(work[i].indent > work[kk].indent){work[i].level = work[kk].level+1;work[i].parent = work[kk].id;}
                  mm --;
                }
              }  
          console.log('work Folder:: ' + work[i].title + '|' + work[i].indent + '|' + work[i].level + '|' + work[i].id + '|' + work[i].parent)
          iNewID++;
          }
        }
        
        this.genHTMLLevel(work,treeLocal,0,1);
  
        //parStore.commit('globalData/copyLocalArray', treeLocal)
        parStore.localData = treeLocal;
        var sLocalBuff = JSON.stringify(treeLocal); 
        //localStorage.setItem('PS_LocalDomain', sLocalBuff);
        parStore.commit('globalData/setLoadActive', false)
        parStore.loadActive = false
        
      },    

      genHTMLLevel(parSrc,parDest,parID,parLevel) {
        //alert("genHTMLLevel")
        for (var i = 0; i < parSrc.length; i++) {
          //console.log('level check: ' + parID + '|' + parLevel + '|' + parSrc[i].level + '|' + parSrc[i].parent)
          if(parSrc[i].level == parLevel && parSrc[i].parent == parID) {
            var iImg = parSrc[i].type;
          if(iImg != '--') {iImg=this.extractDomain(parSrc[i].type,parSrc[i].id)}
          
            var tChildren = [];  
  
            if(parSrc[i].type == '--'){this.genHTMLLevel(parSrc,tChildren,parSrc[i].id,parLevel+1);}
            
            if(parSrc[i].type == '--'){parDest.push({ dateAdded: parSrc[i].id, text: parSrc[i].title , name: parSrc[i].title, id: parSrc[i].id, parent: parSrc[i].parent, index: i+1, OPTIONS: {expanded: true,dropable: true,draggable: true}, children: tChildren , data: {  nav: '--', icon: '--', type: 1, id: parSrc[i].id, index: i+1}});}    
            if(parSrc[i].type != '--'){parDest.push({ dateAdded: parSrc[i].id, text: parSrc[i].title , name: parSrc[i].title, id: parSrc[i].id, parent: parSrc[i].parent, index: i+1, OPTIONS: {expanded: true,dropable: true,draggable: true}, children: tChildren , data: {  nav: parSrc[i].type, icon: iImg, type: 0, id: parSrc[i].id, index: i+1}});}    
          } 
        }
      },
      getTokenValuePre(parInput,parToken){
        var ptr = parInput.indexOf(parToken);
        var sBuff = ''
        //<DT><H3
        //if(ptr == -1){console.log('**Token not found:' + parToken);return sBuff}
        if(ptr == -1){return sBuff}
        
        var offset = ptr + parToken.length
        //ptr = ptr - 2;
        sBuff = parInput.substring(0,ptr)
        var ptr2 = sBuff.indexOf('<DT><H3');
        if(ptr2 == -1){return ''}
        var ptr3 = sBuff.indexOf('ADD_DATE=');
        if(ptr3 == -1){return ''}
        sBuff = sBuff.substring(ptr3+1);
  
        var ptr4 = sBuff.indexOf('>');
        if(ptr4 == -1){return ''}
        sBuff = sBuff.substring(ptr4+1);
        
        var indent = ptr2;
        //console.log('**Token found:' + sBuff + '|' + indent );
        
        
        return sBuff + '|' + indent
      },
      getTokenValueDetails(parInput,parToken,parDest){
        var ptr = parInput.indexOf(parToken);
        var sBuff = '';
        var sOutputBuff = '';
        var sIndent = 0;
        var sPrevIndent = 0;
        
        //if(ptr == -1){console.log('**Token not found:' + parToken);return sBuff}
        
        if(ptr == -1){return sBuff}
        sIndent = ptr
        var ptr2 = parInput.indexOf('HREF=');
        if(ptr2 == -1){return ''}
  
        sBuff = parInput.substring(ptr2+5);
        var ptr3 = sBuff.indexOf('ADD_DATE=');
        if(ptr3 == -1){return ''}
  
        var sRem = sBuff.substring(ptr3);
        sBuff = sBuff.substring(0,ptr3-1);
        var ptr4 = sRem.indexOf('>');
        if(ptr4 == -1){return ''}
  
        //console.log('**entry found: 2')
  
        sRem = sRem.substring(ptr4+1);
  
        var ptr5 = sRem.indexOf('</A>');
        if(ptr5 == -1){return ''}
        
        sRem = sRem.substring(0,ptr5);
        //console.log('**entry found:' + sIndent + '|' + sBuff + '|' + sRem);
        var sOutputBuff = sIndent + '|' + sBuff + '|' + sRem;
  
        //var sBlob = parInput.split('HREF=');      
        
        
        return sOutputBuff
      },
    copyHomeLoad(parTreeSrc,parTreeDest,parSwitch) {
      if(parTreeSrc.length > 0){
        for (var mm = 0; mm < parTreeSrc.length; mm++) {  
          this.copyNode(parTreeSrc[mm],parTreeDest,mm+1,parSwitch)
          //console.log('+++ copyHomeLoad: '+  parTreeSrc[mm].id + '|' + parTreeSrc[mm].text + '|' + parTreeSrc[mm].parent + '|' + parTreeSrc[mm].data.nav) ;        
        }
      }
    },
    copyNode(parNode,parTreeDest,parIndex,parSwitch) {
      if(parNode.text != undefined ){
        //dateAdded: parResults[i].id,
        parTreeDest.push({name: parNode.text, text: parNode.text, id: parNode.id, parent: parNode.parent, index: parIndex , data: { nav: parNode.data.nav, desc: parNode.data.desc, type: parNode.data.type}}); 
        //if(parSwitch == 1){console.log('+++ copy Node: ' + parNode.id + '|' + parNode.name  + '|' + parNode.text + '|' + parNode.children  + '|' + parNode.data.nav ); }
        if(this.loadLocal == 0 && this.iHomeDomainMax < parseInt(parNode.id)){this.iHomeDomainMax=parseInt(parNode.id);}
        if(this.loadLocal == 1 && this.iHomeLocalMax < parseInt(parNode.id)){this.iHomeLocalMax=parseInt(parNode.id);}
      }
      
      if(parNode.children != undefined){
        var sNode = parNode.children
            
        for (var mm = 0; mm < sNode.length; mm++) {  
          
          if(sNode[mm].text != undefined && sNode[mm].data.nav != '--'){
            if(parSwitch == 1){console.log('+++ copy Node: ' + sNode[mm].id + '|' + sNode[mm].name + '|' + sNode[mm].text + '|' + parNode.id  + '|' + sNode[mm].data.nav );} 
            
            parTreeDest.push({name: sNode[mm].name, text: sNode[mm].name, id: sNode[mm].id , index: mm+1 , parent: parNode.id, data: { nav: sNode[mm].data.nav, desc: sNode[mm].data.desc, type: sNode[mm].data.type}});    
            if(this.loadLocal == 0 && this.iHomeDomainMax < parseInt(sNode[mm].id)){this.iHomeDomainMax=parseInt(sNode[mm].id);}
            if(this.loadLocal == 1 && this.iHomeLocalMax < parseInt(sNode[mm].id)){this.iHomeLocalMax=parseInt(sNode[mm].id);}
  
          }
          
          if(sNode[mm].text != undefined && sNode[mm].children != undefined && sNode[mm].data.nav == '--'){
            if(parSwitch == 1){console.log('+++ Level Load: ' + sNode[mm].text + '|' + sNode[mm].children.length);} 
  
            this.outputNode(sNode[mm],parTreeDest)
            this.copyNode(sNode[mm],parTreeDest,mm+1,parSwitch)
          }
        }
          
        this.outputNode(parNode.children,parTreeDest)
      }
    }, 
    outputNode(parNode) {
      if(parNode.name != undefined ){
      //console.log('Memory-Load: '+  parNode.id + '|' + parNode.text + '|' + parNode.data.nav ); 
      }
      // + parNode.data.nav + '|'
      
      if(parNode.children != undefined){
        var sNode = parNode.children
        
        for (var mm = 0; mm < sNode.length; mm++) {  
          if(sNode[mm].name != undefined){
          //console.log('Memory-Child Load: ' + sNode[mm].id + '|' + sNode[mm].text + '|' + sNode[mm].data.nav ); 
          }
        }
        this.outputNode(parNode.children)
        //if (sNode[mm].data.nav == '--'){this.outputNode(parNode.children)}
      }
      
    },       
    async compareNode(parAxios,parWriteBlock,parDomain,parHomeOrig,parHomeCurr,parStart) {
      var iTarget = 0;
      var iFound = 0;
      var treeDiff = [];
      var treeDiffBulk = [];
      var sTitlemm;
      var sTitlekk;
      var ptr2
      //treeHome
    
      for (var mm = 0; mm < parHomeOrig.length; mm++) {  
        console.log('A-Memory-Diff: ' +  parHomeOrig[mm].id + '|' + parHomeOrig[mm].parent  + '|' + parHomeOrig[mm].index + '|' + parHomeOrig[mm].name + '|' + parHomeOrig[mm].data.nav );
      }
  
      for (var mm = 0; mm < parHomeCurr.length; mm++) {  
        console.log('B-Memory-Diff: ' +  parHomeCurr[mm].id + '|' + parHomeCurr[mm].parent  + '|' +  parHomeCurr[mm].index + '|' + parHomeCurr[mm].name + '|' + parHomeCurr[mm].data.nav + '|' + parHomeCurr[mm].data.type );
      }
      
      console.log('Start Memory-Diff: ' + parHomeOrig.length);
      
      for (var mm = 0; mm < parHomeOrig.length; mm++) {  
        iTarget = 0;
        iFound = 0;
        
        sTitlemm = parHomeOrig[mm].name; 
        ptr2 = sTitlemm.indexOf('\\');
        if(ptr2 != -1){sTitlemm = sTitlemm.substring(0,ptr2-1 )}
  
        //console.log('A-Memory-Diff: '+  parHomeOrig[mm].id + '|' + parHomeOrig[mm].name + '|' + parHomeOrig[mm].text );
        for (var kk = iTarget; kk < parHomeCurr.length; kk++) {  
          if(parHomeOrig[mm].id != undefined && parseInt(parHomeOrig[mm].id) === parseInt(parHomeCurr[kk].id)){
            sTitlekk = parHomeCurr[kk].name; 
            var ptr3 = sTitlekk.indexOf('\\');
            if(ptr3 != -1){sTitlekk = sTitlekk.substring(0,ptr3-1 )}
        
            iFound = 1;
            if(sTitlemm != sTitlekk || sTitlemm != sTitlekk || parHomeOrig[mm].index != parHomeCurr[kk].index || parHomeOrig[mm].parent != parHomeCurr[kk].parent || parHomeOrig[mm].data.nav != parHomeCurr[kk].data.nav || parHomeOrig[mm].data.desc != parHomeCurr[kk].data.desc ) {
              parHomeCurr[kk].data.desc=parHomeCurr[kk].data.desc.replaceAll(",", ";");
              treeDiff.push({type: 'Edit', name: sTitlekk, text: sTitlekk, id: parHomeCurr[kk].id, index: parHomeCurr[kk].index, parent: parHomeCurr[kk].parent , data: { nav: parHomeCurr[kk].data.nav, itemtype: parHomeCurr[kk].data.type, desc: parHomeCurr[kk].data.desc}});    
              treeDiffBulk.push({chtype: 'Edit', domain: this.sDomainSearch, itemid: parHomeCurr[kk].id, parentid: parHomeCurr[kk].parent , sortindex: parHomeCurr[kk].index, title: sTitlekk, itemurl: parHomeCurr[kk].data.nav, clickcount: 0, itemseq: 0});    
              console.log('C-Memory-Diff: '+  parHomeCurr[kk].id + '|' + sTitlekk + '|' + parHomeCurr[kk].data.nav );
            }
          }
        }
        
        if(mm <= parHomeOrig.length-1 && iFound == 0){
          console.log('C-Memory-Delete: '+  parHomeOrig[mm].id + '|' + sTitlemm + '|' + parHomeOrig[mm].data.nav );
          treeDiff.push({type: 'Delete', name: sTitlemm, text: sTitlemm, id: parHomeOrig[mm].id, index: parHomeOrig[mm].index, parent: parHomeOrig[mm].parent , data: { nav: parHomeOrig[mm].data.nav, itemtype: parHomeOrig[mm].data.type, desc: parHomeOrig[mm].data.desc}});    
          treeDiffBulk.push({chtype: 'Delete', domain: this.sDomainSearch, itemid: parHomeOrig[mm].id, parentid: parHomeOrig[mm].parent , sortindex: parHomeOrig[mm].index, title: sTitlekk, itemurl: parHomeOrig[mm].data.nav, clickcount: 0, itemseq: 0});    
        }
      }
  
      console.log('Start Memory-Add: ' + parHomeCurr.length);
      for (var mm = 0; mm < parHomeCurr.length; mm++) {  
        iFound = 0;
        for (var kk = iTarget; kk < parHomeOrig.length; kk++) {  
          if(parseInt(parHomeCurr[mm].id) === parseInt(parHomeOrig[kk].id)){
              iFound = 1;
          }
        }
  
        if(iFound == 0){console.log('Memory-New: ' + parHomeCurr[mm].id + '|' + parHomeCurr[mm].name);}
  
        sTitlemm = parHomeCurr[mm].name; 
        ptr2 = sTitlemm.indexOf('\\');
        if(ptr2 != -1){sTitlemm = sTitlemm.substring(0,ptr2-1 )}
  
        if(parHomeOrig.length > 0){
          if(mm <= parHomeCurr.length-1 && iFound == 0){
            console.log('Memory-Add: ' + parHomeCurr[mm].id + '|' + parHomeCurr[mm].name);
            parHomeCurr[mm].data.desc=parHomeCurr[mm].data.desc.replaceAll(",", ";");
            treeDiff.push({type: 'Add', name: sTitlemm, text: sTitlemm, id: parHomeCurr[mm].id, index: parHomeCurr[mm].index, parent: parHomeCurr[mm].parent , data: { nav: parHomeCurr[mm].data.nav, itemtype: parHomeCurr[mm].data.type, desc: parHomeCurr[mm].data.desc}});    
            treeDiffBulk.push({chtype: 'Add', domain: this.sDomainSearch, itemid: parHomeCurr[mm].id, parentid: parHomeCurr[mm].parent , sortindex: parHomeCurr[mm].index, title: sTitlekk, itemurl: parHomeCurr[mm].data.nav, clickcount: 0, itemseq: 0});    
          }
        }
        if(parHomeOrig.length == 0){
          console.log('Memory-Add: ' + parHomeCurr[mm].id + '|' + parHomeCurr[mm].name);
          parHomeCurr[mm].data.desc=parHomeCurr[mm].data.desc.replaceAll(",", ";");
          treeDiff.push({type: 'Add', name: sTitlemm, text: sTitlemm, id: parHomeCurr[mm].id, index: parHomeCurr[mm].index, parent: parHomeCurr[mm].parent , data: { nav: parHomeCurr[mm].data.nav, itemtype: parHomeCurr[mm].data.type, desc: parHomeCurr[mm].data.desc}});    
          treeDiffBulk.push({chtype: 'Add', domain: this.sDomainSearch, itemid: parHomeCurr[mm].id, parentid: parHomeCurr[mm].parent , sortindex: parHomeCurr[mm].index, title: sTitlekk, itemurl: parHomeCurr[mm].data.nav, clickcount: 0, itemseq: 0});    
        }
      }
  
      // Do db save
      var iIncr = parWriteBlock;
      var iLoop = Math.ceil(treeDiff.length/iIncr);
      var iStart = 1;
      var iEnd = iIncr+1;
      var iLoopMax;
      
      console.log('D-Memory-Loop: ' +  iLoop );
      for (var ii = 0; ii < iLoop; ii++) {  
        var sChunk = [];
        var sChunkBulk = [];
        console.log('D-Memory-Loop: ' + parseInt(ii+1) );
        iLoopMax = iEnd
        if(iLoopMax > treeDiff.length){iLoopMax = treeDiff.length;}
        for (var jj = iStart-1; jj < iLoopMax; jj++) {  
          sChunk.push(treeDiff[jj]);
          sChunkBulk.push(treeDiffBulk[jj]);
        }
        for (var mm = 0; mm < sChunk.length; mm++) {  
          console.log('D-Memory-Diff: ' +  sChunk[mm].type + '|' + sChunk[mm].id + '|' + sChunk[mm].index + '|' + sChunk[mm].parent + '|' + sChunk[mm].name + '|' + sChunk[mm].data.nav );
        }
        iStart+=iIncr;
        iEnd+=iIncr;
      } 
      console.log('Squirt Start');
      
      //console.log('Squirt-Control: ' +  parDomain + ' - ' + parWriteBlock + ' - ' + parStart + ' - ' + iLoop);
      await this.axiosUpdateDomainSquirt(parAxios,parWriteBlock,parDomain, parStart, iLoop, treeDiff);
      console.log('Squirt End');
  
      return;
  
    },
    async axiosUpdateDomainSquirt (parAxios,parWriteBlock,parDomain, parRun, parMax, parData ) {
      var sOperation;
      var sDomain=parDomain;
      var sChunk = [];
      
      console.log('Squirt-Control: ' +  parDomain + ' - ' + parWriteBlock + ' - ' + parRun + ' - ' + parMax);

      if(parRun == 0){sOperation = 'detailclear';}
      
      if(parRun > 0 && parRun < parMax+1){sOperation = 'domainupdate';}
      
      if(parRun >= parMax+1){sOperation = 'sequencedetails';}
  
      if(parRun > 0 && parRun < parMax+1){
        var iIncr = parWriteBlock;    //this.writeBlock;
      
        var iEnd = iIncr;
        var iLoopMax= iIncr * parRun;
        var iStart = (iIncr * (parRun-1))+1;
        if(iLoopMax > parData.length){iLoopMax = parData.length;}
        console.log('Squirt-Loop: ' +  iStart + ' - ' + iLoopMax);
        
        for (var jj = iStart-1; jj < iLoopMax; jj++) {  
          //parData[jj].data.itemdesc=parData[jj].data.itemdesc.replaceAll(",", ";");
          sChunk.push(parData[jj]);
        }
          
        for (var mm = 0; mm < sChunk.length; mm++) {  
          console.log('Squirt-Diff: ' + sDomain + '|' + sChunk[mm].type + '|' + sChunk[mm].id + '|' + sChunk[mm].index + '|' + sChunk[mm].parent + '|' + sChunk[mm].name + '|' + sChunk[mm].data.nav );
        }
      }
      
      const formData = new FormData()
      
      formData.append('user', JSON.stringify('abc'))
      formData.append('id', JSON.stringify(this.sUID))
  
      formData.append('domain', sDomain)
      formData.append('updates', JSON.stringify(sChunk))
      
      console.log('Domain Squirt- Start: ' + parRun + '|' + parMax + '|' + sOperation);
      
      let promise = new Promise((resolve, reject) => {
      
        //domaintreesize
        console.log('Squirt Axios: ' + parAxios + sOperation);
        axios.post(parAxios + sOperation, formData).then((res) => {
          var result = res.data.rows
          console.log('Squirt Update: ' + result);
  
          setTimeout(() => resolve("done!"), 1)
        })
      
      });
      let result = await promise;
      
      console.log('Domain Squirt- End');

      //(parAxios,parWriteBlock,parDomain, parRun, parMax, parData )
      if(parRun < parMax+2){await this.axiosUpdateDomainSquirt(parAxios, parWriteBlock,parDomain, parRun+1, parMax, parData);}
  
    },     
    axiosUpdateCount (parAxios, parDomain, parClickID ) {
      
      const formData = new FormData()
    
      formData.append('user', JSON.stringify('abc'))
      formData.append('domain', JSON.stringify(parDomain))
      formData.append('id', JSON.stringify(parClickID))

      axios.post(parAxios + 'detailcountup', formData).then((res) => {
        //alert("Boo!! " + parDomain + ' | ' + parClickID); 
                
      })
    },
    async selectDomain(parStore, parDomain, parSwitch = 0){
      parStore.sCurrDomain = parDomain
      await this.loadHomeDomain( parStore.sCurrDomain, parStore.axios, parStore, parStore.treeData,1)
      console.log('Select Domain:' + parStore.sCurrDomain + "|" + parStore.sCurrDomainDesc + "|" + parStore.sCurrDomainIcon );
      //this.setAddressBar(parStore.sCurrDomain, parStore.sCurrDomainDesc, parStore.sCurrDomainIcon)
      this.setAddressBar(parStore)
      localStorage.setItem('PS_CurrDomain', JSON.stringify(parStore.sCurrDomain));

      let sLocation = this.getLocation();
      
      if (sLocation != 'index' && parSwitch == 1){
        /*
        const sStub = '?domain=' + parDomain;
        var nextURL = window.location.href;
        const nextTitle = 'EpicLink';
        const nextState = { additionalInformation: 'Updated the URL' };
        nextURL = nextURL + sStub;
        window.history.replaceState(nextState, nextTitle, nextURL);
        console.log('Home Address:' + nextURL );
        */
        const router = useRouter()
        
        router.push({ path: '/' })
        //this.$bus.$emit('ACTIVATE_TITLE', parStore.sCurrDomain)       
      }
      
    },
    async getURLTitle( parAxios, parURL) {
      var sResult = '--'
      const urlData = new FormData()    
      urlData.append("url", parURL)
      
      let promise = new Promise((resolve, reject) => {  
      
        axios.post(parAxios + 'urltitle', urlData).then((res) => {
        var sLocalBuff = res.data.rows;

        console.log('URL Title: ' + sLocalBuff);
        sResult = sLocalBuff;
        setTimeout(() => resolve("done!"), 1)  
      })
    });
    let result = await promise;
    
    console.log('*** Finish-URL Title');
    return sResult ;
    } ,
    async readFile( parFile) {
      console.log('** Upload File: ' + parFile);

    }
}