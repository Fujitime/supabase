<template>
  <div class="w-full min-h-screen bg-slate-100 ">
      <Navbar/>
      <div class="max-w-[98%] mx-auto px-2 pt-24">
      <h2 class="text-2xl font-bold my-4">{{ postData.title }}</h2>
      <article class="w-full prose lg:prose-xl mx-auto" v-html="postData.body"></article>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue';
import axios from 'axios';
export default {
  components:{
    Navbar,
  },
  async asyncData({ params, $config }) {
    const slug = params.slug;
    const { data: postData } = await axios.get(`https://ptbhetsbqexqdpwfmmdg.supabase.co/rest/v1/posts?slug=eq.${slug}`, {
      headers: {
        'apikey': $config.apikey,
        'content-type': 'application/json',
      },
    });

    return { postData: postData[0] };
  },
  head() {
    return {
      title: this.postData ? this.postData.title : 'Posts',
    };
  },
};
</script>


