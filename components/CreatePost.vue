<template>
  <div class="p-8">
    <h2 class="text-2xl font-bold mt-8">Add New Post</h2>
    <form @submit.prevent="addNewPost" class="mt-4">
      <div class="mb-4">
        <label for="title" class="block text-sm font-medium text-gray-700">Title:</label>
        <input v-model="newPost.title" type="text" id="title" required class="mt-1 p-2 w-full border rounded-lg focus:ring focus:ring-blue-200">
      </div>
      <div class="mb-4">
        <label for="category" class="block text-sm font-medium text-gray-700">Category:</label>
        <NuxtLink class="text-blue-700 font-light text-xs -mt-1" to="category">Manage Category</NuxtLink>
        <select id="category" v-model="selectedCategory" class="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[9rem] p-2.5 " required>
          <option v-for="category in categories" :value="category.category_id" >{{ category.name }}</option>
        </select>
      </div>
      <editor
        api-key="y6wavuusx1p97c3is204dtbd5rujyn94wh8yh54sy0flklzf" class="mb-4" v-model="newPost.body"
        :init="{
          height: 500,
          menubar: false,
          branding: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help'
        }"
      />
      <button
        type="submit"
        class="py-2 px-3 mt-3 min-w-[13rem] bg-accent-2 border border-black rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
      >
        Save
      </button>
    </form>
  </div>
</template>
<script>
import Swal from 'sweetalert2';
import axios from 'axios';
import Editor from '@tinymce/tinymce-vue';

export default {
    data() {
        return {
            selectedCategory: '',
            categories: [],
            newPost: {
                title: '',
                body: '',
            },
        };
    },
    methods: {
        async addNewPost() {
            try {
                const slug = this.newPost.title.split(' ').slice(0, 50).join('-');

                const { data: existingPost } = await axios.get(
                    `https://ptbhetsbqexqdpwfmmdg.supabase.co/rest/v1/posts?slug=eq.${slug}`,
                    {
                        headers: {
                            apikey: process.env.API_KEY,
                            'content-type': 'application/json',
                        },
                    }
                );

                if (existingPost.length > 0) {
                  Swal.fire('Warning', 'Judul sudah tersedia sebelumnya, mohon gunakan judul yang lain', 'warning');
                    return;
                }

                const { data: post } = await axios.post(
                    'https://ptbhetsbqexqdpwfmmdg.supabase.co/rest/v1/posts',
                    JSON.stringify({
                        title: this.newPost.title,
                        body: this.newPost.body,
                        slug: slug,
                        category_id: this.selectedCategory,
                    }),
                    {
                        headers: {
                            apikey: process.env.API_KEY,
                            'content-type': 'application/json',
                        },
                    }
                );

                this.newPost.title = '';
                this.newPost.body = '';
                Swal.fire('Success', 'Berhasil menambahkan postingan!', 'success');
            } catch (error) {
                console.error('Error adding post:', error.message);
                Swal.fire('Error', 'Gagal menambahkan postingan!', 'warning');
            }
        },
    },
    created(){
      axios.get("https://ptbhetsbqexqdpwfmmdg.supabase.co/rest/v1/categories", {
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
    components: { Editor },
};
</script>
