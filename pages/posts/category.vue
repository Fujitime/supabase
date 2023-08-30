<template>
  <div class="w-full min-h-screen bg-slate-100 ">
      <Navbar/>
      <div class="max-w-[98%] mx-auto px-2 pt-24">
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="mb-4 flex gap-2">
          <input
            type="text"
            v-model="category"
            class="flex-grow border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
            placeholder="Enter category name"
          />
          <button
            @click="newCategory"
            class="bg-blue-500 text-white rounded-lg px-4 py-2 focus:outline-none hover:bg-blue-600"
          >
            Add
          </button>
        </div>
        <ul class="space-y-4">
          <li v-for="categoryItem in categories" :key="categoryItem.category_id" class="flex items-center justify-between">
            <template v-if="editingCategoryId === categoryItem.category_id">
              <input
                type="text"
                v-model="categoryItem.name"
                class="flex-grow border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              />
              <div class="flex gap-2">
                <button
                  @click="saveEdit(categoryItem)"
                  class="bg-green-500 text-white rounded-lg px-3 py-1 focus:outline-none hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  @click="cancelEdit()"
                  class="bg-red-500 text-white rounded-lg px-3 py-1 focus:outline-none hover:bg-red-600"
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
                  class="bg-blue-500 text-white rounded-lg px-3 py-1 focus:outline-none hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  @click="deleteCategory(categoryItem.category_id)"
                  class="bg-red-500 text-white rounded-lg px-3 py-1 focus:outline-none hover:bg-red-600"
                >
                  Delete
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
