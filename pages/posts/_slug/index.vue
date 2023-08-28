<template>
  <div class="p-8">
    <div class="my-5" >
      <h2 class="text-2xl font-bold mt-8">{{ postData.title }}</h2>
      <div class="mt-4" v-html="postData.body"></div>
    </div>
    <div>
      <NuxtLink to="/" class="py-2 px-3 mt-3 min-w-[13rem] bg-accent-2 border border-black rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
      >Back</NuxtLink>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  async asyncData({ params }) {
    const slug = params.slug;
    const { data: postData } = await axios.get(`https://ptbhetsbqexqdpwfmmdg.supabase.co/rest/v1/posts?slug=eq.${slug}`, {
      headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0YmhldHNicWV4cWRwd2ZtbWRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMxODgzMjYsImV4cCI6MjAwODc2NDMyNn0.x3WRxU3fKOzeQ3N8aOuaa0Io3DRe1Tv1MtYzX2V_miM',
        'content-type': 'application/json',
      },
    });

    return { postData: postData[0] };
  },
};
</script>
