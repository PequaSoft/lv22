<template>
    <div class="text-center">
    <v-dialog >
        <template v-slot:activator="{ props: activatorProps }">
        <v-btn v-bind="activatorProps" @click="onStart" color="primary">
          {{ gdata.sUID }}<v-icon style="padding-left:6px" color="white">mdi-account</v-icon>
        </v-btn>
        
        </template>
    
        <template v-slot:default="{ isActive }">
            <v-card >
            <v-toolbar color="primary" title="Edit Profile" STYLE="font-size:22.0pt;font-family:arial; color: white;"></v-toolbar>
              <v-tabs v-model="tab" align-tabs="title">
                <v-tab> Basic</v-tab>
                <v-tab> Domain </v-tab>
              </v-tabs>
              <v-card-text class="compact-form">                
              <v-window v-model="tab">
                <v-window-item>
                  <v-card flat>
		                <v-text-field class="compact" v-model="sUID" label="User ID" density="compact" color="primary" variant="solo"></v-text-field>
		                <v-text-field class="compact" v-model="sEMail" label="eMail"  density="compact" variant="solo"></v-text-field>
		                <v-text-field class="compact" v-model="sPWD" label="Password" type="password" density="compact" variant="solo"></v-text-field>
	                  <v-text-field class="compact" v-model="sPWD2" label="Re-enter Password" type="password" density="compact" variant="solo"></v-text-field>
                  </v-card>
                </v-window-item>
                <v-window-item>
                  <v-card flat>
                    <v-text-field class="compact" v-model="sDomain" label="Bookmark Domain"  density="compact" variant="solo"></v-text-field>
                    <v-text-field class="compact" v-model="sDomainDescription" label="Domain Description"  density="compact" variant="solo"></v-text-field>
                    <v-text-field class="compact" v-model="sDomainIcon" label="Domain Icon"  density="compact" variant="solo"></v-text-field>        
                    <v-text-field class="compact" v-model="sDomainImage" label="Domain Image"  density="compact" variant="solo"></v-text-field>        
                    <v-switch class="compact" v-model="iDomainStyle" density="compact" color="primary" label="Use large (Twitter) images?"></v-switch>
                  </v-card>
                </v-window-item>
              </v-window>
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
  
    const gdata = useGlobalStore()
    import axios from 'axios'

    export default {
      data() {
        return {
          tab: null,
          bStayLoggedIn: true,
          sUID: '',
          sPWD: '',
          sPWD2: '',
          sEMail: '',
          sDomain: '',
          sOrigDomain: '',
          sDomainDescription: '',
          sDomainIcon: '',
          sDomainImage: '',
          iDomainStyle: 0,
        }
      },
      
      methods:{
        async closeLogin (parSlot, bSwitch) {
          if(bSwitch == true){

            if(this.sDomain != gdata.sOrigDomain && gdata.sOrigDomain.length > 0){
              var res = await gdata.isDomainUnique(1, this.sUID, this.sDomain);
              if(res == 0){
                this.sDomain = gdata.sOrigDomain;
                alert("Please Enter Unique Domain");
                return;
              }
            }  
            gdata.sUID = this.sUID

            console.log('Boo-2')
            gdata.sPWD = this.sPWD;
            gdata.sPWD2 = this.sPWD2;
            gdata.semail = this.sEMail;
            gdata.sDomain = this.sDomain;
            gdata.sDomainDescription = this.sDomainDescription;
            gdata.sDomainIcon = this.sDomainIcon;
            gdata.sDomainImage = this.sDomainImage;
            gdata.iDomainStyle = 0;
            if (this.iDomainStyle == true){gdata.iDomainStyle = 1;}

            gdata.axiosUpdateProfile()
          }

          console.log('Close Login: ' + gdata.sUID)
          parSlot.value = false  
        },
        onStart () {
          this.sUID = gdata.sUID;
          this.sPWD = gdata.sPWD;
          this.sPWD2 = gdata.sPWD;
          this.sEMail = gdata.semail;
          this.sDomain = gdata.sDomain;
          this.sDomainDescription = gdata.sDomainDescription;
          this.sDomainIcon = gdata.sDomainIcon;
          this.sDomainImage = gdata.sDomainImage;
          this.iDomainStyle = gdata.iDomainStyle;
          if (gdata.iDomainStyle == null){this.iDomainStyle = false;}
          if (gdata.iDomainStyle == 0){this.iDomainStyle = false;}
          if (gdata.iDomainStyle == 1){this.iDomainStyle = true;}

          console.log('Start Profile')

        },
        doLogout() {
          this.$bus.$emit('HOME_LOGOUT', 'abc')
          
        },        
        /*
        axiosUpdateProfile () {
          const formData = new FormData()

          formData.append('user', JSON.stringify(this.sUID))
          formData.append('pwd', JSON.stringify(this.sPWD))
          formData.append('email', JSON.stringify(this.sEMail))
          formData.append('domain', this.sDomain)
          formData.append('domaindescription', this.sDomainDescription)
          formData.append('domainicon', JSON.stringify(this.sDomainIcon))
      
          axios.post(gdata.axios + 'profileupdate2', formData).then((res) => {
          })
        },  
        */      
      }
    }  
  </script>
  <script setup lang="js">
      
      onMounted(() => {
        console.log('profile mounted');
      });
  </script>

  
  <style>
    @import url("~/assets/css/main.css");
  </style>

