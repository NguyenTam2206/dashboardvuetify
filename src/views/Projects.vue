<template>
  <div>
    <p class="subheading grey--text mt-4">This is Projects Page</p>
    <v-container class="my-5">
      <v-expansion-panels>
        <v-expansion-panel v-for="(project, index) in myProjects" :key="index" :class="project.status">
          <v-expansion-panel-header>{{project.title}}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <div class="font-weight-bold">{{project.due}}</div>
            <div :class="`${project.status}icon text-capitalize`">{{project.status}}</div>
            <div>{{project.content}}</div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </div>
</template>

<script>
import db from '@/fb'
export default {
  data() {
    return {
      projects: [
        // {
        //   title: "Design a new website",
        //   person: "Nguyễn Thiện Tâm",
        //   due: "1st Jan 2019",
        //   status: "ongoing",
        //   content:
        //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!"
        // },
        // {
        //   title: "Design a landingpage",
        //   person: "Nguyễn Thiện Tâm",
        //   due: "2st Oct 2019",
        //   status: "complete",
        //   content:
        //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!"
        // },
        // {
        //   title: "Code up the homepage",
        //   person: "Chun Li",
        //   due: "10th Jan 2019",
        //   status: "complete",
        //   content:
        //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!"
        // },
        // {
        //   title: "Design video thumbnails",
        //   person: "Ryu",
        //   due: "20th Dec 2018",
        //   status: "complete",
        //   content:
        //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!"
        // },
        // {
        //   title: "Create a community forum",
        //   person: "Gouken",
        //   due: "20th Oct 2018",
        //   status: "overdue",
        //   content:
        //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!"
        // }
      ]
    };
  },
  computed: {
    myProjects() {
      return this.projects.filter(
        project => project.person === "Nguyễn Thiện Tâm"
      );
    }
  },
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
  }
};
</script>
