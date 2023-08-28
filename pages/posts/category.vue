<template>
    <div class="w-full flex justify-center pt-4">
        <div class="p-2 container bg-slate-100 rounded-lg">
            <div class="mb-3 w-full flex gap-1">
                <input type="text" v-model="category" class="border-none focus:outline-none bg-gray-100 focus:bg-gray-200 rounded-lg text-lg px-2 py-1.5 w-full" placeholder="Insert category name"/>
                <button v-on:click="newCategory" class="px-4 py-1.5 bg-gray-700 hover:bg-gray-900 text-white rounded-md">+</button>
            </div>
            <ul class="space-y-2">
                <li v-for="category in categories" :key="category.name" class="flex gap-1 w-full">
                    <div class="font-lg w-full">
                        {{ category.name }}
                    </div>
                    <button @click="deleteCategory(category.category_id)" class="px-2 py-1.5 bg-gray-700 hover:bg-gray-900 text-white rounded-md">
                        <svg fill="white" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "Category",
    data() {
        return {
            category: '',
            categories: []
        }
    },
    methods: {
        newCategory() {
            axios.post('https://ptbhetsbqexqdpwfmmdg.supabase.co/rest/v1/categories', JSON.stringify({
                name: this.category
            }), {
                headers: {
                    'apikey': this.$config.apikey,
                    'Content-Type': 'application/json'
                }
            })
          .then(() => {
                this.categories.push({ name: this.category });
            })
        },
        deleteCategory(id){
            axios.delete(`https://ptbhetsbqexqdpwfmmdg.supabase.co/rest/v1/categories?category_id=eq.${id}`, {
                headers: {
                    'apikey': this.$config.apikey,
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                this.allCategories();
            })
        },
        allCategories(){
            axios.get("https://ptbhetsbqexqdpwfmmdg.supabase.co/rest/v1/categories", {
            headers: {
                'apikey': this.$config.apikey,
                'content-type': 'application/json'
                }
            }).then(({data}) => {
                this.categories = data;
            }).catch(() => {
                this.categories = [];
            })
        }
    },
    created(){
        this.allCategories();
    }
}
</script>