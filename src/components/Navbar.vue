<template>
  <!-- dùng v-app-bar thay cho v-toolbar (fixed để sticky) -->
  <nav>
    <v-snackbar top :timeout="4000" v-model="snackbar">
      <span>You added a new project.</span>
      <v-btn text color="white" @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-app-bar flat fixed app>
      <v-app-bar-nav-icon @click="drawer = !drawer" class="grey--text"></v-app-bar-nav-icon>
      <v-toolbar-title class="grey--text">
        <span>INNO</span>
        <span class="font-weight-light">TODO</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <!--Drop down-->
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text color="grey" v-on="on">
            <v-icon small left>mdi-chevron-down</v-icon>
            <span>Menu</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(link, index) in links" :key="index" router :to="link.route">
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn text color="grey" dark>
        <span>Sign Out</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>
    <!--
         barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
        barImage: 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
    -->
    <v-navigation-drawer
      v-model="drawer"
      app
      :dark="barColor !== 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'"
      :src="barImage"
    >
      <v-row class="text-center">
        <v-col class="mt-5">
          <v-avatar size="100">
            <img src="/avatar-1.png" alt="avt" />
          </v-avatar>
          <p class="white--text mt-1">Nguyễn Thiện Tâm</p>
          <Popup @projectAdded="snackbar = true"/>
        </v-col>
      </v-row>
      <v-list>
        <v-list-item v-for="(link,index) in links" :key="index" router :to="link.route">
          <v-list-item-action>
            <v-icon class="white--text">{{link.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text title subtitle-1">{{link.text}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import Popup from '@/components/Popup';
export default {
  data() {
    return {
      drawer: false,
      snackbar : false,
      barColor: "rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)",
      barImage:
        "https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg",
      links: [
        { icon: "mdi-view-dashboard", text: "DashBoard", route: "/" },
        {
          icon: "mdi-folder-multiple",
          text: "My Projects",
          route: "/projects"
        },
        { icon: "mdi-account-multiple", text: "Team", route: "/team" }
      ]
    };
  },
  components : {
    Popup,
  }
};
</script>

<style>
.v-navigation-drawer__image {
  opacity: 0.5;
}
</style>

