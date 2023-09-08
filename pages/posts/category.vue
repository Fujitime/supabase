<template>
  <div class="w-full min-h-screen bg-slate-100 ">
      <Navbar/>
      <div class="max-w-[98%] mx-auto px-2 pt-24">
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="mb-4 flex gap-1">
          <input
            type="text"
            v-model="category"
            class="flex-grow border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
            placeholder="Enter category name"
          />
          <button
            @click="newCategory"
            class="py-2 px-4 mt-3 bg-accent-9 border border-black rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          >
            +
          </button>
        </div>
        <ul class="space-y-4">
          <li v-for="categoryItem in categories" :key="categoryItem.category_id" class="flex items-center justify-between">
            <template v-if="editingCategoryId === categoryItem.category_id">
              <input
                type="text"
                v-model="categoryItem.name"
                class="flex-grow border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-gray-200 "
              />
              <div class="flex gap-2">
                <button
                  @click="saveEdit(categoryItem)"
                  class="bg-accent-9 border border-black rounded-lg focus:outline-none focus:ring focus:ring-gray-200 px-3 py-1 text-white"
                >
                  Save
                </button>
                <button
                  @click="cancelEdit()"
                  class="bg-accent-5 border border-black rounded-lg focus:outline-none focus:ring focus:ring-gray-200 px-3 py-1 text-white "
                >
                  Cancel
                </button>
              </div>
            </template>
            <template v-else>
              <div class="flex-grow">{{ categoryItem.name }}</div>
              <div class="flex gap-2">
                <button
                  @click="editCategory(categoryItem)"
                  class="bg-accent-2  border border-black rounded-lg focus:outline-none focus:ring focus:ring-gray-200 text-white px-3 py-1 "
                >
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 512 512">
                <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
                </button>
                <button
                  @click="deleteCategory(categoryItem.category_id)"
                  class="text-white rounded-lg px-3 py-1 bg-accent-5 border border-black focus:outline-none focus:ring focus:ring-gray-200"
                >
                <svg fill="white" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                </button>
              </div>
            </template>
          </li>
        </ul>

      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import Navbar from '~/components/Navbar.vue';
import Swal from 'sweetalert2';

export default {
  components: {
    Navbar,
  },
  name: "Category",
  data() {
    return {
      category: '',
      categories: [],
      editingCategoryId: null,
      currentCategoryIndex: 0,
    };
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get("https://ptbhetsbqexqdpwfmmdg.supabase.co/rest/v1/categories", {
          headers: {
            'apikey': this.$config.apikey,
            'content-type': 'application/json',
          },
        });
        this.categories = response.data;
        this.currentCategoryIndex = 0;
        this.fetchCategoryDetails();
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
    async fetchCategoryDetails() {
      if (this.currentCategoryIndex < this.categories.length) {
        const category = this.categories[this.currentCategoryIndex];
        try {
          const response = await axios.get(`https://ptbhetsbqexqdpwfmmdg.supabase.co/rest/v1/categories?category_id=eq.${category.category_id}`, {
            headers: {
              'apikey': this.$config.apikey,
              'content-type': 'application/json',
            },
          });
          this.categories[this.currentCategoryIndex] = response.data[0];
        } catch (error) {
          console.error("Error fetching category details:", error);
        }
        this.currentCategoryIndex++;
        this.fetchCategoryDetails();
      }
    },
    async newCategory() {
  if (this.category.trim() !== '') {
    const existingCategory = this.categories.find(cat => cat.name.toLowerCase() === this.category.trim().toLowerCase());
    if (existingCategory) {
      Swal.fire({
        icon: 'error',
        title: 'Category Already Exists',
        text: 'The entered category already exists.',
      });
    } else {
      // Category is new, add it
      await this.addCategory(this.category);
      this.fetchCategories();
    }
  }
},
    editCategory(category) {
      this.editingCategoryId = category.category_id;
    },
    async saveEdit(category) {
      await this.updateCategory(category);
      this.editingCategoryId = null;
    },
    async cancelEdit() {
      this.editingCategoryId = null;
      await this.fetchCategories();
    },
    async deleteCategory(id) {
      await this.removeCategory(id);
      this.fetchCategories();
    },
    async addCategory(name) {
      await axios.post(
        'https://ptbhetsbqexqdpwfmmdg.supabase.co/rest/v1/categories',
        JSON.stringify({ name }),
        {
          headers: {
            'apikey': this.$config.apikey,
            'Content-Type': 'application/json',
          },
        }
      );
    },
    async updateCategory(category) {
      await axios.patch(
        `https://ptbhetsbqexqdpwfmmdg.supabase.co/rest/v1/categories?category_id=eq.${category.category_id}`,
        JSON.stringify({ name: category.name }),
        {
          headers: {
            'apikey': this.$config.apikey,
            'Content-Type': 'application/json',
          },
        }
      );
    },
    async removeCategory(id) {
      await axios.delete(`https://ptbhetsbqexqdpwfmmdg.supabase.co/rest/v1/categories?category_id=eq.${id}`, {
        headers: {
          'apikey': this.$config.apikey,
          'Content-Type': 'application/json',
        },
      });
    },
  },
  async created() {
    await this.fetchCategories();
  },
};
</script>
