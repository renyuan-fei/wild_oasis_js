import Form from '../../ui/Form.jsx';
import Textarea from '../../ui/Textarea.jsx';
import Button from '../../ui/Button.jsx';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {createCabin} from '../../services/apiCabins.js';
import {useForm} from 'react-hook-form';
import Spinner from '../../ui/Spinner.jsx';
import {toast} from 'react-hot-toast';
import FormRow from '../../ui/FormRow.jsx';
import Input from "../../ui/Input";
import FileInput from '../../ui/FileInput.jsx';

function CreateCabinForm() {
  const queryClient = useQueryClient();
  
  const {
    register,reset, handleSubmit, getValues, formState,
  } = useForm();
  
  const {isLoading: isCreating, mutate} = useMutation({
    mutationFn: createCabin, onSuccess: () =>
    {
      toast.success('Cabin created');
      queryClient.invalidateQueries({queryKey: ['cabins']});
      reset();
      
    }, onError: (err) =>
    {
      toast.error(err.message);
    },
  });
  
  const {errors} = formState;
  
  if (isCreating) {
    return <Spinner/>;
  }
  
  function onSubmit(data) {
    mutate({...data, image: data.image[0]});
  }
  
  function onError() {
    toast.error("Please fill in all the fields and try again.");
  }
  
  return (
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormRow label="Cabin name" error={errors?.name?.message}>
          <Input
              type="text"
              id="name"
              {...register('name', {
                required: 'This field is required',
              })}
          />
        </FormRow>
        
        <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
          <Input
              type="number"
              id="maxCapacity"
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
              defaultValue=""
              {...register('description', {
                required: 'This field is required',
              })}
          />
        </FormRow>
        
        <FormRow label="Cabin photo">
          <FileInput
              id="image"
              accept="image/*"
              {...register('image', {
                required: 'This field is required',
              })}
          />
        </FormRow>
        
        <FormRow>
          <Button variation="secondary" type="reset">
            Cancel
          </Button>
          <Button>
            Create new cabin
          </Button>
        </FormRow>
      </Form>);
}

export default CreateCabinForm;
