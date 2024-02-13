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

export async function createEditCabin(newCabin, id, oldImageName) {
  let imagePath = newCabin.image;
  let imageName = '';
  
  // check if the image is existing and it's an url
  if (newCabin.image && typeof newCabin.image !== 'string') {
    
    // imageName = `${Math.random()}-${newCabin.image.name}`
    //     .replaceAll('/', '')
    //     .replaceAll(' ', '');
    
    imageName = `${Math.random()}-${newCabin.image.name}`
        .replaceAll(/[^a-zA-Z0-9-.]/g, '');
    
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  } else if (!id) {
    // throw an error if creating a cabin without an image
    throw new Error('Creating a cabin requires an image');
  }
  
  let query = supabase.from('cabins');
  let data,
      error;
  
  // create a new cabin
  if (!id) {
    ({data, error} = await query.insert([{...newCabin, image: imagePath}])
        .single());
  } else {
    ({data, error} = await query.update(
            {...newCabin, image: imagePath ? imagePath : newCabin.image})
        .eq('id', id)
        .single());
  }
  
  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created/edited');
  }
  
  // upload new image
  if (imageName && newCabin.image) {
    
    // delete old image
    if (oldImageName) {
      const {error: deleteError} = await supabase
          .storage
          .from('cabin-images')
          .remove([oldImageName]);
      
      if (deleteError) {
        throw new Error('Cabin image could not be uploaded');
      }
    }
    
    const {error: storageError} = await supabase.storage
        .from('cabin-images')
        .upload(imageName, newCabin.image);
    
    if (storageError) {
      if (!oldImageName) {
        await supabase.from('cabins')
            .delete()
            .match({id: data.id});
      }
      
      console.error(storageError);
      
      throw new Error('Cabin image could not be uploaded');
    }
  }
  
  return data;
}
