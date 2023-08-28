<template>
  <div>
    <EditPost :slug="$route.params.slug" />
  </div>
</template>

<script>
import EditPost from '~/components/EditPost.vue';

export default {
  components: {
    EditPost,
  },
};
</script>
