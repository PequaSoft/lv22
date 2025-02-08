<template>
  <div class="pa-4 text-center">
  <v-dialog max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" color="primary">
          <span style="color: white;" class="mr-2">Login</span>
      </v-btn>
      </template>
  
      <template v-slot:default="{ isActive }">
          <v-card>
            <v-toolbar color="primary" title="Login" STYLE="font-size:22.0pt;font-family:arial; color: white;"></v-toolbar>
              <v-card-text class="compact-form">
                <v-text-field class="compact" v-model="sUID" label="User ID" density="compact" color="primary" variant="solo"></v-text-field>
                <v-text-field class="compact" v-model="sPWD" label="Password" density="compact" variant="solo" type="password"></v-text-field>
                <v-switch class="compact" v-model="bStayLoggedIn" density="compact" color="primary" label="Stay Logged in?"></v-switch>
              </v-card-text>
              <v-card-actions class="justify-end compact-footer">
                <v-btn density="comfortable" color="primary" variant="outlined" @click="closeLogin(isActive, true)" icon="mdi-check" size="large"></v-btn>
                <v-spacer></v-spacer>
                <v-btn density="comfortable" color="primary" variant="outlined" @click="closeLogin(isActive, false)" icon="mdi-close" size="large"></v-btn>
              </v-card-actions>
          </v-card>
      </template>
      </v-dialog>
      </div>
  </template>
  <script lang="js">
  import { useGlobalStore } from '~/store/globalData'
  import axios from 'axios'
  import Swal from 'sweetalert2'
  import dload from '@/mixins/DataLoad'

  const gdata = useGlobalStore()
  
  export default {
    data() {
      return {
        valid: false,
        bStayLoggedIn: true,
        sUID: '',
        sPWD: '',
        sAxios: '',
        semail: '',
        sDomain: '',
        sDomainDescription: '',
        sDomainIcon: '',
        sLoginStatus: 0,
        sDuration: '1m',
        domainFavorites: [],
        sCurrDomain: '',
      }
    },
    async mounted () {
      console.log('INIT_APP-1')
      await this.initSession();
      this.$bus.$emit('ACTIVATE_PANELS', gdata)      
    },
    
    methods:{
      async closeLogin (parSlot, bSwitch) {
        if(bSwitch == true && this.sUID.length == 0){
          alert('missing User ID')
        }
        if(bSwitch == true && this.sPWD.length == 0){
          alert('missing Password')
        }
        if(bSwitch == true){
          gdata.sUID = this.sUID
          gdata.sPWD = this.sPWD
          //this.axiosLoadUID()

          var res = await gdata.axiosLoadUID()
          console.log('Do Login-Finished')
          if(res == 1){
            
            this.$bus.$emit('ACTIVATE_LOGIN', 'abc')
          } else{
            const sErrorMsg = '<font face="verdana" color="black">Invalid Login/Password Entered!</font>'
            Swal.fire({
              title: '<font face="verdana" color="red">Login Error</font>',
              html: sErrorMsg,
             // type: 'warning',
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes'
            })
          }
        }
        
        //this.$bus.$emit('ACTIVATE_LOGIN', 'abc')
        
        console.log('Close Login: ' + gdata.sUID)
        parSlot.value = false  
      },

      async initSession () {
      var abc = localStorage.getItem('PS_bStayLoggedIn')
      var uid = localStorage.getItem('PS_UID')
      var pwd = localStorage.getItem('PS_PWD')
      var hdom = localStorage.getItem('PS_HomeDomain');
      var cdom = localStorage.getItem('PS_CurrDomain');    
      
      gdata.loginStatus = 0;
      this.$bus.$emit('ACTIVATE_PANELS', 'abc')      

      if (uid != null){
        uid = dload.cleanString(uid,34); 
		    this.sUID = uid;
        gdata.sUID = uid;
        //this.$store.commit('globalData/setUID', uid);
        console.log('mounted: ' + this.sUID)
      }
      if (pwd != null){
        pwd = dload.cleanString(pwd,34); 
		    this.sPWD = pwd;
        gdata.sPWD = pwd;
        //this.$store.commit('globalData/setPWD', pwd)
      }  
      if (abc != null){
        abc = dload.cleanString(abc,34); 
        this.bStayLoggedIn = abc;
        var iStayLogged = 0;
        if(this.bStayLoggedIn == 'true'){
          console.log('Switch');
          this.bStayLoggedIn = true;
          iStayLogged = 1;}
          gdata.stayLoggedIn = iStayLogged;
          //this.$store.commit('globalData/setLoginStatus', iStayLogged)
      }        
      if (hdom != null){
        hdom = dload.cleanString(hdom,34); 
        //this.$store.commit('globalData/setDomain', hdom)
        
        this.sDomain = hdom;
        gdata.sDomain = hdom;
        console.log('setDomain: ' + hdom)
      }            
        
      if (cdom != null){
        cdom = dload.cleanString(cdom,34); 
        //this.$store.commit('globalData/setCurrDomain', cdom)
        this.sCurrDomain = cdom;
        gdata.sCurrDomain = hdom;

      }                

      if(this.sUID != '--' && this.sUID.length > 0 && this.bStayLoggedIn == true){
        
        var res = await gdata.axiosLoadUID()
        console.log('Do Login-Finished')
        if(res == 1){
          this.$bus.$emit('ACTIVATE_LOGIN', 'abc')
        } 
        
      }

    },  

    }
    
  }  
  </script>
  <script setup lang="js">

    onMounted(() => {
      console.log('login mounted');
    });

   
  </script>

<style >
  @import url("~/assets/css/main.css");
</style>