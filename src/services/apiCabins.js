import supabase, {supabaseUrl} from './supabase.js';

export async function getCabins() {
  const {data, error} = await supabase.from('cabins')
      .select('*');
  
  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }
  
  return data;
}

export async function deleteCabin({id, imageName}) {
  const {data, error} = await supabase
      .from('cabins')
      .delete()
      .match({id});
  
  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted');
  }
  
  const {error: storageError} = await supabase
      .storage
      .from('cabin-images')
      .remove([imageName]);
  
  if (storageError) {
    console.log(storageError);
    throw new Error('Cabin deleted, but unable to delete image');
  }
  
  return data;
}

export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`
      .replaceAll('/', '')
      .replaceAll(' ', '');
  
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  
  const {data, error} = await supabase.from('cabins')
      .insert([{...newCabin, image: imagePath}]);
  
  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created');
  }
  
  const {error: storageError} = await supabase
      .storage
      .from('cabin-images')
      .upload(imageName, newCabin.image);
  
  if (storageError) {
    await supabase.from('cabins')
        .delete()
        .eq('id', data.id);
    
    console.error(storageError);
    throw new Error(
        'Cabin image could not be uploaded and the cabin was not created');
  }
  
  return data;
}