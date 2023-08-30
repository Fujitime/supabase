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
    };
  },
  methods: {
    newCategory() {
      if (this.category.trim() !== '') {
        axios
          .post(
            'https://ptbhetsbqexqdpwfmmdg.supabase.co/rest/v1/categories',
            JSON.stringify({
              name: this.category,
            }),
            {
              headers: {
                'apikey': this.$config.apikey,
                'Content-Type': 'application/json',
              },
            }
          )
          .then(() => {
            this.allCategories();
          });
      }
    },
    editCategory(category) {
      this.editingCategoryId = category.category_id;
    },
    saveEdit(category) {
      axios
        .patch(
          `https://ptbhetsbqexqdpwfmmdg.supabase.co/rest/v1/categories?category_id=eq.${category.category_id}`,
          JSON.stringify({
            name: category.name,
          }),
          {
            headers: {
              'apikey': this.$config.apikey,
              'Content-Type': 'application/json',
            },
          }
        )
        .then(() => {
          this.editingCategoryId = null;
        });
    },
    cancelEdit() {
      this.editingCategoryId = null;
      this.allCategories();
    },
    deleteCategory(id) {
      axios
        .delete(`https://ptbhetsbqexqdpwfmmdg.supabase.co/rest/v1/categories?category_id=eq.${id}`, {
          headers: {
            'apikey': this.$config.apikey,
            'Content-Type': 'application/json',
          },
        })
        .then(() => {
          this.allCategories();
        });
    },
    allCategories() {
      axios
        .get("https://ptbhetsbqexqdpwfmmdg.supabase.co/rest/v1/categories", {
          headers: {
            'apikey': this.$config.apikey,
            'content-type': 'application/json',
          },
        })
        .then(({ data }) => {
          this.categories = data;
        })
        .catch(() => {
          this.categories = [];
        });
    },
  },
  created() {
    this.allCategories();
  },
};
</script>
