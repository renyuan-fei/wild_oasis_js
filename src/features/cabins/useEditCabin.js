import {useMutation, useQueryClient} from '@tanstack/react-query';
import {createEditCabin} from '../../services/apiCabins.js';
import {toast} from 'react-hot-toast';

export function useEditCabin() {
  const queryClient = useQueryClient();
  
  const {isLoading: isEditing, mutate: editCabin} = useMutation({
    mutationFn: ({newCabinData, id, oldImageName}) => createEditCabin(
        newCabinData, id, oldImageName),
    onSuccess: () =>
    {
      toast.success('Cabin updated successfully');
      queryClient.invalidateQueries({queryKey: ['cabins']});
      
    }, onError: (err) =>
    {
      toast.error(err.message);
    },
  });
  
  return {isEditing, editCabin};
}