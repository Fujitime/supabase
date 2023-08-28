<template>
    <div class="w-full min-h-screen bg-slate-100">
        <nav class="font-bold text-lg py-2.5 bg-white shadow-md pl-2"><h1>Blogs</h1></nav>
        <div class="max-w-[98%] mx-auto px-2 py-4">
            <div class="flex w-full">
                <div class="w-full h-full flex flex-col overflow-y-auto space-y-2">
                    <NuxtLink class="h-full w-full" v-for="post in posts" :to="`/posts/${post.slug}`" :key="post.slug">
                        <div class="w-full min-h-[9rem] h-full bg-gray-50 shadow rounded-lg px-2 py-3.5" >
                            <h1 class="font-bold sm:text-lg md:text-xl">{{ post.title }}</h1>
                            <span class="text-sm md:text-base font-light">{{ new Date(post.created_at).toDateString() }}</span>
                        </div>
                    </NuxtLink>
                </div>
                <div class="max-w-[25%] w-full px-3 py-2">
                    <h1 class="font-semibold md:text-lg mb-2">Filter by category</h1>
                    <div class="w-full flex flex-wrap"></div>
                    <div>
                        <button :class="{'bg-gray-200': selectedCategory == 'all', 'font-light px-2.5 py-0.5 mx-1 rounded-full border border-gray-700 hover:bg-gray-600 hover:text-white capitalize': true} " @click="changeCategory('all')">all</button>
                        <button v-for="category in categories" :class="{'bg-gray-200': category.category_id == selectedCategory, 'font-light px-2.5 py-0.5 mx-1 rounded-full border border-gray-700 hover:bg-gray-600 hover:text-white capitalize': true} " @click="changeCategory(category.category_id)">{{ category.name }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'IndexPage',
        data(){
            return {
                posts: [],
                selectedCategory: 'all',
                categories: []
            }
        },
        methods: {
            changeCategory(category_id){
                this.selectedCategory = category_id;
                axios.get(`https://ptbhetsbqexqdpwfmmdg.supabase.co/rest/v1/posts?is_published=is.true${category_id == 'all' ? '' : '&category_id=eq.' + category_id}`, {
                    headers: {
                        'apikey': process.env.API_KEY,
                        'content-type': 'application/json',
                    }
                }).then(({data}) => {
                    this.posts = data;
                })
            }
        },
        created(){
            axios.get('https://ptbhetsbqexqdpwfmmdg.supabase.co/rest/v1/categories', {
                headers: {
                'apikey': process.env.API_KEY,
                'content-type': 'application/json'
                }
            }).then(({data}) => {
                this.categories = data;
            }).catch(() => {
                this.categories = [];
            })
        },
        async asyncData(){
            try{
                const { data: posts } = await axios.get('https://ptbhetsbqexqdpwfmmdg.supabase.co/rest/v1/posts?is_published=is.true', {
                    headers: {
                      'apikey': process.env.API_KEY,
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