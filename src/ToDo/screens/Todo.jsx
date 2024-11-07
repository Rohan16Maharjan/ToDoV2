import { Box, Button, Flex, Heading, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEdit, FaEye } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import Select from 'react-select';
import CustomModal from '../../utils/Modal';
import {
  useCreate,
  useDeleteAll,
  useDeleteToDo,
  useGetAllTodo,
  useUpdateTodo,
} from '../services';
import { TodoSlug } from '../../constant/TodoSlug';

const Todo = () => {
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: todoData, isLoading } = useGetAllTodo();
  const { mutate: del } = useDeleteAll();
  const { mutate: add } = useCreate();
  const { mutate: del1 } = useDeleteToDo();
  const { mutate: upda } = useUpdateTodo();

  const [taskId, setTaskId] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  // state for select
  const [selectedData, setSelectedData] = useState();

  useEffect(() => {
    if (taskId) {
      const taskToEdit = todoData?.data.find((item) => item.id === taskId);
      if (taskToEdit) {
        setValue('title', taskToEdit.title);
        setValue('description', taskToEdit.description);
        setSelectedData({ value: taskToEdit.status, label: taskToEdit.status });
      } else {
        reset();
        setSelectedData(null);
      }
    } else {
      reset();
    }
  }, [taskId, todoData, setValue, reset]);

  const onSubmit = (eg) => {
    const payload = {
      ...eg,
      status: selectedData?.value,
    };
    if (taskId) {
      upda({
        reqBody: {
          id: taskId,
          title: eg.title,
          status: selectedData?.value,
          description: eg.description,
        },
      });
    } else {
      add(payload);
    }
    setTaskId(null);
    setSelectedData(null);
    reset();
  };

  const handleDeleteAll = async () => {
    if (window.confirm('Are you sure you want to delete All?')) {
      try {
        await del();
      } catch (err) {
        console.error('Error deleting the data', err);
      }
    }
  };

  const handleDelete = (id) => {
    alert('Are you sure you want to delete it ?');
    del1(id);
  };

  const handleEdit = (data) => {
    setTaskId(data?.id);
  };

  const handleTask = (data) => {
    setSelectedTask(data);
    onOpen();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box m={'0 auto'} maxW={'50%'} pt={'2rem'}>
      <Heading textAlign={'center'}>TodoList</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Title</label>
        <input
          {...register('title', { required: 'Title cannot be null' })}
          style={{
            width: '100%',
            border: '1px solid black',
            padding: '1rem 5rem',
            margin: '10px ',
          }}
        />
        {errors.title && (
          <span
            style={{
              fontSize: '0.875rem',
              display: 'block',
              textAlign: 'center',
              marginTop: '0.25rem',
              color: 'red',
            }}
          >
            Title Cannot be null
          </span>
        )}
        <label>Description</label>
        <input
          {...register('description', {
            required: 'Description cannot be null',
          })}
          style={{
            width: '100%',
            border: '1px solid black',
            padding: '1rem 5rem',
            margin: '10px',
          }}
        />
        {errors.description && (
          <span
            style={{
              fontSize: '0.875rem',
              display: 'block',
              textAlign: 'center',
              marginTop: '0.25rem',
              color: 'red',
            }}
          >
            Description Cannot be null
          </span>
        )}

        <Box m={5}>
          <label>Status</label>
          <Select
            className="basic-single"
            classNamePrefix="select"
            isLoading={isLoading}
            name="color"
            options={TodoSlug}
            inputValue="" //prevent from writing the stuffs
            value={selectedData}
            onChange={setSelectedData}
          />
        </Box>

        <Flex justifyContent={'space-around'}>
          <button
            style={{
              width: '15%',
              border: '1px solid red',
              padding: '1rem',
              marginRight: '1rem',
            }}
            type="submit"
          >
            {taskId ? 'Edit' : 'Add'}
          </button>
          <button
            style={{ border: '1px solid red', padding: '1rem' }}
            onClick={() => handleDeleteAll()}
          >
            Clear All
          </button>
        </Flex>
      </form>

      {/* Display Todo List */}
      <ul>
        {todoData?.data.map((item) => (
          <li
            key={item.id}
            style={{
              display: 'flex',
              border: '1px solid black',
              padding: '0.5rem',
            }}
          >
            <Flex flexDirection={'column'}>
              <Flex flexDirection={'column'}>
                <label>Title</label>
                {item?.title}
              </Flex>
              <Box>
                <Flex flexDirection={'column'}>
                  <label>Status</label>
                  {item?.status}
                </Flex>
              </Box>
              {/* <Box>
                <Flex flexDirection={'column'}>
                  <label>Favourite</label>
                  {item?.favourite}
                </Flex>
              </Box> */}
              <Box>
                <Flex flexDirection={'column'}>
                  <label>Description</label>
                  {item?.description}
                </Flex>
              </Box>
            </Flex>
            <Flex alignItems={'center'}>
              <button
                style={{ border: 'none', marginRight: '1rem' }}
                type="button"
                onClick={() => handleEdit(item)}
              >
                <FaEdit style={{ cursor: 'pointer' }} />
              </button>

              <MdDelete
                onClick={() => handleDelete(item?.id)}
                style={{ cursor: 'pointer' }}
              />

              <Button mt={4} onClick={() => handleTask(item)}>
                <FaEye style={{ cursor: 'pointer' }} />
              </Button>
            </Flex>
          </li>
        ))}
      </ul>

      <CustomModal
        heading={`View Task`}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        selectedTask={selectedTask}
      >
        {selectedTask ? (
          <div>
            <h2>Title: {selectedTask?.title}</h2>
          </div>
        ) : (
          <p>No task selected.</p>
        )}
      </CustomModal>
    </Box>
  );
};

export default Todo;
