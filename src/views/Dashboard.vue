<template>
  <div>
    <p class="subheading grey--text mt-4">This is HomePage</p>
    <v-container class="my-5">
      <v-row class="mb-3 pl-5">
        <div cols="12" sm="6">
          <v-icon>mdi-sort-alphabetical-variant</v-icon>

          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn small text color="grey" @click="sort('title')" v-on="on">
                <v-icon left>mdi-folder</v-icon>
                <span class="white--grey text-lowercase">by project name</span>
              </v-btn>
            </template>
            <span>Sort Projects by project name</span>
          </v-tooltip>

          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn small text color="grey" @click="sort('person')" v-on="on">
                <v-icon left>mdi-account</v-icon>
                <span class="white--grey text-lowercase">by person</span>
              </v-btn>
            </template>
            <span>Sort Persons by person name</span>
          </v-tooltip>
        </div>
        <div class="my-5 my-sm-0">
          <v-icon
            small
            class="mx-3 completeicon"
            @click="sortColor('complete')"
          >mdi-checkbox-blank-circle</v-icon>
          <v-icon
            small
            class="mx-3 ongoingicon"
            @click="sortColor('ongoing')"
          >mdi-checkbox-blank-circle</v-icon>
          <v-icon
            small
            class="mx-3 overdueicon"
            @click="sortColor('overdue')"
          >mdi-checkbox-blank-circle</v-icon>
        </div>
      </v-row>
      <!--NOTE: v-row : 
      no-gutters for no space between 2 column
      justify-space-around
      justify-center,end..., between-->
      <v-card class="pl-3" v-for="(project,index) in projects" :key="index">
        <v-row :class="`pa-3 ${project.status}`">
          <v-col cols="12" md="6">
            <div class="caption grey--text">Project</div>
            <div>{{project.title}}</div>
          </v-col>
          <v-col cols="6" sm="4" md="2">
            <div class="caption grey--text">Person</div>
            <div>{{project.person}}</div>
          </v-col>
          <v-col cols="6" sm="4" md="2">
            <div class="caption grey--text">Due by</div>
            <div>{{project.due}}</div>
          </v-col>
          <v-col sm="4" md="2">
            <div class="text-right">
              <v-chip :class="`${project.status} white--text caption`">{{project.status}}</v-chip>
            </div>
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </v-card>
      <!-- <v-card class="pa-3">
        <v-row>
          <v-col cols="6" sm="12">
            <div class="caption grey--text">Project Title Project Title Project Title Project Title Project Title Project Title</div>
            <div>Create a new website</div>
          </v-col>
        </v-row>
      </v-card> 
      Example for mobile 6 all 12
      -->
    </v-container>
  </div>
</template>
<script>
import db from '@/fb'

export default {
  name: "dashboard",
  created() { //get data from fb
    db.collection('projects').onSnapshot(res => {
      const changes = res.docChanges();
      changes.forEach(change => {
        if(change.type === 'added') {
          this.projects.push({
            ...change.doc.data(),
            id : change.doc.id
          })
        }
      })
    })
  },
  components: {},
  methods: {
    sort(prop) {
      if (prop === this.sortBy) {
        // reverse sort order if requested sort is the same as current
        this.sortDirection =
          this.sortDirection === "ascending" ? "descending" : "ascending";
      } else {
        // otherwise sort order is ascending
        this.sortDirection = "ascending";
      }
      this.sortBy = prop;
      this.projects.sort((a, b) => {
        if (a[prop] === b[prop]) {
          // additionally sort by date if there's a tie
          // if (a.dateDue.unix() < b.dateDue.unix()) {
          //   return -1;
          // } else if (a.dateDue.unix() > b.dateDue.unix()) {
          //   return 1;
          // } else {
          //   return 0;
          // }
        } else if (a[prop] < b[prop]) {
          return this.sortDirection === "ascending" ? -1 : 1;
        } else if (a[prop] > b[prop]) {
          return this.sortDirection === "ascending" ? 1 : -1;
        }
      });
    },
    sortColor(status) {
      let projects = this.projects;
      let matchStatus = projects.filter(project => project.status === status);
      let unmatchStatus = projects.filter(project => project.status !== status);
      let result = unmatchStatus;
      result.unshift(...matchStatus);
      return (this.projects = result);
    }
  },
  data() {
    return {
      sortBy: "title",
      sortDirection: "ascending",
      projects: []
    };
  }
};
</script>

<style>
.complete {
  border-left: 4px solid #3cd1c2;
}
.ongoing {
  border-left: 4px solid orange;
}
.overdue {
  border-left: 4px solid tomato;
}
.v-chip.complete {
  background-color: #3cd1c2 !important;
}
.v-chip.ongoing {
  background-color: orange !important;
}
.v-chip.overdue {
  background-color: tomato !important;
}
.completeicon {
  color: #3cd1c2 !important;
}
.ongoingicon {
  color: orange !important;
}
.overdueicon {
  color: tomato !important;
}
</style>
