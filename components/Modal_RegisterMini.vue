<template>
    <div class="text-center">
    <v-dialog max-width="500">
        <template v-slot:activator="{ props: activatorProps }">
        <v-btn v-bind="activatorProps" @click="onStart" color="primary">
            <span style="color: white;" class="mr-2">Register</span>
        </v-btn>
        </template>
    
        <template v-slot:default="{ isActive }" >
            <v-card>
            <v-toolbar color="primary" title="Register" STYLE="font-size:22.0pt;font-family:arial; color: white;"></v-toolbar>
              <v-tabs v-model="tab" align-tabs="title">
                <v-tab> Basic</v-tab>
                <v-tab> Domain </v-tab>
              </v-tabs>
              <v-card-text class="compact-form">
                <v-window v-model="tab">
                <v-window-item>
                  <v-card flat>
		                <v-text-field class="compact" v-model="sUID" label="User ID" density="compact" color="primary" variant="solo"></v-text-field>
		                <v-text-field class="compact" v-model="sEMail" label="eMail" density="compact" variant="solo"></v-text-field>
		                <v-text-field class="compact" v-model="sPWD" label="Password" type="password" density="compact" variant="solo"></v-text-field>
	                  <v-text-field class="compact" v-model="sPWD2" label="Re-enter Password" type="password" density="compact" variant="solo"></v-text-field>
                  </v-card>
                </v-window-item>
                <v-window-item>
                  <v-card flat>
                    <v-text-field class="compact" v-model="sDomain" label="Bookmark Domain" density="compact" variant="solo"></v-text-field>
                    <v-text-field class="compact" v-model="sDomainDescription" label="Domain Description" density="compact" variant="solo"></v-text-field>
                    <v-text-field class="compact" v-model="sDomainIcon" label="Domain Icon" density="compact" variant="solo"></v-text-field>        
                    <v-text-field class="compact" v-model="sDomainImage" label="Domain Image" density="compact" variant="solo"></v-text-field>        
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
        onStart () {
          console.log('Boo-3')
          this.sUID = null;
          this.sPWD = null;
          this.sPWD2 = null;
          this.sEMail = null;
          this.sDomain = null;
          this.sDomainDescription = null;
          this.sDomainIcon = null;
          this.sDomainImage = null;
          this.iDomainStyle = false;

          console.log('Start Register')

        },
        async closeLogin (parSlot, bSwitch) {
          if(bSwitch == true){
            //gdata.sUID = this.sUID
            
            if (this.sUID.length == 0) { alert('Missing User ID'); return }
            if (this.sEMail.length == 0) { alert('Missing Email'); return }
            if (this.sPWD.length == 0) { alert('Missing Password'); return }
            if (this.sPWD !== this.sPWD2) { alert('Passwords do not match'); return }
            
            var res = await gdata.isUIDUnique(1, this.sUID, this.sDomain);
            
            if(res != 1){
              alert("Please Enter Unique UID");

              parSlot.value = false  
              return;
            } 
            
            var res = await gdata.isDomainUnique(1, this.sUID, this.sDomain);
            
            if(res == 1){
              //alert("Domain OK");
              gdata.sUID = this.sUID;
              gdata.sPWD = this.sPWD;
              gdata.sPWD2 = this.sPWD2;
              gdata.semail = this.sEMail;
              gdata.sDomain = this.sDomain;
              gdata.sDomainDescription = this.sDomainDescription;
              gdata.sDomainIcon = this.sDomainIcon;
              gdata.sDomainImage = this.sDomainImage;
              gdata.iDomainStyle = 0;
              if (this.iDomainStyle == true){gdata.iDomainStyle = 1;}
              var n = await gdata.axiosCreateProfile();
              this.$bus.$emit('ACTIVATE_REGISTER', 'abc')

              parSlot.value = false  
            } else{
              alert("Please Enter Unique Domain");
            }
            
          console.log('Close Register: ' + gdata.sUID)
          parSlot.value = false  
        }
        parSlot.value = false  
      }
    }
    }  
    </script>
    <script setup lang="js">
      
      onMounted(() => {
        console.log('login mounted');
      });
  
     
    </script>
  
  <style>
  @import url("~/assets/css/main.css");

  </style>