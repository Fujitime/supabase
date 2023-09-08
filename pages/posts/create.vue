<template>
    <div class="w-full min-h-screen bg-slate-100 ">
      <Navbar/>
      <div class="max-w-[98%] mx-auto px-2 pt-24">
      <CreatePost/>
    </div>
  </div>
  </template>

<script>
import Navbar from '~/components/Navbar.vue';
  import CreatePost from '~/components/CreatePost.vue';
  export default {
    name: 'CreatePostPage',
    components: {
      CreatePost,
      Navbar,
    },
  };
  </script>
