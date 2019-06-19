<template id="">
  <div class="tags-view-container">
    <scroll-panel class="tags-view-wrap">
      <router-link
        v-for="tag in Array.from(visitedViews)"
        :to="tag.path"
        :key="tag.path"
        class="tags-view-item"
        :class="isActive(tag)?'active':''"
      >
        {{tag.title}}
        <span class="el-icon-close" @click.prevent.stop="delSelectTag(tag)"></span>
      </router-link>
    </scroll-panel>
  </div>
</template>
<script>
export default {
  methods: {
    isActive(route) {
      return route.path == this.$route.path;
    }
  },
  computed: {
    visitedViews() {
      //store中取值
      return this.$store.state.tagsview.visitedviews;
    }
  },
  watch:{
    $route(){
      this.addViewTags();
    }
  }
};
</script>