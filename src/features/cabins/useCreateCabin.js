import {useMutation, useQueryClient} from '@tanstack/react-query';
import {createEditCabin} from '../../services/apiCabins.js';
import {toast} from 'react-hot-toast';

export function useCreateCabin() {
  const queryClient = useQueryClient();
  
  const {isLoading: isCreating, mutate: createCabin} = useMutation({
    mutationFn: (CabinData) => createEditCabin(CabinData),
    onSuccess: () =>
    {
      toast.success('Cabin created successfully');
      queryClient.invalidateQueries({queryKey: ['cabins']});
      
    }, onError: (err) =>
    {
      toast.error(err.message);
    },
  });
  
  return {isCreating, createCabin};
}