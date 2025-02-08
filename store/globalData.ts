import { defineStore } from 'pinia'
import axios from 'axios'
import dload from '@/mixins/DataLoad'
import Swal from 'sweetalert2'

export const useGlobalStore = defineStore('globalStore', {
  state: () => ({
    initApp: 0,
    iSearch: 0,
    searchActive: 0,
    sUID: '',
    sPWD: '',
    sAxios: '',
    semail: '',
    sDomain: '',
    sDomainIcon: '',
    sDomainImage: '',
    iDomainStyle: 0,
    sOrigDomain: '',
    sDomainDescription: '',
    loginStatus: 0,
    stayLoggedIn: 0,
    bStayLoggedIn: true,
    domainCount: 0,
    uidCount: 0,
    sCurrDomain: '',
    sCurrDomainDesc: '',
    sCurrDomainIcon: '',
    sCurrDomainImage: '',    
    iCurrDomainStyle: 0,
    deviceType: '--',
    treeData: [],
    homeData: [],
    localData: [],
    domainFavorites: [],
    itemFavorites: [],
    domainHistory: [],
    itemHistory: [],
    favoritesMax: 20,
    readBlock: 50,
    writeBlock: 20,
    showDomainPanel: 1,
    showLinksPanel: 1,        
    loadActive: false,
    loadSidebar: false,
    sDeviceType: 'desktop',
    //axios: 'https://sectorfeed.vercel.app/'
    //axios: 'https://sectorfeed-o74aiz9z9-pequasoft.vercel.app/'
    axios: 'https://sectorfeed-44zccmz11-pequasoft.vercel.app/'
    //axios: 'http://localhost:5000/'
  }),
  actions: {
    increment() {
      // `this` is the store instance
      //this.counter++
    },
    axiosUpdateProfile () {
      // alert("myLogin!");
        const formData = new FormData()

          formData.append('user', JSON.stringify(this.sUID))
          formData.append('pwd', JSON.stringify(this.sPWD))
          formData.append('email', JSON.stringify(this.semail))
          formData.append('domain', this.sDomain)
          formData.append('domaindescription', this.sDomainDescription)
          formData.append('domainicon', JSON.stringify(this.sDomainIcon))
          formData.append('domainimage', JSON.stringify(this.sDomainImage))
          formData.append('domainstyle', JSON.stringify(this.iDomainStyle))
      
          axios.post(this.axios + 'profileupdate2', formData).then((res) => {
      
      })
    },

    async axiosLoadProfile () {
      const formData = new FormData()

      formData.append('title', JSON.stringify(this.sUID))
      formData.append('content', JSON.stringify(this.sPWD))

      let promise = new Promise((resolve, reject) => {  

      axios.post(this.axios + 'loadprofile', formData).then((res) => {
        let result = JSON.stringify(res.data.rows)

        result = dload.clean_String(result)
        const buff = dload.clean_String(result)
        
        const buff2 = buff.substring(1, buff.length)

        const jsonData = JSON.parse(buff2.substring(0, buff2.length - 1))

        for (let i = 0; i < jsonData.length; i++) {
          const counter = jsonData[i]
          
          this.sPWD = counter.password
          this.semail = counter.email
          this.sDomain = counter.Domain
          this.sOrigDomain = counter.Domain
          this.sDomainDescription = counter.DomainDescription
          this.sDomainIcon = counter.DomainIcon
          this.sDomainImage = counter.DomainImage
          this.iDomainStyle = counter.DomainStyle
          this.initApp = 1;
          console.log('Do Login-profile')
          //var x = dload.loadHomeDomain( this.sDomain, this.axios, this, this.homeData,2)
        }
        setTimeout(() => resolve("done!"), 1)
      })
    });
    let result = await promise;
   
    },

    async axiosLoadUID () {
      var iStayLogged = 0;

      this.loginStatus = 0
      if(this.bStayLoggedIn == true){iStayLogged = 1;}

      console.log('Do Login-'+ this.bStayLoggedIn + '|' + iStayLogged)
      const formData = new FormData()
      const sErrorMsg = '<font face="verdana" color="black">Invalid Login/Password Entered!</font>'
      formData.append('title', JSON.stringify(this.sUID))
      formData.append('content', JSON.stringify(this.sPWD))

      //alert('axios: ' + this.xAxios)
      let promise = new Promise((resolve, reject) => {  

      axios.post(this.axios + 'loaduid', formData).then((res) => {
        const result = JSON.stringify(res.data.rows)

        const result2 = dload.clean_String(result)
        const buff = dload.clean_String(result2)
        const buff2 = buff.substring(1, buff.length)
        
        const jsonData = JSON.parse(buff2.substring(0, buff2.length - 1))

        // alert('3-axiosLoadUID' + jsonData)
        let loginResult = 'false'
        let i = 0
        for (i = 0; i < jsonData.length; i++) {
          const counter = jsonData[i]
          loginResult = counter.AccountStatus
        }

        if (loginResult === 'Yes') {
          this.sUID = this.sUID
          this.sPWD = this.sPWD
          this.loginStatus = 0
          this.stayLoggedIn = iStayLogged
          
          localStorage.setItem('PS_UID', this.sUID);
          localStorage.setItem('PS_PWD', this.sPWD);
          if(this.bStayLoggedIn == true){localStorage.setItem('PS_bStayLoggedIn', 'true');}
          if(this.bStayLoggedIn == false){localStorage.setItem('PS_bStayLoggedIn', 'false');}
        }
        if (loginResult !== 'Yes') {
          this.loginStatus = 0          

        } else{
          this.loginStatus = 1
          //this.axiosLoadProfile()
        
        }
        setTimeout(() => resolve("done!"), 1)
      })
    });
    let result = await promise;

    await this.axiosLoadProfile()
    return this.loginStatus
    },

    async isDomainUnique (parSwitch, parUID, parDomain) {

      if (parDomain.length == 0 && parDomain.length == undefined){return 1;}
            
      //alert("Domain Unique!");
      const formData = new FormData()
    
      formData.append('user', JSON.stringify(parUID))
      formData.append('domain', JSON.stringify(parDomain))

      let promise = new Promise((resolve, reject) => {  
      axios.post(this.axios + 'domainunique', formData).then((res) => {
        const result = JSON.stringify(res.data.rows);
        var buff = dload.cleanString(result,34); 
        buff = dload.cleanString(buff,91); 
        buff = dload.cleanString(buff,93); 
        buff = dload.cleanString(buff,123); 
        buff = dload.cleanString(buff,125); 
        var count =buff.split(":");
        //alert("Profile Unique: " + count[1]);
        setTimeout(() => resolve("done!"), 1)
        //alert("Profile Unique: " + count[1]);
        this.domainCount = 0;
        if(parSwitch == 1 && count[1] == '0'){ this.domainCount = 1;}
        if(parSwitch == 2 && count[1] == '0'){ this.domainCount = 1;}
        if(count[1] != '0'){ this.domainCount = 0;}
        //this.axiosUpdateProfile()
        
      })
    });
    let result = await promise;
    return this.domainCount;
    },  

    async isUIDUnique (parSwitch, parUID) {

      if (parUID.length == 0 && parUID.length == undefined){return 1;}
            
      //alert("Domain Unique!");
      const formData = new FormData()
    
      formData.append('user', JSON.stringify(parUID))

      let promise = new Promise((resolve, reject) => {  
      axios.post(this.axios + 'uidunique', formData).then((res) => {
        const result = JSON.stringify(res.data.rows);
        var buff = dload.cleanString(result,34); 
        buff = dload.cleanString(buff,91); 
        buff = dload.cleanString(buff,93); 
        buff = dload.cleanString(buff,123); 
        buff = dload.cleanString(buff,125); 
        var count =buff.split(":");
        //alert("Profile Unique: " + count[1]);
        setTimeout(() => resolve("done!"), 1)
        //alert("Profile Unique: " + count[1]);
        this.uidCount = 0;
        if(parSwitch == 1 && count[1] == '0'){ this.uidCount = 1;}
        if(parSwitch == 2 && count[1] == '0'){ this.uidCount = 1;}
        if(count[1] != '0'){ this.uidCount = 0;}
        //this.axiosUpdateProfile()
        
      })
    });
    let result = await promise;
    return this.uidCount;
    },      
    async axiosCreateProfile () {
      // alert("myLogin!");
      const formData = new FormData()

      formData.append('user', JSON.stringify(this.sUID))
      formData.append('pwd', JSON.stringify(this.sPWD))
      formData.append('email', JSON.stringify(this.semail))
      formData.append('domain', this.sDomain)
      formData.append('domaindescription', this.sDomainDescription)
      formData.append('domainicon', JSON.stringify(this.sDomainIcon))
      formData.append('domainimage', JSON.stringify(this.sDomainImage))
      formData.append('domainstyle', JSON.stringify(this.iDomainStyle))
      
      //alert("Add Profile");

      let promise = new Promise((resolve, reject) => {  
        axios.post(this.axios + 'profileadd2', formData).then((res) => {
          setTimeout(() => resolve("done!"), 1)  
        })        
      });
      let result = await promise;
      return;

    },

    storeDomainFavorites () {
      this.domainFavorites.splice(this.favoritesMax);
      localStorage.setItem('PS_DomainFavorites', JSON.stringify(this.domainFavorites));
    },
    storeDomainHistory () {
      this.domainHistory.splice(this.favoritesMax);
      localStorage.setItem('PS_DomainHistory', JSON.stringify(this.domainHistory));
      console.log('store Domain History: ' + JSON.stringify(this.domainHistory));   
    },
    storeClickFavorites () {
      this.itemFavorites.splice(this.favoritesMax);
      localStorage.setItem('PS_ClickFavorites', JSON.stringify(this.itemFavorites));
      console.log('storeClickFavorites')
    },
    storeClickHistory () {
      this.itemHistory.splice(this.favoritesMax);
      localStorage.setItem('PS_ClickHistory', JSON.stringify(this.itemHistory));
    },

    addClickFavoriteSeq (sText) {
    
      //console.log('addClickFavoriteSeq:' + sText.text)
      if(this.itemFavorites.length > 0 && this.itemFavorites[this.itemFavorites.length-1].text != sText.text && this.itemFavorites.length < this.favoritesMax){
        console.log('addClickFavoriteSeq:' + sText.text)
        this.itemFavorites.push(sText); 
      }
  
      if(this.itemFavorites.length == 0){
        console.log('addClickFavoriteSeq:' + sText.text)
        this.itemFavorites.push(sText); 
      }
    },  
    deleteDomainFavorite(sText) {
      //alert("Boo! " + item.text + '|' + item.nav);
                        
      if(this.domainFavorites.length == 0 ){
        return ;
      }
    
      for (var mm = 0; mm < this.domainFavorites.length; mm++) {  
        if(sText.text == this.domainFavorites[mm].text ){
          this.domainFavorites.splice(mm, 1);
          //localStorage.setItem('PS_DomainFavorites', JSON.stringify(state.domainFavorites));
          this.storeDomainFavorites();
          return ;
        }
      }
      return ;
    },    
    deleteItemFavorite(sText) {
      //alert("Boo! " + item.text + '|' + item.nav);
                        
      if(this.itemFavorites.length == 0 ){
        return ;
      }
    
      for (var mm = 0; mm < this.itemFavorites.length; mm++) {  
        if(sText.text == this.itemFavorites[mm].text ){
          this.itemFavorites.splice(mm, 1);
          //localStorage.setItem('PS_ClickFavorites', JSON.stringify(state.itemFavorites));
          this.storeClickFavorites();
          return ;
        }
      }
      return ;
    },

    addClickHistory (sText) {
      if(this.itemHistory.length > 0 && this.itemHistory[0].text != sText.text){
        this.itemHistory.unshift(sText);
      }
  
      if(this.itemHistory.length == 0){
        this.itemHistory.push(sText); 
      }
      localStorage.setItem('PS_ClickHistory', JSON.stringify(this.itemHistory));
    },

    addClickHistorySeq (sText) {
      if(this.itemHistory.length > 0 && this.itemHistory[this.itemHistory.length-1].text != sText.text && this.itemHistory.length < this.favoritesMax){
        this.itemHistory.push(sText);
        console.log('addItemHistorySeq: ' + this.domainHistory.length);   
      }
  
      if(this.itemHistory.length == 0){
        this.itemHistory.push(sText); 
      }
      localStorage.setItem('PS_ClickHistory', JSON.stringify(this.itemHistory));
    },
    addDomainFavorite (sText) {

      if(this.domainFavorites.length == 0 ){
        this.domainFavorites.push(sText); 
      }
  
      if(this.domainFavorites[0].text != sText.text){
        this.domainFavorites.unshift(sText); 
        this.domainFavorites.splice(this.favoritesMax);
      }
  
    },
    addDomainFavoriteSeq (sText) {
    
      //this.domainFavorites.push(sText); 

      if(this.domainFavorites.length > 0 && this.domainFavorites[this.domainFavorites.length-1].text != sText.text && this.domainFavorites.length < this.favoritesMax){
        this.domainFavorites.push(sText); 
      }
  
      if(this.domainFavorites.length == 0){
        this.domainFavorites.push(sText); 
      }


      
    },
    addDomainHistorySeq (sText) {
      //console.log('domain Hist source:' +sText.text );   
      if(this.domainHistory.length > 0 && this.domainHistory[this.domainHistory.length-1].text != sText.text && this.domainHistory.length < this.favoritesMax){
        this.domainHistory.push(sText); 
        console.log('addDomainHistorySeq: ' + this.domainHistory.length);   
      }
  
      if(this.domainHistory.length == 0){
        this.domainHistory.push(sText); 
        console.log('addDomainHistorySeq: ' + this.domainHistory.length);   
      }
  
    },    

    addDomainHistory (sText) {
      //console.log('addDomainHistory');   
      if(sText == '--'){return;}
      if(this.domainHistory.length > 0 && this.domainHistory[0].text != sText.text){
        this.domainHistory.unshift(sText); 
        console.log('addDomainHistory: ' + this.domainHistory.length);   
      }
  
      if(this.domainHistory.length == 0){
        this.domainHistory.push(sText); 
      }
      this.storeDomainHistory();
      //localStorage.setItem('PS_DomainHistory', JSON.stringify(this.domainHistory));
  
    },
  },
})