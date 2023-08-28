<!-- <template>
  <div class="p-8">
    <h2 class="text-2xl font-bold mt-8">Edit Post</h2>
    <form @submit.prevent="editPost" class="mt-4">
      <div class="mb-4">
        <label for="title" class="block text-sm font-medium text-gray-700">Title:</label>
        <input v-model="editedPost.title" type="text" id="title" required class="mt-1 p-2 w-full border rounded-lg focus:ring focus:ring-blue-200">
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
  data() {
    return {
      editedPost: {
        slug: '',
        title: '',
        body: '',
      },
    };
  },
  methods: {
    async editPost() {
      try {
        const { slug, editedPost } = this;
        const response = await axios.patch(
          `https://ptbhetsbqexqdpwfmmdg.supabase.co/rest/v1/posts?slug=eq.${slug}`,
          { title: editedPost.title },
          { body: editedPost.body },
          {
            headers: {
              'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0YmhldHNicWV4cWRwd2ZtbWRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMxODgzMjYsImV4cCI6MjAwODc2NDMyNn0.x3WRxU3fKOzeQ3N8aOuaa0Io3DRe1Tv1MtYzX2V_miM',
              'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0YmhldHNicWV4cWRwd2ZtbWRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMxODgzMjYsImV4cCI6MjAwODc2NDMyNn0.x3WRxU3fKOzeQ3N8aOuaa0Io3DRe1Tv1MtYzX2V_miM`,
              'Content-Type': 'application/json',
              'Prefer': 'return=minimal',
            },
          }
        );

        if (response.status === 200) {
          Swal.fire('Success', 'Post updated successfully!', 'success');
          this.editedPost.title = '';
          this.editedPost.body = '';
        } else {
          Swal.fire('Error', 'Failed to update post!', 'error');
        }
      } catch (error) {
        console.error('Error updating post:', error.message);
        Swal.fire('Error', 'An error occurred while updating the post.', 'error');
      }
    },
    async fetchPostData() {
        try {
          const response = await axios.get(
            `https://ptbhetsbqexqdpwfmmdg.supabase.co/rest/v1/posts?slug=eq.${this.editedPost.slug}`,
            {
              headers: {
                'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0YmhldHNicWV4cWRwd2ZtbWRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMxODgzMjYsImV4cCI6MjAwODc2NDMyNn0.x3WRxU3fKOzeQ3N8aOuaa0Io3DRe1Tv1MtYzX2V_miM',
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0YmhldHNicWV4cWRwd2ZtbWRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMxODgzMjYsImV4cCI6MjAwODc2NDMyNn0.x3WRxU3fKOzeQ3N8aOuaa0Io3DRe1Tv1MtYzX2V_miM`,
                'Content-Type': 'application/json',
              },
            }
          );

          if (response.status === 200 && response.data.length > 0) {
            const post = response.data[0];
            this.editedPost.title = post.title;
            this.editedPost.body = post.body;
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
  },
};
</script> -->
