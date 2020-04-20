<template>
  <div>
    <p class="subheading grey--text mt-4">This is Team Page</p>
    <v-container class="my-5">
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3" v-for="(person,index) in team" :key="index">
          <v-card class="text-center pt-5">
            <v-avatar size="100">
              <img :src="person.avatar" alt="avt" />
            </v-avatar>

            <v-card-subtitle class="pb-0">{{ person.name }}</v-card-subtitle>

            <v-card-text class="grey--text">
              <div>{{person.role}}</div>
            </v-card-text>

            <v-card-actions>
              <v-btn color="grey" text>
                <v-icon small left>mdi-message</v-icon>
                <span>Message</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      team: [
        {
          name: "Nguyễn Thiện Tâm",
          role: "Front-end",
          avatar: "/avatar-1.png"
        },
        {
          name: "Phan Văn Quyền",
          role: "Tech Manager",
          avatar: "/avatar-2.png"
        },
        {
          name: "Phạm Ngọc Thắng",
          role: "Data Manager",
          avatar: "/avatar-3.png"
        },
        {
          name: "Hà Văn Nhật Quag",
          role: "UI/UX Designer",
          avatar: "/avatar-4.png"
        },
        { name: "Nguyễn Thanh Thúy", role: "CC0", avatar: "/avatar-5.png" }
      ]
    };
  }
};
</script>
