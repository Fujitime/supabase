<template>
  <div class="p-8">
    <h2 class="text-2xl font-bold mt-8">Edit Post</h2>
    <form @submit.prevent="editPost" class="mt-4">
      <div class="mb-4">
        <label for="title" class="block text-sm font-medium text-gray-700">Title:</label>
        <input v-model="editedPost.title" type="text" id="title" required class="mt-1 p-2 w-full border rounded-lg focus:ring focus:ring-blue-200">
      </div>
      <div class="mb-4">
        <label for="category" class="block text-sm font-medium text-gray-700">Category:</label>
        <NuxtLink class="text-blue-700 font-light text-xs -mt-1" to="../category">Manage Category</NuxtLink>
        <select id="category" v-model="selectedCategory" class="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[9rem] p-2.5 " required>
          <option v-for="category in categories" :value="category.category_id" >{{ category.name }}</option>
        </select>
      </div>

      <editor
        api-key="y6wavuusx1p97c3is204dtbd5rujyn94wh8yh54sy0flklzf"
        class="mb-4"
        v-model="editedPost.body"
        :init="tinyMCEInit"
      />
      <button
        type="submit"
        class="py-2 px-3 mt-3 min-w-[13rem] bg-accent-2 border border-black rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
      >
        Save Changes
      </button>
    </form>
  </div>
</template>


<script>
import Swal from 'sweetalert2';
import axios from 'axios';
import Editor from '@tinymce/tinymce-vue';

export default {
  props: {
    slug: String
  },
  data() {
    return {
      selectedCategory: '',
      categories: [],
      editedPost: {
        title: '',
        body: '',
      },
    };
  },
  methods: {
    async editPost() {
      try {
        const response = await axios.patch(
          `https://ptbhetsbqexqdpwfmmdg.supabase.co/rest/v1/posts?slug=eq.${this.slug}`, JSON.stringify({
              title: this.editedPost.title,
              body: this.editedPost.body,
              category_id: this.selectedCategory,
          }),
          {
            headers: {
              'apikey': this.$config.apikey,
              'Content-Type': 'application/json',
            },
          }
        );

        Swal.fire('Success', 'Post updated successfully!', 'success');
      } catch (error) {
        console.error('Error updating post:', error.message);
        Swal.fire('Error', 'An error occurred while updating the post.', 'error');
      }
    },
    async fetchPostData() {
        try {
          const response = await axios.get(
            `https://ptbhetsbqexqdpwfmmdg.supabase.co/rest/v1/posts?slug=eq.${this.slug}`,
            {
              headers: {
                'apikey': this.$config.apikey,
                'Content-Type': 'application/json',
              },
            }
          );

          if (response.status === 200 && response.data.length > 0) {
            const post = response.data[0];
            this.editedPost.title = post.title;
            this.editedPost.body = post.body;
            this.selectedCategory = post.category_id;
          } else {
            Swal.fire('Error', 'Failed to fetch post data!', 'error');
          }
        } catch (error) {
          console.error('Error fetching post data:', error.message);
          Swal.fire('Error', 'An error occurred while fetching post data.', 'error');
        }
      },
  },
  computed: {
    tinyMCEInit() {
      return {
        height: 500,
        menubar: false,
        branding: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount',
        ],
        toolbar:`
          'undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help'`,
      };
    },
  },
  components: { Editor },
  created() {
    this.fetchPostData();
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
  },
};
</script>
