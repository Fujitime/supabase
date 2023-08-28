import supabase from '~/plugins/supabase';


// export async function getPostById(postId) {
//   const { data, error } = await supabase
//     .from('posts')
//     .select('*')
//     .eq('post_id', postId)
//     .single();

//   if (error) {
//     throw error;
//   }
//   return data;
// }
export async function getPosts() {
  const { data, error } = await supabase.from('posts').select('*');
  if (error) {
    throw error;
  }
  return data;
}

export async function addPost(post) {
  const { data, error } = await supabase.from('posts').insert([post]);
  if (error) {
    throw error;
  }
  return data;
}


