<template >
    <v-app >

        <v-app-bar density="compact" app elevation="0" color="primary" light>
            <v-col class="ml-2 pl-2" align="left" cols="8">
                <v-row >
                  <div style="padding-left:20px;padding-right:10px">
                    <img src="~/assets/favicon5.png" alt="Forest" style="width:36px"/>
                  </div>
                  <div style="padding-top:3px">
                    <span STYLE="font-size:20.0pt;font-family:arial; color: white;">Epic</span>
                    <span STYLE="font-size:20.0pt;font-family:arial; font-weight:bold; color: gold; ">Link</span>
                  </div>
                </v-row>
            </v-col>
        <v-spacer></v-spacer>
        <div v-if="loginStatus == 0 && xDeviceType == 'desktop'" >
          <loginModal />
        </div>
        <div v-if="loginStatus == 0 && xDeviceType == 'desktop'" >
          <loginRegister />
        </div>        
        <div v-if="loginStatus == 1 && xDeviceType == 'desktop'" style="padding-right:10px" >
          <loginProfile />
        </div>
        <div v-if="loginStatus == 1 && xDeviceType == 'desktop'" style="padding-left:0px;padding-right:20px" >
          <v-btn density="comfortable" class="mr-1" color="primary" variant="flat" @click="doLogout" >Sign out</v-btn>
        </div>
        </v-app-bar>
        <div class="standard" style="padding-top:50px;">
            <slot />
        </div>
        <v-footer height="24px" color="primary" app>
            <v-row justify="center" no-gutters color="primary">
                <v-col v-if="xDeviceType == 'desktop'" style="padding-top:4px;" class="text-center pt-1" cols="2">
                    <span style="font-family:arial" class="white--text">&copy; {{ new Date().getFullYear() }}</span>
                </v-col>
                <v-col v-if="xDeviceType != 'desktop'" style="padding-top:6px;" class="text-center pt-1" cols="2">
                  
                  <v-menu>
                    <template v-slot:activator="{ props }">
                      <v-icon color="white" icon="mdi-menu" v-bind="props" >mdi-menu</v-icon>
                    </template>
                    <v-list>
                      <modalMenuRecDom />
                      <modalMenuFavDom />
                      <modalMenuRecLinks />
                      <modalMenuFavLinks />
                      
                    </v-list>
                  </v-menu>
                </v-col>                
                <v-col v-if="xDeviceType == 'desktop'" align="right" cols="10">
                    <img class="standardicon" src="~/assets/PequaSoft2.png" alt="Forest" style="width:26px">
                </v-col>

                <v-col v-if="xDeviceType != 'desktop'" align="right" cols="5">
                  <div v-if="loginStatus == 0" >
                    <loginModalMini />
                  </div>
                  <div v-if="loginStatus == 1" style="padding-right:4px"  >
                    <loginProfileMini />
                  </div>
                </v-col>

                <v-col v-if="xDeviceType != 'desktop'" align="right" cols="5">
                  <div v-if="loginStatus == 0" style="padding-right:10px">
                    <loginRegisterMini />
                  </div>        
                  
                  <div v-if="loginStatus == 1" style="padding-left:0px;padding-right:10px;padding-top:4px;" >
                    <v-btn density="comfortable" color="primary" variant="flat" @click="doLogout" >Sign out</v-btn>
                  </div>
                
                </v-col>
            </v-row>
        </v-footer>
  
  </v-app>
  
</template>
<script setup lang="js">
//import { useGlobalStore } from '~/store/globalData'
import loginModal from '~/components/Modal_Login.vue'
import loginModalMini from '~/components/Modal_Login.vue'
import loginRegister from '~/components/Modal_Register.vue'
import loginRegisterMini from '~/components/Modal_Register.vue'
import loginProfile from '~/components/Modal_Profile.vue'
import loginProfileMini from '~/components/Modal_Profile.vue'
import modalMenu from '~/components/Modal_Menu.vue'

