<template>
  <div class="text-center">
    <v-dialog width="600px" v-model="dialog">
      <template v-slot:activator="{ on }">
        <v-btn color="success" v-on="on" class="text-capitalize">Add new project</v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Add a new project</v-card-title>

        <v-card-text>
          <v-form ref="form" lazy-validation v-model="valid">
            <v-text-field
              v-model="title"
              :counter="20"
              :rules="titleRules"
              label="Title"
              required
              prepend-icon="mdi-folder"
            ></v-text-field>
            <v-textarea label="Infomation" v-model="content" prepend-icon="mdi-pencil"></v-textarea>

            <v-menu>
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-on="on"
                  label="Due date"
                  prepend-icon="mdi-calendar-range"
                  :rules="dueRules"
                  :value="formattedDate"
                  required
                ></v-text-field>
              </template>
              <v-date-picker v-model="due"></v-date-picker>
            </v-menu>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="submit" :loading="loading">Add Project</v-btn>
          <!--@click="submit();submit2()": call multiple functions-->
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import db from "@/fb";

export default {
  data() {
    return {
      title: "",
      content: "",
      due: null,
      valid: true,
      loading: false,
      dialog : false,
      titleRules: [
        v => !!v || "Title is required",
        v => (v && v.length <= 20) || "Tile must be less than 20 characters"
      ],
      dueRules: [v => !!v || "Due is required"]
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const project = {
          title: this.title,
          content: this.content,
          due: format(parseISO(this.due), "do MMM yyyy"),
          person: "Nguyễn Thiện Tâm",
          status: "ongoing"
        };
        db.collection("projects")
          .add(project)
          .then(() => {
            this.loading = false;
            console.log("added to db");
            this.dialog = false
            this.$emit('projectAdded')
          });
      }
    }
  },
  computed: {
    formattedDate() {
      return this.due ? format(parseISO(this.due), "do MMM yyyy") : "";
    }
  }
};
</script>