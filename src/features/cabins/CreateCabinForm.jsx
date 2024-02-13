import Form from '../../ui/Form.jsx';
import Textarea from '../../ui/Textarea.jsx';
import Button from '../../ui/Button.jsx';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {createEditCabin} from '../../services/apiCabins.js';
import {useForm} from 'react-hook-form';
import Spinner from '../../ui/Spinner.jsx';
import {toast} from 'react-hot-toast';
import FormRow from '../../ui/FormRow.jsx';
import Input from '../../ui/Input';
import FileInput from '../../ui/FileInput.jsx';
import {getImageNameFromUrl} from '../../utils/helpers.js';

function CreateCabinForm({cabinToEdit = {}}) {
  const queryClient = useQueryClient();
  
  const {id: editId, ...editValues} = cabinToEdit;
  
  const isEditSession = Boolean(editId);
  
  const {
    register, reset, handleSubmit, getValues, formState,
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  
  const {isLoading: isCreating, mutate: createCabin} = useMutation({
    mutationFn: (CabinData) => createEditCabin(CabinData),
    onSuccess: () =>
    {
      toast.success('Cabin created successfully');
      queryClient.invalidateQueries({queryKey: ['cabins']});
      reset();
      
    }, onError: (err) =>
    {
      toast.error(err.message);
    },
  });
  
  const {isLoading: isEditing, mutate: editCabin} = useMutation({
    mutationFn: ({newCabinData, id, oldImageName}) => createEditCabin(
        newCabinData, id, oldImageName),
    onSuccess: () =>
    {
      toast.success('Cabin updated successfully');
      queryClient.invalidateQueries({queryKey: ['cabins']});
      // reset();
      
    }, onError: (err) =>
    {
      toast.error(err.message);
    },
  });
  
  const isWorking = isCreating || isEditing;
  
  const {errors} = formState;
  
  if (isCreating) {
    return <Spinner/>;
  }
  
  function onSubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];
    console.log(data);
    if (isEditSession) {
      console.log('edit');
      const imageName = getImageNameFromUrl(editValues.image);
      editCabin({
        newCabinData: {...data, image},
        id: editId,
        oldImageName: imageName,
      });
    } else {
      console.log('create');
      createCabin({...data, image: image});
    }
  }
  
  function onError() {
    toast.error('Please fill in all the fields and try again.');
  }
  
  return (
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormRow label="Cabin name" error={errors?.name?.message}>
          <Input
              type="text"
              id="name"
              disabled={isWorking}
              {...register('name', {
                required: 'This field is required',
              })}
          />
        </FormRow>
        
        <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
          <Input
              type="number"
              id="maxCapacity"
              disabled={isWorking}
              {...register('maxCapacity', {
                required: 'This field is required',
                min: {
                  value: 1,
                  message: 'Capacity should be at least 1',
                },
              })}
          />
        </FormRow>
        
        <FormRow label="Regular price" error={errors?.regularPrice?.message}>
          <Input
              type="number"
              id="regularPrice"
              disabled={isWorking}
              {...register('regularPrice', {
                required: 'This field is required',
                min: {
                  value: 1,
                  message: 'Capacity should be at least 1',
                },
              })}
          />
        </FormRow>
        
        <FormRow label="Discount" error={errors?.discount?.message}>
          <Input
              type="number"
              id="discount"
              disabled={isWorking}
              defaultValue={0}
              {...register('discount', {
                required: 'This field is required',
                validate: (value) =>
                    value <= getValues().regularPrice ||
                    'Discount should be less than regular price',
              })}
          />
        </FormRow>
        
        <FormRow
            label="Description for website"
            error={errors?.description?.message}
        >
          <Textarea
              type="number"
              id="description"
              disabled={isWorking}
              defaultValue=""
              {...register('description', {
                required: 'This field is required',
              })}
          />
        </FormRow>
        
        <FormRow label="Cabin photo"
                 error={errors?.image?.message}>
          <FileInput
              id="image"
              disabled={isWorking}
              accept="image/*"
              {...register('image', {
                required: !isEditSession ? 'This field is required' : false,
                validate: {
                  required: value => (!isEditSession &&
                      (!value || value.length === 0)) ?
                      'Please upload an image for the cabin' :
                      true,
                  size: value =>
                  {
                    // if editing and no new image is uploaded, skip the size check
                    if (isEditSession && (!value || value.length === 0)) {
                      return true;
                    }
                    // check if the image size is less than 2MB
                    const fileSize = value[0]?.size || 0;
                    const maxSizeInBytes = 2 * 1024 * 1024; // 2MB
                    if (fileSize > maxSizeInBytes) {
                      return 'Image size should not exceed 2MB';
                    }
                    return true;
                  },
                },
              })}
          />
        </FormRow>
        
        <FormRow>
          <Button disabled={isWorking}
                  variation="secondary"
                  type="reset">
            Cancel
          </Button>
          <Button disabled={isWorking}>
            {isEditSession
                ? 'Update this cabin'
                : 'Create new cabin'}
          </Button>
        </FormRow>
      </Form>);
}

export default CreateCabinForm;
