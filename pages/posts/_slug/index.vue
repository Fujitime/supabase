<template>
  <div class="w-full">
    <nav class="font-bold text-lg py-2.5 bg-white shadow-md pl-2 flex gap-2">
      <NuxtLink to="/" class="px-3.5 py-1.5 bg-gray-100 hover:bg-gray-300 text-black hover:text-gray-600 rounded-md"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M267.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160L64 241V96c0-17.7-14.3-32-32-32S0 78.3 0 96V416c0 17.7 14.3 32 32 32s32-14.3 32-32V271l11.5 9.6 192 160z"/></svg></NuxtLink>
      <h1>Blogs</h1>
    </nav>
    <div class="mx-auto max-w-[96%] w-full" >
      <h2 class="text-2xl font-bold my-4">{{ postData.title }}</h2>
      <article class="w-full prose lg:prose-xl mx-auto" v-html="postData.body"></article>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
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
};
</script>
