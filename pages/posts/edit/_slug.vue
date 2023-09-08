<template>
  <div class="w-full min-h-screen bg-slate-100 ">
      <Navbar/>
      <div class="max-w-[98%] mx-auto px-2 pt-24">
    <EditPost :slug="$route.params.slug" />
  </div>
</div>
</template>

<script>
import EditPost from '~/components/EditPost.vue';
import Navbar from '~/components/Navbar.vue';
export default {
  components: {
    EditPost,
    Navbar
  },
};
</script>
