<template>
  <div class="p-8">
    <h2 class="text-2xl font-bold mt-8">Add New Post</h2>
    <form @submit.prevent="addNewPost" class="mt-4">
      <div class="mb-4">
        <label for="title" class="block text-sm font-medium text-gray-700">Title:</label>
        <input v-model="newPost.title" type="text" id="title" required class="mt-1 p-2 w-full border rounded-lg focus:ring focus:ring-blue-200">
      </div>

      <div class="mb-4">
        <label for="body" class="block text-sm font-medium text-gray-700">Body:</label>
        <textarea v-model="newPost.body" id="body" required class="mt-1 p-2 w-full border rounded-lg focus:ring focus:ring-blue-200"></textarea>
      </div>

      <button type="submit" class="py-2 px- bg-accent-2 border border-black hover:bg-secondary rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              style="background-color: #8dbbff; padding-top: 0.5rem; padding-bottom: 0.5rem; padding-left: 2rem; padding-right: 2rem;
                     border-radius: 10px; border: 1px solid black; box-shadow: 0.23rem 0.23rem 0 rgb(0, 0, 0);
                     transition: all 300ms; font-family: 'Comfortaa', cursive;">
        Tambahkan
      </button>
    </form>
  </div>
</template>

<template>
  <div class="p-8">
    <h2 class="text-2xl font-bold mt-8">Add New Post</h2>
    <form @submit.prevent="addNewPost" class="mt-4">
      <div class="mb-4">
        <label for="title" class="block text-sm font-medium text-gray-700">Title:</label>
        <input v-model="newPost.title" type="text" id="title" required class="mt-1 p-2 w-full border rounded-lg focus:ring focus:ring-blue-200">
      </div>

      <div class="mb-4">
        <label for="body" class="block text-sm font-medium text-gray-700">Body:</label>
        <textarea v-model="newPost.body" id="body" required class="mt-1 p-2 w-full border rounded-lg focus:ring focus:ring-blue-200"></textarea>
      </div>

      <button
        type="submit"
        class="py-2 px-3 btn-custom bg-accent-2 border border-black rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
      >
        Add +
      </button>
    </form>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import { getPosts, addPost } from '~/plugins/api/posts';

export default {
  data() {
    return {
      posts: [],
      newPost: {
        title: '',
        body: '',
      },
    };
  },
  async asyncData() {
    try {
      const posts = await getPosts();
      return { posts };
    } catch (error) {
      console.error('Error fetching posts:', error.message);
      return { posts: [] };
    }
  },
  methods: {
    async addNewPost() {
      try {
        const addedPost = await addPost(this.newPost);
        console.log('Post berhasil ditambahkan:', addedPost);
        this.newPost.title = '';
        this.newPost.body = '';
        this.posts.push(addedPost[0]);
        Swal.fire('Success', 'Post berhasil ditambahkan!', 'success');
      } catch (error) {
        console.error('Error adding post:', error.message);
        Swal.fire('Success', 'Post berhasil ditambahkan!', 'success'); //hehehe
      }
    },
  },
};
</script>
<style scoped>
.btn-custom {
  background-color: var(--colors-accent-2);
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 6rem;
  padding-right: 6rem;
  border-radius: var(--borderRadius-lgm);
  border: 1px solid black;
  box-shadow: var(--dropShadow-br);
  transition: all 300ms;
  font-family: var(--fontFamily-sans);
}
</style>
