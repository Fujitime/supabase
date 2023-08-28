<template>
    <div class="w-full min-h-screen bg-slate-100">
        <div class="max-w-[98%] mx-auto px-2 py-4">
            <div class="flex w-full">
                <div class="w-full h-full flex flex-col space-y-2">
                    <NuxtLink class="h-full w-full" v-for="post in posts" :to="post.slug" :key="post.slug">
                        <div class="w-full min-h-[9rem] h-full bg-gray-100 shadow-lg rounded-lg px-2 py-3.5" >
                            <h1 class="font-bold sm:text-lg md:text-xl">{{ post.title }}</h1>
                            <span class="text-sm md:text-base font-light">{{ new Date(post.created_at).toDateString() }}</span>
                        </div>
                    </NuxtLink>
                </div>
                <div class="max-w-[25%] w-full"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        async asyncData(){
            try{
                const { data: posts } = await axios.get('https://ptbhetsbqexqdpwfmmdg.supabase.co/rest/v1/posts?is_published=is.true', {
                    headers: {
                        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0YmhldHNicWV4cWRwd2ZtbWRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMxODgzMjYsImV4cCI6MjAwODc2NDMyNn0.x3WRxU3fKOzeQ3N8aOuaa0Io3DRe1Tv1MtYzX2V_miM',
                        'content-type': 'application/json',
                    }
                })
                return { posts }
            }catch(e){
                console.log('Error:', e.message)
                return { posts: []}
            }
        }
    }
</script>