import modalMenuRecDom from '~/components/Modal_MenuRecDom.vue'
import modalMenuFavDom from '~/components/Modal_MenuFavDom.vue'
import modalMenuRecLinks from '~/components/Modal_MenuRecLinks.vue'
import modalMenuFavLinks from '~/components/Modal_MenuFavLinks.vue'
/*
const gdata = useGlobalStore()
const version = 0
var isLoginVisible = true
var isRegisterVisible = false

const showLogin = () => {
    isLoginVisible = true
    //loginModal.showModal()
    console.log('login click: ' + isLoginVisible);
}

const closeLogin = () => {
    isLoginVisible = false
    console.log('login click: ' + isLoginVisible);
}

const showRegister = () => {
    isRegisterVisible = true
    console.log('register click: ' + isRegisterVisible);
}
*/


</script>

<script lang="js">
  import { useGlobalStore } from '~/store/globalData'
  import dload from '@/mixins/DataLoad'

  const gdata = useGlobalStore()
  
  export default {
    data() {
      return {
        bStayLoggedIn: true,
        sUID: 'abc',
        sPWD: '--',
        gdata: null,
        sDeviceType: 'desktop',
        loginStatus: 0,
        links: [
        { text: 'Recent Domains', route: '/indices' },
        { text: 'Favorite Domains', route: '/technical' },
        { text: 'Recent Links', route: '/forex' },
        { text: 'Favorite Links', route: '/About' }
      ],
      }
    },
    computed:  {
      xDeviceType() {
        var res = 'desktop';

        res = this.sDeviceType;
        console.log('Device Type: ' + res)

        return res;
      },
    },
    created () {
      console.log('Default created');
          
    },
    mounted () {
   
      if(window.innerHeight > window.innerWidth){this.sDeviceType = 'Mobile';} 

      this.$bus.$on('ACTIVATE_PANELS', (globaldata) => {
      console.log('ACTIVATE_PANELS')

      dload.loadDomainFavorites( gdata)
      dload.loadDomainHistory( gdata)
      dload.loadClickHistory( gdata)
      dload.loadClickFavorites( gdata)   //parAxios, parStore
      
    })

    this.$bus.$on('ACTIVATE_LOGIN', (data) => {
      this.sUID = gdata.sUID;
      this.loginStatus = 1;
      this.$bus.$emit('ACTIVATE_HOME', 'abc')
      //dload.loadHomeDomain( gdata.sDomain, gdata.axios, gdata, gdata.homeData,2)
      //console.log('ACTIVATE_LOGIN: ' + gdata.sDomainDescription)

    })
    this.$bus.$on('HOME_LOGOUT', (data) => {
      
      this.doLogout();
      
      console.log('HOME_LOGOUT')

    })

    this.$bus.$on('ACTIVATE_PROFILE', (data) => {
      

      
      console.log('ACTIVATE_PROFILE')

    })

    this.$bus.$on('ACTIVATE_REGISTER', (data) => {
      this.sUID = gdata.sUID;
      this.loginStatus = 1;
      console.log('ACTIVATE_REGISTER')

    })


    },

    methods:{
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
      closeLogin (parSlot, bSwitch) {
        if(bSwitch == true){
          gdata.sUID = this.sUID
        }
        
        console.log('Close Login: ' + gdata.sUID)
        parSlot.value = false  
      },
      doLogout() {
        gdata.sUID = ''
        gdata.sPWD = ''
        gdata.sDomain = ''
        gdata.loginStatus = 0

        this.sUID = ''
        this.sPWD = ''
        this.loginStatus = 0
      
      //this.$bus.$emit('HOME_LOGOUT', 'abc')
      localStorage.removeItem('PS_UID')
      localStorage.removeItem('PS_PWD')

      localStorage.removeItem('PS_HomeDomain');
      localStorage.removeItem('PS_CurrDomain');
      localStorage.removeItem('PS_bStayLoggedIn')
    },
            
    }
    
  }  
  </script>

<style >
  @import url("~/assets/css/main.css");
</style>