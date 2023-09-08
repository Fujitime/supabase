<template>
  <div class="w-full min-h-screen bg-slate-100 ">
      <Navbar/>
        <div class="max-w-[98%] mx-auto px-2 pt-24">
            <div class="sm:flex w-full">
              <div class="sm:order-last sm:max-w-[25%] w-full px-3 py-2">
                  <h1 class="font-semibold md:text-lg mb-2">Filter by category</h1>
                  <div class="w-full flex flex-wrap"></div>
                  <div>
                      <button :class="{'bg-gray-200': selectedCategory == 'all', 'font-light px-2.5 py-0.5 mx-1 rounded-full border border-gray-700 hover:bg-gray-600 hover:text-white capitalize': true} " @click="changeCategory('all')">all</button>
                      <button v-for="category in categories" :class="{'bg-gray-200': category.category_id == selectedCategory, 'font-light px-2.5 py-0.5 mx-1 rounded-full border border-gray-700 hover:bg-gray-600 hover:text-white capitalize': true} " @click="changeCategory(category.category_id)">{{ category.name }}</button>
                  </div>
              </div>
                <div class="w-full h-full flex flex-col overflow-y-auto space-y-2">
                    <NuxtLink class="h-full w-full" v-for="post in posts" :to="`/posts/${post.slug}`" :key="post.slug">
                        <div class="w-full min-h-[9rem] h-full bg-gray-50 shadow rounded-lg px-2 py-3.5" >
                            <h1 class="font-bold sm:text-lg md:text-xl">{{ post.title }}</h1>
                            <span class="text-sm md:text-base font-light">{{ new Date(post.created_at).toDateString() }}</span>
                           <div class="flex justify-end top-0 dropShadow-br pr-5">
                             <NuxtLink :to="`/posts/edit/${post.slug}`" >
                                 <button type="submit" class="py-2 px-3 mt-3 bg-accent-9 border border-black rounded-lg focus:outline-none focus:ring focus:ring-blue-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                    <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
                                </button>
                             </NuxtLink>
                           </div>
                          </div>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import Navbar from '~/components/Navbar.vue';
    export default {
        name: 'IndexPage',
        components: {
          Navbar,
      },
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
                        'apikey': this.$config.apikey,
                        'content-type': 'application/json',
                    }
                }).then(({data}) => {
                    this.posts = data;
                })
            }
        },
        created(){
            this.changeCategory('all')
            axios.get('https://ptbhetsbqexqdpwfmmdg.supabase.co/rest/v1/categories', {
                headers: {
                'apikey': this.$config.apikey,
                'content-type': 'application/json'
                }
            }).then(({data}) => {
                this.categories = data;
            }).catch(() => {
                this.categories = [];
            })
        },
        async asyncData({ $config }){
            // try{
            //     const { data: posts } = await axios.get('https://ptbhetsbqexqdpwfmmdg.supabase.co/rest/v1/posts?is_published=is.true', {
            //         headers: {
            //           'apikey': $config.apikey,
            //           'content-type': 'application/json',
            //         }
            //     })
            //     return { posts }
            // }catch(e){
            //     console.log('Error:', e.message)
            //     return { posts: []}
            // }
        }
    }
</script>
